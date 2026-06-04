// src/components/CategoryGrid.jsx
import React from "react";
import { Link } from "react-router-dom";
import Container from "./ui/Container";

export function CategoryGrid({ categories }) {
  return (
    <section className="mb-20">
      <Container>
        <div className="text-center mb-10">
          <h2 className="title-underline text-black">
            Выбери встречу по интересам
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${encodeURIComponent(cat.title)}`}
              className="flex bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:transition-all duration-300 group"
            >
              <div className="w-28 sm:w-32 h-full min-h-[100px] shrink-0 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                <h3 className="text-lg font-bold text-black truncate group-hover:text-orange transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-black/60 mt-1 font-medium">
                  {cat.count} встреч •{" "}
                  <span className="text-orange">{cat.today} сегодня</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
