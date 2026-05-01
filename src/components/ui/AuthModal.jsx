import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [timer, setTimer] = useState(59);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [code, setCode] = useState(["", "", "", ""]);
  const codeRefs = useRef([]);

  useEffect(() => {
    if (mode !== "confirm" || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [mode, timer]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (!isOpen) {
      setTimeout(() => {
        setMode("login");
        setTimer(59);
        setCode(["", "", "", ""]);
        setFormData({ firstName: "", lastName: "", email: "", password: "" });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCodeChange = (index, value) => {
    if (isNaN(value) || value.includes(" ")) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      codeRefs.current[index + 1].focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1].focus();
    }
  };

  const hint = mode === "login" ? "Нет аккаунта? " : "Есть аккаунт? ";
  const action = mode === "login" ? "Зарегистрироваться" : "Войти";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-[950px] min-h-[600px] rounded-[40px] overflow-hidden flex shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="hidden md:flex w-[45%] bg-[#F15431] relative p-12 flex-col justify-end">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 2px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />
          <p className="relative z-10 text-white text-lg">
            {hint}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
              className="font-semibold underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
            >
              {action}
            </button>
          </p>
        </div>

        <div className="flex-1 p-12 md:p-16 flex flex-col relative justify-center">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 text-[#F15431] hover:rotate-90 transition-transform duration-300"
          >
            <X size={32} />
          </button>

          {mode === "confirm" ? (
            <div className="animate-in slide-in-from-right duration-500">
              <h2 className="text-[36px] font-bold text-gray-900 mb-2">
                Введите код
              </h2>
              <p className="text-gray-500 mb-10 text-lg">
                Отправили письмо на {formData.email || "вашу почту"}
              </p>

              <div className="flex gap-4 mb-10">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (codeRefs.current[i] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    className="w-16 h-20 border-2 border-orange-100 rounded-2xl text-center text-2xl font-bold outline-none focus:border-[#F15431] focus:shadow-[0_0_0_4px_rgba(241,84,49,0.1)] transition-all"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              <p className="text-gray-400 text-sm mb-10">
                Запросить новый код можно через {timer} сек.
              </p>

              <button
                onClick={() => console.log("Отправляем код:", code.join(""))}
                className="w-full bg-[#F15431] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#d94a2b] transition-all active:scale-[0.98] shadow-lg shadow-orange-100"
              >
                Подтвердить
              </button>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-[36px] font-bold text-gray-900 mb-12">
                {mode === "login" ? "Войти" : "Регистрация"}
              </h2>

              <form
                className="flex flex-col gap-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  // имитация входа
                  if (mode === "register") setMode("confirm");
                  else console.log("Вход:", formData.email);
                }}
              >
                {mode === "register" && (
                  <div className="grid grid-cols-2 gap-8">
                    <InputGroup
                      label="Имя"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Иван"
                    />
                    <InputGroup
                      label="Фамилия"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Иванов"
                    />
                  </div>
                )}

                <InputGroup
                  label="Почта"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="pochta@mail.ru"
                  type="email"
                />

                <div className="relative">
                  <InputGroup
                    label="Пароль"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="password"
                    type="password"
                  />
                  {mode === "login" && (
                    <button
                      type="button"
                      className="absolute -bottom-7 left-0 text-sm text-gray-400 hover:text-[#F15431] transition-colors"
                    >
                      Забыли пароль?
                    </button>
                  )}
                </div>

                {mode === "register" && (
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 w-5 h-5 accent-[#F15431] cursor-pointer"
                      required
                    />
                    <span className="text-[13px]/[18px] text-gray-500 group-hover:text-gray-700 transition-colors">
                      Принимаю условия политики конфиденциальности
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  className="mt-4 bg-[#F15431] text-white py-5 rounded-2xl font-semibold hover:bg-[#d94a2b] transition-all active:scale-[0.98]"
                >
                  {mode === "login" ? "Войти" : "Зарегистрироваться"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InputGroup({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        className="border-b-2 border-gray-200 py-2 outline-none focus:border-[#F15431] transition-colors text-lg placeholder:text-gray-300 bg-transparent"
      />
    </div>
  );
}
