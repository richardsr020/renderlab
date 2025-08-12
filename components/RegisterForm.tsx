"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { HiArrowLeft } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import Loader from './ui/Loader';
import Notification from './ui/Notification';
import { useAuth } from './AuthProvider';

const RegisterForm = () => {
  const router = useRouter();
  const { token, login } = useAuth();
  React.useEffect(() => {
    if (token) {
      router.replace('/scripts');
    }
  }, [token, router]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Appel à l'API d'inscription avec axios et API_BASE_URL
      const { API_BASE_URL } = await import('../utils/api');
      await axios.post(`${API_BASE_URL}/api/register`, { email, password });
      // Si succès, login automatique
      await login(email, password);
      setSuccess(true);
      router.replace('/scripts');
    } catch (err: any) {
      setError(err.message || "Erreur lors de l’inscription");
      setTimeout(() => setError(null), 3500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg animate-pulse text-lg font-semibold">
          {error}
        </div>
      )}
      {loading && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          <Loader />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', background: 'transparent', maxHeight: '80vh', overflow: 'auto', border: 'none' }}
      >
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-2">Register</h2>
        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
        style={{ backdropFilter: 'blur(8px)' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
        style={{ backdropFilter: 'blur(8px)' }}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500/60 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600/70 transition disabled:opacity-50"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
      {loading && <Loader />}
      <button
        type="button"
        onClick={() => router.push('/login')}
        className="flex items-center gap-2 text-blue-600 font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-100/70 transition mt-2"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <HiArrowLeft className="text-lg" />
        Already have an account? Login
      </button>
      <button
        type="button"
        className="flex items-center gap-2 justify-center bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-100/70 transition mt-2 border border-gray-300"
        style={{ backdropFilter: 'blur(8px)' }}
        onClick={() => alert('Google login not implemented')}
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>
    </form>
    </>
  );
}

export default RegisterForm;
