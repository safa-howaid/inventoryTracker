import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-tracker-web.herokuapp.com/api",
});

export const insertProduct = (payload) => api.post(`/product`, payload);
export const getAllProducts = () => api.get(`/products`);
export const updateProductById = (id, payload) => api.put(`/product/${id}`, payload);
export const deleteProductById = (id) => api.delete(`/product/${id}`);
export const getProductById = (id) => api.get(`/product/${id}`);

export const insertShipment = (payload) => api.post(`/shipment`, payload);
export const getAllShipments = () => api.get(`/shipments`);
export const updateShipmentById = (id, payload) => api.put(`/shipment/${id}`, payload);
export const deleteShipmentById = (id) => api.delete(`/shipment/${id}`);
export const getShipmentById = (id) => api.get(`/shipment/${id}`);

const apis = {
  insertProduct,
  getAllProducts,
  updateProductById,
  deleteProductById,
  getProductById,
  insertShipment,
  getAllShipments,
  updateShipmentById,
  deleteShipmentById,
  getShipmentById,
};

export default apis;
