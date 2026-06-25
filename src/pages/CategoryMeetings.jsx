import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/ui/Container";
import MeetingCard from "../components/ui/MeetingCard";
import FilterBar from "../components/ui/FilterBar";
import Pagination from "../components/ui/Pagination";
import { ChevronLeft } from "lucide-react";
import { API_BASE_URL } from "../configs/auth";
import { useRequest } from "../hooks/useRequest";
import { normalizeEvent } from "../utils/normalizeEvent";

const ITEMS_PER_PAGE = 16;

const CATEGORY_MAPPING = {
  Настолки: "GAMES",
  "Настольные игры": "GAMES",
  Спорт: "SPORT",
  "Активный отдых": "SPORT",
  Прогулки: "TRAVEL",
  Походы: "TRAVEL",
  Пикники: "TRAVEL",
  Творчество: "GAMES",
  Лекции: "TALKS",
  "IT & Кодинг": "TALKS",
  Языки: "TALKS",
  Книги: "BOOKS",
  Кино: "MUSIC",
  Кулинария: "REST",
  Кофе: "REST",
  Экстрим: "SPORT",
};

export function CategoryMeetings() {
  const { categoryName } = useParams();
  const decodedCategory = decodeURIComponent(categoryName || "").trim();

  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });
  const [dates, setDates] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);

  const { sendData } = useRequest();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      const res = await sendData(`${API_BASE_URL}/events?limit=50`);

      if (res.success && res.data) {
        const normalized = Array.isArray(res.data)
          ? res.data.map(normalizeEvent)
          : (res.data.events || []).map(normalizeEvent);

        setMeetings(normalized);
      } else {
        setMeetings([]);
      }
      setLoading(false);
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [ageRange, dates, sortOrder]);

  // Фильтрация по категории 
  const filteredMeetings = meetings.filter((meeting) => {
    const typeMatch =
      selectedTypes.length === 0 ||
      meeting.types.some((t) => selectedTypes.includes(t));

    let priceMatch = true;
    if (sortOrder === "free") {
      priceMatch = meeting.price === 0;
    } else if (sortOrder === "asc" || sortOrder === "desc") {
      priceMatch = meeting.price > 0;
    }

    const ageMatch =
      meeting.minAge >= ageRange.min && meeting.maxAge <= ageRange.max;

    return typeMatch && ageMatch && priceMatch;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedMeetings.length / ITEMS_PER_PAGE);
  const currentMeetings = sortedMeetings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <section className="py-10 mb-20">
        <Container>
          <div className="text-center py-20">Загрузка встреч...</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-10 mb-20">
      <Container>
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-orange mb-6 transition-colors no-underline"
        >
          <ChevronLeft size={16} /> На главную
        </Link>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h2 className="title-underline text-black font-body font-bold text-2xl md:text-3xl">
            Категория: {decodedCategory} ({filteredMeetings.length})
          </h2>

          <FilterBar
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            setDates={setDates}
            setSortOrder={setSortOrder}
            showTypeFilter={false}
          />
        </div>

        {currentMeetings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentMeetings.map((meeting) => (
              <MeetingCard key={meeting.id} {...meeting} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400 font-medium">
            Встреч в категории "{decodedCategory}" пока не найдено :(
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </section>
  );
}
