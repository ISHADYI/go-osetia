// src/components/ui/CategoryCard.jsx
import React from "react";

export default function CategoryCard({ title, count, today, image, isActive }) {
  return (
    <div
      className={`min-w-[280px] md:min-w-[350px] aspect-4/3 snap-center rounded-3xl overflow-hidden relative transition-all duration-500 ease-out shrink-0 select-none cursor-pointer ${
        isActive ? "scale-105 z-10 shadow-md" : "scale-95"
      }`}
    >
      <img
        src={image}
        className="w-full h-full object-cover"
        alt={title}
        draggable="false"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
        <h3 className="text-xl font-bold font-body">{title}</h3>
        <p className="text-sm opacity-80 font-body">
          {count} встреч • {today} сегодня
        </p>
      </div>
    </div>
  );
}
