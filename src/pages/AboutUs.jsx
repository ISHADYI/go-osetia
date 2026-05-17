import React, { useState } from "react";
import Container from "../components/ui/Container";
import ButtonLink from "../components/ui/ButtonLink";
import Cta from "../components/Cta";

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
        {/* hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center mb-25">
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
                src="/images/aboutUs/hero.jpg"
                alt="Go-Ossetia Community"
                className="w-full h-full object-cover"
              />
            </div>

            <img
              src="/images/aboutUs/more-walk.png"
              alt="Стикер Больше гуляй"
              className="absolute top-4 -left-12 z-10 w-40 h-40 object-contain select-none"
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

        {/* о нас */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center">
          {/* левая часть */}
          <div>
            <h2 className="title-underline text-black mb-10">Про Go-Ossetia</h2>
            <p className="mb-2.5">
              Go-Ossetia — это платформа для живого общения и поиска
              единомышленников. Мы создали это пространство, чтобы помочь людям
              выбраться из онлайна и найти тех, кто разделит их увлечения — будь
              то утренняя велопрогулка по набережной, партия в шахматы в парке
              или творческий мастер-класс.
            </p>
            <p>
              Наша миссия — сделать так, чтобы во Владикавказе никто не
              чувствовал себя одиноким, а любое интересное начинание находило
              свою компанию. Мы верим, что самые яркие эмоции рождаются в
              реальных встречах.
            </p>
          </div>

          {/* правая часть */}
          <div className="relative">
            <div className="overflow-hidden rounded-[22px] border border-black aspect-[4/3] lg:aspect-auto">
              <img
                src="/images/aboutUs/people-about.jpg"
                alt="Группа людей"
                className="w-full h-full object-cover"
              />
            </div>

            <img
              src="/images/aboutUs/go-offline.png"
              alt="Стикер Больше гуляй"
              className="absolute top-4 -left-12 z-10 w-40 h-40 object-contain select-none"
            />
            <img
              src="/images/aboutUs/dont-stay-at-home.png"
              alt="Стикер Больше гуляй"
              className="absolute -bottom-13 right-5 z-10 w-40 h-40 object-contain select-none"
            />
          </div>
        </div>

        {/* баннер */}
        <div className="mt-28 mb-12 flex justify-center px-4">
          <div className="w-full max-w-[850px]">
            <img
              src="/images/aboutUs/big-sticker.png"
              alt="Хватит ждать идеального момента — создай свою встречу сам — начинай жить здесь и сейчас"
              className="w-full h-auto object-contain select-none pointer-events-none"
            />
          </div>
        </div>

        {/* преимущества */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center mb-25">
          <div className="overflow-hidden rounded-[22px] border border-black bg-gray-200 aspect-[4/3] lg:aspect-auto">
            <img
              src="/images/aboutUs/people-pluses.jpg"
              alt="Go-Ossetia Community"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-24 mb-24 max-w-3xl mx-auto px-2 flex flex-col">
            {/* Пункт 1 */}
            <div className="flex items-start gap-5 md:gap-6 py-7 border-b border-orange/30">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-orange/10 border border-orange/20 text-orange rounded-[14px] flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/aboutUs/icons/icon-friend.svg"
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-base md:text-lg text-black mb-1.5 uppercase tracking-wide">
                  Находите друзей по интересам
                </h3>
                <p className="text-black/70 text-sm md:text-base leading-relaxed">
                  Ищите события, которые подходят именно вам: от активного
                  спорта и настольных игр до культурных походов и уютных
                  пикников.
                </p>
              </div>
            </div>

            {/* Пункт 2 */}
            <div className="flex items-start gap-5 md:gap-6 py-7 border-b border-orange/30">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-orange/10 border border-orange/20 text-orange rounded-[14px] flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/aboutUs/icons/icon-star.svg"
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-base md:text-lg text-black mb-1.5 uppercase tracking-wide">
                  Выходите из зоны комфорта
                </h3>
                <p className="text-black/70 text-sm md:text-base leading-relaxed">
                  Пробуйте те занятия, на которые раньше не решались, в компании
                  людей, которые поддержат и помогут.
                </p>
              </div>
            </div>

            {/* Пункт 3 */}
            <div className="flex items-start gap-5 md:gap-6 py-7 border-b border-orange/30">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-orange/10 border border-orange/20 text-orange rounded-[14px] flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/aboutUs/icons/icon-org.svg"
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-base md:text-lg text-black mb-1.5 uppercase tracking-wide">
                  Станьте организатором
                </h3>
                <p className="text-black/70 text-sm md:text-base leading-relaxed">
                  У вас есть идея для встречи? Создайте своё событие за пару
                  минут, и мы поможем найти людей, которые захотят к вам
                  присоединиться.
                </p>
              </div>
            </div>

            {/* Пункт 4 */}
            <div className="flex items-start gap-5 md:gap-6 py-7">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-orange/10 border border-orange/20 text-orange rounded-[14px] flex items-center justify-center flex-shrink-0">
                <img
                  src="/images/aboutUs/icons/icon-plus.svg"
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-base md:text-lg text-black mb-1.5 uppercase tracking-wide">
                  Общайтесь вживую
                </h3>
                <p className="text-black/70 text-sm md:text-base leading-relaxed">
                  Мы помогаем преодолеть барьер первого сообщения — просто
                  записывайтесь на встречу и приходите знакомиться в реальности.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* шаги */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="title-underline text-black">
              Три шага до новой встречи
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {/* Шаг 1 */}
            <div className="flex flex-col w-full">
              <div className="w-full aspect-[4/3] bg-orange rounded-[22px] mb-5 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/aboutUs/step1.png"
                  alt="Найди своё"
                  className="w-full h-full object-cover hidden"
                />
              </div>
              <h3 className="font-bold text-base md:text-lg text-black mb-2">
                Найди своё
              </h3>
              <p className="text-black/70 text-sm md:text-base leading-relaxed">
                Просматривай ленту актуальных встреч во Владикавказе. Используй
                удобные фильтры по категориям, возрасту или цене, чтобы найти
                то, что тебе по душе сегодня.
              </p>
            </div>

            {/* Шаг 2 */}
            <div className="flex flex-col w-full">
              <div className="w-full aspect-[4/3] bg-orange rounded-[22px] mb-5 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/aboutUs/step2.png"
                  alt="Запишись в один клик"
                  className="w-full h-full object-cover hidden"
                />
              </div>
              <h3 className="font-bold text-base md:text-lg text-black mb-2">
                Запишись в один клик
              </h3>
              <p className="text-black/70 text-sm md:text-base leading-relaxed">
                Выбрал событие? Просто нажми кнопку «Хочу пойти». Ты увидишь всю
                необходимую информацию: точное место, время и кто еще будет в
                компании.
              </p>
            </div>

            {/* Шаг 3 */}
            <div className="flex flex-col w-full">
              <div className="w-full aspect-[4/3] bg-orange rounded-[22px] mb-5 overflow-hidden flex items-center justify-center">
                <img
                  src="/images/aboutUs/step3.png"
                  alt="Приходи и знакомься"
                  className="w-full h-full object-cover hidden"
                />
              </div>
              <h3 className="font-bold text-base md:text-lg text-black mb-2">
                Приходи и знакомься
              </h3>
              <p className="text-black/70 text-sm md:text-base leading-relaxed">
                В назначенное время приходи на локацию. Наслаждайся процессом,
                общайся и находи новых друзей. Всё самое интересное начинается в
                момент встречи!
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Cta />
    </div>
  );
}
