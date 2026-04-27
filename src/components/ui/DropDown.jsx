import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../calendar-custom.css";

export default function DropDown({
  label,
  options = [],
  type,
  onSelect,
  align,
  multiSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [singleValue, setSingleValue] = useState(label);
  const dropRef = useRef(null);

  // Состояния для диапазона дат
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropRef.current && !dropRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSingleSelect = (option) => {
    setSingleValue(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleMultiSelect = (option) => {
    const isSelected = selectedItems.includes(option);
    const newSelected = isSelected
      ? selectedItems.filter((item) => item !== option)
      : [...selectedItems, option];

    setSelectedItems(newSelected);
    onSelect(newSelected);
  };

  // Логика изменения дат
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      onSelect({ start, end });
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-full bg-white hover:border-orange-500 transition-all shadow-sm"
      >
        <span className="text-[14px] font-medium text-gray-700">
          {type === "calendar" && startDate
            ? `${startDate.toLocaleDateString()} - ${endDate ? endDate.toLocaleDateString() : "..."}`
            : multiSelect && selectedItems.length > 0
              ? `Выбрано: ${selectedItems.length}`
              : singleValue}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 mt-2 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2 ${align === "right" ? "right-0" : "left-0"} ${type === "calendar" ? "w-auto" : "w-64"}`}
        >
          {type === "age" ? (
            <div className="p-3 flex flex-col gap-3">
              <p className="text-xs font-semibold text-gray-400 uppercase">
                Возраст
              </p>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="От"
                  className="w-full p-2 border rounded-lg text-sm"
                  onChange={(e) =>
                    onSelect({ min: Number(e.target.value), max: 100 })
                  }
                />
                <input
                  type="number"
                  placeholder="До"
                  className="w-full p-2 border rounded-lg text-sm"
                  onChange={(e) =>
                    onSelect({ min: 0, max: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          ) : type === "calendar" ? (
            <div className="p-2">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {options.map((option) => (
                <div key={option}>
                  {multiSelect ? (
                    <label className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 rounded-xl cursor-pointer">
                      <input
                        type="checkbox"
                        className="accent-orange-500"
                        checked={selectedItems.includes(option)}
                        onChange={() => handleMultiSelect(option)}
                      />
                      {option}
                    </label>
                  ) : (
                    <button
                      onClick={() => handleSingleSelect(option)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 rounded-xl transition-colors"
                    >
                      {option}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
