import type { ProjectCardProps } from "@/components/ui/ProjectCard";

export const projectsData: ProjectCardProps[] = [
  {
    title: "Analytics Dashboard",
    description: "A comprehensive analytics dashboard built with React, Chart.js, and a Node.js backend.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    category: "Web",
    demo: "https://example.com/analytics-dashboard",
    source: "https://github.com/johndoe/analytics-dashboard",
    technologies: ["React", "Node.js", "Chart.js"]
  },
  {
    title: "Fitness Tracker",
    description: "A mobile app for tracking workouts, nutrition, and fitness goals built with React Native.",
    image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    category: "Mobile",
    demo: "https://example.com/fitness-tracker",
    source: "https://github.com/johndoe/fitness-tracker",
    technologies: ["React Native", "Firebase", "Expo"]
  },
  {
    title: "Image Recognition API",
    description: "A machine learning API that identifies objects in images using TensorFlow and Flask.",
    image: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    category: "AI",
    demo: "https://example.com/image-recognition-api",
    source: "https://github.com/johndoe/image-recognition-api",
    technologies: ["Python", "TensorFlow", "Flask"]
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with Next.js, Stripe integration, and a headless CMS.",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=450",
    category: "Web",
    demo: "https://example.com/ecommerce-platform",
    source: "https://github.com/johndoe/ecommerce-platform",
    technologies: ["Next.js", "Stripe", "Sanity.io"]
  }
];
