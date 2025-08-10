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
  // Debug: afficher le token reçu
  useEffect(() => {
    console.log('Token reçu dans PromptViewer:', token);
  }, [token]);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Route non documentée, désactivée
    setPrompts([]);
    setLoading(false);
  }, [scriptId, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
  if (!prompts.length) return <div>Aucun prompt généré.</div>;

  return (
    <div className="prompt-viewer">
      <h3>Prompts IA</h3>
      {prompts.map((scene, i) => (
        <div key={i} className="mb-4 p-2 border rounded">
          <div><strong>Scène {i + 1} :</strong> {scene.description}</div>
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
