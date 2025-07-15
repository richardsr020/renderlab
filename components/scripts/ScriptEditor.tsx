import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';

const ScriptEditor = () => {
  const [title, setTitle] = useState('');
  const [rawText, setRawText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await axios.post('/api/scripts', { title, rawText }, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      router.push(`/scripts/${res.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur lors de la création du script');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="script-editor">
      <h2>Nouveau script</h2>
      {error && <Notification message={error} type="error" />}
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
      <button type="submit" disabled={loading}>{loading ? 'Création...' : 'Créer'}</button>
      {loading && <Loader />}
    </form>
  );
};

export default ScriptEditor;
