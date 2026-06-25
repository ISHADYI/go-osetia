import { Link } from "react-router-dom";
import React from "react";
import { MapPin, Users, Heart } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

export default function MeetingCard({
  id,
  title,
  location,
  date,
  price,
  image,
  types,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id, "regular");

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      window.dispatchEvent(new Event("open-auth-modal"));
      return;
    }

    toggleFavorite(id, "regular");
  };

  return (
    <div className="bg-white rounded-[22px] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="relative aspect-4/3 overflow-hidden">
        <Link to={`/event/${id}`} className="block w-full h-full group">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        <button
          // onClick={() => toggleFavorite(id)}
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer z-10 ${
            favorite
              ? "bg-white text-orange"
              : "bg-white/20 text-white hover:bg-white/40"
          }`}
        >
          <Heart
            size={20}
            fill={favorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2.5}
          />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-3 py-1 rounded-full text-[12px] font-medium ${
                price === 0
                  ? "bg-green-100 text-green-600"
                  : "bg-orange-100 text-orange-600"
              }`}
            >
              {price === 0 ? "Бесплатно" : `${price} ₽`}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[12px]">
              20-25 лет
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[12px]">
              {date}
            </span>
          </div>

          <Link
            to={`/event/${id}`}
            className="text-lg font-bold text-gray-900 leading-tight mb-2 block hover:text-orange transition-colors no-underline"
          >
            {title}
          </Link>

          <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
            <MapPin size={14} />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-50 gap-4 mt-auto">
          <div className="flex gap-1 overflow-hidden items-center">
            {types &&
              types.map((t, index) => (
                <span
                  key={index}
                  className="text-xs text-gray-400 uppercase font-semibold whitespace-nowrap"
                >
                  {t}
                  {index !== types.length - 1 && ","}
                </span>
              ))}
          </div>

          <div className="flex items-center gap-1 text-gray-700 font-medium shrink-0">
            <Users size={16} />
            <span className="text-sm">3 из 6</span>
          </div>
        </div>
      </div>
    </div>
  );
}
