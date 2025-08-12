"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL } from "../../../utils/api";
import Loader from "../../../components/ui/Loader";
import Notification from "../../../components/ui/Notification";
import { useAuth } from "../../../components/AuthProvider";
import { HiDocumentText, HiSparkles } from "react-icons/hi";

const PromptsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);
  const { token } = useAuth();
  const [script, setScript] = useState<any>(null);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !id) return;
    setLoading(true);
    setError(null);
    const localToken = localStorage.getItem("token");
    const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
    axios.get(`${API_BASE_URL}/api/scripts/${id}`, { headers })
      .then(res => {
        setScript(res.data);
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
      })
      .catch(err => {
        setError('Erreur lors du chargement du script ou des prompts');
        setLoading(false);
      });
  }, [id, token]);

  const handlePromptChange = (promptIdx: number, value: string, sceneIdx: number) => {
    setPrompts(prompts.map((scene, i) =>
      i === sceneIdx
        ? { ...scene, prompts: scene.prompts.map((p: string, j: number) => j === promptIdx ? value : p) }
        : scene
    ));
  };

  const handleSave = async (sceneIdx: number) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const localToken = localStorage.getItem("token");
    const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
    const scene = prompts[sceneIdx];
    try {
      await axios.patch(`${API_BASE_URL}/api/prompts/${scene.id}`, { content: JSON.stringify(scene.prompts) }, { headers });
      setSuccess("Prompts mis à jour !");
      setTimeout(() => setSuccess(null), 1500);
    } catch (err) {
      setError("Erreur lors de la sauvegarde des prompts");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
  if (!script) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 backdrop-blur-lg rounded-xl shadow-lg flex flex-col gap-8" style={{ boxShadow: '0 8px 32px 0 rgba(31,38,135,0.37)' }}>
      {/* Barre de navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button onClick={() => window.history.back()} className="bg-gray-200/60 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow hover:bg-gray-300/70 transition flex items-center gap-1" style={{ backdropFilter: 'blur(8px)' }}>
            <span className="text-lg">←</span> Retour
          </button>
        </div>
        {/* Seuls les boutons Accueil et Retour sont affichés */}
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2"><HiDocumentText className="text-blue-400 text-2xl" /> Script : {script.title}</h2>
      <div className="mb-4">
        <strong className="text-blue-700">Content:</strong>
        <pre className="whitespace-pre-line rounded-lg px-4 py-2 shadow-sm max-h-[120px] overflow-auto" style={{ backdropFilter: 'blur(8px)' }}>{(script.content || script.rawText)?.slice(0, 500)}</pre>
      </div>
      <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2"><HiSparkles className="text-blue-400 text-xl" /> Prompts IA</h3>
      {success && <Notification message={success} type="success" />}
      {prompts.length === 0 && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-gray-500">Aucun prompt généré.</div>
          <button
            className="bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition text-lg"
            onClick={async () => {
              setLoading(true);
              setError(null);
              const localToken = localStorage.getItem('token');
              const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
              try {
                await axios.post(`${API_BASE_URL}/api/scripts/${id}/get_prompts`, {}, { headers });
                // Recharger les prompts
                axios.get(`${API_BASE_URL}/api/scripts/${id}`, { headers })
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
          >
            Générer les prompts IA
          </button>
        </div>
      )}
      {prompts.map((scene, sceneIdx) => (
        <div key={scene.id} className="mb-6 p-4 border rounded-lg bg-white/40">
          <div className="mb-2 font-semibold text-gray-700">Scène {sceneIdx + 1} : {scene.scene}</div>
          <form className="flex flex-col gap-4">
            {scene.prompts.map((prompt: string, promptIdx: number) => (
              <div key={promptIdx} className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Prompt {promptIdx + 1}</label>
                <textarea
                  value={prompt}
                  onChange={e => handlePromptChange(promptIdx, e.target.value, sceneIdx)}
                  rows={2}
                  className="rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 shadow-sm resize-vertical"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleSave(sceneIdx)}
              className="bg-blue-500/60 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600/70 transition"
            >
              Sauvegarder les prompts
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default PromptsPage;
