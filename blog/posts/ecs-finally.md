# ECS, Finally

As someone who's only ever been a casual game developer, diving into entity-component-system (ECS) programming proved more challenging than expected. I'd made some simple games with Unity (which is _technically_ ECS), but usually I'd preferred to do my own thing from scratch which tended to drift towards an OOP style. Recently I've started falling in love with Rust, and stumbled upon [Bevy](https://bevyengine.org/learn/book/getting-started/), what seems to be the most mature Rust-based Game Engine.

Bevy has a lot of upside. It comes with a ton of built-in helpers for the things you need, but isn't annoyingly hand-holdy like Unity or Unreal. The community is filled with incredibly passionate and smart people, and it's young enough that an at-least-okay developer could probably contribute back. Plus it's Rust, which means fast and fun to write. The downside? It's all in on this ECS thing, which is a bit of a mindf\*ck if you're not used to it.[^1]

## How I thought about games

Before I started making games in Bevy, I tended to structure games using one of two strategies:

**#1: Spaghetti code**

For simple games, this is a surprisingly good strategy. Your game has a player, enemies, and an environment? Great! Make a class for each, throw in some `update` and `render` functions, and start specializing. Make everything public so you can read and change it wherever, cook up some global state when you need it, and you're good.

This is a strategy which is very fun at the beginning because you can get a lot done in a short amount of time. Needless to say it becomes a nightmare as soon as you want to generalize (multiple levels, reuse logic in slightly different ways, complex hierarchies, etc.) It's probably a good time to mention that almost every game I've ever worked on never got finished, ending up in some kind of half-finished purgatory once I realized the central mechanic I thought would be fun is either boring or too hard to do as a side project. So, yeah, take this with a grain of salt.

**#2: Parents, parents, parents**

The more "rational" way I'd approach making games was to break everything into tiny bite-size pieces, and then have a ton of parent-child relationships. For example, a player is an object with health, a position, and a weapon; a weapon is either a gun or a sword and has a hitbox, which is a position and an animation which has a..... you get the gist.

Besides being intuitive, the best part about breaking up game objects and logic like this is that it _usually_ forces you to think in a data-first way. When you make a new object, you're encouraged to think critically about all the data that thing is responsible for, and all the things it depends on as children. Especially compared to the spaghetti approach, this makes it possible to put development down for a week, come back, and have a reasonable chance of understanding things and making meaningful progress.

The downside (which I don't think I appreciated until I put on my ECS hat) is that it's actually not that generalizable. Even if you eat your vegetables and try to make reusable interfaces or base classes it still ends up being an prohibitive amount of boilerplate most times you want to add stuff.

Why? The biggest reason is that when you break things up like this in a top down way, it's hard to make reusable classes that actually work in all the places you'll need them too without a bunch of extra code. For example, consider hitboxes. You probably want the player to have a hitbox and you probably want the enemies to have hitboxes too. So you make a hitbox class, and it's great when you just have black boxes on the screen running into each other. But now let's say you add animations, and you realize when something gets hit it should probably update it's animation, and maybe die. And now all of a sudden your hitbox logic cares about how it's parent implemented animations and death. So maybe you add an option to pass in a callback to the hitbox that gets called whenever something gets hit, but then you have to duplicate the animation switching logic in both the player and the enemy even though they're basically doing the same thing. Or maybe you solve it by standardizing the methods that things with both hitboxes and animations have, but this is often tricky to do with "clean" OOP syntax and still probably means code dupe. So what do you do?

## Enter: ECS

After my time in Bevy, I think ECS (to a non-ECS person) can best be summed up in the following:

_ECS means developing from the bottom up._

Looking back, I'm surprised that a lot of the resources I'd looked at to learn ECS from a mostly OOP background didn't phrase it this way.

> **An Aside: What are *E*ntities, *C*omponents, and *S*ystems?**
> An _entity_ is simply a collection of components with a given id. Entities are flexible, in that they can contain any arbitrary collection of components and don't need to be pre-typed. You can even add and remove components dynamically. Most ECS systems give you access to familiar things like fetching entities by id, deleting by id, attaching parent child relationships between entities, etc.
> A _component_ is just data. In Bevy, it's just a struct. It has no obligation to provide any behavior (although it can implement whatever you want). It fits well with a data-first approach.
> A _system_ is functionality that affects entities and components. Most systems will work in the following way:
>
> 1. Fetch all the entities with a specific component, or with a specific combination of components (for example, `Moveable` and `AABBPhysics`).
> 2. Read, mutate, or _whatever_ with these entities and components.

In both the spaghetti code and the parent-based approaches above, development is unmistakebly top down. Take the biggest, flashiest, most noticable parts of the final game that exists in your mind and break it down into smaller and smaller pieces until you reach something that's possible to code in a few hours.

ECS feels philisophically different. Start with the smallest possible state/behavior pair you care about and build up from there. For example, you probably want to make things that move. So you create a `Moveable` component that has a velocity vector. Then add in a system that every frame iterates through all the entities with `Moveable` component and nudge them according to the velocity. Voila!

Now what happens if you want to make a player that responds to input, can jump around, and is animated? Well you add in some more components, perhaps `AABBPhysics` so it gets collisions and gravity (and you could reuse for enemies), `Controllable`, and `Animated`. Each of these gets a corresponding system or two, and you're done.

Developing in this way doesn't force you to do things the right way. You can still occassionally make components that don't generalize and lead to refactors or bloat, find yourself with a bunch of systems which together feel like spaghetti. The point is: it's _harder_ to trap yourself in these bad outcomes. It's a well-known saying that languages and frameworks are useful because they tell you what you can't (or _shouldn't_) do. ECS (and Bevy) feels the same.

## Performance Considerations

The other huge upside of ECS is that it's usually very, very fast. This is due to a couple factors:

**Prefer Parallelization, Always**

Say you have a bunch of systems which every frame operate on a bunch of data. It's very easy for the engine (in this case Bevy) to schedule systems that operate on separate data in parallel. You, the developer, probably don't need to think about parallelization at all, and yet you can rest easy knowing that the engine alone will probably find enough data parallelism to fully utilize all available cores.

It's worth noting that in some cases you have to explicitly order things (for example checking for collisions and applying physics before moving), but the default is to parallelize everything you can.

Compare this with what you might see in naive approaches:

```
void update() {
    checkForCollisions();
    for (player : players) {
        player.update();
    }
    for (projectile : projectiles) {
        projectile.update();
    }
    map.loadBoundaries();
    checkForDeath();
    checkForVictory();
    ...
}
```

While it's clear that a lot of these things can be parallelized, that's not the default, and the burden falls on the programmer to notice that and structure their code to take advantage of it.

**Flat Structure**

ECS also tends to lead to a flat structure of gameobjects. That is, instead of having a scene where there is a top-level parent, which has an environment, which has a bunch of block children, each of the blocks exists and has it's own id at a "flat" level. This means that most times your accessing the data of blocks, you're not doing a bunch of pointer chasing which could lead to cache misses or other wonky behavior. This becomes especially important for complex scenes with lots of entities.

## Drawbacks?

The biggest drawback I've experienced while using ECS vs. my own custom OOP engines is that it's often times harder to know where to start. When you're developing from the bottom up, it's harder to see what's the natural next component to implement. Decision paralysis is real, and if you try to overcome it by simply diving in and implementing "something", you'll probably find yourself in refactor hell further down the road.

All-in-all, this is not a bad problem to have and I'm sure it'll get better the more comfortable I get. The underlying problem here is less with the framework, and more with the ambiguity of the game itself.

[^1]: Many people would consider the emphasis on ECS another upside.
