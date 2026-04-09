import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({
    name: "ABC",
    email: "abc@gmail.com",
    phone: "00000000000",
    role: "xyz",
    imageUrl: "USER",
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};