import axios from "axios";
import { toast } from "react-toastify";

const socketLink = import.meta.env.VITE_REACT_APP_SOCKET_BASE_URL;
const imsLink = import.meta.env.VITE_REACT_APP_API_BASE_URL;

// Function to get the token dynamically
const getToken = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return loggedInUser?.token  || null;
};

// Function to get other data dynamically
const getOtherData = () => {
  return JSON.parse(localStorage.getItem("otherData"));
};

const paxAxios = axios.create({
  baseURL: imsLink,
});

// Add request interceptor to include the token in headers
paxAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    const otherData = getOtherData();
    // config.headers["Company-Branch"] = otherData?.company_branch ?? "BRMSC012";
    config.headers["Session"] = otherData?.session ?? "24-25";

    return config;
  },
  (error) => Promise.reject(error)
);

paxAxios.interceptors.response.use(
  (response) => {
    if (response.data?.success !== undefined) {
      return response;
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const errorData = error.response.data;

      if (error.response.status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.clear();
        // window.location.href = "/login";
        return Promise.reject(error);
      }

      if (errorData?.data?.logout) {
        toast.error(errorData.message || "Logout error.");
        localStorage.clear();
        window.location.reload();
        return Promise.reject(error);
      }

      if (errorData.success !== undefined) {
        toast.error(errorData.message || "Error occurred.");
        return Promise.reject(errorData);
      }

      if (errorData.message) {
        toast.error(errorData.message);
      } else {
        toast.error("Error while connecting to backend.");
      }

      return Promise.reject(errorData);
    }

    toast.error("An unexpected error occurred.");
    return Promise.reject(error);
  }
);

export { paxAxios, socketLink };
