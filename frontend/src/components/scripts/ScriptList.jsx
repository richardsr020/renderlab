import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ScriptList() {
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchScripts() {
      setLoading(true);
      try {
        const res = await fetch("/api/scripts", {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined
          }
        });
        if (!res.ok) throw new Error("Erreur lors du chargement des scripts");
        const data = await res.json();
        setScripts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchScripts();
  }, [token]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="script-list">
      <h2>Mes scripts</h2>
      <button onClick={() => navigate("/scripts/new")}>Nouveau script</button>
      <ul>
        {scripts.map(script => (
          <li key={script.id} onClick={() => navigate(`/scripts/${script.id}`)}>
            <strong>{script.title || "(Sans titre)"}</strong> <small>{script.status}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScriptList;
