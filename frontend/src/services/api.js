import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // backend corre en 3001
});

// Funciones para pedidos
export const getUserOrders = (userId) => api.get(`/orders/user/${userId}`);
export const createOrder = (orderData) => api.post("/orders", orderData);

export default api;
