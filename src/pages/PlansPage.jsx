import React, { useState, useEffect } from "react";
import Container from "../components/ui/Container";
import MeetingCard from "../components/ui/MeetingCard";
import OfficialPosterCard from "../components/ui/OfficialPosterCard";
import { useFavorites } from "../context/FavoritesContext";
import { API_BASE_URL } from "../configs/auth";
import { useRequest } from "../hooks/useRequest";
import { normalizeEvent } from "../utils/normalizeEvent";
import { OFFICIALPOSTERS_DATA } from "../components/OfficialPoster";

export function PlansPage() {
  const { favorites } = useFavorites();
  const { sendData } = useRequest();
  const [favoriteMeetings, setFavoriteMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  const regularFavoriteIds = favorites
    .filter((fav) => fav.startsWith("regular-"))
    .map((fav) => fav.replace("regular-", ""));

  const officialFavoriteIds = favorites
    .filter((fav) => fav.startsWith("official-"))
    .map((fav) => fav.replace("official-", ""));

  useEffect(() => {
    const fetchFavoriteEvents = async () => {
      if (regularFavoriteIds.length === 0) {
        setFavoriteMeetings([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const fetchedEvents = [];

      for (const id of regularFavoriteIds) {
        const res = await sendData(`${API_BASE_URL}/events/${id}`);
        if (res.success && res.data) {
          const normalized = normalizeEvent(res.data);
          fetchedEvents.push(normalized);
        }
      }

      setFavoriteMeetings(fetchedEvents);
      setLoading(false);
    };

    fetchFavoriteEvents();
  }, [favorites]);

  const favoritePosters = OFFICIALPOSTERS_DATA.filter((poster) =>
    officialFavoriteIds.includes(String(poster.id)),
  );

  const totalCount = favoriteMeetings.length + favoritePosters.length;

  return (
    <div className="mt-12.5 mb-25">
      <Container>
        <div className="flex gap-2 mb-10 items-center">
          <h2 className="text-[36px] font-bold text-gray-900">Избранное</h2>
          <span className="text-orange text-2xl font-bold">({totalCount})</span>
        </div>

        {totalCount === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Здесь пока пусто
            </h3>
            <p className="text-gray-500">
              Добавляйте события в планы, чтобы не потерять их!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {/* Официальные события */}
            {favoritePosters.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-8">Официальные события</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favoritePosters.map((poster) => (
                    <OfficialPosterCard
                      key={`official-${poster.id}`}
                      {...poster}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Встречи пользователей */}
            {favoriteMeetings.length > 0 && (
              <section>
                <h3 className="text-2xl font-bold mb-8">
                  Встречи пользователей
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favoriteMeetings.map((meeting) => (
                    <MeetingCard key={`regular-${meeting.id}`} {...meeting} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
