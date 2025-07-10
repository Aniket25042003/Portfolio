import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-slate/10 dark:border-slate-dark/10 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="#" className="text-xl font-mono font-bold text-navy dark:text-green">
              <span className="text-green">&lt;</span>AP/
              <span className="text-green">&gt;</span>
            </a>
          </div>

          <p className="text-slate dark:text-slate-light text-sm">
            Designed & Built by Aniket Patel © {new Date().getFullYear()}
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://github.com/Aniket25042003"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate dark:text-slate-light hover:text-green dark:hover:text-green transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/aniketpatel2003/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate dark:text-slate-light hover:text-green dark:hover:text-green transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/@Aniket60503436"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate dark:text-slate-light hover:text-green dark:hover:text-green transition-colors duration-200"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;