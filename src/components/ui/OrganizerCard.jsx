import React from "react";
import starIcon from "../../assets/icons/rating-star.svg";

export function OrganizerCard({ name, rating, eventsCount, reviewsCount }) {
  return (
    <div className="bg-[#F8F8F8] p-6 rounded-3xl flex items-center justify-between mt-12">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
          <img
            src="../../public/images/profile-avatar.jpg"
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h4 className="text-xl font-bold text-[#0F0F10]">{name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              <img src={starIcon} alt="Рейтинг" className="w-4 h-4" />
              <span className="ml-1 font-bold text-[#0F0F10]">{rating}</span>
            </div>
            <span className="text-gray-400 text-sm">
              • {eventsCount} встреч • {reviewsCount} отзывов
            </span>
          </div>
        </div>
      </div>

      <button className="text-[#F15431] font-bold hover:opacity-80 transition-opacity">
        Профиль организатора →
      </button>
    </div>
  );
}
