import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import SkillBar from "../ui/SkillBar";
import { skillsData } from "@/data/skillsData";
import { 
  Database, 
  Server, 
  LayoutGrid, 
  Smartphone, 
  GitBranch, 
  Brain 
} from "lucide-react";

const SkillIcon = ({ name }: { name: string }) => {
  switch (name.toLowerCase()) {
    case "mongodb":
      return <Database className="h-8 w-8 mb-2 text-green" />;
    case "aws":
      return <Server className="h-8 w-8 mb-2 text-green" />;
    case "docker":
      return <LayoutGrid className="h-8 w-8 mb-2 text-green" />;
    case "react native":
      return <Smartphone className="h-8 w-8 mb-2 text-green" />;
    case "git":
      return <GitBranch className="h-8 w-8 mb-2 text-green" />;
    case "machine learning":
      return <Brain className="h-8 w-8 mb-2 text-green" />;
    default:
      return <Database className="h-8 w-8 mb-2 text-green" />;
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-white/50 dark:bg-navy-light/30 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="02." title="Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div data-skill-container className="space-y-8">
            {skillsData.skillBars.map((skill, index) => (
              <SkillBar 
                key={index} 
                name={skill.name} 
                percentage={skill.percentage} 
              />
            ))}
          </div>

          <div className="space-y-8">
            <motion.h3 
              className="text-xl font-bold dark:text-white mb-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Other Skills & Tools
            </motion.h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              {skillsData.otherSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="skill-tag p-4 bg-white dark:bg-navy shadow rounded-lg text-center hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SkillIcon name={skill} />
                  <p className="font-mono text-sm text-navy dark:text-slate-light">
                    {skill}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="p-6 bg-white dark:bg-navy shadow rounded-lg mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="font-bold text-navy dark:text-white mb-4">Education</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="font-mono text-green">2016-2020</div>
                  <div>
                    <h5 className="font-bold text-navy dark:text-white">Stanford University</h5>
                    <p className="text-slate">B.S. Computer Science</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="font-mono text-green">2020-2021</div>
                  <div>
                    <h5 className="font-bold text-navy dark:text-white">MIT</h5>
                    <p className="text-slate">M.S. Computer Science</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
