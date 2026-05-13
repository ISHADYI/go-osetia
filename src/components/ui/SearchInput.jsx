export default function SearchInput() {
  return (
    <div className="flex items-center bg-[#F2F2F2] rounded-full px-4 py-2.5 gap-3 w-full border border-transparent focus-within:border-gray-200 transition-all">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#666666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>

      <input
        className="bg-transparent outline-none w-full text-[14px] text-black placeholder:text-[#666666] placeholder:font-normal"
        type="text"
        placeholder="Поиск встреч и мероприятий"
      />
    </div>
  );
}
