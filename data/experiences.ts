import { Experience } from "../types/types";

export const Experiences: Experience[] = [
  {
    year: "2023",
    first: true,
    org: "Fair Opportunity Project",
    logo: "FairOpp.png",
    website: "https://www.fairopportunityproject.org/",
    title: "Full-Stack Software Engineer",
    timeframe: "January 2023 - Present",
    location: "Madison, WI (Remote)",
    description: `The Fair Opportunity project is a small non-profit 
    committed to making college accessible to all. As one of the first 
    engineering hires, I work to automate internal systems to expand 
    our reach and improve the quality of the free resource portals we provide 
    to our students and mentors. Here's what's on my resume:`,
    bullets: [
      "Implemented an authentication system allowing visitors to our site to create an account and receive personalized access to our resources.",
      "Planned data schemas and API integrations to automate the process of mentor-mentee matching, and essay review assignments.",
      "Organized internal QA testing.",
    ],
  },
  {
    year: "2022",
    org: "The Harvard Lampoon",
    logo: "Lampoon.png",
    website: "https://harvardlampoon.com/",
    title: "President",
    timeframe: "January 2022 - January 2023",
    location: "Cambridge, MA",
    description: `As president I oversaw the big-picture and day-to-day operations of the 
    world's longest continuously published humor magazine. Our team of roughly 15 writers, 5 artists, 
    and a handful of business staff produces five high quality magazines with extensive national 
    readership. Here's what's on my resume:`,
    bullets: [
      "Managed a team of coders and creatives to implement digital subscriptions for the first time in Lampoon history.",
      "Worked with advertisers, the university, and our board of trustees to ensure smooth operation.",
      "Oversaw the production of a total of six magazines and four special parody projects with tens of thousands of readers.",
      "Managed a digital campaign that increased out-of-state subscribers by 20%.",
    ],
  },
  {
    year: "2022",
    org: "Innovators for Purpose",
    logo: "iFp.png",
    website: "https://innovatorsforpurpose.org/",
    title: "Mentor",
    timeframe: "June 2022 - August 2022",
    location: "Cambridge, MA",
    description: `My role as mentor with Innovators for Purpose was to help students learn how to code 
    — and more importantly to learn how to enjoy coding — by building a video game. 
    Over the course of three months I worked with twelve students representing a diverse subset 
    of the Cambridge community to develop two games, one 2D and one 3D, using Godot. Here's what's on my resume:`,
    bullets: [
      "Designed interactive lessons to teach the basics of source control using git to enable collaboration.",
      "Helped encourage students to approach problems from first-principles when possible instead of searching for hyper-specific bugs.",
    ],
  },
  {
    year: "2021",
    org: "Ameelio",
    logo: "Ameelio.png",
    website: "https://www.ameelio.org/",
    title: "Software Engineer",
    timeframe: "November 2020 - August 2021",
    location: "New Haven, CT (Remote)",
    description: `Ameelio works to develop innovative technologies 
    to disrupt the bloated and discriminatory corrections industry. 
    As a founding engineer at Ameelio, I took ownership of mobile 
    engineering, while also helping the small team with design, full-stack 
    work, and devops. Here's what's on my resume:`,
    bullets: [
      "Led development of Ameelio Letters, a service that lets people compose letters on their phone and mail them to prisons for free. Oversaw the development from initial launch to the 200,000 user and 1,000,000+ messages mark in 2021.",
      "Led development of Ameelio Letters, the nation's first free video-conferencing tool for incarcerated people. Oversaw mobile engineering from inception to a completed beta at three Iowa prisons servicing 200+ users.",
      "Managed a team of three interns in the summer of 2021 to release Letters 2.0, a major update allowing users to send books, song lyrics, games and more to their loved ones by connecting to free APIs.",
      "Managed the development cycle for the mobile suite. Planned release schedules, jest unit testing, and on-call for critical bug fixes.",
      "Participated in over 20 user interviews to better understand the product and better serve our users.",
    ],
  },
  {
    year: "2020",
    org: "Harvard Computer Society",
    logo: "HCS.png",
    website: "http://www.hcs.harvard.edu/",
    title: "Director of Education",
    timeframe: "January 2020 - January 2021",
    location: "Cambridge, MA",
    description: `The Harvard Computer society provides resources and community 
    to empower students to do interesting things with technology. As director 
    of education, I helped teach new members and those interested in the club 
    skills they would need to succeed. Here's what's on my resume:`,
    bullets: [
      "Organized eight educational bootcamps for 200+ of my peers in topics ranging from ML to interface design.",
      "Planned three social events for new members to get to know each other and find project partners.",
    ],
  },
  {
    year: "2020",
    org: "Ameelio",
    logo: "Ameelio.png",
    website: "https://www.ameelio.org",
    title: "Software Engineering Intern",
    timeframe: "May 2020 - November 2020",
    location: "New Haven, CT (Remote)",
    description:
      "As an intern, I was one of the first engineers hired to help achieve Ameelio's mission of creating a more rehabilitative justice system. Here's what's on my resume:",
    bullets: [
      "Used React Native, typescript, and laravel to develop the initial launch of Ameelio Letters, an app allowing users to compose letters on their phone and send them to their incarcerated loved ones for free.",
      "Implented a suite of automated CI/CD tools using GitHub actions to ensure high quality code and remove the hassle of managing releases to multiple app stores.",
    ],
  },
  {
    year: "2020",
    org: "Wave Learning Festival",
    logo: "WaveLF.png",
    website: "https://www.wavelf.org/",
    title: "Associate Director of Tech",
    timeframe: "May 2020 - August 2020",
    location: "San Francisco, CA (Remote)",
    description: `During the COVID-19 pandemic, Wave Learning Festival 
    was founded to help provide accessible online classes to high school 
    students. The classes focused on unique topics, taught by a team of 
    college-age volunteers from across the country. Here's what's on my 
    resume:`,
    bullets: [
      "Transitioned the website from using plain JavaScript to TypeScript.",
      "Developed an internal tool to quickly generate figures about program outreach and student success.",
    ],
  },
  {
    year: "2019",
    org: "Mortenson Construction",
    logo: "Mortenson.png",
    website: "https://www.mortenson.com/",
    title: "Data Analyst Intern",
    timeframe: "June 2019 - August 2019",
    location: "Minneapolis, MN",
    description: `Mortenson construction is one of the world's leading construction companies 
    in everything from NFL stadiums to solar tech. I worked in the strategic 
    marketing department developing new techniques to better understand how sales 
    resources are best used. Here's what's on my resume:`,
    bullets: [
      "Developed ML models using neural networks trained on over 10,000 past project proposals to predict whether or not Mortenson would win the project, and if so how much money it would net.",
      "Researched EV charging station technology and prepared briefs for R&D team members to explore potential future projects.",
    ],
  },
  {
    year: "2018",
    last: true,
    org: "GroupLens Research",
    logo: "GroupLens.png",
    website: "https://grouplens.org/",
    title: "UI/UX Research Intern",
    timeframe: "June 2018 - August 2018",
    location: "Minneapolis, MN",
    description: `Spurred by cutting edge research into recommender systems in the 
      early 2000s, the GroupLens laboratory was founded at the University of Minnesota 
      to understand social computing problems. I worked for an offshoot of the lab 
      called MovieLens, which collects data about movie reviews for use in research. 
      Here's what's on my resume:`,
    bullets: [
      "Incrementally migrated movielens.org to Angular 2 without any downtime for tens of thousands of users.",
      "Worked with a team of two other engineers to develop a new feature allowing users to tag movies with short natural-language tags.",
    ],
  },
];
