import React, { useState } from "react";
import Container from "../components/ui/Container";
import {
  Upload,
  Calendar,
  Clock,
  MapPin,
  Coins,
  Users,
  FileText,
  X,
} from "lucide-react";

export function CreateMeetingPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [priceType, setPriceType] = useState("free");
  const [priceValue, setPriceValue] = useState("");
  const [ageRange, setAgeRange] = useState("20-25");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);

  // фото
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  // теги
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const AVAILABLE_TAGS = [
    "Настолки",
    "Спорт",
    "Прогулки",
    "IT & Кодинг",
    "Творчество",
    "Кино",
    "Языки",
    "Лекции",
    "Кофе",
    "Походы",
    "Книги",
    "Игры",
    "Активный отдых",
    "Кулинария",
    "Экстрим",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const meetingData = {
      title,
      description,
      date,
      time,
      location,
      price: priceType === "free" ? 0 : Number(priceValue),
      ageRange,
      image,
      tags: selectedTags,
    };
    console.log("Данные новой встречи:", meetingData);
    alert("Встреча успешно создана! (Пока в консоли)");
  };

  return (
    <div className="py-12 min-h-screen bg-white">
      <Container>
        <div className="max-w-[800px] mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <h1 className="font-black text-black mb-2">
              Создать новую встречу
            </h1>
            <p className="text-black/80">
              Заполните форму, чтобы собрать компанию единомышленников во
              Владикавказе
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-[#FAFAFA] rounded-[22px] border border-black p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                Обложка встречи
              </h2>

              {!imagePreview ? (
                <label className="border-2 border-dashed border-gray-200 hover:border-orange/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors bg-gray-50/50">
                  <div className="p-4 bg-orange-50 text-orange rounded-full">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-bold text-black block">
                      Загрузите картинку
                    </span>
                    <span className="text-xs text-black/50 mt-1 block">
                      Рекомендуется горизонтальная, до 5 МБ
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative aspect-video rounded-2xl overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Превью"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-[#FAFAFA] rounded-[22px] border border-black p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-50 pb-2 flex items-center gap-2">
                <FileText size={18} className="text-orange" />О встрече
              </h2>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Название встречи
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например: Настолки в коворкинге или Прогулка на конях"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange text-gray-900 placeholder:text-gray-400 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Описание
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Расскажите, чем будете заниматься, кого ждете и что взять с собой..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange text-gray-900 placeholder:text-gray-400 transition-all font-medium resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Теги встречи
                </label>
                <p className="text-xs text-gray-400 mb-3">
                  Выберите один или несколько тегов, чтобы пользователям было
                  легче найти вашу встречу
                </p>

                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-orange text-white border-orange shadow-sm"
                            : "bg-gray-100 text-black/80 border-black/10 hover:border-gray-400"
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-[#FAFAFA] rounded-[22px] border border-black p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-50 pb-2 flex items-center gap-2">
                <MapPin size={18} className="text-orange" />
                Когда и где
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                    <Calendar size={14} /> Дата
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange text-gray-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                    <Clock size={14} /> Время начала
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange text-gray-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Место проведения
                </label>
                <input
                  type="text"
                  required
                  placeholder="Улица, название заведения или 'Онлайн'"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange text-gray-900 placeholder:text-gray-400 transition-all font-medium"
                />
              </div>
            </div>

            <div className="bg-[#FAFAFA] rounded-[22px] border border-black p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-black border-b border-gray-50 pb-2 flex items-center gap-2">
                <Coins size={18} className="text-orange" />
                Стоимость и условия
              </h2>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Вход
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPriceType("free")}
                    className={`p-4 rounded-2xl font-bold transition-all border text-sm cursor-pointer ${
                      priceType === "free"
                        ? "bg-orange/10 border-orange text-orange"
                        : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Бесплатно
                  </button>
                  <button
                    type="button"
                    onClick={() => setPriceType("paid")}
                    className={`p-4 rounded-2xl font-bold transition-all border text-sm cursor-pointer ${
                      priceType === "paid"
                        ? "bg-orange/10 border-orange text-orange"
                        : "bg-gray-100 border-transparent text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Платно
                  </button>
                </div>
              </div>

              {priceType === "paid" && (
                <div className="animate-fadeIn">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Цена (в рублях)
                  </label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      required={priceType === "paid"}
                      min="200"
                      placeholder="500"
                      value={priceValue}
                      onChange={(e) => setPriceValue(e.target.value)}
                      className="w-full bg-gray-100 border-none p-4 pr-12 rounded-2xl outline-none focus:ring-1 focus:ring-orange text-gray-900 font-medium"
                    />
                    <span className="absolute right-5 font-bold text-gray-400">
                      ₽
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Users size={14} /> Возраст участников
                </label>
                <select
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                  className="w-full bg-gray-100 border-none p-4 rounded-2xl outline-none focus:ring-1 focus:ring-orange text-gray-900 font-medium cursor-pointer"
                >
                  <option value="Без ограничений">Без ограничений</option>
                  <option value="16-19 лет">16-19 лет</option>
                  <option value="20-25 лет">20-25 лет</option>
                  <option value="26-35 лет">26-35 лет</option>
                  <option value="35+ лет">35+ лет</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto py-4 px-12 bg-orange text-white font-bold rounded-[100px] hover:bg-[#d44324] transition-all duration-300 active:scale-95 shadow-md shadow-orange/20 text-center cursor-pointer"
              >
                Опубликовать встречу
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}
