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
      className={`project-card group bg-white dark:bg-navy shadow-md hover:shadow-xl rounded-lg overflow-hidden flex flex-col relative transition-shadow duration-300 ${isExpanded ? 'z-20' : 'z-10'}`}
      data-categories={category.toLowerCase()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      layout
    >
      <motion.div 
        layout="position"
        className="relative overflow-hidden cursor-pointer"
        onClick={!isExpanded ? toggleExpand : undefined}
      >
        <motion.img
          layout="position"
          src={image}
          alt={`${title} Project`}
          className={`w-full object-cover transition-all duration-300 ${isExpanded ? 'h-64' : 'h-48 group-hover:scale-105'}`}
        />
        <motion.div 
          layout="position"
          className={`absolute top-3 ${isExpanded ? 'left-3' : 'right-3'} bg-blue-500 rounded-full px-3 py-1 text-xs font-mono text-white z-20`}
        >
          {category}
        </motion.div>

        {/* Close button for expanded view */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
              className="absolute top-3 right-3 z-30 bg-blue-500/10 hover:bg-blue-500/30 rounded-full p-1 text-blue-500 transition-colors duration-200 bg-white/80 dark:bg-navy/80 backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div layout="position" className="p-6 flex flex-col flex-grow">
        <motion.h3 
          layout="position" 
          className={`font-bold text-navy dark:text-white ${isExpanded ? 'text-2xl mb-4' : 'text-xl mb-2'} ${!isExpanded ? 'cursor-pointer' : ''}`}
          onClick={!isExpanded ? toggleExpand : undefined}
        >
          {title}
        </motion.h3>
        
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-slate dark:text-slate-light mb-6">{description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs bg-slate/10 dark:bg-slate-dark/20 text-slate dark:text-slate-light px-3 py-1 rounded-full font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          layout="position" 
          className={`flex justify-between items-center mt-auto ${isExpanded ? 'pt-4 border-t border-slate/10 dark:border-slate-dark/10' : ''}`}
        >
          {isExpanded ? (
            <>
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded font-mono text-sm flex items-center gap-2 hover:bg-blue-500/90 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Live Demo</span>
              </a>
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded font-mono text-sm flex items-center gap-2 hover:bg-blue-500/10 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
                <span>Source Code</span>
              </a>
            </>
          ) : (
            <>
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded font-mono text-sm flex items-center gap-2 hover:bg-blue-500/10 transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-4 w-4" />
                <span>Source</span>
              </a>
              <button
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded font-mono text-sm flex items-center gap-2 hover:bg-blue-500/10 transition-colors duration-200"
                onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
              >
                <span>Details</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
