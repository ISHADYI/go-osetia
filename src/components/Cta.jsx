import Container from "./ui/Container";
import ButtonLink from "./ui/ButtonLink";

export default function CreateEventCTA() {
  return (
    <section className="relative w-full h-[400px] flex items-center overflow-hidden mb-20">
      <img
        src="/images/orange-bg2.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold max-w-[800px] leading-tight mb-8">
            Хочешь собрать людей, со схожими интересами? Создай встречу за 2
            минуты
          </h2>

          <ButtonLink href="#" text="Создать встречу" variant="whiteFill" />
        </div>
      </Container>
    </section>
  );
}
