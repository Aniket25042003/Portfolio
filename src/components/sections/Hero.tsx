import { HeroLampContainer } from "@/components/ui/lamp";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
    >
      <HeroLampContainer className="bg-navy-dark dark:bg-navy-dark" />
    </section>
  );
};

export default Hero;