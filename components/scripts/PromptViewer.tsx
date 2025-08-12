"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import Loader from '../ui/Loader';
import { API_BASE_URL } from '../../utils/api';
import Notification from '../ui/Notification';

interface PromptViewerProps {
  scriptId: string;
}

const PromptViewer = ({ scriptId }: PromptViewerProps) => {
  const { token } = useAuth();
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !scriptId) return;
    setLoading(true);
    setError(null);
    const localToken = localStorage.getItem('token');
    const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
    // Récupérer le script et ses prompts
    axios.get(`${API_BASE_URL}/api/scripts/${scriptId}`, { headers })
      .then(res => {
        const promptIds = res.data.prompts || [];
        if (!promptIds.length) {
          setPrompts([]);
          setLoading(false);
          return;
        }
        // Récupérer chaque prompt via GET /api/prompts/{id}
        Promise.all(promptIds.map((pid: string) =>
          axios.get(`${API_BASE_URL}/api/prompts/${pid}`, { headers })
            .then(r => r.data)
            .catch(() => null)
        )).then(allPrompts => {
          const parsed = allPrompts.filter(Boolean).map((p: any) => {
            let content = [];
            try {
              content = JSON.parse(p.content);
            } catch {
              content = [];
            }
            return {
              id: p.id,
              scene: p.scene || '',
              prompts: content
            };
          });
          setPrompts(parsed);
          setLoading(false);
        });
      })
      .catch(err => {
        setError('Erreur lors du chargement des prompts');
        setLoading(false);
      });
  }, [scriptId, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
if (!prompts.length) return (
  <div className="flex flex-col items-center gap-4">
    <div>Aucun prompt généré.</div>
    <button
      className="bg-blue-500/60 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600/70 transition"
      onClick={async () => {
        setLoading(true);
        setError(null);
        const localToken = localStorage.getItem('token');
        const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
        try {
          await axios.post(`${API_BASE_URL}/api/scripts/${scriptId}/get_prompts`, {}, { headers });
          // Recharger les prompts
          axios.get(`${API_BASE_URL}/api/scripts/${scriptId}`, { headers })
            .then(res => {
              const promptIds = res.data.prompts || [];
              if (!promptIds.length) {
                setPrompts([]);
                setLoading(false);
                return;
              }
              Promise.all(promptIds.map((pid: string) =>
                axios.get(`${API_BASE_URL}/api/prompts/${pid}`, { headers })
                  .then(r => r.data)
                  .catch(() => null)
              )).then(allPrompts => {
                const parsed = allPrompts.filter(Boolean).map((p: any) => {
                  let content = [];
                  try {
                    content = JSON.parse(p.content);
                  } catch {
                    content = [];
                  }
                  return {
                    id: p.id,
                    scene: p.scene || '',
                    prompts: content
                  };
                });
                setPrompts(parsed);
                setLoading(false);
              });
            });
        } catch (err) {
          setError('Erreur lors de la génération des prompts');
          setLoading(false);
        }
      }}
    >Générer les prompts IA</button>
  </div>
);

  return (
    <div className="prompt-viewer">
      <h3>Prompts IA</h3>
      {prompts.map((scene, i) => (
        <div key={i} className="mb-4 p-2 border rounded">
          <div><strong>Scène {i + 1} :</strong> {scene.scene || ''}</div>
          <ul className="ml-4 text-xs">
            {(scene.prompts || []).map((p: string, j: number) => (
              <li key={j} className="mb-1">- {p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PromptViewer;
