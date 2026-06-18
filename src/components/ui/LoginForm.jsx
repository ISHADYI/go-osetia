import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { useRequest } from "../../hooks/useRequest";

export default function LoginForm({ onForgotPassword }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { isLoading, error, sendData, setError } = useRequest();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    const result = await sendData(
      "http://localhost:3000/api/auth/login",
      "POST",
      formData,
    );

    if (result.success) {
      if (result.data?.token) localStorage.setItem("token", result.data.token);

      const userData = result.data?.user || {
        email: formData.email,
        firstName: "Пользователь",
      };
      localStorage.setItem("user", JSON.stringify(userData));

      window.location.reload();
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-[36px] font-bold text-black mb-12">Войти</h2>

      <form className="flex flex-col gap-10" onSubmit={handleLogin}>
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
          <button
            type="button"
            onClick={onForgotPassword}
            className="absolute -bottom-7 left-0 text-sm text-gray-400 hover:text-orange transition-colors cursor-pointer"
          >
            Забыли пароль?
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm font-medium mt-[-10px]">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-orange text-white py-5 rounded-2xl font-semibold hover:bg-[#d94a2b] transition-all active:scale-[0.98]"
        >
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}
