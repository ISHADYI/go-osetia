import ButtonLink from "./ui/ButtonLink";
import Container from "./ui/Container";

// import bgHero from "../assets/heart-outline.svg";

export function Hero() {
  return (
    <section className="relative w-full min-h-150 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center">
      <Container>
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
    </section>
  );
}
