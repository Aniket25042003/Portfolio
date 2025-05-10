import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  demo: string;
  source: string;
  technologies: string[];
}

const ProjectCard = ({
  title,
  description,
  image,
  category,
  demo,
  source,
  technologies,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Split the description into a short preview and full description
  const shortDescription = description.length > 60 
    ? description.substring(0, 60) + '...' 
    : description;

  return (
    <motion.div
      className="project-card group"
      data-categories={category.toLowerCase()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      layout
    >
      {/* Collapsed card (default view) */}
      {!isExpanded && (
        <motion.div 
          className="bg-white dark:bg-navy shadow-md rounded-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer relative"
          onClick={toggleExpand}
          layout
        >
          <div className="relative overflow-hidden">
            <img
              src={image}
              alt={`${title} Project`}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3 bg-primary rounded-full px-3 py-1 text-xs font-mono text-white">
              {category}
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{title}</h3>
            
            <div className="flex justify-between items-center mt-auto">
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-mono text-sm flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
                <span>Source</span>
              </a>
              <button
                className="text-primary font-mono text-sm flex items-center gap-1"
                onClick={toggleExpand}
              >
                <span>Details</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/80 dark:from-navy/80 to-transparent pointer-events-none"></div>
        </motion.div>
      )}

      {/* Expanded card (full details) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="bg-white dark:bg-navy shadow-xl rounded-lg overflow-hidden flex flex-col relative z-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            layout
          >
            <button 
              onClick={toggleExpand}
              className="absolute top-3 right-3 z-10 bg-primary/10 hover:bg-primary/20 rounded-full p-1 text-primary transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden">
              <img
                src={image}
                alt={`${title} Project`}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 left-3 bg-primary rounded-full px-3 py-1 text-xs font-mono text-white">
                {category}
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">{title}</h3>
              
              <p className="text-slate dark:text-slate-light mb-6">{description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-xs bg-slate/10 dark:bg-slate-dark/20 text-slate dark:text-slate-light px-3 py-1 rounded-full font-mono"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate/10 dark:border-slate-dark/10">
                <a
                  href={demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-primary text-white rounded font-mono text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Live Demo</span>
                </a>
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-primary text-primary rounded font-mono text-sm flex items-center gap-2 hover:bg-primary/10 transition-colors duration-200"
                >
                  <Github className="h-4 w-4" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectCard;
