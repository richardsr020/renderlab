import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';

interface AudioPlayerProps {
  scriptId: string;
}

const AudioPlayer = ({ scriptId }: AudioPlayerProps) => {
  const { token } = useAuth();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAudio() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/generate-audio/status/${scriptId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setStatus(res.data.status);
        setAudioUrl(res.data.audio_url || null);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erreur lors du chargement de l’audio');
      } finally {
        setLoading(false);
      }
    }
    fetchAudio();
  }, [scriptId, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
  if (!audioUrl) return <div>Aucun audio généré. Statut : {status}</div>;

  return (
    <div className="audio-player">
      <audio controls src={audioUrl} className="w-full">
        Votre navigateur ne supporte pas la lecture audio.
      </audio>
      <a href={audioUrl} download className="block text-blue-600 text-xs mt-1">Télécharger l’audio</a>
    </div>
  );
};

export default AudioPlayer;
