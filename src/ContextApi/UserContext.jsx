import { useState, useEffect, createContext } from "react";
import axios from "axios";
// import { api } from "../api/axios";
export const UserContext = createContext();

// const api = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
// });

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"))
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Register
  const register = async (formData) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/auth/register`, formData, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    setUser(res.data);
    setToken(res.data.token);
    return res.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


  // Login
  const login = async (formData) => {
   try {
     const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/auth/login`, formData, 
        {
            headers : {
                "Content-Type" : "application/json"
            }
        }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data));

    setUser(res.data);
    setToken(res.data.token)
   } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error.response?.data || error;
   }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, register, login, logout, token }}>
      {children}
    </UserContext.Provider>
  );
}
