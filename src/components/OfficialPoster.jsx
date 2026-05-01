import { useState } from "react";
import Container from "./ui/Container";
import OfficialPosterCard from "./ui/OfficialPosterCard";

const OFFICIALPOSTERS_DATA = [
  {
    id: 1,
    image: "/images/poster-1.jpg",
    tag: "Концерт",
    title: "Концерт в честь дня народного единства",
    date: "15 ноября, 17:00",
    location: "Проспект Мира, 34",
  },
  {
    id: 2,
    image: "/images/poster-2.png",
    tag: "Фестиваль",
    title: "Последние листья осени",
    date: "20 октября, 18:00",
    location: "Коворкинг, 44/46",
  },
  {
    id: 3,
    image: "/images/poster-3.jpg",
    tag: "Ярмарка",
    title: "Учитель и ученик",
    date: "15 ноября, 17:00",
    location: "Проспект Мира, 34",
  },
  {
    id: 4,
    image: "/images/poster-4.jpg",
    tag: "Кино",
    title: "Вечер кино во Владикавказе",
    date: "15 ноября, 18:00",
    location: "Главный зал",
  },
  {
    id: 5,
    image: "/images/poster-5.jpg",
    tag: "Кино",
    title: "Вечер кино во Владикавказе",
    date: "15 ноября, 18:00",
    location: "Главный зал",
  },
  {
    id: 6,
    image: "/images/poster-5.jpg",
    tag: "Кино",
    title: "Вечер кино во Владикавказе",
    date: "15 ноября, 18:00",
    location: "Главный зал",
  },
];

export function OfficialPoster() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const step = 315 + 24;

  return (
    <section className="relative w-full min-h-[650px] mb-20 overflow-hidden">
      <img
        src="/images/orange-bg.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <Container className="absolute pt-10">
        <h2 className="title-underline-white text-white mb-10">
          Официальная афиша города
        </h2>

        <div className="relative overflow-visible">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * step}px)` }}
          >
            {OFFICIALPOSTERS_DATA.map((poster) => (
              <OfficialPosterCard key={poster.id} {...poster} />
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {OFFICIALPOSTERS_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-10 bg-white shadow-lg"
                  : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
