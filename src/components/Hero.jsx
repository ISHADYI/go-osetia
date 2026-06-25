import React from "react";
import ButtonLink from "./ui/ButtonLink";
import Container from "./ui/Container";

export function Hero() {
  const handleCreateMeetingClick = (e) => {
    // Проверяем, вошел ли пользователь (есть ли запись в localStorage)
    const isAuthenticated = localStorage.getItem("user");

    if (!isAuthenticated) {
      e.preventDefault(); // Отменяем переход по ссылке /create-meeting

      // Генерируем событие для открытия окна авторизации, как в карточках
      window.dispatchEvent(new Event("open-auth-modal"));
    }
  };

  return (
    <section className="relative w-full h-fit mb-20">
      <Container className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center text-center">
        <div className="flex flex-col justify-center items-center text-center gap-7.5">
          <h1 className="max-w-225 text-white">
            Найди компанию для любимых занятий во Владикавказе
          </h1>
          <p className="text-[18px] text-white max-w-170">
            От шахмат в парке до велопрогулок по набережной. Создавай встречи
            или присоединяйся к другим
          </p>
            <ButtonLink
              to="/create-meeting"
              text="Создать встречу"
              variant="orangeFill"
              onClick={handleCreateMeetingClick}
            />
          {/* <div className="flex items-center gap-5">
            <ButtonLink href="#" text="Найти встречу" variant="orangeFill" />
          </div> */}
        </div>
      </Container>
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="bg-cover bg-center w-full"
      />
    </section>
  );
}
