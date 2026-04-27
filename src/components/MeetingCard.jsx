import { MapPin, Users } from "lucide-react";

export default function MeetingCard({
  title,
  location,
  date,
  price,
  image,
  type,
}) {
  return (
    <div className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button className="absolute top-4 right-4">
          <span className="text-xl">🤍</span>
        </button>
      </div>

      <div className="p-5">
        <div className="flex gap-2 mb-3">
          <span
            className={`px-3 py-1 rounded-full text-[12px] font-medium ${price === 0 ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
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

        <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
          {title}
        </h3>

        <div className="flex items-center gap-1 text-gray-500 text-sm mb-4">
          <MapPin size={14} />
          <span className="truncate">{location}</span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-50">
          <span className="text-xs text-gray-400 uppercase font-semibold">
            {type}
          </span>
          <div className="flex items-center gap-1 text-gray-700 font-medium">
            <Users size={16} />
            <span className="text-sm">3 из 6</span>
          </div>
        </div>
      </div>
    </div>
  );
}
