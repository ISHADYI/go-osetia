import ButtonLink from "./ui/ButtonLink";
import Container from "./ui/Container";

// import bgHero from "../assets/heart-outline.svg";

export function Hero() {
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
          <div className="flex items-center gap-5">
            <ButtonLink href="#" text="Найти встречу" variant="defaultFill" />
            <ButtonLink href="#" text="Создать встречу" variant="whiteFill" />
          </div>
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
