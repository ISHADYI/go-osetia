import { useState } from "react";
import Container from "./ui/Container";

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Игорь",
    text: "Пришел на встречу покататься на велосипедах - в итоге нашел хороших друзей, с которыми скоро поедем кататься в горы",
  },
  {
    id: 2,
    name: "Игорь",
    text: "Пришел на встречу покататься на велосипедах - в итоге нашел хороших друзей, с которыми скоро поедем кататься в горы",
  },
  {
    id: 3,
    name: "Игорь",
    text: "Пришел на встречу покататься на велосипедах - в итоге нашел хороших друзей, с которыми скоро поедем кататься в горы",
  },
  {
    id: 4,
    name: "Анна",
    text: "Отличная организация! Давно нашла компанию для походов по Осетии.",
  },
  { id: 5, name: "Алан", text: "Крутой формат, всё очень понравилось!" },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalDots = REVIEWS_DATA.length - 2;

  return (
    <section className="mb-20">
      <Container>
        <h2 className="title-underline text-black mb-10">Отзывы</h2>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / 3)}% - ${currentIndex * (24 / 3)}px))`,
            }}
          >
            {REVIEWS_DATA.map((review) => (
              <div
                key={review.id}
                className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]"
              >
                <div className="bg-white border border-gray-200 rounded-[40px] p-8 h-full min-h-[250px] flex flex-col shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#F15431] rounded-full shrink-0" />
                    <span className="text-xl font-bold text-[#0F0F10]">
                      {review.name}
                    </span>
                  </div>
                  <p className="text-[#0F0F10] leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8 mb-4">
          {Array.from({ length: totalDots > 0 ? totalDots : 1 }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-[#F15431]"
                    : "w-2 bg-gray-300"
                }`}
              />
            ),
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <button className="bg-[#E9E9E9] text-[#0F0F10] py-4 rounded-full font-semibold hover:bg-gray-300 transition-colors cursor-pointer">
            Смотреть все
          </button>
          <button className="bg-[#F15431] text-white py-4 rounded-full font-semibold hover:bg-[#d44324] transition-colors shadow-lg cursor-pointer">
            Написать отзыв
          </button>
        </div>
      </Container>
    </section>
  );
}
