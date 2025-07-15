import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ScriptDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [script, setScript] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchScript() {
      setLoading(true);
      try {
        const res = await fetch(`/api/scripts/${id}`, {
          headers: { Authorization: token ? `Bearer ${token}` : undefined }
        });
        if (!res.ok) throw new Error("Erreur lors du chargement du script");
        const data = await res.json();
        setScript(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchScript();
  }, [id, token]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!script) return null;

  return (
    <div className="script-details">
      <button onClick={() => navigate("/scripts")}>Retour</button>
      <h2>{script.title}</h2>
      <p><strong>Status :</strong> {script.status}</p>
      <pre>{script.rawText}</pre>
      {/* TODO: Ajouter boutons pour analyse IA, affichage prompts, images, audio, etc. */}
    </div>
  );
}

export default ScriptDetails;
