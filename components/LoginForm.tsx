import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
import Loader from './ui/Loader';
import Notification from './ui/Notification';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.push('/scripts');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Connexion</h2>
      {error && <Notification message={error} type="error" />}
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
      <button type="submit" disabled={loading}>{loading ? 'Connexion...' : 'Se connecter'}</button>
      {loading && <Loader />}
    </form>
  );
};

export default LoginForm;
