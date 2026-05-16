import React, { useState } from "react";
import Container from "../components/ui/Container";
import ButtonLink from "../components/ui/ButtonLink";

const SLIDES_DATA = [
  {
    id: 1,
    title: "Более 150 организованных встреч",
    text: "Люди используют Go-Ossetia для знакомств, организации встреч по интересам, поиска друзей, выхода из зоны комфорта и преследования своих увлечений вместе.",
  },
  {
    id: 2,
    title: "500+ активных участников",
    text: "Наше сообщество растет каждый день. Присоединяйтесь к классным ребятам со всего Владикавказа, чтобы круто проводить вечера и выходные.",
  },
  {
    id: 3,
    title: "Открывай новые места",
    text: "Мы помогаем не только находить компанию, но и открывать крутые локации: уютные коворкинги, новые тайные кофейни и живописные горные маршруты.",
  },
];

export function AboutUs() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === SLIDES_DATA.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES_DATA.length - 1 : prev - 1));
  };

  return (
    <div className="mb-40 mt-[60px]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          {/* левая часть */}
          <div>
            <h1 className="text-black mb-7.5">
              Go-Ossetia создает возможности для поиска и создания местных
              сообществ
            </h1>
            <p className="mb-7.5 text-black/80">
              Люди используют Go-Ossetia для знакомств, организации встречь по
              интересам, поиска друзей, выхода из зоны комфорта и преследования
              своих увлечений вместе.
            </p>
            <div className="flex items-center gap-5">
              <ButtonLink href="#" text="Найти встречу" variant="orangeFill" />
              <ButtonLink href="#" text="Создать встречу" variant="blackFill" />
            </div>
          </div>

          {/* правая часть */}
          <div className="relative w-full">
            <div className="overflow-hidden rounded-[22px] border border-black bg-gray-200 aspect-[4/3] lg:aspect-auto">
              <img
                src="/images/aboutUs/hero.png"
                alt="Go-Ossetia Community"
                className="w-full h-full object-cover"
              />
            </div>

            <img
              src="/images/stickers/more-walk.png"
              alt="Стикер Больше гуляй"
              className="absolute top-3 -left-10 z-10 w-28 h-28 object-contain drop-shadow-md select-none"
            />

            <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[460px] bg-white border border-black rounded-[22px] px-[40px] py-[20px] z-10 transition-all duration-300">
              <h3 className="font-bold text-lg text-black mb-2 transition-all">
                {SLIDES_DATA[currentSlide].title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 min-h-[72px]">
                {SLIDES_DATA[currentSlide].text}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
