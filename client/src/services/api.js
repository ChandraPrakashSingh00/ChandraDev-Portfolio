import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const sendContact = (data) => API.post("/contact", data);
export const sendHire = (data) => API.post("/hire", data);
