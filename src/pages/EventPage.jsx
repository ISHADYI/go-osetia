import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import { API_BASE_URL } from "../configs/auth";
import { useRequest } from "../hooks/useRequest";
import { normalizeEvent } from "../utils/normalizeEvent";
import { OFFICIALPOSTERS_DATA } from "../components/OfficialPoster";

export function EventPage() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { sendData } = useRequest();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOfficial, setIsOfficial] = useState(false);

  const [isFollowed, setIsFollowed] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const favorite = isFavorite(id, "regular") || isFavorite(id, "official");

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError(null);

      const res = await sendData(`${API_BASE_URL}/events/${id}`);

      if (res.success && res.data) {
        const normalized = normalizeEvent(res.data);
        setEvent(normalized);
        setIsOfficial(false);
        // Если бэкенд присылает информацию о том, подписан ли пользователь, устанавливаем её.
        // Предположим, поле называется isFollowed. Если его нет — по умолчанию false.
        setIsFollowed(res.data.isFollowed || false);
      } else {
        const officialEvent = OFFICIALPOSTERS_DATA.find(
          (p) => String(p.id) === String(id),
        );

        if (officialEvent) {
          const normalizedOfficial = {
            id: officialEvent.id,
            title: officialEvent.title,
            description: `${officialEvent.tag} — официальное событие города.`,
            location: officialEvent.location,
            date: officialEvent.date,
            price: 0,
            image: officialEvent.image,
            types: [officialEvent.tag],
          };
          setEvent(normalizedOfficial);
          setIsOfficial(true);
        } else {
          setError("Мероприятие не найдено");
        }
      }
      setLoading(false);
    };

    if (id) fetchEvent();
  }, [id]);

  const handleFavoriteClick = () => {
    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      window.dispatchEvent(new Event("open-auth-modal"));
      return;
    }
    toggleFavorite(id, isOfficial ? "official" : "regular");
  };

  const handleFollowClick = async () => {
    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      window.dispatchEvent(new Event("open-auth-modal"));
      return;
    }

    if (isOfficial) {
      alert(
        "На официальные события города запись через платформу не требуется.",
      );
      return;
    }

    setIsFollowLoading(true);

    const endpoint = isFollowed
      ? `${API_BASE_URL}/events/${id}/unfollow`
      : `${API_BASE_URL}/events/${id}/follow`;

    const res = await sendData(endpoint, "POST");

    if (res.success) {
      setIsFollowed(!isFollowed);
    } else {
      alert("Не удалось изменить статус записи. Попробуйте позже.");
    }

    setIsFollowLoading(false);
  };

  if (loading)
    return <div className="py-20 text-center">Загрузка мероприятия...</div>;
  if (error || !event)
    return (
      <div className="py-20 text-center text-red-500">
        {error || "Мероприятие не найдено"}
      </div>
    );

  return (
    <div className="py-12 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div
              className={`rounded-[22px] overflow-hidden mb-8 shadow-sm ${
                isOfficial
                  ? "aspect-[4/5] max-h-[620px]"
                  : "aspect-video h-[450px]"
              }`}
            >
              <img
                src={event.image || "/images/placeholder-event.jpg"}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/placeholder-event.jpg";
                }}
              />
            </div>

            <h1 className="text-4xl font-bold text-[#0F0F10] mb-6">
              {event.title}
            </h1>

            <div className="flex gap-8 mb-10 text-gray-500 font-medium">
              <span>📍 {event.location}</span>
              <span>📅 {event.date}</span>
            </div>

            <div className="prose max-w-none text-[#0F0F10] opacity-90 leading-relaxed">
              <h3 className="text-2xl font-bold mb-4">О мероприятии</h3>
              <p>{event.description || "Описание мероприятия отсутствует."}</p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="p-8 border border-black/10 rounded-[22px]">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Стоимость</p>
                  <p className="text-3xl font-bold">
                    {event.price === 0 ? "Бесплатно" : `${event.price} ₽`}
                  </p>
                </div>
              </div>

              <button
                onClick={handleFollowClick}
                disabled={isFollowLoading}
                className={`w-full py-5 rounded-2xl font-bold text-lg mb-4 transition-all cursor-pointer ${
                  isFollowed
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    : "bg-orange text-white hover:opacity-90"
                } disabled:opacity-70`}
              >
                {isFollowLoading
                  ? "Загрузка..."
                  : isFollowed
                    ? "Отменить запись"
                    : "Записаться"}
              </button>

              <button
                onClick={handleFavoriteClick}
                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-bold border-2 transition-all cursor-pointer ${
                  favorite
                    ? "text-orange border-orange/20 bg-orange/5"
                    : "border-gray-100 text-black hover:bg-gray-50"
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
