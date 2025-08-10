"use client";
import React, { useEffect, useState } from 'react';
import { HiPhotograph, HiDownload, HiInformationCircle } from 'react-icons/hi';
import { HiArrowLeft } from 'react-icons/hi';
import axios from 'axios';
import { useAuth } from '../AuthProvider';
import Loader from '../ui/Loader';
import { API_BASE_URL } from '../../utils/api';
import Notification from '../ui/Notification';

interface ImageGalleryProps {
  scriptId: string;
  scriptTitle?: string;
  onBack?: () => void;
}

const ImageGallery = ({ scriptId }: ImageGalleryProps) => {
  const { token } = useAuth();
  useEffect(() => {
    console.log('Token reçu dans ImageGallery:', token);
  }, [token]);
  const [images, setImages] = useState<string[]>([]);
  const [scriptTitle, setScriptTitle] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      setError(null);
      const localToken = localStorage.getItem('token');
      const headers = localToken ? { Authorization: `Bearer ${localToken}` } : {};
      try {
        const res = await axios.get(`${API_BASE_URL}/api/scripts/${scriptId}`,
          { headers }
        );
        setImages(res.data.images || []);
        setScriptTitle(res.data.title || 'Script');
      } catch (err: any) {
        setError(err.response?.data?.error || 'Error loading images');
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [scriptId, token]);

  if (loading) return <Loader />;
  if (error) return <Notification message={error} type="error" />;

  return (
    <div
      className="w-full max-w-3xl mx-auto backdrop-blur-lg rounded-xl shadow-lg p-6 flex flex-col gap-6"
      style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', background: 'transparent', maxHeight: '80vh', overflow: 'auto', border: 'none' }}
    >
      <div className="flex items-center gap-2 mb-2">
        <HiPhotograph className="text-blue-400 text-xl" />
        <h2 className="text-xl font-bold text-gray-800">{scriptTitle}</h2>
        <span className="text-gray-500 text-xs ml-2 flex items-center gap-1"><HiInformationCircle className="text-blue-400 text-base" />{images.length} images</span>
      </div>
      {(!images || images.length === 0) ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg font-semibold text-gray-700 mb-6">There's no images generated from this prompt. Click to start workflow.</p>
          <button
            className="bg-blue-500/70 text-white font-bold py-4 px-8 rounded-xl shadow-lg text-lg hover:bg-blue-600/80 transition"
            onClick={() => {
              window.location.href = `/api/scripts/${scriptId}/generate_images`;
            }}
          >
            Get Images from Prompt
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg flex flex-col items-center p-2" style={{ backdropFilter: 'blur(8px)', background: 'transparent', border: 'none' }}>
              <div className="w-full flex items-center justify-between mb-2">
                <span className="flex items-center gap-1 text-blue-400"><HiPhotograph className="text-lg" />{i + 1}</span>
                <a href={img} download title="Download image" className="text-blue-600 hover:text-blue-800"><HiDownload className="text-lg" /></a>
              </div>
              <img src={img} alt={`Generated image ${i + 1}`} className="w-full h-48 object-cover rounded" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
