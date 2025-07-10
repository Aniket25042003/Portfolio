import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  percentage: number;
}

const SkillBar = ({ name, percentage }: SkillBarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const skillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current);
      }
    };
  }, []);

  return (
    <div className="skill-item" ref={skillRef}>
      <div className="flex justify-between mb-2">
        <span className="font-mono text-navy dark:text-slate-light">{name}</span>
        <span className="font-mono text-green">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate/20 dark:bg-slate-dark/40 rounded-full overflow-hidden">
        <motion.div
          className="bg-green h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${percentage}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
