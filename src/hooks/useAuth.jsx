import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, logout, register } from "../api/api";

// Создаем контекст
const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка статуса аутентификации при монтировании компонента
    const checkAuth = async () => {
      try {
        // Предполагается, что у вас есть функция для проверки токена, например, из API
        const token = localStorage.getItem("token");
        if (token) {
          console.info("Доступ разрешён!");
          setIsAuthenticated(true);
        } else {
          console.error("Нужен токен!");
        }
      } catch (error) {
        console.error("Ошибка при проверке аутентификации:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  const handleLogin = async (email, password) => {
    try {
      const { token, user } = await login(email, password);
      console.log(user, token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      navigate("/profile");
    } catch (error) {
      console.error("Ошибка входа:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      console.info("Регистрация прошла успешно!", userData);
      handleLogin(userData.email, userData.password);
    } catch (error) {
      console.error("Ошибка регистрации:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const handleLogout = () => {
    try {
      logout();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      navigate("/auth");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };
  if (loading) {
    return <div>Загрузка...</div>; // Показываем загрузочный экран, пока данные проверяются
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = () => {
  return useContext(AuthContext);
};
