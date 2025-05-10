import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { skillsData } from "@/data/skillsData";
import * as SiIcons from "react-icons/si";
import { useState } from "react";

// Component for individual tech stack item with animation
const TechItem = ({ name, icon, color, index }: { name: string, icon: string, color: string, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Dynamically import icon from react-icons
  const IconComponent = (SiIcons as any)[icon];
  
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-navy p-5 rounded-lg shadow-md text-center group-hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Background glow effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
          style={{ backgroundColor: color, filter: 'blur(20px)' }}
        />
        
        <div className="relative z-10">
          {IconComponent && (
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  y: isHovered ? [0, -5, 0] : 0,
                  scale: isHovered ? [1, 1.1, 1] : 1,
                  rotate: isHovered ? [0, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                style={{ color: color }}
                className="text-5xl mb-2"
              >
                <IconComponent />
              </motion.div>
            </div>
          )}
          
          <p className="font-medium text-navy dark:text-white">{name}</p>
        </div>
        
        {/* Decorative elements */}
        <motion.div
          className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          style={{ backgroundColor: color }}
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatType: "reverse" }}
        />
      </div>
    </motion.div>
  );
};

// Component for skill category
const SkillCategory = ({ title, skills }: { title: string, skills: any[] }) => {
  return (
    <motion.div
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-navy dark:text-white mb-6 flex items-center">
        <div className="h-1 w-6 bg-primary mr-3"></div>
        {title}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <TechItem
            key={`${title}-${index}`}
            name={skill.name}
            icon={skill.icon}
            color={skill.color}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white/50 dark:bg-navy-light/30 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="05." title="Skills" />

        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <SkillCategory title="Programming Languages" skills={skillsData.frontendSkills} />
            <SkillCategory title="Frontend Technologies" skills={skillsData.backendSkills} />
            <SkillCategory title="Backend & Cloud" skills={skillsData.toolsSkills} />
            <SkillCategory title="AI, ML & Database Tools" skills={skillsData.otherSkills} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
