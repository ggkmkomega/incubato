"use client";
import React, {
  createContext,
  useContext,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider: React.FC<
  PropsWithChildren<{ initialIsAdmin: boolean }>
> = ({ initialIsAdmin, children }) => {
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
