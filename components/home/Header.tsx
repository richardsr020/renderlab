"use client";
import { useState } from "react";
// import SignupForm from "../SignupForm";

export default function Header() {
  // const [showSignup, setShowSignup] = useState(false);

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="text-2xl font-bold text-blue-600">MonSaaS</div>
      <nav>
        <a href="#features" className="mr-6 text-gray-700 hover:text-blue-600">Features</a>
        <a href="#pricing" className="mr-6 text-gray-700 hover:text-blue-600">Pricing</a>
        <a href="#testimonials" className="mr-6 text-gray-700 hover:text-blue-600">Testimonials</a>
        {/*
        <button
          onClick={() => setShowSignup(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
        >
          Sign Up
        </button>
        */}
      </nav>
      {/* SignupForm modal supprimé car le composant n'existe plus */}
    </header>
  );
}
