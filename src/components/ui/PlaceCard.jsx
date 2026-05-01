import { MapPin } from "lucide-react";

export default function PlaceCard({ image, title, address, className }) {
  return (
    <article
      className={`relative rounded-[40px] overflow-hidden group cursor-pointer shadow-lg ${className}`}
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6 right-6 text-white">
        <h3 className="text-xl font-bold mb-1 leading-tight">{title}</h3>
        <div className="flex items-center gap-1 opacity-80 text-sm">
          <MapPin size={14} />
          <span>{address}</span>
        </div>
      </div>
    </article>
  );
}
