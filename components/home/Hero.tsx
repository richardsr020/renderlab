"use client";
import { useState } from "react";
import SignupForm from "../SignupForm";

export default function Hero() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <section className="text-center py-20" style={{ background: "var(--background)" }}>
      <h1 className="text-5xl font-bold mb-4">
        Effortless Narrative Video Creation for Storytellers
      </h1>
      <p className="text-lg mb-8">
        Instantly turn your scripts into cinematic, AI-powered visual stories for social media.
      </p>
      <button
        onClick={() => setShowSignup(true)}
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Start Creating
      </button>
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="relative">
            <button
              onClick={() => setShowSignup(false)}
              className="absolute top-2 right-2 text-gray-500 text-2xl"
              aria-label="Close"
            >
              ×
            </button>
            <SignupForm />
          </div>
        </div>
      )}
    </section>
  );
}
