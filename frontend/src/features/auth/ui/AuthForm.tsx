import React from "react";
import { Link } from "react-router-dom";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const isLogin = type === "login";

  return (
    
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 min-w-screen min-h-screen flex items-center justify-center bg-[#f9f9f9]">
      
      <div className="bg-white shadow border rounded-lg p-8 max-w-lg w-full transition-all duration-500 ease-in-out animate-fadeIn">
        <div className="text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-gray-900">
            {isLogin ? "С возвращением!" : "Создайте аккаунт"} 
          </h1>
          <p className="mt-4 text-gray-700">
            {isLogin
              ? "Мы претворяем идеи в жизнь!"
              : "Начните совместную работу с вашей командой и организуйте свои идеи визуально в реальном времени."}
          </p>
        </div>

        <form className="mb-0 mt-8 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="sr-only" htmlFor="email">Электронная почта</label>
            <div className="relative">
              <input
                placeholder="Введите адрес электронной почты"
                className="w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="email"
                type="email"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="password">Пароль</label>
            <div className="relative">
              <input
                placeholder="Введите пароль"
                className="w-full rounded-lg border border-gray-300 p-4 pe-12 text-sm shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="password"
                type="password"
                required
              />
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              {isLogin ? (
                <>
                  Еще нет аккаунта?{" "}
                  <Link to="/register" className="underline text-purple-600">Создайте его</Link>
                </>
              ) : (
                <>
                  Уже есть аккаунт?{" "}
                  <Link to="/login" className="underline text-purple-600">Войдите</Link>
                </>
              )}
            </p>

            <button
              className="inline-block rounded-lg border border-transparent bg-purple-600 px-5 py-3 text-sm font-medium text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
