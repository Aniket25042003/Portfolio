import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-navy-dark`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <a href="#hero" className="text-2xl font-mono font-bold text-white">
            <span className="text-primary">&lt;</span>AP
            <span className="text-primary">/&gt;</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
            >
              About
            </a>
            <a
              href="#education"
              className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
            >
              Education
            </a>
            <a
              href="#experience"
              className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
            >
              Contact
            </a>
            <a
              href="/assets/resume.pdf"
              className="px-4 py-2 rounded border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-mono text-sm"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-white"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-navy-dark py-4 px-6 transition-all duration-300 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-4">
          <a
            href="#about"
            onClick={closeMobileMenu}
            className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
          >
            About
          </a>
          <a
            href="#education"
            onClick={closeMobileMenu}
            className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
          >
            Education
          </a>
          <a
            href="#experience"
            onClick={closeMobileMenu}
            className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={closeMobileMenu}
            className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={closeMobileMenu}
            className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
          >
            Skills
          </a>
          <a
            href="#contact"
            onClick={closeMobileMenu}
            className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm"
          >
            Contact
          </a>
          <div className="flex justify-between items-center pt-2 border-t border-slate/20 dark:border-slate-dark/20">
            <a
              href="/resume.pdf"
              className="px-4 py-2 rounded border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-mono text-sm"
            >
              Resume
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
