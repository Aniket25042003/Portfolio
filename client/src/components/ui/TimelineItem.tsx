import { motion } from "framer-motion";

export interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
  technologies: string[];
  delay?: number;
}

const TimelineItem = ({
  title,
  company,
  period,
  responsibilities,
  technologies,
  delay = 0,
}: TimelineItemProps) => {
  return (
    <motion.div
      className="timeline-item relative mb-16"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-white dark:bg-navy shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
          <h3 className="text-xl font-bold text-navy dark:text-white">{title}</h3>
          <div className="flex items-center mt-2 md:mt-0">
            <span className="text-green font-mono">{period}</span>
          </div>
        </div>
        
        <h4 className="text-lg font-bold text-slate dark:text-slate-light mb-4">{company}</h4>
        
        <ul className="space-y-2 text-slate dark:text-slate-light">
          {responsibilities.map((responsibility, index) => (
            <li className="flex" key={index}>
              <span className="text-green mr-2">▹</span>
              <span>{responsibility}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-slate/10 dark:bg-slate-dark/20 text-slate dark:text-slate-light px-2 py-1 rounded font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;
