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
    const response = await apiClient.get("/car");
    return response.data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

export const getRequests = async () => {
  try {
    const response = await apiClient.get("/request");
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};

export const getStatuses = async () => {
  try {
    const response = await apiClient.get("/status");
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

// Функции для работы с заказами

export const createRequest = async (requestData) => {
  try {
    const response = await apiClient.post("/request", requestData);
    console.log(response);
    return response.data; // Возвращаем сообщение об успешном создании заказа и его ID
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

export const updateRequest = async (id, id_status) => {
  try {
    const response = await apiClient.put(`/request/${id}`, { id_status });
    return response.data;
  } catch (error) {
    console.error("Error updating request:", error);
    throw error;
  }
};

export const deleteRequest = async (id) => {
  try {
    const response = await apiClient.delete(`/request/${id}`);
    return response.data; // Возвращаем сообщение об успешном удалении заказа
  } catch (error) {
    console.error("Error deleting request:", error);
    throw error;
  }
};

export default apiClient;
