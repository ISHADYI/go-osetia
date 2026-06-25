import { useState, useEffect } from "react";
import Container from "./ui/Container";
import MeetingCard from "./ui/MeetingCard";
import Pagination from "./ui/Pagination";
import { API_BASE_URL } from "../configs/auth";
import { useRequest } from "../hooks/useRequest";
import { normalizeEvent } from "../utils/normalizeEvent";
import FilterBar from "./ui/FilterBar";

const ITEMS_PER_PAGE = 16;

export function AllMeetings() {
  const [selectedTypes, setSelectedTypes] = useState([]);
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
      }
      setLoading(false);
    };

    fetchMeetings();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTypes, ageRange, dates, sortOrder]);

  const filteredMeetings = meetings.filter((meeting) => {
    let typeMatch = true;
    if (selectedTypes.length > 0) {
      typeMatch = meeting.types.some((t) => selectedTypes.includes(t));
    }

    let priceMatch = true;
    if (sortOrder === "free") {
      priceMatch = meeting.price === 0;
    } else if (sortOrder === "asc" || sortOrder === "desc") {
      priceMatch = meeting.price > 0;
    }

    const ageMatch =
      meeting.minAge >= ageRange.min && meeting.maxAge <= ageRange.max;

    let dateMatch = true;
    if (dates.start && dates.end) {
      const meetingDate = new Date(meeting.date);
      dateMatch = meetingDate >= dates.start && meetingDate <= dates.end;
    }

    return typeMatch && priceMatch && ageMatch && dateMatch;
  });

  const sortedMeetings = [...filteredMeetings].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedMeetings.length / ITEMS_PER_PAGE);
  const currentMeetings = sortedMeetings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 1400, behavior: "smooth" });
  };

  if (loading) return <div className="text-center py-20">Загрузка встреч...</div>;

  return (
    <section className="mb-20">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h2 className="title-underline text-black">
            Все встречи ({filteredMeetings.length})
          </h2>

          <FilterBar
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            ageRange={ageRange}
            setAgeRange={setAgeRange}
            setDates={setDates}
            setSortOrder={setSortOrder}
            showTypeFilter={true}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} {...meeting} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </section>
  );
}