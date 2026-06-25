import React, { useState, useRef } from "react";
import InputGroup from "./InputGroup";
import { useRequest } from "../../hooks/useRequest";

export default function ResetPasswordForm({ email, onSuccess }) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const codeRefs = useRef([]);

  const { isLoading, error, sendData, setError } = useRequest();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");

    if (fullCode.length < 6) {
      setError("Введите полный код из 6 цифр");
      return;
    }

    if (newPassword.length < 8) {
      setError("Новый пароль должен быть не менее 8 символов");
      return;
    }

    const result = await sendData(
      "http://localhost:3000/api/auth/reset-password",
      "POST",
      {
        email,
        code: fullCode,
        newPassword,
      },
    );

    if (result.success) {
      onSuccess();
    }
  };

  return (
    <div className="animate-in slide-in-from-right duration-500">
      <h2 className="text-[36px] font-bold text-gray-900 mb-2">Сброс пароля</h2>
      <p className="text-gray-500 mb-8 text-lg">Код отправлен на {email}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div>
          <label className="text-sm font-bold text-gray-900 uppercase tracking-wider block mb-4">
            Код из письма
          </label>
          <div className="flex gap-4">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (codeRefs.current[i] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleCodeChange(i, e.target.value)}
                onKeyDown={(e) => handleCodeKeyDown(i, e)}
                className="w-12 h-16 border-2 border-orange-100 rounded-2xl text-center text-2xl font-bold outline-none focus:border-[#F15431] focus:shadow-[0_0_0_4px_rgba(241,84,49,0.1)] transition-all bg-transparent"
                autoFocus={i === 0}
              />
            ))}
          </div>
        </div>

        <InputGroup
          label="Новый пароль"
          name="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Минимум 8 символов"
          type="password"
        />

        {error && (
          <p className="text-red-500 text-sm font-medium mt-[-10px]">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-orange text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#d94a2b] transition-all active:scale-[0.98] shadow-lg shadow-orange-100 disabled:opacity-70"
        >
          {isLoading ? "Сохранение..." : "Изменить пароль"}
        </button>
      </form>
    </div>
  );
}
