import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { useRequest } from "../../hooks/useRequest";

export default function ForgotPasswordForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const { isLoading, error, sendData, setError } = useRequest();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Пожалуйста, введите почту");
      return;
    }

    const result = await sendData(
      "http://localhost:3000/api/auth/forgot-password",
      "POST",
      { email },
    );

    if (result.success) {
      onSuccess(email);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-[36px] font-bold text-gray-900 mb-4">
        Восстановление
      </h2>
      <p className="text-gray-500 mb-10 text-lg">
        Введите почту, и мы пришлем код для сброса пароля
      </p>

      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <InputGroup
          label="Почта"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="pochta@mail.ru"
          type="email"
        />

        {error && (
          <p className="text-red-500 text-sm mt-[-20px] font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#F15431] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#d94a2b] transition-all active:scale-[0.98] shadow-lg shadow-orange-100 disabled:opacity-70"
        >
          {isLoading ? "Отправка..." : "Получить код"}
        </button>
      </form>
    </div>
  );
}
