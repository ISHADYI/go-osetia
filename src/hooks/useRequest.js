import { useState } from "react";

export function useRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendData = async (url, method, body) => {
    setIsLoading(true);
    setError("");

    try {
      const options = {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status === 401) {
          setError("Вы ввели неверный пароль");
          return { success: false };
        }
        // Если бэкенд вернул ошибку (400 или 409)
        setError(`Произошла ошибка: статус ${response.status}`);
        return { success: false };
      }

      return { success: true };
    } catch (err) {
      setError("Ошибка сети: не удалось связаться с сервером");
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendData, setError };
}
