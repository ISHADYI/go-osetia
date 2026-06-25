import React from "react";
import DropDown from "./DropDown";

export default function FilterBar({
  selectedTypes,
  setSelectedTypes,
  ageRange,
  setAgeRange,
  setDates,
  setSortOrder,
  showTypeFilter = true,
}) {
  const ALL_CATEGORIES = [
    "Спорт",
    "Настолки",
    "Творчество",
    "Прогулки",
    "IT & Кодинг",
    "Кино",
    "Языки",
    "Лекции",
    "Кофе",
    "Походы",
    "Книги",
    "Игры",
    "Активный отдых",
    "Кулинария",
    "Экстрим",
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {showTypeFilter && (
        <DropDown
          label="Тип события"
          options={ALL_CATEGORIES}
          multiSelect={true}
          onSelect={setSelectedTypes}
        />
      )}

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
  );
}
