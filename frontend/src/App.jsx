import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import ScriptList from "./components/scripts/ScriptList";
import ScriptDetails from "./components/scripts/ScriptDetails";
import ScriptEditor from "./components/scripts/ScriptEditor";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/scripts" element={<ScriptList />} />
        <Route path="/scripts/new" element={<ScriptEditor />} />
        <Route path="/scripts/:id" element={<ScriptDetails />} />
        <Route path="*" element={<Navigate to="/scripts" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
