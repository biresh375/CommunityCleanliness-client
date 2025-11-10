import React from "react";
import { FaTrash, FaBuilding, FaRoad, FaTools } from "react-icons/fa";

const CategorySection = () => {
  const categories = [
    {
      title: "Garbage",
      icon: <FaTrash className="text-4xl text-white drop-shadow-md" />,
      bg: "https://i.ibb.co/b5xCN9Qw/garbage.jpg",
    },
    {
      title: "Illegal Construction",
      icon: <FaBuilding className="text-4xl text-white drop-shadow-md" />,
      bg: "https://i.ibb.co/fd9mCzq9/illigal-Construction.jpg",
    },
    {
      title: "Broken Public Property",
      icon: <FaTools className="text-4xl text-white drop-shadow-md" />,
      bg: "https://i.ibb.co/27H2v9Yk/Broken-Public-Property.jpg",
    },
    {
      title: "Road Damage",
      icon: <FaRoad className="text-4xl text-white drop-shadow-md" />,
      bg: "https://i.ibb.co/vCQfFKS7/Road-Damage.jpg",
    },
  ];

  return (
    <section className="py-10 ">
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${category.bg})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-[#0a0a0aa9] bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-48 text-[#F9F8F6] text-center px-4 ">
                <div className="mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold ">{category.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
