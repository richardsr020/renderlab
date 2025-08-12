"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import ImageGallery from './ImageGallery';
// import AudioPlayer from './AudioPlayer';
import PromptViewer from './PromptViewer';
import { HiDocumentText, HiPhotograph, HiVolumeUp, HiSparkles } from 'react-icons/hi';
import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import Loader from '../ui/Loader';
import { API_BASE_URL } from '../../utils/api';
import Notification from '../ui/Notification';

interface ScriptDetailsProps {
  id: string;
}

const ScriptDetails = ({ id }: ScriptDetailsProps) => {
  const [showPrompts, setShowPrompts] = useState(false);
  const { logout } = useAuth();
  const { token } = useAuth();
  // Debug: afficher le token reçu
  useEffect(() => {
    console.log('Token reçu dans ScriptDetails:', token);
  }, [token]);
  const [script, setScript] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Audio modal retiré, état inutile
  const router = useRouter();

  useEffect(() => {
    async function fetchScript() {
      setLoading(true);
      setError(null);
      const localToken = localStorage.getItem('token');
      const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
      const res = await axios.get(`${API_BASE_URL}/api/scripts/${id}`, { headers });
      setScript(res.data);
      setLoading(false);
    }
    fetchScript();
  }, [id, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
  if (!script) return null;

  return (
    <div
      className="w-full max-w-3xl mx-auto backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', background: 'transparent', maxHeight: '80vh', overflow: 'auto' }}
    >
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-2"><HiDocumentText className="text-blue-400 text-xl" /> {script.title}</h2>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-gray-500 text-xs">{script.status}</span>
      </div>
      <div className="mb-4">
        <strong className="text-blue-700">Content:</strong>
        <pre className="whitespace-pre-line rounded-lg px-4 py-2 shadow-sm max-h-[120px] overflow-auto" style={{ backdropFilter: 'blur(8px)' }}>{(script.content || script.rawText)?.slice(0, 500)}</pre>
      </div>
      <div className="flex flex-row items-center gap-6 mt-2 mb-4">
        <button
          className="flex items-center gap-1 focus:outline-none"
          onClick={() => router.push(`/images/${id}`)}
          title="View generated images"
        >
          <HiPhotograph className="text-blue-400 text-lg" />
          <span className="text-xs font-semibold">{script.images ? script.images.length : 0}</span>
        </button>
        <button
          className="flex items-center gap-1 focus:outline-none"
          onClick={() => router.push(`/audios/${id}`)}
          title="View generated audios"
        >
          <HiVolumeUp className="text-blue-400 text-lg" />
          <span className="text-xs font-semibold">{script.audios ? script.audios.length : 0}</span>
        </button>
        <button
          className="flex items-center gap-1 focus:outline-none"
          onClick={() => router.push(`/prompts/${id}`)}
          title="Voir les prompts générés"
        >
          <HiSparkles className="text-blue-400 text-lg" />
          <span className="text-xs font-semibold">{script.prompts ? script.prompts.length : 0}</span>
        </button>
      </div>
      {/* Modale audio retirée */}
    </div>
  );
};

export default ScriptDetails;