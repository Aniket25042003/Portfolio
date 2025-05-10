import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import ProjectCard from "../ui/ProjectCard";
import { projectsData } from "@/data/projectsData";
import { Github } from "lucide-react";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filteredProjects = activeFilter === "all"
    ? projectsData
    : projectsData.filter(project => 
        project.category.toLowerCase() === activeFilter.toLowerCase()
      );

  return (
    <section id="projects" className="py-20 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="04." title="Projects" />

        <div className="filter-buttons flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => handleFilterClick("all")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "all"
                ? "bg-primary bg-opacity-10 text-white"
                : "bg-slate bg-opacity-10 text-white hover:bg-primary hover:bg-opacity-10"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterClick("web")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "web"
                ? "bg-primary bg-opacity-10 text-white"
                : "bg-slate bg-opacity-10 text-white hover:bg-primary hover:bg-opacity-10"
            }`}
          >
            Web
          </button>
          <button
            onClick={() => handleFilterClick("mobile")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "mobile"
                ? "bg-primary bg-opacity-10 text-white"
                : "bg-slate bg-opacity-10 text-white hover:bg-primary hover:bg-opacity-10"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => handleFilterClick("ai")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "ai"
                ? "bg-primary bg-opacity-10 text-white"
                : "bg-slate bg-opacity-10 text-white hover:bg-primary hover:bg-opacity-10"
            }`}
          >
            AI
          </button>
          <button
            onClick={() => handleFilterClick("data")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "data"
                ? "bg-primary bg-opacity-10 text-white"
                : "bg-slate bg-opacity-10 text-white hover:bg-primary hover:bg-opacity-10"
            }`}
          >
            Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/Aniket25042003"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-mono"
          >
            <Github className="h-5 w-5" />
            See more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
