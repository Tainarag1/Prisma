import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, Sparkles, PenTool, Tag, Lightbulb, Smile, Meh, Frown, Zap, Moon } from 'lucide-react';
import { useApp, Mood } from '../context/AppContext';
import logo from '../../assets/logo.png';

const emotionTags = [
  'Grato', 'Ansioso', 'Animado', 'Calmo', 'Frustrado',
  'Esperançoso', 'Sobrecarregado', 'Em paz', 'Energizado', 'Solitário'
];

const aiSuggestions = [
  'Experimente um exercício de respiração de 5 minutos',
  'Dê uma curta caminhada ao ar livre',
  'Ouça músicas relaxantes',
  'Pratique o diário de gratidão'
];

const moodLabels: Record<Mood, string> = {
  happy: "Feliz",
  neutral: "Neutro",
  sad: "Triste",
  stressed: "Estressado",
  tired: "Cansado",
};

const moodIcons: Record<Mood, JSX.Element> = {
  happy: <Smile className="w-6 h-6 text-yellow-500" />, 
  neutral: <Meh className="w-6 h-6 text-gray-500" />,
  sad: <Frown className="w-6 h-6 text-blue-500" />,
  stressed: <Zap className="w-6 h-6 text-red-500" />,
  tired: <Moon className="w-6 h-6 text-indigo-500" />,
};

export default function DiaryScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addMoodEntry } = useApp();
  const selectedMood = (location.state as { mood?: Mood })?.mood;

  const [entry, setEntry] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSave = () => {
    if (selectedMood) {
      addMoodEntry({
        date: new Date().toISOString().slice(0, 10),
        mood: selectedMood,
        note: entry.trim() || undefined,
      });
    }
    setSaved(true);
    setTimeout(() => {
      navigate('/home');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm px-6 py-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center hover:bg-white transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <img src={logo} alt="Prisma Logo" className="w-8 h-8 opacity-80" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Diário Emocional</h1>
              <p className="text-sm text-gray-500">Expresse seus sentimentos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Selected Mood Display */}
        {selectedMood && (
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/50 shadow-lg">
            <div className="flex items-center gap-3">
              {moodIcons[selectedMood]}
              <div>
                <p className="text-sm text-gray-600">Seu humor hoje</p>
                <p className="text-lg font-semibold text-gray-800">{moodLabels[selectedMood]}</p>
              </div>
            </div>
          </div>
        )}

        {/* Text Input Area */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-white/50">
          <div className="flex items-center gap-2 mb-4">
            <PenTool className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Escreva seus pensamentos</h3>
          </div>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Como você está se sentindo? Escreva sobre seu dia, pensamentos ou emoções..."
            className="w-full h-40 bg-transparent resize-none focus:outline-none text-gray-700 placeholder:text-gray-400 text-base leading-relaxed"
          />
          <div className="text-right text-sm text-gray-500 mt-2">
            {entry.length} caracteres
          </div>
        </div>

        {/* Emotion Tags */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-md border-2 border-white/50">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Adicionar tags de emoção</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {emotionTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-purple-50 hover:to-blue-50 hover:text-purple-700'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-gradient-to-br from-purple-100/60 to-blue-100/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/50 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <h3 className="text-lg font-semibold text-gray-800">Dicas de Bem-estar com IA</h3>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-white/70 rounded-2xl p-4 text-sm text-gray-700 hover:bg-white/90 transition-all cursor-pointer shadow-sm hover:shadow-md transform hover:scale-[1.02]"
              >
                💡 {suggestion}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!entry.trim()}
          className={`w-full py-4 rounded-3xl shadow-lg transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02] ${
            saved
              ? 'bg-green-500 text-white animate-pulse'
              : entry.trim()
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-xl hover:from-purple-600 hover:to-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Save className="w-5 h-5" />
          {saved ? 'Salvo com sucesso!' : 'Salvar Registro'}
        </button>
      </div>
    </div>
  );
}
