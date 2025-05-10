import { motion } from "framer-motion";

interface SectionTitleProps {
  number: string;
  title: string;
}

const SectionTitle = ({ number, title }: SectionTitleProps) => {
  return (
    <motion.h2 
      className="section-title flex items-center text-2xl font-bold mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-green font-mono mr-2">{number}</span>
      <span className="dark:text-white">{title}</span>
      <span className="h-px bg-slate/20 dark:bg-slate-light/20 w-32 ml-4"></span>
    </motion.h2>
  );
};

export default SectionTitle;
