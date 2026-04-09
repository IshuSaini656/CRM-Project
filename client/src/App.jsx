import React from "react";
import "./App.css";
import Login from "./Pages/Login/Login";
import OTPVerification from "./Pages/Login/otpVerify";
import AppToaster from "./utils/Apptoaster";
import { Routes, Route } from "react-router-dom";
import {ProtectedRoute} from "./utils/ProtectedRoute.jsx";
import Role from "./Pages/Dashboard/Role.jsx";
import { AuthProvider } from "./utils/Authcontext.jsx";

function App() {
  return (
    <AuthProvider>
      <AppToaster />
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route
          path="/role/*"
          element={
            <ProtectedRoute>
              <Role />
            </ProtectedRoute>
          }
        />
      </Routes> 
    </AuthProvider>
  );
}

export default App;
