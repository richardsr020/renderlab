import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import Loader from '../ui/Loader';
import Notification from '../ui/Notification';

interface ImageGalleryProps {
  scriptId: string;
}

const ImageGallery = ({ scriptId }: ImageGalleryProps) => {
  const { token } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      try {
        const res = await axios.get(`/api/generate-image/status`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        // Adapter selon la réponse backend
        setImages(res.data.images || []);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erreur lors du chargement des images');
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [scriptId, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;
  if (!images.length) return <div>Aucune image générée.</div>;

  return (
    <div className="image-gallery grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((img, i) => (
        <div key={i} className="rounded overflow-hidden shadow">
          <img src={img} alt={`Image générée ${i + 1}`} className="w-full h-auto" />
          <a href={img} download className="block text-center text-blue-600 mt-1 text-xs">Télécharger</a>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
