import React, { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://i.ibb.co/jvT6VTGV/man-wearing-orange-gloves-collecting-garbage-black-bag.jpg",
    title: "Keep Our Community Clean",
    subtitle: "Report garbage and make your area pollution-free.",
  },
  {
    id: 2,
    image:
      "https://i.ibb.co/Z1FfW4fv/2006-i602-009-volunteers-trash-out-flat.jpg",
    title: "Join the Clean-Up Drive",
    subtitle: "Be a part of the movement to build a sustainable future.",
  },
  {
    id: 3,
    image: "https://i.ibb.co/m3588qC/Manpower-Supply54.jpg",
    title: "Together for Sustainability",
    subtitle: "Take action to protect public spaces and the environment.",
  },
];

const BannerSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[60vh] overflow-hidden shadow-md">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#0a0a0aa9]   bg-opacity-50"></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4 animate-fade-in">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-200 font-medium max-w-2xl animate-fade-in delay-200">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-green-500 scale-125" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default BannerSection;
