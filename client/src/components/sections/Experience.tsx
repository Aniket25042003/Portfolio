import SectionTitle from "../ui/SectionTitle";
import TimelineItem from "../ui/TimelineItem";
import { experienceData } from "@/data/experienceData";

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white/50 dark:bg-navy-light/30 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="04." title="Experience" />

        <div className="relative mx-auto max-w-3xl pl-8 border-l-2 border-green">
          {experienceData.map((experience, index) => (
            <TimelineItem
              key={index}
              title={experience.title}
              company={experience.company}
              period={experience.period}
              responsibilities={experience.responsibilities}
              technologies={experience.technologies}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
