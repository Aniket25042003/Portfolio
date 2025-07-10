import type { TimelineItemProps } from "@/components/ui/TimelineItem";

export const experienceData: TimelineItemProps[] = [
  {
    title: "Mathematics and Computer Science Tutor",
    company: "Ashland University",
    period: "February 2025 - Present",
    responsibilities: [
      "Conduct one-on-one tutoring sessions for Computer Science and Mathematics courses, providing personalized academic support. ",
      "Currently tutoring MATH 224 (Discrete Mathematics II) and MATH 250 (Mathematical Proofs), helping students understand course material and improve problem-solving skills.",
      "Assist students by answering questions, clarifying difficult concepts, and working through practice exercises and assignments."
    ],
    technologies: ["Mathematics", "Computer Science"]
  },
  {
    title: "Game Operation Staff",
    company: "Ashland University",
    period: "February 2025 - Present",
    responsibilities: [
      "Assist with game operations during athletic competitions for Ashland University's Athletic Department, helping ensure events run smoothly and efficiently."
    ],
    technologies: ["Management", "Teamwork"]
  },
  {
    title: "AI/ML Researcher",
    company: "Ashland University",
    period: "August 2024 - Present",
    responsibilities: [
      "Led end-to-end development of an AI-driven agricultural IoT system improving crop selection by integrating real-time sensor data with a cross-platform React Native app and a Random Forest Classifier model.",
            "Designed an automated irrigation and disease detection module reducing water waste by 25% and achieving 98% disease detection accuracy by deploying an EfficientNetB7 model for image classification.",
      "Authored two forthcoming research papers by conducting comparative analyses of regression models and hardware accelerators (CPU,GPU, and TPU) for AI workloads.",
      "Delivered two conference presentations advancing academic visibility by showcasing hybrid CNN digit recognition models and plant disease detection frameworks at Ohio Academy of Science annual meetings"
    ],
    technologies: ["Machine Learning", "Deep Learning", "IoT", "Artificial Intelligence"]
  },
  {
    title: "Deep Learning Researcher",
    company: "Wilkes University",
    period: "Summer 2023",
    responsibilities: [
      "Researched and developed a deep learning model for predicting protein-protein interaction sites, focusing on advancing computational biology methods.",
      "Examined state-of-the-art models like DeepPPISP and D-PPIsite to benchmark performance and define areas for enhancement.",
      "Developed a custom deep learning model using TensorFlow and Python, achieving 15% higher accuracy than existing models.",
      "Performed data preprocessing, feature engineering, and model optimization to improve prediction reliability."
    ],
    technologies: ["Deep Learning"]
  }
];
