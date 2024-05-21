import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

////////////////////////////////////////////////////////////
////////////////////   GET START   /////////////////////////
////////////////////////////////////////////////////////////

export const getUsers = async () => {
  try {
    const response = await apiClient.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id_user) => {
  try {
    const response = await apiClient.get(`/user/${id_user}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const orders = await apiClient.get("/orders");
    const product = await apiClient.get(`/products`);
    const status = await apiClient.get(`/status`);
    return {
      orders: orders.data,
      products: product.data,
      statuses: status.data,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const getOrdersById = async (id_user) => {
  try {
    const order = await apiClient.get(`/orders/${id_user}`);
    const product = await apiClient.get(`/products`);
    const status = await apiClient.get(`/status`);
    return {
      order: order.data,
      product: product.data,
      status: status.data,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await apiClient.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

////////////////////////////////////////////////////////////
////////////////////   Login, Reg, Logout   ////////////////
////////////////////////////////////////////////////////////

// Функции для входа, регистрации и выхода
export const login = async (data) => {
  try {
    const response = await apiClient.post("/login", data);
    return response.data; // Возвращаем токен
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await apiClient.post("/register", data);
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

////////////////////////////////////////////////////////////
////////////////////  CRUD START   /////////////////////////
////////////////////////////////////////////////////////////

export const createOrder = async (requestData) => {
  try {
    const response = await apiClient.post("/order", requestData);
    console.log(response);
    return response.data; // Возвращаем сообщение об успешном создании заказа и его ID
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const updateOrder = async (id, id_status) => {
  try {
    const response = await apiClient.put(`/order/${id}`, { id_status });
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

export default apiClient;
