import { Project } from "../types/types";
export const PROJECTS: Project[] = [
  {
    title: "Odd Friends",
    description: `I wanted to learn more about convex.dev's take on the data layer, so I built a simple 
    clone of Wits and Wagers to play in the browser.`,
    image: "OddFriends.png",
    timeframe: "October 2023 - October 2023",
    codeLink: "https://github.com/mpekala23/odd-friends",
    liveLink: "https://odd-friends.mark-pekala.dev/",
  },
  {
    title: "Cyclicism",
    description: `As a kid, I loved reading the news. Nowadays, I find it rare to find an article
    that I don't feel like I've read some version of before. Cyclicism is a tool that uses transformer
    embeddings to compare trending NYT articles to stories published 20 years ago to highlight patterns
    in the news cycle.`,
    image: "Cyclicism.png",
    timeframe: "July 2023 - August 2023",
    codeLink: "https://github.com/mpekala23/cyclicism",
    liveLink: "https://cyclicism.mark-pekala.dev/",
  },
  {
    title: "Out-of-Place Writes on the PGM Index",
    description: `Preliminary research into efficiently extending the functionality of the PGM
    index. Traditionally, the PGM uses ML techniques to achieve fast reads with little memory usage.
    This research implements a novel technique to allow for fast writes as well, with minimal additional
    memory overhead.`,
    image: "PGMOutOfPlace.png",
    timeframe: "February 2023 - May 2023",
    codeLink: "https://github.com/mpekala23/Limousine-COOP-Writes/tree/main",
    liveLink:
      "https://drive.google.com/file/d/1og05YP8s4XiHgzkm0BBPdm1e06ZcrnlM/view?usp=sharing",
  },
  {
    title: "NumCross",
    description: `Along with a few friends at Harvard, spun up a NYT-mini inspired app
    for sharing a unique type of number puzzle. I was in charge of spinning up the database and coordinating
    deployment with terraform so that when this thing blows up, we'll be ready for a million users..`,
    image: "NumCross.png",
    timeframe: "February 2023 - May 2023",
    codeLink: "https://github.com/mpekala23/numcross",
    liveLink: "https://www.mark-pekala.dev/posts/numcross-down",
  },
  {
    title: "Verifying the Byzantine Generals Problem",
    description: `Using the Lean theorem prover, I composed a formal proof of the byzantine generals problem.`,
    image: "ByzGenerals.png",
    timeframe: "February 2023 - April 2023",
    codeLink: "https://github.com/mpekala23/FormalByzantine",
    liveLink:
      "https://github.com/mpekala23/FormalByzantine/blob/main/Paper.pdf",
  },
  {
    title: "Nerf Goliath",
    description: `Nerf Goliath is a novel multiplayer networking protocol which seemlessly
    switches hosting to give ping benefit to players in losing positions.`,
    image: "NerfGoliath.gif",
    timeframe: "March 2023 - May 2023",
    codeLink: "https://github.com/mpekala23/NerfGoliath",
    liveLink:
      "https://github.com/mpekala23/NerfGoliath/blob/main/results/final_paper.pdf",
  },
  {
    title: "Pokegan",
    description: `As a fun dive into the world of GANs, I tried to generate novel pokemon
    using GANs. The results were... interesting.`,
    image: "pokegan.gif",
    timeframe: "March 2023 - May 2023",
    codeLink: "https://github.com/mpekala23/NerfGoliath",
    protectString:
      "Unfortunately, I submitted large chunks of this project as part of class work, so I can't share the code publicly.",
  },
  {
    title: "Climate Innovathon",
    description: `Organized an event at the intersection of computer science and chemistry at Harvard
    encouraging students to explore research topics in carbon capture. Sponsored by Frontier Climate, over $500 in prizes.`,
    image: "ClimateInnovathon.png",
    timeframe: "February 2023 - March 2023",
    codeLink: "https://github.com/mpekala23/climate-innovathon-site",
    liveLink: "https://www.climate-innovathon.com/",
  },
  {
    title: "README #",
    description: `The culmination of my time on the Lampoon, I edited an issue of the magazine
    focused on why computers make whirring sounds sometimes.`,
    image: "README-cover.jpeg",
    timeframe: "December 2022 - March 2023",
    codeLink: "https://harvardlampoon.com/read/magazines/33/",
    liveLink: "https://harvardlampoon.com/read/magazines/33/",
    protectString: "Magazines are protected by copyright, idiot.",
  },
  {
    title: "play.JPEG",
    description: `Inspired by my research into fractal compression, I took a 
    deep dive into the JPEG encoding scheme and created a friendly tool for 
    anyone to look under the hood of the world's most popular image compression 
    scheme.`,
    image: "PlayJPEG.png",
    timeframe: "December 2022 - January 2023",
    codeLink: "https://github.com/mpekala23/play-jpeg",
    liveLink: "https://play-jpeg.com",
  },
  {
    title: "Lampoon Digital Subscriptions",
    description: `As president, I oversaw a team that made digital subscriptions 
    a reality for the first time in the magazine's 150-year history.`,
    image: "LampoonSubscriptions.png",
    timeframe: "August 2022 - January 2023",
    codeLink: "https://harvardlampoon.com/",
    liveLink: "https://harvardlampoon.com/signup?next=/subs/portal",
    protectString:
      "Unfortunately, since we don't want to get hacked, I'm not going hand out the code for free. (Cough cough you have to bribe me.)",
  },
  {
    title: "Towards Fast Fractal Image Compression",
    description: `As part of an advanced algorithms class at Harvard 
    I spent part of a semester attempting to improve the feasibility of 
    fractal image compression. Some successes, some failures.`,
    image: "FastFractal.png",
    timeframe: "September 2022 - December 2022",
    codeLink: "https://github.com/mpekala23/FastFractal",
    liveLink:
      "https://drive.google.com/file/d/1am8jT4lxX4WtWD5tH_I-JpTivoAUzQOn/view?usp=sharing",
  },
  {
    title: "Implementing a Modern Column-Store from Scratch in C",
    description: `Over the course of a semester, I took principles 
    from modern database research and implemented a column-store 
    from scratch in C.`,
    image: "ColumnStore.png",
    timeframe: "September 2022 - December 2022",
    codeLink: "http://daslab.seas.harvard.edu/classes/cs165/index.html",
    protectString:
      "Unfortunately, since the code was part of a university project, I can't leave it public. Email me for more info! Happy to chat.",
  },
  {
    title: "Vaccine Checker",
    description: `Vaccine rollout in California was, let's say, complicated. I wrote a script 
    that would scrape the CVS website a few times a day and text me as soon as I could sign up.`,
    image: "VaccineChecker.png",
    timeframe: "March 2021 - (a few hours later) March 2021",
    codeLink: "https://github.com/mpekala23/VaccineChecker",
  },
  {
    title: "Expo RGB Color Picker",
    description: `Bored one weekend, I decided to make a natural color picker 
    for React Native/Expo.`,
    image: "ExpoColorPicker.png",
    timeframe: "Febuary 2021 - (a few days later) Febuary 2021",
    codeLink: "https://github.com/mpekala23/expo-rgb-color-picker",
    liveLink:
      "https://www.npmjs.com/package/expo-rgb-color-picker?activeTab=dependencies",
  },
];
