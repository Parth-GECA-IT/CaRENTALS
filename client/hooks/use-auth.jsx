"use client"
import React, { createContext, useContext, useEffect, useState } from "react";
import { CustomToast } from "@/components/ui/customToast";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const localIP = "localhost";
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Load current user once
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://${localIP}:8090/getUser`);
        if (res.status === 401) {
          return setUser(null);
        } else if (!res.ok) {
          throw new Error("Failed to fetch user");
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const res = await fetch(`http://${localIP}:8090/loginUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (!res.ok) {
        // The backend sends: { error: "message" }
        throw new Error(`(${res.status}) ${data.error}` || "Invalid Username or Password");
      }

      setUser(data);
      localStorage.setItem("loginSuccess", JSON.stringify(data.name));
      router.push("/");
    }
    catch (error) {
      console.log("Login error:", error);
      const isMobile = window.innerWidth < 768;
      toast.error(<CustomToast
        title="Login failed"
        description={error.message || "Invalid username or password"}
        variant="error" />, {
        style: {
          backgroundColor: "#171717",
          boxShadow: "0 0 10px rgba(170, 170, 170, 0.5)",
          padding: "16px",
        },
        icon: false,
        position: isMobile ? "top-center" : "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const register = async (info) => {
    try {
      const res = await fetch(`http://${localIP}:8090/registerUser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      const data = await res.json();
      setUser(data);

      if (!res.ok) {
        // The backend sends: { error: "message" }
        throw new Error(`(${res.status}) ${data.error}` || "Registration failed");
      }
      localStorage.setItem("regSuccess", JSON.stringify(data.name));
      router.push("/");
    } catch (error) {
      console.log("Registration error:", error);
      const isMobile = window.innerWidth < 768;
      toast.error(<CustomToast
        title="Failed to Register"
        description={error.message || "Something went wrong!!!"}
        variant="error"
      />, {
        icon: false,
        position: isMobile ? "top-center" : "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  const logout = async () => {
    try {
      await fetch(`http://${localIP}:8090/logout`, {
        method: "POST",
      });
      setUser(null);
      alert("Logged out");
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
