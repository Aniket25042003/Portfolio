import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

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
  return (
    <motion.div
      className="project-card group"
      data-categories={category.toLowerCase()}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-navy shadow-md rounded-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={`${title} Project`}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-green rounded-full px-3 py-1 text-xs font-mono text-navy">
            {category}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{title}</h3>
          <p className="text-slate dark:text-slate-light mb-4 flex-grow">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-slate/10 dark:bg-slate-dark/20 text-slate dark:text-slate-light px-2 py-1 rounded font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between mt-auto">
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:underline font-mono text-sm flex items-center gap-1"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Live Demo</span>
            </a>
            <a
              href={source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:underline font-mono text-sm flex items-center gap-1"
            >
              <Github className="h-4 w-4" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
