import React from "react";
import Container from "../components/ui/Container";

export function OrganizerPage() {
  return (
    <Container className="py-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-32 h-32 rounded-full bg-gray-200 mb-6 overflow-hidden">
            <img src="../../public/images/profile-avatar.jpg" alt="Avatar" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Алан Дзуцев</h1>
          <p className="text-gray-500 mb-4 text-lg">
            Организатор активных встреч во Владикавказе
          </p>
          <div className="flex gap-1 text-2xl text-yellow-400">★★★★★</div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-gray-50 rounded-2xl text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-gray-500 text-sm">Встреч</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl text-center">
            <p className="text-2xl font-bold">5.0</p>
            <p className="text-gray-500 text-sm">Рейтинг</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl text-center">
            <p className="text-2xl font-bold">45</p>
            <p className="text-gray-500 text-sm">Отзывов</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-6">Отзывы участников</h3>
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="border-b border-gray-100 pb-6">
              <div className="flex justify-between mb-2">
                <span className="font-bold">Мария К.</span>
                <span className="text-yellow-400">★★★★★</span>
              </div>
              <p className="text-gray-600">
                Все было супер! Очень душевная атмосфера, Алан отличный
                организатор.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
