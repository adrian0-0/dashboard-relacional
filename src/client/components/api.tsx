import axios from "axios";

const axios_path = "http://localhost:8080";

const api = axios.create({
  baseURL: axios_path,
});

export default api;
