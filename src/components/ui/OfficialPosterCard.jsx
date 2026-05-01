import heartIcon from "../../assets/icons/heart-outline.svg";
import { MapPin, Calendar } from "lucide-react"; // Можно добавить для красоты

export default function OfficialPosterCard({
  image,
  tag,
  title,
  date,
  location,
}) {
  return (
    <article
      className="relative w-[315px] h-[440px] rounded-[30px] overflow-hidden flex flex-col justify-between p-5 group cursor-pointer shrink-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-t from-[#0F0F10] via-transparent to-transparent" />

      <header className="relative z-10 flex justify-between items-start">
        <span className="bg-orange-600 text-white text-[12px] px-3 py-1 rounded-full font-medium">
          {tag}
        </span>
        <button className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors">
          <img src={heartIcon} alt="Избранное" className="w-5 h-5 invert" />
        </button>
      </header>

      <footer className="relative z-10 text-white">
        <h3 className="text-lg font-bold leading-tight mb-3 group-hover:text-orange-400 transition-colors">
          {title}
        </h3>
        <div className="flex flex-col gap-1 opacity-80 text-[13px]">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </footer>
    </article>
  );
}
