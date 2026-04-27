import { useState } from "react";
import Container from "./ui/Container";
import DropDown from "./ui/DropDown";
import MeetingCard from "./MeetingCard";

const MEETINGS_DATA = [
  {
    id: 1,
    title: "Игра в шахматы",
    types: ["Настолки"],
    price: 0,
    minAge: 18,
    maxAge: 30,
    location: "Парк им. К.Л.Хетагурова",
    date: "12 марта, 15:00",
    image: "/images/chess.jpg",
  },
  {
    id: 2,
    title: "Велопрогулка",
    types: ["Спорт"],
    price: 3200,
    minAge: 18,
    maxAge: 30,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
  {
    id: 3,
    title: "Велопрогулка",
    types: ["Спорт", "Настолки", "Настолки", "Настолки", "Настолки"],
    price: 5000,
    minAge: 18,
    maxAge: 30,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
  {
    id: 4,
    title: "Велопрогулка",
    types: ["Спорт", "Творчество"],
    price: 0,
    minAge: 18,
    maxAge: 30,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
  {
    id: 5,
    title: "Велопрогулка",
    types: ["Творчество"],
    price: 800,
    minAge: 18,
    maxAge: 30,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
  {
    id: 6,
    title: "Велопрогулка",
    types: ["Спорт"],
    price: 500,
    minAge: 18,
    maxAge: 30,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
  {
    id: 7,
    title: "Велопрогулка",
    types: ["Спорт"],
    price: 100,
    minAge: 18,
    maxAge: 30,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
  {
    id: 8,
    title: "Велопрогулка",
    types: ["Спорт"],
    price: 500,
    minAge: 18,
    maxAge: 30,
    location: "Набережная",
    date: "13 марта, 10:00",
    image: "/images/bike.jpg",
  },
];

export function AllMeetings() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });
  const [dates, setDates] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  const filteredMeetings = MEETINGS_DATA.filter((meeting) => {
    const typeMatch =
      selectedTypes.length === 0 ||
      meeting.types.some((t) => selectedTypes.includes(t));

    let priceMatch = true;
    if (sortOrder === "free") {
      priceMatch = meeting.price === 0;
    } else if (sortOrder === "asc" || sortOrder === "desc") {
      // Если выбрана сортировка по цене, показываем только платные (> 0)
      priceMatch = meeting.price > 0;
    }

    const ageMatch =
      meeting.minAge >= ageRange.min && meeting.maxAge <= ageRange.max;

    // const freeMatch = sortOrder === "free" ? meeting.price === 0 : true;

    return typeMatch && ageMatch && priceMatch;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <Container>
      <section className="py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="title-underline text-black">
            Все встречи ({filteredMeetings.length})
          </h2>

          <div className="flex flex-wrap gap-4 mb-10">
            <DropDown
              label="Тип события"
              options={["Спорт", "Настолки", "Творчество"]}
              multiSelect={true}
              onSelect={(val) => setSelectedTypes(val)}
            />

            <DropDown label="Возраст" type="age" onSelect={setAgeRange} />

            <DropDown label="Когда" type="calendar" onSelect={setDates} />

            <DropDown
              label="Цена"
              align="right"
              options={[
                "Все",
                "Бесплатно",
                "По увеличению цены",
                "По уменьшению цены",
              ]}
              onSelect={(val) => {
                if (val === "Все") setSortOrder("default");
                if (val === "Бесплатно") setSortOrder("free");
                if (val === "По увеличению цены") setSortOrder("asc");
                if (val === "По уменьшению цены") setSortOrder("desc");
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} {...meeting} />
          ))}
        </div>
      </section>
    </Container>
  );
}
