# Zenith Devlog #1: 4/9/24

I've noodled around on a lot of games. Some in more established engines (Unity, Unreal), others from scratch (C++). Recently, I've been playing around with Bevy, an insanely powerful but light-weight engine that feels like scratch but gets rid of a lot of the annoying stuff. Also, it's in rust, which is (imo) a joy to program in.

Most of the time, I get really into these games for a few weeks, but then completely drop them. Either the gameplay doesn't feel good, or I'm not passionate about the story, or I'm simply afraid of how much work it'll be.

But with my current game, _Zenith_, things feel different. I've got a concrete sense of what the gameplay will be like, and it _feels_ good. I like the story, and I think I just might have a solid enough grasp on Bevy/ECS in general where I can make things happen in the game relatively quickly.

Also, I'm in a pretty unique place in my life at the moment. I'm about to graduate college, and have decided to go out with a relatively light semester. This might be the last time in awhile I can afford to make some passion-game a major priority, and I don't want to waste the opportunity.

So, I've decided to start a devlog. In this post, I hope to explain _why_ I'm doing this, _who_ I think might be interested, and actually write my first devlog.

## Why a devlog?

Plainly speaking: I want to finish this game, I want it to be good, and I want to be polished. I think getting fragments of the game and my mind out in to the public as early as possible will be motivating and make the final product as high quality as possible.

I've also spent a lot of time working with Bevy, and want to get more involved in the community. I'm hoping that by putting my thoughts, struggles, and solutions out in the open I can engage with the community, providing and receiving valuable advice.

Also, forcing myself to sit down and write at a high-level about the project every week will make it easier to stay on track, and continue to work on the highest priority tasks (not just whatever seems fun in the moment).

## Who cares?

Realistically, probably no one. I'm perfectly content if this ends up being loose rambling into the void.

But for the sake of focusing my writing, here's who I'm thinking might want to read some of these:

- People who care about me / my work - My future self, friends, other game developers.
- People who want to learn more about Bevy/Rust - I anticipate being pretty technical in these posts. I'm hoping I can answer someone's random Google search (Bevy docs are not great), and hopefully even get roasted by someone who's smarter than me.
- People who want to play the game - This will probably be 0 people for a long time. But maybe once I get a public beta I can use this as a space to get feedback from potential players about what they want to see from the game.

# The Actual Devlog

## Preface: What's the game?

I've always had a soft spot for golf games. Most 2d, but some 3d. I'm hoping to make an interstellar-travel themed 2d "golf" game where you shoot the ship and interact with fields and the like from scattered planets. Think: some kind of mash-up between Super Mario Galaxy and Golf-Story, in 2d.

Before this week, I had rudimentary foundations for all major parts of the game: physics, level editor, cutscenes. This week I made some of them a lot better.

## Editor Hell

This week I've been working on revamping the level editor to make it more expressive. Previously, gravity fields for planets had to be uniform, and there wasn't an easy way to move multiple points at the same time, or add points to an existing planet, or do a bunch of other things.

And this makes sense! I think for a game like this with custom physics, you need to make a rudimentary editor to use alongside the first implementation of the physics. Since it's not just default AABB, or some out-of-the-box solution, I needed a way to test the edge cases I felt unsure of, and make sure it felt fun for the levels I thought might be interesting. The first editor definitely did this. But boy was it time to write a new one.

Rewriting the editor turned out to be a more herculean task than I original thought, but the bright side is I learned a lot, and I think some of the key takeaways will help me write cleaner ECS code going forward. Let's dive in to exactly what changes I made to the editor in the new version and what I learned about this kind of ECS structure.

### The point as the fundamental entity

Previously, I had had the point information wrapped up in some `Vec<Vec2>` inside another component. This lead to a lot of really annoying queries, and made it pretty impossible to have meaningful hierarchies (i.e., point A is parented to point B, so when you move point A point B should move too). The solution was pretty simple: Make (most) editor interactions just interacting with a point (moving, spawning, deleting), and make higher level components (rocks, fields, start/goal) references to points with some additional metadata. It took a couple iterations to get the point data factored into the right components, but it made things feel a lot better.

![parented_points](/blog_images/zenith-devlog-1/parented_points.png)
_The above screenshot is from the new editor. Each square is a point, and the thick white lines show the parent-child relationships between the points. This makes it especially easy to edit the rocks while having the gravity fields adjust appropriately._

### Marker components for complex changes

Previously when I had written the update functions for my old editor, when something happened, it happened right away. (Well, technically the next Update, but as "right away" as is possible for deferred commands in ECS). For example, if you spawned a gravity field, it would spawn and immediately have all the right points and direction. This meant fewer systems, but meant each system took way more parameters and did way more work and was pretty hard to follow.

So instead, for "complex" things, I just decided to attach some marker components that basically say "Hey! Some work needs to be done here", and then I could write more targeted systems to do surgical updates to the editor state.

The biggest win here was with spawning new fields. Like I mentioned at the beginning, one of the biggest limitations of my old editor was that every planet had to have a uniform field around it. But what about a planet that has a strange spike? Or a zero-gravity portion? The solution was to give each point a type, either "Rock", "Field", or "Wild".

"Rock" points make up the solid mesh of the planet, and their position is relative to the planet.

"Field" points are the children of rock points.

"Wild" points are points that are children of the planet, but should be able to be _converted_ into field points (i.e. "adopted" by some rock point) to make a field on the planet.

In the new editor, when a new field is created for some planet, all of it's points are marked with a `PendingPlanet(pub Vec<u32>)`. Then, the system that's watching for the new field input (selecting points and hitting `F`) can move on and completely forget about it.

Meanwhile another system is watching for `Point`s marked with a `PendingPlanet`. When it finds some, it determines the shape of the field, it's gravity, and (potentially) turns `Wild` points into `Rock` points parented to the nearest rock point.

### Bevy reflect is kind a jank

After a lot of work I had an editor that I was pretty happy with that had a decent number of components that used `Entity` to refer to some entity. Then I wanted it to be possible to save the level (something that was only barely possible before). I thought briefly about writing some system that manually would serialize everything, and another system which could read that and then spawn everything in right order, but that seemed like a lot of work. Instead I tried to use good 'ol `serde` and Bevy's built in `Reflect` capabilities.

> An aside: what is `Reflect`? A simple way to think about it is a way of describing the fields and type information for a struct at runtime, so that it can be automatically serialized in a way such that some combination of Serde, the engine, and the type system can reconstruct it again in runtime sometime later.

This was SUPER annoying. Firstly, I learned that I shouldn't have been relying on `Entity`s to be unique across save/load. This is _kinda_ mentioned in the docs, and it's on me for missing it, but basically I needed to go back and replace everywhere where I had `Entity` with my own custom unique identifier component which would actually be unique across save/load.

There also seem to be some weird quirks in the actual serialization. For example, when `Vec2` (or similar) is used in a component I define, it gets serialized to:

```
field_name: (
    x: flksdf,
    y: kdljfs,
)
```

Looks good, right? Wrong. Turns out the `.ron` deserializer actually expects it to look like

```
field_name: (sdfsk, skdjf)
```

I have no idea why, or why this doesn't also break serialization for built-in higher-order types (like Transform). I spent too many hours trying to write my own serializer, but bevy refused to use it, before I finally gave up and just wrote a script which would serialize it into the broken `x: lsdfkj, y: lsdkfj` form, and then make edits to put it into the right form to be deserialized.

This, combined with having to replace `Entity` everywhere basically led to a rewrite of the whole editor. Yay!

### A phoenix from the ashes: Stubs and Heads

Through all of this writing and rewriting, I stumbled upon two patterns which seem quite good for ergonomic management of complex entities, requiring complex assets (meshes with custom sprite textures were the original inspiration).

**Stub - A component that lets another system know something should happen here**

For example, let's say I'm spawning a planet given 4 points. That planet needs a mesh. One option I have is to at the moment I spawn the planet, add a mesh as a component on the entity. But now let's say the planet actually need's two meshes, for another section or whatever. Well now bevy doesn't like this because you can't have two of the same component on an entity.

So the solution is to spawn the mesh but just make it a child of the original entity with 0 offset. This works, but is super annoying in practice. It means anytime you want to spawn a planet, you need to have mutable access to `Assets<Mesh>`, `Assets<SpriteMaterial>` (a custom material), you need to not only spawn the bundle you care about, but also a bunch of boilerplate stuff that looks exactly the same as the boilerplate stuff that gets written when you're putting a mesh on the ship, or the star, or whatever.

So what do we do? How do we avoid annoyingly passing around `ResMut<Assets<Mesh>>` everywhere and writing 20+ lines to spawn a single planet?

The _better_ solution is to make the `Planet` bundle have a `MeshStub` component This component, like above, just exists to say, "Hey! Mysterious game engine, you should spawn a mesh here with the given data and parent it to whatever entity has this component.

This was a game-changer for me. It made code that looked like this:

```rust
impl BorderedMesh {
    fn spawn(
        commands: &mut ChildBuilder,
        meshes: &mut ResMut<Assets<Mesh>>,
        points: Vec<IVec2>,
        material: (BorderedMatData, Handle<SpriteMaterial>),
        border_material: Option<(BorderedMatData, Handle<SpriteMaterial>)>,
        border_width: Option<f32>,
        render_layer: RenderLayers,
        inner_info: SpriteInfo,
        outer_info: Option<SpriteInfo>,
    ) -> Entity {
        let fpoints: Vec<Vec2> = points.clone().into_iter().map(|p| p.as_vec2()).collect();
        let inner_points = outline_points(&fpoints, -border_width.unwrap_or(0.0));
        let mut inner_mesh = generate_new_sprite_mesh(&inner_points, &material.1, meshes);
        inner_mesh.transform.translation.z += 0.5;
        let outer_mesh = match &border_material {
            Some(mat) => Some(generate_new_sprite_mesh(&fpoints, &mat.1, meshes)),
            None => None,
        };
        commands
            .spawn((
                BorderedMesh {
                    last_points: points.clone(),
                    points,
                    last_material: material.0.clone(),
                    material: material.0.clone(),
                    last_border_material: match border_material.clone() {
                        Some(thing) => Some(thing.0),
                        None => None,
                    },
                    border_material: match border_material {
                        Some(thing) => Some(thing.0),
                        None => None,
                    },
                    border_width,
                    scroll: default(),
                },
                IntMoveable::new(IVec3::ZERO),
                SpatialBundle::default(),
            ))
            .with_children(|parent| {
                parent.spawn((
                    inner_mesh,
                    render_layer.clone(),
                    BorderMeshType("inner".to_string()),
                    ScrollSprite::default(),
                    inner_info.clone(),
                ));
                if let (Some(outer_mesh), Some(outer_info)) = (outer_mesh, outer_info) {
                    parent.spawn((
                        outer_mesh,
                        render_layer.clone(),
                        BorderMeshType("outer".to_string()),
                        ScrollSprite::default(),
                        outer_info.clone(),
                    ));
                }
            })
            .id()
    }
}
```

look like this

```rust
impl EPlanetBundle {
    pub fn new(pos: IVec2) -> (Self, impl Bundle) {
        let core_uid = fresh_uid();
        let bordered_mesh_uid = fresh_uid();
        let bordered_mesh_head_stubs = BorderedMeshHeadStubs(vec![BorderedMeshHeadStub {
            uid: bordered_mesh_uid,
            head: BorderedMeshHead {
                inner_path: "textures/play_inner.png".to_string(),
                inner_size: UVec2::new(36, 36),
                outer_path: "textures/play_outer.png".to_string(),
                outer_size: UVec2::new(36, 36),
                render_layers: vec![sprite_layer_u8()],
                border_width: 7.0,
                ..default()
            },
        }]);
        let bund = EPlanetBundle {
            uid: UIdMarker(core_uid),
            eplanet: EPlanet {
                bordered_mesh_uid,
                ..default()
            },
            spatial: SpatialBundle::from_transform(Transform::from_translation(
                pos.as_vec2().extend(0.0),
            )),
            moveable: IntMoveable::new(pos.extend(0)),
            save: SaveMarker,
        };
        (bund, bordered_mesh_head_stubs)
    }
}
```

At first glance, these don't look _that_ different, but I think there's two big things that make this a huge quality of life improvement. First, in the improved code, you get a bundle back. That means you don't need to pass in 4 parameters everytime you call this function with proper mutable access. Second, whatever is using this only needs to know the stuff that's relevant. Where is the image path, how big is it, what's the border? It is truly data first.

The downside? The only real downside is that it makes these kinds of things potentially a frame or two delayed. Obviously there'll be some system running watching to actually spawn the meshes, and so it'll likely be:

```
spawn stub -> (maybe frame passes?) -> sytem spawns actual mesh, removes stub -> (frame passes) -> (asset loads) -> asset appears
```

But I think this will probably almost never matter. Also, in the alternative, you really only save one or two frames, tops (and usually probably zero). Commands are defered anyway, so if it's spawned here or in another system, it probably doesn't matter.

**Head - A component that controls something that's annoying to serialize**

Reflect for saving/loading levels worked great for simple data, but it immediately exploded as soon as I tried to serialize assets like images, meshes, materials, etc. This is because somewhere in the entities containing these things, the assets are just basically `Arc` pointers to something that lives in memory. Serializing that in a way that can be recreated, especially when that thing in memory had to be loaded somewhere else from disk, is hard (and probably a bad idea).

Naively just ignoring these `Assets` kept leaving the editor in a broken state, and trying to plug holes one by one felt like this:

![ice_age_gif](/blog_images/zenith-devlog-1/holes.gif)

So instead, for any entity that should be able to be seamlessly loaded, and correct itself if it's child is ever in a f\*\*\*-d up state, I gave it a `Head`. It's really just a component that contains whatever data is needed to recreate the `Arc` on that asset (i.e. a filepath, maybe some metadata), and a collection of systems that make sure it always has a child (at 0 offset) with the right asset.

That's pretty much what I've been working on for the game lately. I also went back to a lot of other things I had already written (ship, rock, etc) and changed it to use the new stub/head framework for things like meshes and animations, where relevant.

### Next Steps

With a solid, expressive editor, my next goal is going to be to solidify the game's mechanics. There are a few features I want to add (spikes, bouncy-stuff, replenishing shots, bullet time) before I'd consider it super fun to play. It should be fun stuff to work on, but probably will be time consuming as ideally I want to solidify all the physics and core interactions so I can move on to designing great levels and a great story.

Thanks for reading! Here are a couple more screenshots of the game highlighting the stuff I worked on this week.

![complex](/blog_images/zenith-devlog-1/complex.png)

![testing](/blog_images/zenith-devlog-1/testing.png)
(This one is the same as the title image, but bigger and easier to see.)
