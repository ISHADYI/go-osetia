import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "./ui/Container";
import { API_BASE_URL } from "../configs/auth";
import { useRequest } from "../hooks/useRequest";

const DEFAULT_CATEGORIES = [
  {
    title: "Активный отдых",
    key: "SPORT",
    count: 0,
    today: 0,
    image: "/images/active-category.png",
  },
  {
    title: "Настольные игры",
    key: "GAMES",
    count: 0,
    today: 0,
    image: "/images/active-category.png",
  },
  {
    title: "Творчество",
    key: "GAMES",
    count: 0,
    today: 0,
    image: "/images/active-category.png",
  },
  {
    title: "Пикники",
    key: "TRAVEL",
    count: 0,
    today: 0,
    image: "/images/active-category.png",
  },
  {
    title: "Лекции",
    key: "TALKS",
    count: 0,
    today: 0,
    image: "/images/active-category.png",
  },
  {
    title: "Книги",
    key: "BOOKS",
    count: 0,
    today: 0,
    image: "/images/active-category.png",
  },
  {
    title: "Походы",
    key: "TRAVEL",
    count: 0,
    today: 0,
    image: "/images/active-category.png",
  },
];

export function CategoryGrid() {
  const { sendData } = useRequest();
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await sendData(`${API_BASE_URL}/events?limit=100`);

        if (res.success && res.data) {
          const events = Array.isArray(res.data)
            ? res.data
            : res.data.events || [];

          const countMap = {};

          events.forEach((event) => {
            if (event.categories && Array.isArray(event.categories)) {
              event.categories.forEach((cat) => {
                countMap[cat] = (countMap[cat] || 0) + 1;
              });
            }
          });

          const updatedCategories = DEFAULT_CATEGORIES.map((cat) => ({
            ...cat,
            count: countMap[cat.key] || 0,
            today: Math.floor(Math.random() * 8) + 1, 
          }));

          setCategories(updatedCategories);
        }
      } catch (err) {
        console.error("Ошибка загрузки категорий", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="mb-20">
        <Container>
          <div className="text-center mb-10">
            <h2 className="title-underline text-black">
              Выбери встречу по интересам
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DEFAULT_CATEGORIES.map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="mb-20">
      <Container>
        <div className="text-center mb-10">
          <h2 className="title-underline text-black">
            Выбери встречу по интересам
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/category/${encodeURIComponent(cat.title)}`}
              className="flex bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-28 sm:w-32 h-full min-h-[100px] shrink-0 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                <h3 className="text-lg font-bold text-black truncate group-hover:text-orange transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-black/60 mt-1 font-medium">
                  {cat.count} встреч •{" "}
                  <span className="text-orange">{cat.today} сегодня</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
