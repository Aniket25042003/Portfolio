import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { Carousel } from "../ui/carousel";

const Certificates = () => {
  const certificateSlides = [
    {
      title: "Machine Learning Specialization",
      button: "View Certificate",
      src: "/certificates/machine-learning-specialization.jpg",
    },
    {
      title: "Advanced Learning Algorithms",
      button: "View Certificate", 
      src: "/certificates/advanced-learning-algorithms.jpg",
    },
    {
      title: "Supervised Machine Learning",
      button: "View Certificate",
      src: "/certificates/supervised-machine-learning-regression-and-classification.jpg",
    },
    {
      title: "Building Code Agents with Hugging Face",
      button: "View Certificate",
      src: "/certificates/building-code-agents-with-hugging-face-smolagents.png",
    },
    {
      title: "Serverless Agentic Workflows - AWS Bedrock",
      button: "View Certificate",
      src: "/certificates/serverless-agentic-workflows-with-amazon-bedrock.png",
    },
    {
      title: "Multi AI Agent Systems with crewAI",
      button: "View Certificate",
      src: "/certificates/multi-ai-agent-systems-with-crewai.png",
    },
    {
      title: "Building AI Browser Agents",
      button: "View Certificate",
      src: "/certificates/BuildingAI-Browser-Agents.png",
    },
    {
      title: "EasyHacks 2025 - Participation",
      button: "View Achievement",
      src: "/certificates/EasyHacks-certificate.png",
    },
    {
      title: "Screenpipe Agentic Hackathon",
      button: "View Achievement",
      src: "/certificates/screenpipe-agentic-hackathon-certificate.png",
    },
    {
      title: "Visionary Hackathon",
      button: "View Achievement", 
      src: "/certificates/visionary-certificate.png",
    },
    {
      title: "GPT Wrapper Hackathon - Nebius AI Studio",
      button: "View Achievement",
      src: "/certificates/gpt-wrapper-hackathon-sponsored-by-nebius-ai-studio-certificate.png",
    },
    {
      title: "EverydAI Challenge",
      button: "View Achievement",
      src: "/certificates/everydai-certificate.png",
    },
    {
      title: "Rebuild the OpenAI Tool Challenge",
      button: "View Achievement",
      src: "/certificates/rebuild-the-open-ai-tool-challenge-certificate.png",
    },
  ];

  return (
    <section id="certificates" className="py-32 bg-navy-dark transition-all duration-300 scroll-smooth">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <SectionTitle number="06." title="Certificates & Achievements" />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Clean Introduction */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-bold text-white mb-8 leading-tight">
              Continuous Learning & Recognition
            </h3>
            <p className="text-xl text-slate-light max-w-4xl mx-auto leading-relaxed">
              Professional certifications and achievements showcasing expertise in AI, machine learning, 
              and software development through coursework and competitive programming.
            </p>
          </motion.div>

          {/* Enhanced Carousel */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Carousel slides={certificateSlides} />
          </motion.div>

          {/* Refined Statistics Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-3">13+</div>
              <div className="text-slate-light text-sm font-mono uppercase tracking-wider">Total Achievements</div>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-3">7+</div>
              <div className="text-slate-light text-sm font-mono uppercase tracking-wider">Course Certificates</div>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-3">4+</div>
              <div className="text-slate-light text-sm font-mono uppercase tracking-wider">Hackathon Awards</div>
            </div>
            <div className="text-center p-8 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold text-white mb-3">3+</div>
              <div className="text-slate-light text-sm font-mono uppercase tracking-wider">Competition Wins</div>
            </div>
          </motion.div>

          {/* Subtle Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-300 font-mono text-lg hover:scale-105 transform"
            >
              Let's Collaborate
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certificates; 