import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import ImageGallery from './ImageGallery';
import AudioPlayer from './AudioPlayer';
import PromptViewer from './PromptViewer';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';

interface ScriptDetailsProps {
  id: string;
}

const ScriptDetails = ({ id }: ScriptDetailsProps) => {
  const { token } = useAuth();
  const [script, setScript] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScript() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/scripts/${id}`,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        setScript(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erreur lors du chargement du script');
      } finally {
        setLoading(false);
      }
    }
    fetchScript();
  }, [id, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
  if (!script) return null;

  return (
    <div className="script-details">
      <h2>{script.title}</h2>
      <p><strong>Status :</strong> {script.status}</p>
      <pre>{script.rawText}</pre>
      <div className="my-6">
        <h3 className="font-semibold mb-2">Images générées</h3>
        <ImageGallery scriptId={id} />
      </div>
      <div className="my-6">
        <h3 className="font-semibold mb-2">Audio généré</h3>
        <AudioPlayer scriptId={id} />
      </div>
      <div className="my-6">
        <PromptViewer scriptId={id} />
      </div>
    </div>
  );
};

export default ScriptDetails;
