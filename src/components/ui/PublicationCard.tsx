import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";

export interface PublicationCardProps {
  title: string;
  link: string;
  journal?: string;
  year?: string;
  description?: string;
}

const PublicationCard = ({
  title,
  link,
  journal,
  year,
  description,
}: PublicationCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-navy shadow-md rounded-lg overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 flex flex-col flex-grow">
        {/* Publication icon */}
        <div className="flex items-center mb-4">
          <div className="p-2 bg-primary/10 rounded-lg mr-3">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <div className="flex flex-col">
            {journal && (
              <span className="text-xs font-mono text-slate dark:text-slate-light uppercase tracking-wide">
                {journal}
              </span>
            )}
            {year && (
              <span className="text-sm font-semibold text-primary">
                {year}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-navy dark:text-white mb-3 leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-slate dark:text-slate-light text-sm mb-4 flex-grow leading-relaxed">
            {description}
          </p>
        )}

        {/* Link */}
        <div className="mt-auto">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded font-mono text-sm hover:bg-primary/90 transition-colors duration-200 group-hover:shadow-lg"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Read Paper</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default PublicationCard;
