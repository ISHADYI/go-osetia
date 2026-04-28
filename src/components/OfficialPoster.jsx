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
];

export function OfficialPoster() {
  return (
    <section className="relative w-full h-fit mb-20">
      <Container className="absolute pt-10">
        <h2 className="title-underline-white text-white mb-10">
          Официальная афиша города
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {OFFICIALPOSTERS_DATA.map((poster) => (
            <OfficialPosterCard key={poster.id} {...poster} />
          ))}
        </div>
      </Container>

      <img
        src="/images/orange-bg.jpg"
        alt=""
        className="bg-cover bg-center w-full"
      />
    </section>
  );
}
