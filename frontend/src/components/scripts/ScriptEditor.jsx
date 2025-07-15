import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function ScriptEditor() {
  const [title, setTitle] = useState("");
  const [rawText, setRawText] = useState("");
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/scripts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined
        },
        body: JSON.stringify({ title, rawText })
      });
      if (!res.ok) throw new Error("Erreur lors de la création du script");
      const data = await res.json();
      navigate(`/scripts/${data.id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="script-editor">
      <h2>Nouveau script</h2>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Votre script narratif..."
        value={rawText}
        onChange={e => setRawText(e.target.value)}
        required
      />
      <button type="submit">Créer</button>
    </form>
  );
}

export default ScriptEditor;
