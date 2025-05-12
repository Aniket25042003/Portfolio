import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { 
  GraduationCap, 
  CalendarDays,
  MapPin 
} from "lucide-react";

const Education = () => {
  const educationData = [
    {
      degree: "B.S. Computer Science",
      school: "Ashland University",
      location: "Ashland, OH",
      period: "2024-2026",
      description: "Minors: Mathematics, Management Information Systems, Honors Program.\nI am currently pursuing a Bachelor of Science in Computer Science at Ashland University, where I am also involved in the Honors Program. I am also actively engaged in research related to artificial intelligence and machine learning."
    },
    {
      degree: "B.S. Computer Science",
      school: "Wilkes University",
      location: "Wilkes-Barre, PA",
      period: "2022-2024",
      description: "Minor: Honors Program.\nI studied Computer Science at Wilkes University, where I was actively involved in the Honors Program. During my time there, I gained valuable knowledge and skills in various areas of computer science, including programming, algorithms, and software development."
    }
  ];

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: (i: number) => ({ 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        delay: i * 0.2,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="education" className="py-20 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="02." title="Education" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1"></div>
              <div className="bg-white dark:bg-navy p-6 rounded-lg shadow-md relative z-10 transform transition-transform duration-300 group-hover:-rotate-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-navy dark:text-white">{item.degree}</h3>
                </div>
                
                <h4 className="text-lg font-bold text-navy-light dark:text-slate-light mb-2">{item.school}</h4>
                
                <div className="flex items-center text-slate gap-2 mb-1">
                  <CalendarDays className="h-4 w-4 text-primary/70" />
                  <span className="text-sm">{item.period}</span>
                </div>
                
                <div className="flex items-center text-slate gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary/70" />
                  <span className="text-sm">{item.location}</span>
                </div>
                
                <p className="text-slate dark:text-slate-light whitespace-pre-line">{item.description}</p>
                
                <div className="absolute -bottom-3 -right-3 h-20 w-20 bg-primary/10 rounded-full filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;