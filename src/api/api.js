import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Функции для получения данных

export const getCars = async () => {
  try {
    const response = await apiClient.get("/cars");
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getRequests = async () => {
  try {
    const response = await apiClient.get("/requests");
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

export const getStatuses = async () => {
  try {
    const response = await apiClient.get("/statuses");
    return response.data;
  } catch (error) {
    console.error("Error fetching statuses:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const response = await apiClient.get("/user");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Функции для входа, регистрации и выхода
export const login = async (email, password) => {
  try {
    const response = await apiClient.post("/login", { email, password });
    console.log("@login", response);
    return response.data; // Возвращаем токен
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await apiClient.post("/register", userData);
    console.log("@reg", response);
    return response.data; // Возвращаем сообщение об успешной регистрации
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await apiClient.post("/logout");
    return response.data; // Возвращаем сообщение об успешном выходе
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export default apiClient;
