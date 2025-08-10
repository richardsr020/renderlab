"use client";
import React, { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';
import { useAuth } from '../AuthProvider';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';

const ScriptEditor = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  // Debug: afficher le token reçu
  React.useEffect(() => {
    console.log('Token reçu dans ScriptEditor:', token);
  }, [token]);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Debug: lire le token depuis le localStorage
    const localToken = localStorage.getItem('token');
    console.log('Token envoyé dans ScriptEditor (contexte):', token);
    console.log('Token envoyé dans ScriptEditor (localStorage):', localToken);
    const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
    console.log('Headers envoyés:', headers);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/scripts`, { title, content }, {
        headers,
      });
      router.push(`/scripts/${res.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de la création du script');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto backdrop-blur-lg rounded-xl shadow-lg p-8 flex flex-col gap-6"
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Nouveau script</h2>
      {error && <Notification message={error} type="error" />}
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
        style={{
          backdropFilter: 'blur(8px)',
        }}
      />
      <textarea
        placeholder="Votre script narratif..."
        value={content}
        onChange={e => setContent(e.target.value)}
        required
        rows={8}
        className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm resize-vertical"
        style={{
          backdropFilter: 'blur(8px)',
        }}
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500/60 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600/70 transition disabled:opacity-50"
        style={{
          backdropFilter: 'blur(8px)',
        }}
      >
        {loading ? 'Création...' : 'Créer'}
      </button>
      {loading && <Loader />}
    </form>
  );
};

export default ScriptEditor;
