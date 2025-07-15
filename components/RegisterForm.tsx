import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from './ui/Loader';
import Notification from './ui/Notification';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);
    try {
      await axios.post('/api/register', { email, password });
      setSuccess(true);
      setTimeout(() => router.push('/login'), 1200);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Créer un compte</h2>
      {error && <Notification message={error} type="error" />}
      {success && <Notification message="Inscription réussie ! Redirection..." type="success" />}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>{loading ? 'Création...' : "S'inscrire"}</button>
      {loading && <Loader />}
    </form>
  );
};

export default RegisterForm;
