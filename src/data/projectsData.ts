import type { ProjectCardProps } from "@/components/ui/ProjectCard";

export const projectsData: ProjectCardProps[] = [

  {
    title: "Coursewiser",
    description: "Coursewiser is a course-specific AI teaching assistant designed to help students deeply understand their own class material. I fine-tuned LLaMA 3.2 3B on lecture slides, notes, and curated course resources so the model can reason within the exact context of a class rather than giving generic answers. The system uses a two-phase fine-tuning pipeline to first learn course semantics and then refine instruction-following behavior. It is deployed on AWS EC2 and delivered through a responsive React web app, with student feedback continuously improving answer quality over time.",
    image: "/assets/Coursewiser.png",
    category: "Web",
    demo: "https://github.com/Aniket25042003/coursewiser",
    source: "https://github.com/Aniket25042003/coursewiser",
    technologies: ["LLaMA 3.2 3B", "AWS EC2", "React", "Node.js", "TailwindCSS", "Firebase", "TensorFlow"]
  },
  {
    title: "Multimodal Theft Detection Agent",
    description: "This project explores how multimodal AI can improve real-time surveillance intelligence. The system combines object detection, motion understanding, and high-level reasoning to detect potential theft events more accurately than traditional vision-only pipelines. Instead of relying on single-frame detections, it analyzes object interactions over time and applies contextual reasoning to reduce false alerts. A FastAPI-based backend generates automated incident reports, significantly reducing the need for manual video review.",
    image: "/assets/MultimodalTheftDetectionAgent.png",
    category: "AI",
    demo: "https://github.com/Aniket25042003/multimodal-theft-detection-agent",
    source: "https://github.com/Aniket25042003/multimodal-theft-detection-agent",
    technologies: ["YOLOv8", "VideoMAE", "Multimodal LLM", "OpenCV", "FastAPI", "SQLite"]
  },
  {
    title: "Fathom",
    description: "Fathom is an AI-powered desktop data analysis tool built for privacy-conscious and offline workflows. It allows users to explore databases using natural language queries instead of writing SQL by hand. Behind the scenes, a hybrid AI + SQL pipeline translates user intent into structured queries and visualizes results through interactive charts. By running locally hosted language models via Ollama, Fathom keeps sensitive data on-device while still providing powerful, intuitive analytics.",
    image: "/assets/Fathom.png",
    category: "Web",
    demo: "https://github.com/Aniket25042003/fathom",
    source: "https://github.com/Aniket25042003/fathom",
    technologies: ["Electron", "React", "FastAPI", "TailwindCSS", "Typescript", "SQLAlchemy", "Plotly", "Ollama"]
  },
  {
    title: "Prepwiser",
    description: "Prepwiser is a web application designed to facilitate interview preparation and practice. It leverages real-time communication capabilities, AI-powered analysis, and interactive UI components to provide a comprehensive platform for users to enhance their interview skills. The application appears to integrate features like user authentication, real-time video/audio communication, interview recording, AI-driven analysis, and interactive UI elements.",
    image: "/assets/Prepwiser.png",
    category: "Web",
    demo: "https://prepwiser.net/",
    source: "https://github.com/Aniket25042003/prepify.git",
    technologies: ["LiveKit", "Tavus", "AI Agents", "Supabase", "JavaScript", "Gemini", "React", "Typescript", "Tailwind CSS"]
  },
  {
    title: "CodDoc",
    description: "CodDoc is an AI-powered tool that automatically generates professional README files for your GitHub repositories. Simply paste your repository URL, and watch as our advanced AI agents analyze your codebase to create comprehensive documentation.",
    image: "/assets/CodDoc.png",
    category: "Web",
    demo: "https://cod-doc.vercel.app/",
    source: "https://github.com/Aniket25042003/CodDoc.git",
    technologies: ["Next.js", "AI Agents", "JavaScript","Gemini", "React", "Typescript", "Tailwind CSS"]
  },
  {
    title: "MarketMinds",
    description: "MarketMinds is an AI-powered web application designed to simplify and automate product and market research. It leverages autonomous AI agents to provide actionable insights, competitor analysis, and strategic recommendations—all in one unified interface.",
    image: "/assets/MarketMinds.png",
    category: "Web",
    demo: "https://github.com/Aniket25042003/MarketMinds.git",
    source: "https://github.com/Aniket25042003/MarketMinds.git",
    technologies: ["Next.js", "CrewAI", "JavaScript","Gemini", "React", "Typescript", "Tailwind CSS"]
  },
  {
    title: "Historaai",
    description: "Historaai is a web application designed for school students to learn about the historic figures and events from those figures themselves. It uses AI avatars of those figures to talk and explain about their life and work.",
    image: "/assets/Historaai.png",
    category: "Web",
    demo: "https://histora.me",
    source: "https://github.com/Aniket25042003/Histora.ai.git",
    technologies: ["LiveKit", "Tavus", "AI Agents", "Supabase", "JavaScript", "Gemini", "React", "Typescript", "Tailwind CSS"]
  },
  {
    title: "Google Keep Clone",
    description: "A productivity-boosting Google Keep clone, integrating Nebius AI Studio and Tesseract OCR with 4+ AI tools, including LLaMA 3.2 for summaries, Flux schnell for text-to-image, and a responsive frontend built with HTML, CSS, JavaScript, and Node.js.",
    image: "/assets/GoogleKeepClone.png",
    category: "Web",
    demo: "https://google-note-clone.vercel.app/",
    source: "https://github.com/Aniket25042003/GoogleNote_Clone.git",
    technologies: ["HTML", "CSS", "JavaScript","Node.js", "LLaMA 3.2", "Tesseract OCR"]
  },
  {
    title: "MeetMate",
    description: "A cross-platform react-native Meeting Assistant app that boosts productivity by 30%, enabling real-time summarization and task generation using LLaMA 3.3 70B and Whisper models, with seamless data synchronization powered by Firestore.",
    image: "/assets/MeetMate.jpeg",
    category: "Mobile",
    demo: "https://github.com/Aniket25042003/MeetingAssistant.git",
    source: "https://github.com/Aniket25042003/MeetingAssistant.git",
    technologies: ["React Native", "Firebase", "Expo", "LLaMA 3.3 70B", "Whisper"]
  },
  {
    title: "ScreenGuard AI",
    description: "A real-time screen monitoring system that reduces inappropriate content exposure by 40%, using Gemini API for AI-driven analysis, ScreenPipe for tracking, and a Flask-powered backend with OCR-enhanced ML pipelines for 99% content classification accuracy.",
    image: "/assets/ScreenGuardAI.png",
    category: "AI",
    demo: "https://github.com/Aniket25042003/ScreenPipe_Visionify.git",
    source: "https://github.com/Aniket25042003/ScreenPipe_Visionify.git",
    technologies: ["HTML", "CSS", "JavaScript", "Flask", "Gemini API", "OCR"]
  },
  {
    title: "Multimodal RAG Model for PDFs",
    description: "A high-performance Retrieval-Augmented Generation pipeline that accelerates document processing by 60%, integrating LangChain, Pinecone, and Groq APIs for real-time, 95%-relevant insights and 35% improved query accuracy.",
    image: "/assets/RAG.png",
    category: "AI",
    demo: "https://github.com/Aniket25042003",
    source: "https://github.com/Aniket25042003",
    technologies: ["Python", "LangChain", "Pinecone", "Groq API"]
  },
  {
    title: "AI Research Paper Chatbot",
    description: "An AI-powered research assistant chatbot that helps researchers summarize and compare AI/ML papers using a fine-tuned LLaMA model, built with FastAPI, Angular, and PostgreSQL for seamless interaction and data handling.",
    image: "/assets/AIResearchChatbot.png",
    category: "AI",
    demo: "https://github.com/Aniket25042003",
    source: "https://github.com/Aniket25042003",
    technologies: ["Python", "FastAPI", "Angular", "PostgreSQL", "LLaMA"]
  },
  {
    title: "Intelligent Rock-Paper-Scissors Game",
    description: "An AI-powered Rock-Paper-Scissors game using MobileNetV2 and OpenCV for real-time gesture recognition with 96% accuracy, built for interactive computer vision learning and gameplay.",
    image: "/assets/RockPaperScissors.png",
    category: "AI",
    demo: "https://github.com/Aniket25042003/rock_paper_scissors.git",
    source: "https://github.com/Aniket25042003/rock_paper_scissors.git",
    technologies: ["Python", "OpenCV", "TensorFlow", "Flask"]
  },
  {
    title: "AgriScience",
    description: "A modern web application for agricultural assistance using AI-powered crop recommendations and plant disease detection.",
    image: "/assets/AgriScience.png",
    category: "AI",
    demo: "https://agriscience.vercel.app",
    source: "https://github.com/Aniket25042003/AgriScience-Web.git",
    technologies: ["Python", "TensorFlow", "Keras", "FastAPI", "React", "Typescript", "Tailwind CSS", "Random Forest", "CNN", "DenseNet121", "Scikit-learn"]
  },
  {
    title: "Amazon Sales Dashboard",
    description: "An interactive Amazon Sales Dashboard that delivers real-time insights from 250,000+ records using Pandas and Tableau, featuring KPIs like Total Sales, AOV, and Category Performance for data-driven decision-making.",
    image: "/assets/AmazonDashboard.png",
    category: "Data",
    demo: "https://github.com/Aniket25042003/Amazon_Sales_Dashboard.git",
    source: "https://github.com/Aniket25042003/Amazon_Sales_Dashboard.git",
    technologies: ["Python", "Pandas", "Tableau"]
  },
  {
    title: "E-commerce Price Tracker",
    description: "An E-commerce Price Tracker that monitors 10,000+ product listings using BeautifulSoup, Selenium, and SQL, helping users save 15% through trend analysis and a real-time Tableau dashboard.",
    image: "/assets/PriceTracker.png",
    category: "Data",
    demo: "https://github.com/Aniket25042003",
    source: "https://github.com/Aniket25042003",
    technologies: ["Python", "BeautifulSoup", "Selenium", "SQL", "Tableau"]
  },
  {
    title: "Ola Sales Analysis",
    description: "An Ola Sales Analysis app that optimizes sales insights, reducing query latency by 40%, enhances revenue forecasting by 25%, and improves data accuracy with SQL, Pandas, and Power BI dashboards.",
    image: "/assets/olasalesanalysis.png",
    category: "Data",
    demo: "https://github.com/Aniket25042003/OLA_Dashboard.git",
    source: "https://github.com/Aniket25042003/OLA_Dashboard.git",
    technologies: ["Python", "SQL", "Pandas", "Power BI"]
  },
  {
    title: "Crypto Tracker App",
    description: "A real-time Crypto Tracker App that boosts user engagement by 40%, integrating CoinGecko API with Kotlin for personalized watchlists, customizable alerts, and trend analysis for informed decision-making.",
    image: "/assets/cryptotracker.png",
    category: "Mobile",
    demo: "https://github.com/Aniket25042003",
    source: "https://github.com/Aniket25042003",
    technologies: ["Kotlin", "CoinGecko API"]
  },
  {
    title: "News Today App",
    description: "A dynamic News Today app that boosts user engagement by 50%, delivering real-time content via News API, with intuitive search, 7+ news categories, and optimized load times using Java.",
    image: "/assets/NewsTodayApp.png",
    category: "Mobile",
    demo: "https://github.com/Aniket25042003/NewsToday.git",
    source: "https://github.com/Aniket25042003/NewsToday.git",
    technologies: ["Java", "News API"]
  }
];
