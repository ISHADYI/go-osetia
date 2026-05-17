import React from "react";
import Container from "../components/ui/Container";
import MeetingCard from "../components/ui/MeetingCard";
import { useFavorites } from "../context/FavoritesContext";
import { MEETINGS_DATA } from "../data/meetingsData";
import { Heart } from "lucide-react";

export function PlansPage() {
  const { favorites } = useFavorites();

  const favoriteMeetings = MEETINGS_DATA.filter((meeting) =>
    favorites.includes(meeting.id),
  );

  return (
    <div className="mt-12.5 mb-25">
      <Container>
        <div className="flex gap-2 mb-10">
          <h2 className="font-bold">Избранное</h2>
          <p className="text-orange size-3 font-semibold">
            ({favoriteMeetings.length})
          </p>
        </div>

        {favoriteMeetings.length === 0 ? (
          <h3 className="text-black text-center">Здесь пока пусто</h3>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} {...meeting} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
