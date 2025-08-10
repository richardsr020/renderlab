"use client";
import React, { useEffect, useState } from 'react';
import { HiVolumeUp, HiDownload, HiInformationCircle, HiPlay } from 'react-icons/hi';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import { API_BASE_URL } from '../../utils/api';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';

interface AudioPlayerProps {
  scriptId: string;
}

const AudioPlayer = ({ scriptId }: AudioPlayerProps) => {
  const { logout } = useAuth();
  const { token } = useAuth();
  // Debug: afficher le token dans la console
  useEffect(() => {
    console.log('Token utilisé pour la requête AudioPlayer:', token);
  }, [token]);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [scriptTitle, setScriptTitle] = useState<string>('');
  const [scriptContent, setScriptContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAudio() {
      setLoading(true);
      setError(null);
      const localToken = localStorage.getItem('token');
      const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
      try {
        const res = await axios.get(`${API_BASE_URL}/api/scripts/${scriptId}`, { headers });
        setAudioUrl(res.data.audioUrl || null);
        setStatus(res.data.status || 'No audio generated');
        setScriptTitle(res.data.title || 'Script');
        setScriptContent(res.data.content || res.data.rawText || '');
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error loading audio');
      } finally {
        setLoading(false);
      }
    }
    fetchAudio();
  }, [scriptId, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
  if (!audioUrl) return (
    <div
      className="w-full max-w-3xl mx-auto backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', background: 'transparent', maxHeight: '80vh', overflow: 'auto', border: 'none' }}
    >
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-2">
        <HiVolumeUp className="text-blue-400 text-xl" />
        {scriptTitle}
        <span className="text-gray-500 text-xs ml-2 flex items-center gap-1"><HiInformationCircle className="text-blue-400 text-base" />{status}</span>
      </h2>
      <div className="mb-4">
        <strong className="text-blue-700">Content:</strong>
        <pre className="whitespace-pre-line rounded-lg px-4 py-2 shadow-sm max-h-[120px] overflow-auto" style={{ backdropFilter: 'blur(8px)' }}>{scriptContent.slice(0, 500)}</pre>
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-6">There's no audio generated for this script.</p>
      <button
        className="bg-blue-500/70 text-white font-bold py-4 px-8 rounded-xl shadow-lg text-lg hover:bg-blue-600/80 transition flex items-center gap-2"
        onClick={() => {
          window.location.href = `/api/scripts/${scriptId}/generate_audio`;
        }}
      >
        <HiPlay className="text-lg" />
        Get Audio from Script
      </button>
      <span className="text-gray-500 mt-4">Status: {status}</span>
    </div>
  );

  return (
    <div
      className="w-full max-w-3xl mx-auto backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', background: 'transparent', maxHeight: '80vh', overflow: 'auto', border: 'none' }}
    >
      <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-2">{scriptTitle}</h2>
      <div className="mb-4">
        <strong className="text-blue-700">Content:</strong>
        <pre className="whitespace-pre-line rounded-lg px-4 py-2 shadow-sm max-h-[120px] overflow-auto" style={{ backdropFilter: 'blur(8px)' }}>{scriptContent.slice(0, 500)}</pre>
      </div>
      <audio controls src={audioUrl} className="w-full max-w-xl">
        Your browser does not support audio playback.
      </audio>
      <a href={audioUrl} download className="flex items-center gap-1 text-blue-600 text-xs mt-1 font-semibold" title="Download audio">
        <HiDownload className="text-lg" />
        Download audio
      </a>
      <span className="text-gray-500 flex items-center gap-1"><HiInformationCircle className="text-blue-400 text-base" />Status: {status}</span>
    </div>
  );
};

export default AudioPlayer;
