import React, { useState, useEffect } from "react";
import Container from "./ui/Container";
import { Logo } from "./ui/Logo";
import SearchInput from "./ui/SearchInput";
import ButtonLink from "./ui/ButtonLink";
import AuthModal from "./ui/AuthModal";

import heartIcon from "../assets/icons/heart-outline.svg";
import userIcon from "../assets/icons/user.svg";
import burgerMenu from "../assets/icons/menu-burger.svg";

export function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  useEffect(() => {
    if (isCatalogOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCatalogOpen]);

  return (
    <div className="relative z-[100]">
      <Container>
        <header className="relative z-50 flex items-center gap-6 justify-between mt-7.5 mb-12.5">
          <div className="flex items-center gap-9.5">
            <Logo />
            <ButtonLink
              href="#"
              text="Каталог"
              icon={burgerMenu}
              variant="notFill"
              onClick={(e) => {
                e.preventDefault();
                setIsCatalogOpen(!isCatalogOpen);
              }}
            />
          </div>
          <SearchInput />
          <div className="flex items-center gap-6">
            <ButtonLink
              href="#"
              text="Мои планы"
              icon={heartIcon}
              variant="notFill"
            />
            {/* href указывать в {}? */}
            <ButtonLink
              href="#"
              text="Войти"
              icon={userIcon}
              variant="notFill"
              onClick={(e) => {
                e.preventDefault();
                setIsAuthOpen(true);
              }}
            />
          </div>
        </header>
      </Container>

      {/* Открытй каталог */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl transition-all duration-300 origin-top z-40 ${
          isCatalogOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }`}
      >
        <Container className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="font-bold text-xl mb-6 text-[#0F0F10]">
                Мероприятия
              </h3>
              <ul className="flex flex-col gap-4 text-[#0F0F10] opacity-80">
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/events/concerts">Концерты</a>
                </li>
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/events/exhibitions">Выставки</a>
                </li>
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 cursor-pointer transition-colors">
                  <a href="/events/master-classes">Мастер-классы</a>
                </li>
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 cursor-pointer transition-colors">
                  <a href="/events/sport">Спорт</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-[#0F0F10]">
                Интересные места
              </h3>
              <ul className="flex flex-col gap-4 text-[#0F0F10] opacity-80">
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/places/restaurants">Рестораны и кафе</a>
                </li>
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/places/parks">Парки и зоны отдыха</a>
                </li>
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/places/coworking">Коворкинги</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-xl mb-6 text-[#0F0F10]">
                О проекте
              </h3>
              <ul className="flex flex-col gap-4 text-[#0F0F10] opacity-80">
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/map">Карта Владикавказа</a>
                </li>
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/support">Поддержка</a>
                </li>
                <li className="w-fit hover:text-[#F15431] hover:opacity-100 transition-colors">
                  <a href="/contacts">Контакты</a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {isCatalogOpen && (
        <div
          className="fixed inset-0 top-[100px] bg-black/40 z-30 backdrop-blur-md transition-opacity"
          onClick={() => setIsCatalogOpen(false)}
        />
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
