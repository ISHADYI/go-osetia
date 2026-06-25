import { useState } from "react";

export function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendData = async (url, method = "GET", body) => {
    setIsLoading(true);
    setError("");

    try {
      const options = {
        method: method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Достаем токен и прикрепляем его к запросу
      const token = localStorage.getItem("token");
      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
      }

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 401) {
          setError("Ошибка авторизации. Пожалуйста, войдите заново.");
          return { success: false, c: 3 };
        }
        // Выводим статус, если произошла 400 ошибка
        setError(`Произошла ошибка: статус ${response.status}`);
        return { success: false, b: 2 };
      }

      return { success: true, data: await response.json() };
    } catch (err) {
      setError("Ошибка сети: не удалось связаться с сервером");
      return { success: false, a: 1 };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendData, setError };
}
