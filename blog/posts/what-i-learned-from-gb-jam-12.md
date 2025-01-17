# What I Learned from GBJam 12

GBJam 12 wrapped up — oh jeez — like 3 months ago? I'm gearing up to participate in the next Pirate Software jam, and figured it'd be helpful to organize my thoughts looking back.

![Redeath Screenshot](/blog_images/what-i-learned-from-gb-jam-12/RedeathScreenshot.png)

Shameful plug: I ended up submitting a game called [Redeath](https://mfpekala.itch.io/redeath). Play it! I think this is the most polished, fun game I've ever made. Ignore the fact that it's  just a Celeste clone. Also ignore the fact that it did horribly in the jam (more on this later). Also also ignore the fact that sometimes the hitboxes don't load in time and all physics is completely bugged. I know it's not great, but I do genuinely believe it's an okay game.

# Game Design Learning

## Constraints Are Key

GB Jam 12 is short for ["Game Boy Jam 12"](https://itch.io/jam/gbjam-12/results?page=11), and it came with the following constraints:

1. 160px x 144px screen resolution
2. Maximum of 4 colors on the screen at one time
3. D-pad, A, B, select, Start controls
4. No AI
5. All assets made during the 10-day jam.

### Visual Constraints

I think constraints 1 and 2 are the primary reasons why I'm really proud of what I made,. Even though it sounds weird, I found these constraints incredibly freeing.

For constraint 1, whenever I would add something new to the game, it was pretty obvious what size and shape it should be (give or take a few pixels). Creating a sprite became less about trying to capture something crazy I'm imagining in my head, and more about trying to communicate as clearly as possible the basics about what this thing is. When I'm looking at other people's pixel art, I often ask _"How did they make that so simple?"_ I think the key is to practice at low resolutions. It really makes me realize what's important, and what's not.

Constraint 2 was similar. Intentionality is key to answering:

- Will this thing hurt me?
- Is this thing moving?
- Is this thing even interactable, or is it just part of the background?

With only 4 colors, once I had the general idea for the shape of a sprite, it basically colored itself. I reserved the brightest colors for the most crucial information (player and platforms), and a distinctive red for dangerous objects. The other two colors were detail, and helped distinguish between foreground/background.

It's worth mentioning as well that I'm colorblind. I think part of the reason why this game looks more polished is because the palette is more polished. There aren't random objects that have colors completely orthogonal to the main stuff.

### Aside: Is "No AI" a Good Constraint?

The answer is yes, in the sense that I would rather live in a world where all jams were "No AI" instead of one where all jams were "Unlimited AI". Game Jams are 99% about getting better at making games, and using AI robs you of most of this upside. And let's be honest, most of the stuff AI makes is slop anyway. Your game would be just as good (if not better) if you replaced that slop character sprite with a gray square. Just saying. [^1] 

That being said, I think the ideal world is "limited AI". I found it really annoying not being able to use very simple code complete. It seems like what's "AI" and what's a "devtool" is a bit of a moving goalpost here. I think AT MOST current AI coding tools can help with 5% of the work that goes into coding a game. But over a 10 day period, that 5% adds up to a few hours. And the AI can do it in 45 seconds. And the AI can do it at 3am without making tons of mistakes.

A lot of people think that using AI to help brainstorm should also be allowed. But the cynic in me says that that's just looking at a statistically condensed, unlicensed, uncredited version of someone else's work and calling it your own. _Maybe_ if you know that the tool your using is morally sound, it's okay. But most tools today aren't.

### Aside: Is "All Assets Made During the Jam" a Good Rule?

I think no. I respect the reasoning given by the organizers: go form a team if you need assets you can't make. But in general, there's tons of simple assets that make a game much better and are a pain in the ass to make by hand.

The best example is sound effects. If I had you play 5 similar-ish game jam games, and then had you listen to the sound effects from one of them I doubt you'd be able to guess which they were from. One of my least favorite aspects of the game I submitted is that it doesn't have any sound effects. It's not something you consciously notice being gone, but it is incredibly important for cultivating good gamefeel.

In an ideal world, you'd form a team to work with people who can do things you can't. But not that many people love creating 8-bit sound effects from scratch when a billion copies already exist online. And those creators need credit/exposure too!

## Imitation is the Sincerest Form of Learning

One of my goals for 2025 is to learn piano, so I can be one step closer to creating my own music for my games. Recently, after this jam was over, I had the chance to attend a game dev meetup in SF and talk with an expert musician/composer. I asked him the best way to learn how to make music for games, and he said, "Find music you like, and copy it."

Redeath is basically just a _Celeste_ clone. When I decided this, I didn't put much thought into it. The theme didn't really speak to me, so I decided to make a game with mechanics I know I would personally enjoy. That was _Celeste_.

Looking back, making a game with the implicit goal of copying some other game which I think is basically perfect was a great way to learn. Every decision I made I had to hold up to the _Celeste_ mirror. It really forced myself to analyze things at a much deeper level than I would have otherwise. This was most relevant for the controls. It took a long, long, looooong time to make movement that felt right. And that's good! I put some new tools in my toolbox, like input buffering, coyote frames, that I'll definitely use in the future.

## Results Don't Matter

My game did pretty bad. 217th to be specific. So not great.

![Redeath Ratings](/blog_images/what-i-learned-from-gb-jam-12/RedeathRatings.png)

_(I am pretty proud of getting 104th for gameplay, though. IMO that's the most important metric.)_

These numbers are all incredibly arbitrary though. 10 random strangers on the internet decided this is what this game deserved. [Maybe a few of them didn't eat lunch](https://en.wikipedia.org/wiki/Hungry_judge_effect). Who cares.

What really matters is that other human beings played my game, and gave me [honest feedback](https://itch.io/jam/gbjam-12/rate/2973606). Most of them said the game is too hard, which is what I was going for. Making a truly excellent, beginniner-friendly game in a jam is basically impossible. Probably better to try and make something the masochists will enjoy.

### _Okay Maybe Results Matter a Little Bit?_

Buuuuut, hand-wave hand-wave we live in a world. One day I want to sell my games. To other human beings. Who will pay money to download something I made. So at _some_ point in time, I'll need other people to think my games are objectively good.

I think the realistic take here is that game jam ratings have a _ton_ of variability. Taking results from any one (or even any few) jams seriously is a recipe for disaster. But game jams are the best way to learn how to make games. And if you're at all interested in making something other people should buy, you should understand why the stuff you're making isn't connecting with people. And you should fix this.

# Technical Learnings

I think compared to previous jams, I don't think I had any true "aha" moments technically when making redeath. Maybe that's a bad thing. Most of the stuff I learned technically was just about making stuff I already had more ergonomic and a little faster.

## LDTK is Awesome

It's an open source level editor. It's great. It's much, much better than what I tried to do for Zenith.

## WASM Felt Easy

Not much to report here. I struggled with this a fair bit for Starling. It's pretty easy now. There are a few annoying (I think) Bevy things, like limiting texture sizes, and forcing certain byte alignments on my shader args. But nothing crazy.

## Physics Continues to Get Better

I think there are very few physics bugs in Redeath. Probably because I restricted myself just to rectangular hitboxes, and did a better job limiting the number of classes of static objects.

# The Future of Redeath

I had so much fun making Redeath, I actually committed to following up with a full game! Unofficially my entry to this jam was v0.0.1. [Version 0.1.0](https://dream-lake-games.itch.io/reDEATH) launched pretty recently, you should check it out! It provides some much needed visual improvements (including a lighting system!), deeper core gameplay mechanics, and a more expansive world.

I'm maybe 1/3rd of the way done with it. More to come here.

---

[^1] This AI hate is especially true for 2d pixel art games. For 3d games where ultra-realism is the goal, I have no idea how AI compares to humans. Maybe it's much better. Probaly not.