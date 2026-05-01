import Container from "./ui/Container";

const PHOTOS = [
  {
    id: 1,
    src: "/images/past/chess.jpg",
    alt: "Игра в шахматы",
    className: "col-span-1 row-span-1",
  },
  {
    id: 2,
    src: "/images/past/hiking.jpg",
    alt: "Прогулка",
    className: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "/images/past/mountains.jpg",
    alt: "Вид на горы",
    className: "col-span-1 row-span-2",
  },
  {
    id: 4,
    src: "/images/past/reading.jpg",
    alt: "Обсуждение книг",
    className: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "/images/past/cycling.jpg",
    alt: "Велопрогулка",
    className: "col-span-1 row-span-1",
  },
];

export default function PastEventsPhotos() {
  return (
    <section className="mb-20">
      <Container>
        <h2 className="title-underline text-black mb-10">
          Фотографии со встреч
        </h2>

        <div className="grid grid-cols-3 grid-rows-[350px_350px] gap-6">
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className={`relative rounded-[40px] overflow-hidden shadow-md ${photo.className}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
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
