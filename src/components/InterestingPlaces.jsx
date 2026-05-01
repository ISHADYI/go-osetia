import Container from "./ui/Container";
import PlaceCard from "./ui/PlaceCard";

const PLACES_DATA = [
  {
    id: 1,
    title: "Коворкинг зона",
    address: "Проспект Мира, 34",
    image: "/images/places/coworking.jpg",
    size: "col-span-2 row-span-1",
  },
  {
    id: 2,
    title: "Падел теннис «Bajada»",
    address: "Проспект Мира, 34",
    image: "/images/places/padel.jpg",
    size: "col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Кафе «Как дела»",
    address: "Проспект Мира, 34",
    image: "/images/places/cafe.jpg",
    size: "col-span-1 row-span-2",
  },
  {
    id: 4,
    title: "Картинг",
    address: "Проспект Мира, 34",
    image: "/images/places/karting.jpg",
    size: "col-span-1 row-span-1",
  },
  {
    id: 5,
    title: "Wish Bar",
    address: "Проспект Мира, 34",
    image: "/images/places/wishbar.jpg",
    size: "col-span-2 row-span-1",
  },
];

export default function InterestingPlaces() {
  return (
    <section className="mb-20">
      <Container>
        <h2 className="title-underline text-black mb-10">
          Интересные места Владикавказа
        </h2>

        <div className="grid grid-cols-4 grid-rows-[426px_426px] gap-6">
          {PLACES_DATA.map((place) => (
            <PlaceCard key={place.id} {...place} className={place.size} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-[#F15431] text-white px-10 py-4 rounded-full font-semibold hover:bg-[#d44324] transition-colors shadow-lg active:scale-95 cursor-pointer">
            Посмотреть все
          </button>
        </div>
      </Container>
    </section>
  );
}
