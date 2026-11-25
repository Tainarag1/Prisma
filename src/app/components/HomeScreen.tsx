import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Home,
  Calendar,
  BookOpen,
  User,
  Smile,
  Meh,
  Frown,
  Zap,
  Moon,
  BarChart3,
} from "lucide-react";

import logo from "../../assets/logo.png";

type Mood =
  | "happy"
  | "neutral"
  | "sad"
  | "stressed"
  | "tired";

interface MoodEntry {
  date: string;
  mood: Mood;
  note?: string;
}

const moodLabels: Record<Mood, string> = {
  happy: "Feliz",
  neutral: "Neutro",
  sad: "Triste",
  stressed: "Estressado",
  tired: "Cansado",
};

const moodIcons: Record<Mood, JSX.Element> = {
  happy: <Smile className="w-7 h-7 text-purple-600" />,
  neutral: <Meh className="w-7 h-7 text-indigo-600" />,
  sad: <Frown className="w-7 h-7 text-pink-600" />,
  stressed: <Zap className="w-7 h-7 text-red-500" />,
  tired: <Moon className="w-7 h-7 text-slate-500" />,
};

const moodColors: Record<Mood, string> = {
  happy: "bg-violet-100 border-violet-200",
  neutral: "bg-indigo-100 border-indigo-200",
  sad: "bg-pink-100 border-pink-200",
  stressed: "bg-red-100 border-red-200",
  tired: "bg-slate-100 border-slate-200",
};

const MOODS: Mood[] = [
  "happy",
  "neutral",
  "sad",
  "stressed",
  "tired",
];

export default function HomeScreen() {
  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

  const todayStr = new Date().toISOString().slice(0, 10);

  const recentEntries = [...moodEntries]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);

    const newEntry: MoodEntry = {
      date: todayStr,
      mood,
    };

    setMoodEntries((prev) => [newEntry, ...prev]);

    setTimeout(() => {
      navigate("/diary");
    }, 400);
  };

  const formatDate = (dateStr: string) => {
    const today = new Date().toISOString().slice(0, 10);

    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .slice(0, 10);

    if (dateStr === today) return "Hoje";

    if (dateStr === yesterday) return "Ontem";

    return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "short",
    });
  };

  const todayMood = moodEntries.find(
    (entry) => entry.date === todayStr
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-24">
      {/* HEADER */}
      <div className="bg-white border-b border-purple-100 px-6 py-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-center mb-5">
          <img
            src={logo}
            alt="Prisma Logo"
            className="w-14 h-14"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">
              Bem-vinda de volta,
            </p>

            <h1 className="text-3xl font-bold text-gray-800">
              Sarah
            </h1>
          </div>

          <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-lg font-bold shadow-md">
            S
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="px-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Como você está se sentindo hoje?
        </h2>

        {/* HUMORÔMETRO */}
        <div className="grid grid-cols-5 gap-3 mb-8">
          {MOODS.map((mood) => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className={`aspect-square rounded-3xl bg-white border border-purple-100 shadow-sm hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 ${
                selectedMood === mood
                  ? "ring-4 ring-purple-200 scale-105"
                  : ""
              }`}
            >
              {moodIcons[mood]}

              <span className="text-xs text-gray-600">
                {moodLabels[mood]}
              </span>
            </button>
          ))}
        </div>

        {/* BANNER */}
        {todayMood && (
          <div className="bg-white rounded-3xl p-4 mb-6 flex items-center gap-3 border border-purple-100 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
              {moodIcons[todayMood.mood]}
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Humor de hoje registrado
              </p>

              <p className="text-sm font-semibold text-gray-800">
                {moodLabels[todayMood.mood]}
              </p>
            </div>

            <button
              onClick={() => navigate("/calendar")}
              className="ml-auto text-sm font-semibold text-purple-600 hover:text-purple-800"
            >
              Ver →
            </button>
          </div>
        )}

        {/* REGISTROS */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Registros Recentes
          </h3>

          <div className="space-y-3">
            {recentEntries.map((entry, index) => (
              <div
                key={index}
                className={`${moodColors[entry.mood]} border rounded-3xl p-4 shadow-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm">
                    {moodIcons[entry.mood]}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-500">
                      {formatDate(entry.date)}
                    </p>

                    <p className="text-gray-800 font-medium mt-1">
                      {entry.note ??
                        moodLabels[entry.mood]}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {recentEntries.length === 0 && (
              <div className="bg-white rounded-3xl p-6 text-center shadow-sm border border-purple-100">
                <p className="text-gray-400">
                  Nenhum registro ainda.
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  Escolha uma emoção acima ✨
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 px-6 py-4 shadow-lg">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-purple-600">
            <Home className="w-6 h-6" />
            <span className="text-xs">Início</span>
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Calendário</span>
          </button>

          <button
            onClick={() => navigate("/diary")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600"
          >
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">Diário</span>
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Análises</span>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-600"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}