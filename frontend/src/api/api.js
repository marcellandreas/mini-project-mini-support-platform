import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-project-mini-support-platform-amber.vercel.app",
});

export default API;
