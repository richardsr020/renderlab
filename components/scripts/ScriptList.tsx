"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import { API_BASE_URL } from '../../utils/api';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';
import ScriptEditor from './ScriptEditor';
import ScriptDetails from './ScriptDetails';
import { Dialog } from '@headlessui/react';
import { HiPhotograph, HiVolumeUp, HiSparkles } from 'react-icons/hi';
import router from 'next/router';

const ScriptList = () => {
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const { token } = useAuth();
  useEffect(() => {
    console.log('Token reçu dans ScriptList:', token);
  }, [token]);
  useEffect(() => {
    async function fetchScripts() {
      setLoading(true);
      const localToken = localStorage.getItem('token');
      const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
      try {
        const res = await axios.get(`${API_BASE_URL}/api/scripts`, { headers });
        setScripts(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erreur lors du chargement des scripts');
      } finally {
        setLoading(false);
      }
    }
    fetchScripts();
  }, [token]);

  if (loading) return <Loader />;
  return (
    <div className="relative">
      <div
        className="max-w-6xl mx-auto backdrop-blur-lg rounded-xl shadow-lg p-8 flex flex-col gap-6"
        style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">My scripts</h2>
          <button
            onClick={() => router.push('/')}
            className="bg-gray-200/60 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-300/70 transition"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            Home
          </button>
        </div>
        {error && <Notification message={error} type="error" />}
        <button
          onClick={() => setShowEditor(true)}
          className="bg-blue-500/60 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600/70 transition disabled:opacity-50 mb-4"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          Create script
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scripts.map((script) => (
            <div
              key={script.id}
              onClick={() => script.id ? setShowDetails(script.id) : console.warn('ID de script invalide:', script)}
              className="cursor-pointer rounded-xl px-4 py-3 shadow-lg hover:shadow-xl hover:bg-white/10 transition flex flex-col gap-2 items-start"
              style={{
                backdropFilter: 'blur(12px)',
                background: 'rgba(255,255,255,0.08)',
                boxShadow: '0 4px 24px 0 rgba(31,38,135,0.18)',
                border: 'none'
              }}
            >
              <div className="flex flex-row items-center gap-2 w-full">
                <span className="px-2 py-1 rounded-lg bg-white/20 backdrop-blur-md text-blue-700 text-sm font-medium truncate shadow-sm max-w-[180px] md:max-w-[300px]" style={{border:'none'}}>{script.title || '(Sans titre)'}</span>
                <small className="px-2 py-1 rounded-lg bg-white/30 backdrop-blur-md text-gray-700 text-xs font-semibold shadow-sm ml-auto" style={{border:'none'}}>{script.status}</small>
              </div>
              <div className="flex flex-row items-center gap-4 mt-2">
                <span className="flex items-center gap-1 text-xs text-gray-700"><HiPhotograph className="text-blue-400 text-base" />{script.images ? script.images.length : 0}</span>
                <span className="flex items-center gap-1 text-xs text-gray-700"><HiVolumeUp className="text-blue-400 text-base" />{script.audios ? script.audios.length : 0}</span>
                <span className="flex items-center gap-1 text-xs text-gray-700"><HiSparkles className="text-blue-400 text-base" />{script.prompts ? script.prompts.length : 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal ScriptEditor */}
      <Dialog open={showEditor} onClose={() => setShowEditor(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative w-full max-w-4xl min-w-[320px] md:min-w-[600px] lg:min-w-[900px] xl:min-w-[1100px] overflow-auto backdrop-blur-xl rounded-xl shadow-xl p-4" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)', background: 'transparent' }}>
          <button
            onClick={() => setShowEditor(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-blue-600 text-xl font-bold"
            aria-label="Fermer"
            tabIndex={0}
          >
            ×
          </button>
          <ScriptEditor />
        </div>
      </Dialog>

      {/* Modal ScriptDetails */}
      <Dialog open={!!showDetails} onClose={() => setShowDetails(null)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="relative w-full max-w-4xl min-w-[320px] md:min-w-[600px] lg:min-w-[900px] xl:min-w-[1100px] overflow-auto backdrop-blur-xl rounded-xl shadow-xl p-4" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)', background: 'transparent' }}>
          <button
            onClick={() => setShowDetails(null)}
            className="absolute top-2 right-2 text-gray-600 hover:text-blue-600 text-xl font-bold"
            aria-label="Fermer"
            tabIndex={0}
          >
            ×
          </button>
          {showDetails && <ScriptDetails id={showDetails} />}
        </div>
      </Dialog>
    </div>
  );
};

export default ScriptList;
