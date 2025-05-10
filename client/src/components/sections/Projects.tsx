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
        <SectionTitle number="03." title="Projects" />

        <div className="filter-buttons flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => handleFilterClick("all")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "all"
                ? "bg-green bg-opacity-10 text-green"
                : "bg-slate bg-opacity-10 text-slate dark:text-slate-light hover:bg-green hover:bg-opacity-10 hover:text-green"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleFilterClick("web")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "web"
                ? "bg-green bg-opacity-10 text-green"
                : "bg-slate bg-opacity-10 text-slate dark:text-slate-light hover:bg-green hover:bg-opacity-10 hover:text-green"
            }`}
          >
            Web
          </button>
          <button
            onClick={() => handleFilterClick("mobile")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "mobile"
                ? "bg-green bg-opacity-10 text-green"
                : "bg-slate bg-opacity-10 text-slate dark:text-slate-light hover:bg-green hover:bg-opacity-10 hover:text-green"
            }`}
          >
            Mobile
          </button>
          <button
            onClick={() => handleFilterClick("ai")}
            className={`filter-btn px-4 py-2 rounded-full font-mono text-sm transition-colors duration-200 ${
              activeFilter === "ai"
                ? "bg-green bg-opacity-10 text-green"
                : "bg-slate bg-opacity-10 text-slate dark:text-slate-light hover:bg-green hover:bg-opacity-10 hover:text-green"
            }`}
          >
            AI
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
            href="https://github.com/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded border-2 border-green text-green hover:bg-green hover:bg-opacity-10 transition-all duration-200 font-mono"
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
