import React, { useState } from "react";
import InputGroup from "./InputGroup";
import { useRequest } from "../../hooks/useRequest";

export default function RegisterForm({ onChangeMode, onSuccess }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { isLoading, error, sendData, setError } = useRequest();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Пароль должен быть не менее 6 символов");
      return;
    }
    if (formData.firstName.length < 2 || formData.lastName.length < 2) {
      setError("Имя и фамилия должны содержать минимум 2 символа");
      return;
    }

    const result = await sendData(
      "http://localhost:3000/api/auth/register",
      "POST",
      formData,
    );

    if (result.success) {
      onSuccess(formData.email);
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <h2 className="text-[36px] font-bold text-gray-900 mb-12">Регистрация</h2>

      <form className="flex flex-col gap-10" onSubmit={handleRegister}>
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

        <InputGroup
          label="Почта"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="pochta@mail.ru"
          type="email"
        />

        <InputGroup
          label="Пароль"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="password"
          type="password"
        />
        {error && (
          <p className="text-red-500 text-sm mt-[-20px] font-medium">{error}</p>
        )}

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

        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-[#F15431] text-white py-5 rounded-2xl font-semibold hover:bg-[#d94a2b] transition-all active:scale-[0.98] disabled:opacity-70"
        >
          {isLoading ? "Загрузка..." : "Зарегистрироваться"}
        </button>
      </form>
    </div>
  );
}
