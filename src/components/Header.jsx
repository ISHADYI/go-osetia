import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import Container from "./ui/Container";
import { Logo } from "./ui/Logo";
import ButtonLink from "./ui/ButtonLink";
import AuthModal from "./ui/AuthModal";

import heartIcon from "../assets/icons/heart-outline.svg";
import userIcon from "../assets/icons/user.svg";

const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchActive) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [isSearchActive]);

  const navLinkClass = ({ isActive }) =>
    `font-semibold transition-colors hover:text-orange whitespace-nowrap ${isActive ? "text-orange" : "text-black"}`;

  return (
    <div className="relative z-100 bg-white">
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300 ${
          isSearchActive ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSearchActive(false)}
      />

      <Container>
        <header className="relative flex items-center justify-between py-6">
          <div
            className={`flex items-center gap-10 transition-all duration-300 ${
              isSearchActive
                ? "opacity-0 invisible -translate-x-4 pointer-events-none"
                : "opacity-100 visible"
            }`}
          >
            <Logo />

            <nav className="flex items-center gap-6">
              <NavLink to="/" className={navLinkClass}>
                Главная
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                О нас
              </NavLink>
              <NavLink to="/categories" className={navLinkClass}>
                Категории
              </NavLink>
              <NavLink to="/support" className={navLinkClass}>
                Поддержка
              </NavLink>

              {/* <div className="relative group cursor-pointer whitespace-nowrap">
                <div className="flex items-center gap-1 font-semibold text-black hover:text-orange transition-colors">
                  Интересные места
                  <svg
                    className="w-3 h-3 transition-transform group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 min-w-[220px] flex flex-col gap-1">
                    <Link
                      to="/places/coworking"
                      className="px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-50 hover:text-orange rounded-xl transition-colors"
                    >
                      Коворкинги
                    </Link>
                    <Link
                      to="/places/restaurants"
                      className="px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-50 hover:text-orange rounded-xl transition-colors"
                    >
                      Кафе
                    </Link>
                    <Link
                      to="/places/parks"
                      className="px-4 py-2.5 text-sm font-semibold text-black hover:bg-orange-50 hover:text-orange rounded-xl transition-colors"
                    >
                      Парки и зоны отдыха
                    </Link>
                  </div>
                </div>
              </div> */}
            </nav>
          </div>

          <div
            className={`absolute left-1/2 -translate-x-1/2 w-full max-w-[650px] transition-all duration-500 ease-out z-50 px-4 ${
              isSearchActive
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="relative flex items-center">
              <div className="absolute left-5 text-orange">
                <SearchIcon />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Поиск встреч..."
                className="w-full bg-gray-50 border-none py-4 pl-14 pr-14 rounded-2xl outline-none focus:ring-1 focus:ring-orange transition-all"
                onKeyDown={(e) =>
                  e.key === "Escape" && setIsSearchActive(false)
                }
              />
              <button
                onClick={() => setIsSearchActive(false)}
                className="absolute right-5 text-gray-400 hover:text-black transition-colors p-1"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 z-10 flex-shrink-0">
            {!isSearchActive && (
              <button
                onClick={() => setIsSearchActive(true)}
                className="p-2.5 text-black hover:text-orange transition-all rounded-full cursor-pointer"
              >
                <SearchIcon />
              </button>
            )}

            <div
              className={`flex items-center gap-4 transition-all duration-300 ${
                isSearchActive
                  ? "opacity-0 invisible translate-x-4 pointer-events-none"
                  : "opacity-100 visible"
              }`}
            >
              <ButtonLink
                to="/plans"
                text="Мои планы"
                icon={heartIcon}
                variant="header"
              />
              <ButtonLink
                text="Войти"
                icon={userIcon}
                variant="header"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAuthOpen(true);
                }}
              />
              <ButtonLink
                to="/create-meeting"
                text="Создать встречу"
                variant="orangeFill"
              />
            </div>
          </div>
        </header>
      </Container>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
