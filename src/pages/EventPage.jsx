import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import heartIcon from "../assets/icons/heart-outline.svg";
import starIcon from "../assets/icons/rating-star.svg";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

export function EventPage() {
  const id = useParams().id;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);

  return (
    <div className="py-12 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="rounded-[22px] overflow-hidden h-[450px] mb-8 shadow-sm">
              <img
                src="../../images/eventPoster/event-page-img.jpg"
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-4xl font-bold text-[#0F0F10] mb-6">
              Вечер настольных игр в «Портале»
            </h1>

            <div className="flex gap-8 mb-10 text-gray-500 font-medium">
              <span>📍 Владикавказ, пр. Мира, 33</span>
              <span>📅 15 мая, 19:00</span>
            </div>

            <div className="prose max-w-none text-[#0F0F10] opacity-90 leading-relaxed">
              <h3 className="text-2xl font-bold mb-4">О мероприятии</h3>
              <p>
                Собираемся большой компанией, чтобы поиграть в классические и
                современные настолки. Неважно, профи вы или новичок — мы всему
                научим!
              </p>
            </div>

            <div className="mt-12 p-8 bg-[#F8F8F8] rounded-[22px] flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="../../public/images/profile-avatar.jpg"
                    alt="Organizer"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Алан Дзуцев</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={starIcon} className="w-4" alt="star" />
                    <span className="font-bold">4.9</span>
                    <span className="text-gray-400 text-sm">• 12 встреч</span>
                  </div>
                </div>
              </div>
              <Link
                to="/organizer/1"
                className="text-[#F15431] font-bold hover:underline"
              >
                Профиль организатора →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-8 border border-black/10 rounded-[22px]">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Стоимость</p>
                  <p className="text-3xl font-bold">500 ₽</p>
                </div>
                <p className="text-orange font-bold">8 мест осталось</p>
              </div>

              <button className="w-full bg-orange text-white py-5 rounded-2xl font-bold text-lg mb-4 hover:opacity-90 transition-all cursor-pointer">
                Записаться
              </button>

              <button
                onClick={() => toggleFavorite(id)}
                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold border-2 transition-all cursor-pointer ${
                  favorite ? "text-orange" : "border-gray-100 text-black"
                }`}
              >
                <Heart
                  size={20}
                  fill={favorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth={2.5}
                />
                {favorite ? "В моих планах" : "Добавить в планы"}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
