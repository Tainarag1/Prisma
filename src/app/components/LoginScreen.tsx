import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useApp } from '../context/AppContext';
import logo from '../../assets/logo.png';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <img src={logo} alt="Prisma Logo" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Prisma
          </h1>
          <p className="text-gray-600 mt-2">Sua jornada para o bem-estar emocional</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-white/50 focus:border-purple-300 focus:outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-white/50 focus:border-purple-300 focus:outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-6"
          >
            <LogIn className="w-5 h-5" />
            Entrar
          </button>

          <button
            type="button"
            onClick={() => navigate('/home')}
            className="w-full py-4 bg-white/70 backdrop-blur-sm text-gray-700 rounded-2xl border-2 border-white/50 hover:border-purple-300 transition-all"
          >
            Criar Conta
          </button>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  );
}
