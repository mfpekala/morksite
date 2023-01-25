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
    title: "Towards Fast Fractal Image Compression",
    description: `As part of an advanced algorithms class at Harvard 
    I spent part of a semester attempting to improve the feasibility of 
    fractal image compression. Some successes, some failures.`,
    image: "FastFractal.png",
    timeframe: "September 2022 - December 2022",
    codeLink: "https://github.com/mpekala23/FastFractal",
  },
];
