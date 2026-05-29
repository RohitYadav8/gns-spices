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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from local storage initially for fast render
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Then fetch fresh data from database
      if (parsedUser._id) {
        fetch(`/api/user/profile?userId=${parsedUser._id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.user) {
              setUser(data.user);
              localStorage.setItem("user", JSON.stringify(data.user));
            }
          })
          .catch((err) => console.error("Error fetching fresh user data", err));
      }
    }
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
