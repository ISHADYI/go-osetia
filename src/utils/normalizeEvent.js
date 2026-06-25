export const normalizeEvent = (event) => {
  if (!event) return null;

  const CATEGORY_RU = {
    GAMES: "Настолки",
    SPORT: "Спорт",
    TRAVEL: "Прогулки",
    TALKS: "Лекции",
    BOOKS: "Книги",
    MUSIC: "Кино",
    REST: "Кофе",
    ART: "Творчество",
  };

  const typesRu = (event.categories || []).map(
    (code) => CATEGORY_RU[code] || code,
  );

  return {
    id: event.id || event._id,
    title: event.name || "Без названия",
    types: typesRu,
    price: event.price || 0,
    minAge: event.minAge || 0,
    maxAge: event.maxAge || 100,
    location: event.address || "Место не указано",
    date: event.date
      ? new Date(event.date).toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "Дата не указана",
    image: event.image || "/images/placeholder-event.jpg",
    description: event.description || "",
  };
};
