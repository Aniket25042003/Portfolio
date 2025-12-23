import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Mic, PhoneOff } from "lucide-react";
import { useVoiceAgent } from "@/hooks/useVoiceAgent";

const About = () => {
  const { isVisible: isTextVisible, elementRef: textRef } = useScrollReveal();
  const { isVisible: isImageVisible, elementRef: imageRef } = useScrollReveal({ delay: 200 });
  
  const {
    isActive,
    isListening,
    isSpeaking,
    isProcessing,
    error,
    startSession,
    stopSession,
  } = useVoiceAgent();

  // Sound wave animation component
  // Yellow = User speaking/listening, Green = Agent speaking
  const SoundWave = ({ type }: { type: 'user' | 'agent' }) => (
    <div className="flex items-center gap-[2px] h-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`w-[3px] rounded-full ${
            type === 'user' ? 'bg-yellow-400' : 'bg-green-400'
          }`}
          animate={{
            height: ['6px', '18px', '10px', '16px', '6px'],
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.08,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );

  return (
    <section id="about" className="py-20 bg-navy-dark transition-all duration-300">
      <div className="container mx-auto px-6">
        <SectionTitle number="01." title="About Me" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={textRef}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isTextVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate dark:text-slate-light">
              Hi, I'm Aniket Patel, a senior majoring in Computer Science at Ashland University with Mathematics and Management Information Systems minors, where I currently serve as an AI/ML Researcher. I'm passionate about creating smart, scalable systems that blend software engineering, machine learning, and artifician intelligence to solve meaningful, real-world problems.
            </p>
            <p className="text-slate dark:text-slate-light">
              My academic and research interests lie at the intersection of applied AI, real-time systems, and hardware acceleration.
            </p>
            <p className="text-slate dark:text-slate-light">
              Here are a few technologies I've been working with recently:
            </p>

            <ul className="grid grid-cols-2 gap-2 text-slate dark:text-slate-light">
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Python
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> C++
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> AI Agents
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Machine Learning
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Deep Learning
              </li>
              <li className="flex items-center">
                <span className="text-green mr-2">▹</span> Hardware Accelerators
              </li>
            </ul>
          </motion.div>

          <motion.div
            ref={imageRef}
            className="relative group mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isImageVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 border-2 border-green rounded translate-x-5 translate-y-5 transition-transform group-hover:translate-x-4 group-hover:translate-y-4 duration-300"></div>
            <div className="relative rounded overflow-hidden">
              <img
                src="/assets/Aniket-Patel.jpeg"
                alt="Aniket Patel Profile Picture"
                className="rounded hover:filter hover:grayscale transition-all duration-300 h-80 w-80 object-cover"
              />
              <div className="absolute inset-0 bg-white/10 dark:bg-green/10 rounded"></div>
              
              {/* Voice Agent Button */}
              <AnimatePresence mode="wait">
                {!isActive ? (
                  <motion.button
                    key="start"
                    onClick={startSession}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 px-5 py-2 bg-primary/90 hover:bg-primary text-white rounded-full font-mono text-sm shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-primary/30 hover:shadow-xl h-9"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.3 }}
                    aria-label="Start voice conversation"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Mic className="h-3.5 w-3.5" />
                    </motion.div>
                    <span>Talk to Me</span>
                  </motion.button>
                ) : (
                  <motion.div
                    key="active"
                    className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {/* Container for positioning - End Call button is centered, animation is to its left */}
                    <div className="relative flex items-center">
                      {/* Speaking Animation - positioned to the LEFT of End Call button */}
                      <AnimatePresence>
                        {(isListening || isSpeaking || isProcessing) && (
                          <motion.div
                            className={`absolute right-full mr-2 flex items-center justify-center gap-2 px-5 py-2 rounded-full font-mono text-sm shadow-lg backdrop-blur-sm h-9 whitespace-nowrap ${
                              isListening 
                                ? 'bg-yellow-500/20 border border-yellow-400/50' 
                                : isSpeaking 
                                  ? 'bg-green-500/20 border border-green-400/50' 
                                  : 'bg-blue-500/20 border border-blue-400/50'
                            }`}
                            initial={{ opacity: 0, x: 20, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                          >
                            {isProcessing ? (
                              <>
                                <motion.div
                                  className="w-2 h-2 bg-blue-400 rounded-full"
                                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                                  transition={{ duration: 0.8, repeat: Infinity }}
                                />
                                <span className="text-blue-400 text-xs">Thinking</span>
                              </>
                            ) : (
                              <>
                                <span className={`text-xs ${isListening ? 'text-yellow-400' : 'text-green-400'}`}>
                                  {isListening ? 'You' : 'AI'}
                                </span>
                                <SoundWave type={isListening ? 'user' : 'agent'} />
                              </>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* End Call Button - centered, same size and style as Talk to Me */}
                      <motion.button
                        onClick={stopSession}
                        className="flex items-center justify-center gap-2 px-5 py-2 bg-red-500/90 hover:bg-red-500 text-white rounded-full font-mono text-sm shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 h-9"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="End voice conversation"
                      >
                        <PhoneOff className="h-3.5 w-3.5" />
                        <span>End Call</span>
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Error toast */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/90 text-white text-xs rounded-lg backdrop-blur-sm whitespace-nowrap"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
