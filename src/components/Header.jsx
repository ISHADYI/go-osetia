import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import Container from "./ui/Container";
import { Logo } from "./ui/Logo";
import ButtonLink from "./ui/ButtonLink";
import AuthModal from "./ui/AuthModal";
import SearchBar from "./ui/SearchBar";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Ошибка чтения данных пользователя");
      }
    }
  }, []);

  useEffect(() => {
    const handleOpenAuth = () => setIsAuthOpen(true);
    window.addEventListener("open-auth-modal", handleOpenAuth);

    return () => {
      window.removeEventListener("open-auth-modal", handleOpenAuth);
    };
  }, []);

  const handlePlansClick = (e) => {
    if (!user) {
      e.preventDefault();
      setIsAuthOpen(true);
    }
  };

  const handleCreateMeetingClick = (e) => {
    if (!user) {
      e.preventDefault();
      setIsAuthOpen(true);
    }
  };

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
            </nav>
          </div>

          <SearchBar
            isActive={isSearchActive}
            onClose={() => setIsSearchActive(false)}
          />

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
                onClick={handlePlansClick}
              />

              {user ? (
                <Link
                  to="/profile"
                  className="group flex items-center gap-3 ml-2 border-r border-gray-200 pr-4"
                  title="В профиль"
                >
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange flex items-center justify-center font-bold text-lg shadow-sm transition-all group-hover:bg-orange group-hover:text-white">
                    {user.firstName
                      ? user.firstName[0].toUpperCase()
                      : user.email[0].toUpperCase()}
                  </div>
                  <span className="font-semibold text-black whitespace-nowrap transition-colors group-hover:text-orange">
                    {user.firstName || user.email}
                  </span>
                </Link>
              ) : (
                <ButtonLink
                  text="Войти"
                  icon={userIcon}
                  variant="header"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAuthOpen(true);
                  }}
                />
              )}

              <ButtonLink
                to="/create-meeting"
                text="Создать встречу"
                variant="orangeFill"
                onClick={handleCreateMeetingClick}
              />
            </div>
          </div>
        </header>
      </Container>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
