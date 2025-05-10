import type { TimelineItemProps } from "@/components/ui/TimelineItem";

export const experienceData: TimelineItemProps[] = [
  {
    title: "Senior Software Engineer",
    company: "Acme Inc.",
    period: "2021 - Present",
    responsibilities: [
      "Led the development of a React-based dashboard that increased client engagement by 40%",
      "Architected and implemented a microservices infrastructure using Node.js and Docker",
      "Mentored junior developers and conducted code reviews to ensure quality and best practices"
    ],
    technologies: ["React", "Node.js", "AWS", "TypeScript"]
  },
  {
    title: "Frontend Developer",
    company: "TechStart Inc.",
    period: "2019 - 2021",
    responsibilities: [
      "Developed responsive web applications using React and Redux",
      "Collaborated with designers to implement pixel-perfect UIs and smooth animations",
      "Improved application performance by 30% through code optimization and lazy loading"
    ],
    technologies: ["React", "Redux", "SCSS", "JavaScript"]
  },
  {
    title: "Software Engineering Intern",
    company: "Google",
    period: "Summer 2018",
    responsibilities: [
      "Worked on the Chrome DevTools team to improve developer experience",
      "Implemented new features for the Network panel to better visualize HTTP requests",
      "Contributed to open-source projects and fixed several bugs in the Chromium codebase"
    ],
    technologies: ["JavaScript", "C++", "DevTools"]
  }
];
