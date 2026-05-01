import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setIsLogin(true);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-[950px] h-auto min-h-[600px] rounded-[40px] overflow-hidden flex shadow-2xl animate-in fade-in zoom-in duration-300 my-8">
        <div className="hidden md:flex w-[45%] bg-[#F15431] relative p-12 flex-col justify-end self-stretch">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 2px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <p className="relative z-10 text-white text-lg">
            {isLogin ? "Нет аккаунта? " : "Есть аккаунт? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold underline decoration-1 underline-offset-4 hover:opacity-80 transition-opacity cursor-pointer"
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>

        <div className="flex-1 p-12 md:p-16 flex flex-col relative justify-center">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-orange-600 hover:rotate-90 transition-transform duration-300"
          >
            <X size={32} />
          </button>

          <h2 className="text-[36px] font-bold text-gray-900 mb-12">
            {isLogin ? "Войти" : "Регистрация"}
          </h2>

          <form
            className="flex flex-col gap-10"
            onSubmit={(e) => e.preventDefault()}
          >
            {!isLogin && (
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Имя
                  </label>
                  <input
                    type="text"
                    placeholder="Иван"
                    className="border-b-2 border-gray-200 py-2 outline-none focus:border-[#F15431] transition-colors text-lg placeholder:text-gray-300"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    placeholder="Иванов"
                    className="border-b-2 border-gray-200 py-2 outline-none focus:border-[#F15431] transition-colors text-lg placeholder:text-gray-300"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Почта
              </label>
              <input
                type="email"
                placeholder="pochta@mail.ru"
                className="border-b-2 border-gray-200 py-2 outline-none focus:border-[#F15431] transition-colors text-lg placeholder:text-gray-300"
              />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Пароль
              </label>
              <input
                type="password"
                placeholder="password"
                className="border-b-2 border-gray-200 py-2 outline-none focus:border-[#F15431] transition-colors text-lg placeholder:text-gray-300"
              />
              {isLogin && (
                <a
                  href="#"
                  className="opacity-60 text-[14px] hover:text-[#F15431] transition-colors"
                >
                  Забыли пароль?
                </a>
              )}
            </div>

            {!isLogin && (
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="policy"
                  className="mt-1 w-5 h-5 accent-[#F15431] cursor-pointer"
                />
                <label
                  htmlFor="policy"
                  className="text-[13px] text-gray-500 leading-4.5 cursor-pointer"
                >
                  Принимаю условия политики конфиденциальности
                </label>
              </div>
            )}

            <button className="mt-4 bg-[#F15431] text-white py-5 rounded-2xl font-semibold hover:bg-[#d94a2b] transition-all active:scale-[0.98]">
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
