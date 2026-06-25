import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/ui/Container";
import { API_BASE_URL } from "../configs/auth";
import { useRequest } from "../hooks/useRequest";
import { normalizeEvent } from "../utils/normalizeEvent";
import MeetingCard from "../components/ui/MeetingCard";

export function OrganizerPage() {
  const [user, setUser] = useState(null);

  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [followedEvents, setFollowedEvents] = useState([]);
  const [followedLoading, setFollowedLoading] = useState(true);
  const [followedError, setFollowedError] = useState(null);

  const navigate = useNavigate();
  const { sendData } = useRequest();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (!user) return;

    const loadAllData = async () => {
      setLoading(true);
      setError(null);

      const resMy = await sendData(`${API_BASE_URL}/events/my`);
      if (resMy.success && resMy.data) {
        const normalized = Array.isArray(resMy.data)
          ? resMy.data.map(normalizeEvent)
          : (resMy.data.events || resMy.data).map(normalizeEvent);
        setMyEvents(normalized);
      } else {
        setError("Не удалось загрузить ваши встречи");
      }
      setLoading(false);

      setFollowedLoading(true);
      setFollowedError(null);

      const resFollowed = await sendData(
        `${API_BASE_URL}/users/followed-events`,
      );
      if (resFollowed.success && resFollowed.data) {
        const normalizedFollowed = Array.isArray(resFollowed.data)
          ? resFollowed.data.map(normalizeEvent)
          : (resFollowed.data.events || resFollowed.data).map(normalizeEvent);
        setFollowedEvents(normalizedFollowed);
      } else {
        setFollowedError("Не удалось загрузить ваши подписки");
      }
      setFollowedLoading(false);
    };

    loadAllData();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  if (!user) return null;

  return (
    <Container className="py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-sm border border-gray-100 p-10">
        {/* Шапка профиля */}
        <div className="flex flex-col items-center text-center mb-12 relative">
          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 text-gray-400 hover:text-red-500 font-medium transition-colors cursor-pointer"
          >
            Выйти из аккаунта
          </button>

          <div className="w-32 h-32 rounded-full bg-orange-50 text-orange flex items-center justify-center text-5xl font-bold mb-6">
            {user.firstName
              ? user.firstName[0].toUpperCase()
              : user.email[0].toUpperCase()}
          </div>
          <h1 className="text-4xl font-bold mb-2">
            {user.firstName || "Пользователь"} {user.lastName}
          </h1>
          <p className="text-gray-500 text-lg">{user.email}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-gray-50 rounded-2xl text-center">
            <p className="text-2xl font-bold text-orange">{myEvents.length}</p>
            <p className="text-gray-500 text-sm">Созданных встреч</p>
          </div>
          <div className="p-6 bg-gray-50 rounded-2xl text-center">
            <p className="text-2xl font-bold text-orange">
              {followedEvents.length}
            </p>
            <p className="text-gray-500 text-sm">Встреч в планах</p>
          </div>
        </div>

        {/* Мои встречи (которые создал я) */}
        <div className="border-t border-gray-100 pt-8">
          <h3 className="text-2xl font-bold mb-6">Мои встречи</h3>

          {loading ? (
            <div className="text-center py-12">Загрузка ваших встреч...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : myEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myEvents.map((meeting) => (
                <MeetingCard key={`my-${meeting.id}`} {...meeting} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">
                Вы пока не создали ни одной встречи.
              </p>
            </div>
          )}
        </div>

        {/* Встречи в планах (на которые я подписан) */}
        <div className="border-t border-gray-100 pt-8 mt-12">
          <h3 className="text-2xl font-bold mb-6">Встречи в планах</h3>

          {followedLoading ? (
            <div className="text-center py-12">Загрузка подписок...</div>
          ) : followedError ? (
            <div className="text-center py-12 text-red-500">
              {followedError}
            </div>
          ) : followedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {followedEvents.map((meeting) => (
                <MeetingCard key={`followed-${meeting.id}`} {...meeting} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl">
              <p className="text-gray-500">
                У вас пока нет запланированных встреч.
              </p>
            </div>
          )}
        </div>

        {/* Настройки профиля */}
        <div className="border-t border-gray-100 pt-8 mt-12">
          <h3 className="text-2xl font-bold mb-6">Настройки профиля</h3>
          <p className="text-gray-500">
            Здесь позже появится форма редактирования личных данных и загрузки
            фотографии.
          </p>
        </div>
      </div>
    </Container>
  );
}
