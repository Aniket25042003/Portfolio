import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { GooeyNav } from "@/components/ui/gooey-nav";

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

  // Smooth scroll function for mobile menu
  const smoothScrollTo = (targetId: string) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    closeMobileMenu();
    
    if (href.startsWith('#')) {
      smoothScrollTo(href);
    }
  };

  // Navigation items for the gooey nav
  const navItems = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-navy-dark/95 backdrop-blur-md border-b border-primary/20" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#hero');
            }}
            className="text-2xl font-mono font-bold text-white z-10 relative"
          >
            <span className="text-primary">&lt;</span>AP
            <span className="text-primary">&sol;&gt;</span>
          </a>

          {/* Desktop Navigation with GooeyNav */}
          <div className="hidden md:flex items-center space-x-8">
            <GooeyNav
              items={navItems}
              particleCount={12}
              particleDistances={[70, 8]}
              particleR={80}
              initialActiveIndex={0}
              animationTime={500}
              timeVariance={200}
            />
            
            {/* Resume Button */}
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 font-mono text-sm backdrop-blur-sm"
            >
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="md:hidden text-white hover:bg-primary/20"
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
        className={`md:hidden bg-navy-dark/95 backdrop-blur-md border-b border-primary/20 py-4 px-6 transition-all duration-300 ${
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-4">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => handleMobileNavClick(e, item.href)}
              className="text-slate hover:text-primary dark:text-slate-light dark:hover:text-primary transition-colors duration-200 font-mono text-sm py-2 px-4 rounded hover:bg-primary/10"
            >
              {item.label}
            </a>
          ))}
          <div className="flex justify-between items-center pt-2 border-t border-slate/20 dark:border-slate-dark/20">
            <a
              href="/assets/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
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