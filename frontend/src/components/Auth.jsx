import { useState } from 'react';
import { supabase } from './supabaseClient';
import './Auth.css';

export default function Auth({ onAuth }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      onAuth();
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>{isLogin ? 'Iniciar Sessão' : 'Criar Conta'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="input_cont"
            type="email"
            placeholder="Insere o teu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Palavra-passe</label>
          <div className="input-cont-wrapper">
            <input
              id="password"
              className="input_cont password_input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Insere a tua palavra-passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="show-password-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'A processar...' : isLogin ? 'Entrar' : 'Registar'}
          </button>
        </form>

        {error && <p className="error-msg">{error}</p>}
        <p className="toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Ainda não tens conta? Regista-te' : 'Já tens conta? Inicia sessão'}
        </p>
      </div>
    </div>
  );
}
