import { useState } from "react";
import { MEETINGS_DATA } from "../data/meetingsData";
import Container from "./ui/Container";
import DropDown from "./ui/DropDown";
import MeetingCard from "./ui/MeetingCard";



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
    <section className="mb-20">
      <Container>
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
      </Container>
    </section>
  );
}
