import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import PublicationCard from "../ui/PublicationCard";
import { publicationsData } from "@/data/publicationsData";

const Publications = () => {
  return (
    <section id="publications" className="py-20 bg-white/50 dark:bg-navy-light/30 transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="05." title="Publications" />

        <div className="relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {publicationsData.map((publication, index) => (
                <PublicationCard key={index} {...publication} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
