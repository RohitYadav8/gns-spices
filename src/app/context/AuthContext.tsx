"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  addressLine?: string;
  landmark?: string;
  city?: string;
  postalCode?: string;
};

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) return;

        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);

        if (!parsedUser._id) return;

        const response = await fetch(
          `/api/user/profile?userId=${parsedUser._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // API route not found ya error
        if (!response.ok) {
          console.error(
            `Profile API Error: ${response.status} ${response.statusText}`
          );
          return;
        }

        const data = await response.json();

        if (data?.success && data?.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.error("Error fetching fresh user data:", error);
      }
    };

    loadUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};