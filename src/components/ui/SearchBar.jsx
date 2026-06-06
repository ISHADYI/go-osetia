import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MEETINGS_DATA } from "../../data/meetingsData";
import { useDebounce } from "../../hooks/useDebounce";

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function SearchBar({ isActive, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      setSearchTerm("");
      setResults([]);
    }
  }, [isActive]);

  // Логика поиска при изменении текста
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setResults([]);
      return;
    }

    const lowerCaseTerm = debouncedSearchTerm.toLowerCase();

    const filtered = MEETINGS_DATA.filter(
      (meeting) =>
        meeting.title.toLowerCase().includes(lowerCaseTerm) ||
        meeting.types.some((t) => t.toLowerCase().includes(lowerCaseTerm)),
    ).slice(0, 10);

    setResults(filtered);
  }, [debouncedSearchTerm]);

  const handleResultClick = () => {
    onClose();
    setSearchTerm("");
  };

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 w-full max-w-[650px] transition-all duration-500 ease-out z-50 px-4 ${
        isActive
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      }`}
    >
      <div className="relative flex items-center">
        {/* поиска */}
        <div className="absolute left-5 text-orange">
          <SearchIcon />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск встреч, например: шахматы..."
          className={`w-full bg-white border border-gray-100 py-4 pl-14 pr-14 outline-none focus:ring-2 focus:ring-orange/20 transition-all text-black shadow-lg ${
            searchTerm && results ? "rounded-t-2xl" : "rounded-2xl"
          }`}
          onKeyDown={(e) => e.key === "Escape" && onClose()}
        />
        <button
          onClick={onClose}
          className="absolute right-5 text-gray-400 hover:text-black transition-colors p-1"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Выпадающий список результатов */}
        {searchTerm.trim() !== "" && (
          <div className="absolute top-full left-0 w-full bg-white rounded-b-2xl shadow-xl border-x border-b border-gray-100 overflow-hidden z-50 flex flex-col max-h-[350px] overflow-y-auto">
            {results.length > 0 ? (
              results.map((meeting) => (
                <Link
                  key={meeting.id}
                  to={`/event/${meeting.id}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-4 p-4 hover:bg-orange/5 transition-colors border-t border-gray-50 cursor-pointer no-underline group"
                >
                  <img
                    src={meeting.image}
                    alt={meeting.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <h4 className="font-bold text-sm text-black truncate group-hover:text-orange transition-colors">
                      {meeting.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {meeting.date} •{" "}
                      {meeting.price === 0 ? "Бесплатно" : `${meeting.price} ₽`}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm border-t border-gray-50">
                По запросу « <span className="font-semibold text-black">{searchTerm}</span>» ничего не найдено
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
