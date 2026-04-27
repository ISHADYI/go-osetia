import { useState } from "react";
import Container from "./ui/Container";
import DropDown from "./ui/DropDown";
import MeetingCard from "./MeetingCard";

const MEETINGS_DATA = [
  {
    id: 1,
    title: "Игра в шахматы",
    type: "Спорт",
    price: 0,
    location: "Парк им. К.Л.Хетагурова",
    date: "12 марта, 15:00",
    image: "/images/chess.jpg",
  },
  {
    id: 2,
    title: "Велопрогулка",
    type: "Отдых на природе",
    price: 500,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
];

export function AllMeetings() {
  const [selectedType, setSelectedType] = useState("Все");
  const [selectedPrice, setSelectedPrice] = useState("Любая");

  const filteredMeetings = MEETINGS_DATA.filter((meeting) => {
    const typeMatch = selectedType === "Все" || meeting.type === selectedType;
    const priceMatch =
      selectedPrice === "Любая" ||
      (selectedPrice === "Бесплатно" ? meeting.price === 0 : meeting.price > 0);

    return typeMatch && priceMatch;
  });

  return (
    <Container>
      <section className="py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="title-underline text-black">
            Все встречи ({filteredMeetings.length})
          </h2>

          <div className="flex gap-4">
            <DropDown
              label="Тип события"
              options={["Все", "Спорт", "Отдых на природе", "Настольные игры"]}
              onSelect={setSelectedType}
            />
            <DropDown
              label="Цена"
              options={["Любая", "Бесплатно", "Платно"]}
              onSelect={setSelectedPrice}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} {...meeting} />
          ))}
        </div>
      </section>
    </Container>
  );
}
