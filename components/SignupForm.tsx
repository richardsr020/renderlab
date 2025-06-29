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
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-100 rounded">
        <h2 className="text-2xl font-bold mb-2">Signup successful!</h2>
        <p>Welcome, {form.name}.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 rounded shadow"
      style={{ background: "var(--background)" }}
    >
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      <label className="block mb-4">
        <span className="block mb-1 font-semibold">Name</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--form-border)",
            background: "var(--background)",
          }}
        />
      </label>
      <label className="block mb-4">
        <span className="block mb-1 font-semibold">Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--form-border)",
            background: "var(--background)",
          }}
        />
      </label>
      <label className="block mb-6">
        <span className="block mb-1 font-semibold">Password</span>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
          style={{
            color: "var(--foreground)",
            borderColor: "var(--form-border)",
            background: "var(--background)",
          }}
        />
      </label>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
      >
        Create Account
      </button>
    </form>
  );
}