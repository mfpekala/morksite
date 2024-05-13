# Zenith Devlog #2: 5/13/24

Well, it looks like trying to do this once a week was a bit ambitious. BUT, ambitious is good, and this week I finally got back to making Zenith a priority. Jumping back into things, I was pleasantly surprised how easy it was to use a lot of the tools I wrote myself earlier. Especially everything that had to do with animations. Now that I'm focusing less on "boilerplate" and more on "game features", having an ergonomic way to instantiate sprites and animations has been huge.

## Segments: Making Rocks More Interesting

Before this week, rocks were these uniform, polygonal things. I had different types (normal, icy, or death-y), but within a single rock there wasn't much variety. This week, I added the concept of "segments", which are things that connect two points on a rock that are neighbors. To start I've implemented "spikes" and "springs" as two types of segments. See the picture below:

![SegmentShowcase](/blog_images/zenith-devlog-2/SegmentShowcase.png)

Getting this to work required slightly rethinking how I handled meshes, sprites, and animations. Previously, I had the concept of a textured mesh (what I was using for rocks) that lived separately from the concept of an animation (what I used for things like the goal/start). A textured mesh was a sprite attached to an arbitrary set of points, either scaled or repeating. An animation was a rectangle with a given sprite sheet and speed. But then I had the following thought: if I have a spring, it can potentially have an arbitrary length, and I want it to play an animation when the player hits it. So then I need an animation which can play on an arbitrarily sized rectangle. This is basically the same amount of work as getting an animation that can play on an arbitrary set of points, so I just combined these two things in to one thing, an `AnimationManager` which is flexible enough to handle both use cases.

Here's what the spring initialization code ended up looking like:

```rust
AnimationManager::from_nodes(vec![
    (
        "idle",
        AnimationNode {
            sprite: SpriteInfo {
                path: "sprites/goodies/spring.png".to_string(),
                size: UVec2::new(7, 7),
            },
            length: 1,
            ..default()
        },
    ),
    (
        "bounce",
        AnimationNode {
            sprite: SpriteInfo {
                path: "sprites/goodies/spring_bounce.png".to_string(),
                size: UVec2::new(7, 7),
            },
            length: 6,
            next: Some("idle".to_string()),
            ..default()
        },
    ),
])
```

Each node should be thought of as the node of some finite state machine. By default, the animation will loop, unless it's given a "next", in which case when the animation finishes it will switch states to the given key. By default, the points are assigned to initially match the provided sprite, but can be stretched and moved arbitrarily.

The `AnimationManager` itself has a lot more properties, exposed through setters to control the state of animation.

```rust
pub struct AnimationManager {
    key: String,
    map: HashMap<String, AnimationNode>,
    points: Vec<IVec2>,
    scale: AnimationScale,
    offset: IVec3,
    angle: f32,
    render_layers_u8: Vec<u8>,
    hidden: bool,
    scroll: Vec2,
    is_changed: bool,
}
```

Along with this are a handful of systems that read the current state of the manager, and manage child entities displaying the animation. When the animation is just playing as normal, neither the mesh nor the material needs to be regenerated, just a few parameters defining the underlying material are tweaked. However, when a big change occurs, like switching keys or changing points, the mesh and material are regenerated, a slightly expensive step but one that really only happens in the editor.

As I was thinking through how this manager would be used in the game, I also realized that many things would need to manage multiple animations simultaneously. The most common is things that have both a sprite and a light, two animations that — while living in different render layers — should be controlled by the same entity.

Obviously an entity can't have two `AnimationManager`s, so I made another handy component, `MultiAnimationManager` which is basically a map of keys to animation managers that allows a single entity to control many `AnimationManager` children.

```rust
pub struct MultiAnimationManager {
    pub map: HashMap<String, AnimationManager>,
    pub is_coup: bool,
}
```

The `is_coup` field sounds scary but exists to solve a pretty basic ABA issue that happens when editing rocks. Basically if you have a rock that has 3 animation children, `field1, field2, field3`, and then delete `field3` and add a new `field3` on the same tick, then the system that is watching for changes will miss it (since it's only doing comparison on keys, not deep comparisons on the animations). This flag is marked anytime such an issue could occur, and signals to the underlying system that it should do deep comparisons when updating the entities actually displaying the animations this frame.

In terms of gameplay, spikes are simple hitboxes that stop and kill the ship. Springs launch the ship at a consistent vertical (or really normal) velocity while conserving horizontal (or really parallel) velocity.

## Getting Spring Physics Right - Tweaking Trigger Order

Previously, my physics logic worked like this:

There are two kinds of things that `dynos` (moveable objects) may hit.

1. `statics` - Are things that objects bounce off of. Right now, this is only rocks. Each `static` defines a bounciness and a friction which make the interactions unique.
2. `triggers` - Are things that have no specific collision logic, but get added to the `dyno`'s `trigger` list each frame while moving so it knows which triggers it passed through and can handle the logic later.

Both `statics` and `triggers` share `ColliderBoundary` logic for defining their hitboxes, which may be arbitrary polygons.

Each update, each `dyno` first clears the list of `triggers` it has collided with. Then, it inches along 1 unit at a time, resolving collisions with all `statics`. Then, once moving is finished, it checks which `triggers` it's colliding with and adds them to it's list. A later system then reads these triggers to apply things like field gravity and drag.

However, this created an issue with springs. Springs define a `trigger`, not a `static`. This is because I don't just want springs to be a bouncy material, but rather an object that will always send the ship (ball) at a consistent height to make tighter gameplay possible. So, my first attempt simply had me adding a system that looked at the triggers after the ball finished moving, and applying springs if there was a collision. But this felt bad. Sometimes, the ball "should" have hit a spring trigger, but because it was only checked at the end of movement, and not at the 1-unit increments, it was missed.

The fix was to make the physics update work as follows:

1. Clear the `triggers` list.
2. Perform a series of 1-unit "inches" resolving static collisions as you inch.
3. After each inch, check for trigger collisions and update the `triggers` list. If one of the triggers is a spring, immediately update the velocity.
4. Later systems can then read the `triggers` list for applying things like gravity, or checking if the ball collided with a spike.

This ended up working wonderfully. The last small change I made was for the underlying collider physics logic to add it's parent id as the trigger id instead of it's own, just to avoid some weird parent chasing that popped up in some trigger processing systems.

## Replenishes - Faster Paced Gameplay

My original vision for this game placed a lot of emphasis on precision. The goal would be to finish each level in as few shots as possible, which means planning out shots carefully and taking calculated risks.

![Replenish](/blog_images/zenith-devlog-2/Replenish.png)
_A screenshot from the game showing the ship flying past the "replenish" diamonds (inspired from Celeste) which will give you a fresh shot mid flight._

While I think that this vision could still work, as I've spent more time playing around with the physics I've found it actually rather hard to accurately predict the balls path through gravity on a gameplay level. Very small changes to the power or launch angle may completely change how the ball does (or doesn't) wrap around certain edges or escape certain fields. Maybe this is a skill issue, but without something like a shot preview I thought that this could be frustrating to players who feel the physics is too complicated.

Instead of changing the physics, I'm going to see what the game feels like if the metric the player cares about isn't number of shots but is instead speed. Your ability to "shoot" wouldn't return when the ball completely stopped moving, but rather when the ball hit a static with a "small enough" velocity. There would also be yellow boxes, decently easy to hit, floating out in space that the player could aim for that would allow them to modify the path of their ball mid flight.

I've only now barely finished implementing replenishes, but I'm hoping this week to add a bullet-time feature that activates when taking a shot so I can see how the game feels at this fast pace.

## TODO next

I feel I'm actually getting very close to a point where I can crank out a bunch of levels, send a copy to my friends and have them tell me whether it's fun. Before I do that I need:

- Bullet time when making a shot
- Fix some slight performance issues on old hardware (it feels a bit laggy on my old laptop)
- Tuning the shot speed, gravity strength, to make levels and gameplay feel as "crisp" as possible.
- Design a bunch of levels.
- Simple tutorial
- Simple way of chaining levels
