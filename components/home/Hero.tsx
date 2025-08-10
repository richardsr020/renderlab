"use client";
import { useState } from "react";
import RegisterForm from "../RegisterForm";

export default function Hero() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 bg-[#0a0a0a] overflow-hidden">
      {/* Glassmorphism Card */}
      <div className="relative z-10 max-w-2xl w-full rounded-3xl shadow-2xl bg-white/5 backdrop-blur-md p-10 flex flex-col items-center">
        <h1
          className="text-4xl md:text-6xl font-extrabold text-center mb-6 tracking-tight"
          style={{
            background: "linear-gradient(90deg, #a21caf 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Effortless Narrative Video Creation for Storytellers
        </h1>
        <p className="text-lg md:text-xl text-center mb-8 text-white font-medium">
          Instantly turn your scripts into cinematic, AI-powered visual stories for social media.
        </p>
        <button
          onClick={() => setShowRegister(true)}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
        >
          Get Started
        </button>
      </div>
      {/* Gradient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-700 via-pink-500 to-blue-700 opacity-40 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-700 via-purple-500 to-pink-500 opacity-30 blur-2xl"></div>
      </div>
      {/* Decorative Borders */}
      <div className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-white/10 rounded-3xl pointer-events-none"></div>
      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowRegister(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl"
              aria-label="Close"
            >
              ×
            </button>
            <RegisterForm />
          </div>
        </div>
      )}
    </section>
  );
}
