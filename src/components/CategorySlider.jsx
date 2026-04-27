import Container from "./ui/Container";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function CategorySlider({ categories }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction == "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-20">
      <div className="text-center mb-10">
        <h2 className="title-underline text-black">
          Выбери встречу по интересам
        </h2>
      </div>

      <div className="relative group w-full">
        {/* Cписок категорий */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="min-w-70 md:min-w-87.5 aspect-4/3 snap-center rounded-3xl overflow-hidden relative"
            >
              <img
                src={cat.image}
                className="w-full h-full object-cover"
                alt={cat.title}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold">{cat.title}</h3>
                <p className="text-sm opacity-80">
                  {cat.count} встреч • {cat.today} сегодня
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => scroll("left")}
            className="p-2 border rounded-full hover:bg-gray-100 transition"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 border rounded-full hover:bg-gray-100 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
