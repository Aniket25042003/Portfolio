"use client";
import { IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect } from "react";

interface SlideData {
  title: string;
  button: string;
  src: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
  onViewCertificate: (slide: SlideData) => void;
}

const Slide = ({ slide, index, current, handleSlideClick, onViewCertificate }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const handleViewCertificate = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering slide click
    onViewCertificate(slide);
  };

  const { src, button, title } = slide;

  return (
    <div className="carousel-slide [perspective:1200px] [transform-style:preserve-3d] flex-shrink-0">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[min(70vmin,400px)] h-[min(70vmin,400px)] mx-2 sm:mx-4 z-10 cursor-pointer"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform:
            current !== index
              ? "scale(0.98) rotateX(8deg)"
              : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{
              opacity: current === index ? 1 : 0.5,
            }}
            alt={title}
            src={src}
            onLoad={imageLoaded}
            onError={(e) => {
              console.error('Failed to load certificate image:', e.currentTarget.src);
            }}
            loading="eager"
            decoding="sync"
          />
          {current === index && (
            <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
          )}
        </div>

        <article
          className={`relative p-4 sm:p-6 md:p-8 transition-opacity duration-1000 ease-in-out ${
            current === index ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <h2 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-semibold relative mb-4">
            {title}
          </h2>
          <div className="flex justify-center">
            <button 
              onClick={handleViewCertificate}
              className="px-3 py-2 sm:px-4 sm:py-2 w-fit mx-auto text-xs sm:text-sm text-black bg-white h-10 sm:h-12 border border-transparent flex justify-center items-center rounded-2xl hover:shadow-lg transition duration-200 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:scale-105 active:scale-95"
            >
              {button}
            </button>
          </div>
        </article>
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center mx-1 sm:mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${
        type === "previous" ? "rotate-180" : ""
      }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200 w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
};

// Certificate Modal Component
interface CertificateModalProps {
  isOpen: boolean;
  certificate: SlideData | null;
  onClose: () => void;
}

const CertificateModal = ({ isOpen, certificate, onClose }: CertificateModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative z-10 max-w-[95vw] max-h-[95vh] w-full flex items-center justify-center p-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
          title="Close certificate view"
        >
          <IconX className="w-6 h-6" />
        </button>

        {/* Certificate Image */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden max-w-full max-h-full">
          <img
            src={certificate.src}
            alt={certificate.title}
            className="w-auto h-auto max-w-full max-h-[85vh] object-contain"
            style={{
              minWidth: '300px',
              minHeight: '200px'
            }}
          />
          
          {/* Certificate Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h3 className="text-white text-xl font-semibold">{certificate.title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [selectedCertificate, setSelectedCertificate] = useState<SlideData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) {
      setCurrent(index);
    }
  };

  const handleViewCertificate = (slide: SlideData) => {
    setSelectedCertificate(slide);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  const id = useId();

  return (
    <>
      <div className="carousel-container w-full max-w-6xl mx-auto px-4 py-8">
        <div
          className="relative w-full max-w-[min(90vw,500px)] mx-auto overflow-hidden"
          aria-labelledby={`carousel-heading-${id}`}
        >
          {/* Carousel viewport with proper overflow handling */}
          <div className="overflow-hidden relative">
            <ul
              className="carousel-list flex transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / slides.length)}%)`,
                width: `${slides.length * 100}%`,
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex justify-center items-center"
                  style={{ width: `${100 / slides.length}%` }}
                >
                  <Slide
                    slide={slide}
                    index={index}
                    current={current}
                    handleSlideClick={handleSlideClick}
                    onViewCertificate={handleViewCertificate}
                  />
                </div>
              ))}
            </ul>
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center w-full mt-6 sm:mt-8">
            <CarouselControl
              type="previous"
              title="Go to previous slide"
              handleClick={handlePreviousClick}
            />

            <CarouselControl
              type="next"
              title="Go to next slide"
              handleClick={handleNextClick}
            />
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  current === index 
                    ? "bg-primary scale-125" 
                    : "bg-gray-400 hover:bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isModalOpen}
        certificate={selectedCertificate}
        onClose={handleCloseModal}
      />
    </>
  );
}
