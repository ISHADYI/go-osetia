import Container from "./ui/Container";

export default function Map() {
  return (
    <section className="mb-20">
      <Container>
        <h2 className="title-underline text-black mb-10">
          Мероприятия на карте
        </h2>

        <div className="w-full h-[500px] rounded-[40px] overflow-hidden">
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac5b2421b56a7f6bdf4eca12ac693dc91518f150eb2e6b833d5cf5dabd5e21784&amp;source=constructor"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Карта мероприятий Владикавказа"
            className="w-full h-full"
          ></iframe>
        </div>
      </Container>
    </section>
  );
}
