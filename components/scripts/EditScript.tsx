"use client";
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import Loader from "../ui/Loader";
import Notification from "../ui/Notification";

type EditScriptProps = {
  script: {
    id: string | number;
    title: string;
    content: string;
  };
  onClose?: () => void;
  onUpdated?: () => void;
};

const EditScript = ({ script, onClose, onUpdated }: EditScriptProps) => {
  const [title, setTitle] = useState(script.title);
  const [content, setContent] = useState(script.content);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    const localToken = localStorage.getItem("token");
    const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
    try {
      await axios.patch(`${API_BASE_URL}/api/scripts/${script.id}`, { title, content }, { headers });
      setSuccess("Script mis à jour !");
      setTimeout(() => {
        setSuccess(null);
        onUpdated && onUpdated();
        onClose && onClose();
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Erreur lors de la mise à jour");
      } else {
        setError("Erreur lors de la mise à jour");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold">×</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Modifier le script</h2>
        {error && <Notification message={error} type="error" />}
        {success && <Notification message={success} type="success" />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm"
            placeholder="Titre"
          />
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={8}
            className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm resize-vertical"
            placeholder="Votre script narratif..."
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500/60 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600/70 transition disabled:opacity-50"
          >
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </button>
          {loading && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default EditScript;
