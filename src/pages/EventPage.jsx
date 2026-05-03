import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import heartIcon from "../assets/icons/heart-outline.svg";
import starIcon from "../assets/icons/rating-star.svg";

export function EventPage() {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div className="py-12 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="rounded-[40px] overflow-hidden h-[450px] mb-8 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1528605248644-14dd04022da1"
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


            <div className="mt-12 p-8 bg-[#F8F8F8] rounded-[32px] flex items-center justify-between">
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
            <div className="sticky top-28 p-8 border border-gray-100 rounded-[32px] shadow-xl shadow-gray-100/50">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Стоимость</p>
                  <p className="text-3xl font-bold">500 ₽</p>
                </div>
                <p className="text-[#F15431] font-bold">8 мест осталось</p>
              </div>

              <button className="w-full bg-[#F15431] text-white py-5 rounded-2xl font-bold text-lg mb-4 hover:opacity-90 transition-all">
                Записаться
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold border-2 transition-all ${
                  isSaved
                    ? "bg-green-50 border-green-100 text-green-500"
                    : "border-gray-100 text-[#0F0F10]"
                }`}
              >
                <img src={heartIcon} className="w-6" alt="heart" />
                {isSaved ? "В моих планах" : "Добавить в планы"}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
