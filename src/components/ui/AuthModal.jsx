import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ConfirmForm from "./ConfirmForm";
import ForgotPasswordForm from "./ForgotPasswordForm";
import ResetPasswordForm from "./ResetPasswordForm";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    if (!isOpen) {
      setTimeout(() => {
        setMode("login");
        setRegisteredEmail("");
        setResetEmail("");
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  let hint = "Есть аккаунт? ";
  let action = "Войти";

  if (mode === "login") {
    hint = "Нет аккаунта? ";
    action = "Зарегистрироваться";
  } else if (mode === "forgot" || mode === "reset") {
    hint = "Вспомнили пароль? ";
    action = "Войти";
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-[950px] min-h-[600px] rounded-[22px] overflow-hidden flex shadow-2xl animate-in fade-in zoom-in duration-300">
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
            className="absolute top-8 right-8 text-orange hover:rotate-90 transition-transform duration-300"
          >
            <X size={32} />
          </button>

          {mode === "login" && (
            <LoginForm onForgotPassword={() => setMode("forgot")} />
          )}

          {mode === "register" && (
            <RegisterForm
              onSuccess={(email) => {
                setRegisteredEmail(email);
                setMode("confirm");
              }}
            />
          )}

          {mode === "confirm" && <ConfirmForm email={registeredEmail} />}

          {mode === "forgot" && (
            <ForgotPasswordForm
              onSuccess={(email) => {
                setResetEmail(email);
                setMode("reset");
              }}
            />
          )}

          {mode === "reset" && (
            <ResetPasswordForm
              email={resetEmail}
              onSuccess={() => setMode("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
