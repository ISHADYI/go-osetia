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
  return (
    <div className="flex flex-wrap gap-4 mb-10">
      {showTypeFilter && (
        <DropDown
          label="Тип события"
          options={["Спорт", "Настолки", "Творчество"]}
          multiSelect={true}
          onSelect={(val) => setSelectedTypes(val)}
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
