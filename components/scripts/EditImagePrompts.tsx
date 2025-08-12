"use client";
import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import Loader from "../ui/Loader";
import Notification from "../ui/Notification";

type EditImagePromptsProps = {
  image: { id: string | number; prompts: string[] };
  onClose?: () => void;
  onUpdated?: () => void;
};

const EditImagePrompts = ({ image, onClose, onUpdated }: EditImagePromptsProps) => {
  // image.prompts est un array de prompts (scènes)
  const [prompts, setPrompts] = useState(Array.isArray(image.prompts) ? image.prompts : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handlePromptChange = (idx: number, value: string) => {
    setPrompts(prompts.map((p, i) => (i === idx ? value : p)));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    const localToken = localStorage.getItem("token");
    const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
    // Suppression de la mise à jour des prompts d'image, fonctionnalité désactivée
    setError("La modification des prompts d'image n'est pas autorisée. Veuillez éditer les prompts directement.");
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-xl font-bold">×</button>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Modifier les prompts d'image</h2>
        {error && <Notification message={error} type="error" />}
        {success && <Notification message={success} type="success" />}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {prompts.length === 0 && <div className="text-gray-500">Aucun prompt à modifier.</div>}
          {prompts.map((prompt, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">Prompt {idx + 1}</label>
              <textarea
                value={prompt}
                onChange={e => handlePromptChange(idx, e.target.value)}
                rows={2}
                className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm resize-vertical"
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500/60 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600/70 transition disabled:opacity-50"
          >
            {loading ? "Mise à jour..." : "Sauvegarder"}
          </button>
          {loading && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default EditImagePrompts;
