import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-14 flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-black/80 bg-white border border-gray-200 rounded-xl transition-colors duration-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Назад
      </button>

      <div className="flex gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-200 ${
              currentPage === page
                ? "bg-orange text-white"
                : "bg-white text-black/80 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-black/80 bg-white border border-gray-200 rounded-xl transition-colors duration-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Вперед
      </button>
    </div>
  );
}
