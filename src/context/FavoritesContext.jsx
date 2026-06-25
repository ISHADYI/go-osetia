import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Достаем текущего пользователя и токен
  const storedUser = localStorage.getItem("user");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;
  const token = localStorage.getItem("token");

  // Динамический ключ: у каждого аккаунта теперь СВОЕ избранное
  const storageKey = currentUser?.email
    ? `go_ossetia_favorites_${currentUser.email}`
    : "go_ossetia_favorites_guest";

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // При смене пользователя загружаем его персональный список
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setFavorites(saved ? JSON.parse(saved) : []);
  }, [storageKey]);

  const toggleFavorite = async (id, type = "regular") => {
    const itemKey = `${type}-${id}`;
    const isFav = favorites.includes(itemKey);

    // Сначала мгновенно обновляем интерфейс (оптимистичный UI)
    let updatedFavorites;
    if (isFav) {
      updatedFavorites = favorites.filter((favId) => favId !== itemKey);
    } else {
      updatedFavorites = [...favorites, itemKey];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(storageKey, JSON.stringify(updatedFavorites));

    // Если пользователь авторизован, отправляем изменения на сервер
    if (token) {
      try {
        const endpoint = isFav
          ? `http://localhost:3000/api/events/${id}/unfavorite`
          : `http://localhost:3000/api/events/${id}/favorite`;

        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Ошибка синхронизации с сервером:", error);
      }
    }
  };

  // Проверка по составному ключу (тип + id)
  const isFavorite = (id, type = "regular") => {
    return favorites.includes(`${type}-${id}`);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
