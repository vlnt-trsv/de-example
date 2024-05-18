import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Создаем контекст
const AuthContext = createContext();

// Провайдер контекста
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Проверка статуса аутентификации при монтировании компонента
    const checkAuth = () => {
      // Здесь можно добавить логику для проверки токена или куки
      const token = localStorage.getItem("token");
      if (token) {
        console.info("Доступ разрешён!");
        setIsAuthenticated(true);
      } else {
        console.error("Нужен токен!");
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (token, user) => {
    // Логика для входа пользователя
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    navigate("/profile");
  };

  const logout = () => {
    // Логика для выхода пользователя
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Загрузка...</div>; // Показываем загрузочный экран, пока данные проверяются
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования контекста аутентификации
export const useAuth = () => {
  return useContext(AuthContext);
};
