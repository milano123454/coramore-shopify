import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
});

export const getContent = () => api.get("/content").then((r) => r.data);
