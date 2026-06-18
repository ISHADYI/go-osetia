import React, { useState, useEffect, useRef } from "react";
import { useRequest } from "../../hooks/useRequest";

export default function ConfirmForm({ email }) {
  const [timer, setTimer] = useState(59);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const codeRefs = useRef([]);

  const { isLoading, error, sendData, setError } = useRequest();

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleCodeChange = (index, value) => {
    if (isNaN(value) || value.includes(" ")) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      codeRefs.current[index + 1].focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1].focus();
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join("");

    if (fullCode.length < 6) {
      setError("Введите полный код из 6 цифр");
      return;
    }

    const result = await sendData(
      "http://localhost:3000/api/auth/verify-email",
      "POST",
      { email, code: fullCode },
    );

    if (result.success) {
      console.log("Успешное подтверждение!");
      localStorage.setItem(
        "user",
        JSON.stringify({ email: email, firstName: "Пользователь" }),
      );
      window.location.reload();
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <h2 className="text-[36px] font-bold text-gray-900 mb-2">Введите код</h2>
      <p className="text-gray-500 mb-10 text-lg">
        Отправили письмо на {email || "вашу почту"}
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
            className="w-12 h-16 border-2 border-orange-100 rounded-2xl text-center text-2xl font-bold outline-none focus:border-[#F15431] focus:shadow-[0_0_0_4px_rgba(241,84,49,0.1)] transition-all"
            autoFocus={i === 0}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
      )}

      <p className="text-gray-400 text-sm mb-10">
        Запросить новый код можно через {timer} сек.
      </p>

      <button
        onClick={handleConfirm}
        disabled={isLoading}
        className="w-full bg-[#F15431] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#d94a2b] transition-all active:scale-[0.98] shadow-lg shadow-orange-100 disabled:opacity-70"
      >
        {isLoading ? "Проверка..." : "Подтвердить"}
      </button>
    </div>
  );
}
