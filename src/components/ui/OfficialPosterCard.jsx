import React from "react";
import { Link } from "react-router-dom";
import heartIcon from "../../assets/icons/heart-outline.svg";
import { MapPin, Calendar } from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";

export default function OfficialPosterCard({
  id,
  image,
  tag,
  title,
  date,
  location,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id, "official");

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      window.dispatchEvent(new Event("open-auth-modal"));
      return;
    }
    toggleFavorite(id, "official");
  };

  return (
    <Link to={`/event/${id}`} className="block">
      <article
        className="relative w-[315px] h-[440px] rounded-[22px] overflow-hidden flex flex-col justify-between p-5 group cursor-pointer shrink-0"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />

        <header className="relative z-10 flex justify-between items-start">
          <span className="bg-orange text-white text-[12px] px-3 py-1 rounded-full font-medium">
            {tag}
          </span>
          <button
            onClick={handleFavoriteClick}
            className={`backdrop-blur-md p-2 rounded-full transition-colors cursor-pointer ${
              favorite
                ? "bg-white text-orange"
                : "bg-white/20 text-white hover:bg-white/40"
            }`}
          >
            <img
              src={heartIcon}
              alt="Избранное"
              className={`w-5 h-5 ${favorite ? "" : "invert"}`}
            />
          </button>
        </header>

        <footer className="relative z-10 text-white">
          <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          <div className="flex flex-col gap-1 opacity-80 text-[13px]">
            <div className="flex items-center gap-2">
              <Calendar size={14} /> <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} /> <span className="truncate">{location}</span>
            </div>
          </div>
        </footer>
      </article>
    </Link>
  );
}
