import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';

const ScriptList = () => {
  const [scripts, setScripts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function fetchScripts() {
      setLoading(true);
      try {
        const res = await axios.get('/api/scripts', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
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
    <div className="script-list">
      <h2>Mes scripts</h2>
      {error && <Notification message={error} type="error" />}
      <button onClick={() => router.push('/scripts/new')}>Nouveau script</button>
      <ul>
        {scripts.map((script) => (
          <li key={script.id} onClick={() => router.push(`/scripts/${script.id}`)}>
            <strong>{script.title || '(Sans titre)'}</strong> <small>{script.status}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScriptList;
