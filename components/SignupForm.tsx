"use client";
import { useState } from "react";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-8 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-md text-center">
        <h2
          className="text-2xl font-bold mb-2"
          style={{
            background:
              "linear-gradient(90deg, #a21caf 0%, #2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Signup successful!
        </h2>
        <p className="text-white">Welcome, {form.name}.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-8 rounded-3xl shadow-2xl bg-white/5 backdrop-blur-md"
    >
      <h2
        className="text-2xl font-bold mb-6 text-center"
        style={{
          background:
            "linear-gradient(90deg, #a21caf 0%, #2563eb 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Sign Up
      </h2>
      <label className="block mb-4">
        <span className="block mb-1 font-semibold text-white">Name</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] text-white shadow focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </label>
      <label className="block mb-4">
        <span className="block mb-1 font-semibold text-white">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </label>
      <label className="block mb-6">
        <span className="block mb-1 font-semibold text-white">Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded-xl bg-[#0a0a0a] text-white shadow focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </label>
      <button
        type="submit"
        className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform"
      >
        Create Account
      </button>
    </form>
  );
}