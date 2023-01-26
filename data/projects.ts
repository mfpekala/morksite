import { Project } from "../types/types";

export const PROJECTS: Project[] = [
  {
    title: "play.JPEG",
    description: `Inspired by my research into fractal compression, I took a 
    deep dive into the JPEG encoding scheme and created a friendly tool for 
    anyone to look under the hood of the world's most popular image compression 
    scheme.`,
    image: "PlayJPEG.png",
    timeframe: "December 2022 - January 2023",
    codeLink: "https://github.com/mpekala23/play-jpeg",
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
