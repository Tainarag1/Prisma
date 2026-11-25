import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BarChart3, TrendingUp, Calendar } from "lucide-react";
import { useApp } from "../context/AppContext";
import logo from "../../assets/logo.png";

const moodLabels: Record<string, string> = {
  happy: "Feliz",
  neutral: "Neutro",
  sad: "Triste",
  stressed: "Estressado",
  tired: "Cansado",
};

const moodColors: Record<string, string> = {
  happy: "#fbbf24", // amarelo
  neutral: "#6b7280", // cinza
  sad: "#3b82f6", // azul
  stressed: "#ef4444", // vermelho
  tired: "#8b5cf6", // roxo
};

export default function AnalyticsScreen() {
  const navigate = useNavigate();
  const { moodEntries } = useApp();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Filtrar entradas do mês selecionado
  const monthEntries = moodEntries.filter(entry => {
    const entryDate = new Date(entry.date + "T00:00:00");
    return entryDate.getMonth() === selectedMonth && entryDate.getFullYear() === selectedYear;
  });

  // Contar ocorrências de cada humor
  const moodCounts = monthEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Calcular porcentagens
  const totalEntries = monthEntries.length;
  const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
    mood,
    count,
    percentage: totalEntries > 0 ? Math.round((count / totalEntries) * 100) : 0,
  }));

  // Dados para o gráfico de barras (últimos 7 dias)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toISOString().slice(0, 10);
  });

  const last7DaysData = last7Days.map(date => {
    const entry = moodEntries.find(e => e.date === date);
    return {
      date,
      mood: entry?.mood || null,
      dayName: new Date(date + "T00:00:00").toLocaleDateString("pt-BR", { weekday: "short" }),
    };
  });

  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 pb-24">
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
              <h1 className="text-2xl font-bold text-gray-800">Análises</h1>
              <p className="text-sm text-gray-500">Acompanhe seu progresso</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Month Selector */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Selecionar Período</h3>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="flex-1 px-4 py-3 bg-white/70 rounded-2xl border border-gray-200 focus:border-purple-300 focus:outline-none text-gray-700"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="w-24 px-4 py-3 bg-white/70 rounded-2xl border border-gray-200 focus:border-purple-300 focus:outline-none text-gray-700"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
        </div>

        {/* Mood Distribution Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">Distribuição de Humores</h3>
          </div>

          {totalEntries === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum registro encontrado para este período</p>
            </div>
          ) : (
            <div className="space-y-4">
              {moodPercentages.map(({ mood, count, percentage }) => (
                <div key={mood} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-700">
                    {moodLabels[mood]}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div
                        className="h-6 rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: moodColors[mood],
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm font-semibold text-gray-700">
                    {percentage}%
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Last 7 Days Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-md">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">Últimos 7 Dias</h3>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {last7DaysData.map((day, index) => (
              <div key={day.date} className="flex flex-col items-center gap-2">
                <div className="text-xs text-gray-500 font-medium">
                  {day.dayName}
                </div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                    day.mood ? "" : "bg-gray-300"
                  }`}
                  style={{
                    backgroundColor: day.mood ? moodColors[day.mood] : undefined,
                  }}
                >
                  {day.mood ? moodLabels[day.mood][0] : "-"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-gradient-to-br from-purple-100/60 to-blue-100/60 backdrop-blur-sm rounded-3xl p-6 border-2 border-white/50 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumo do Mês</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/70 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{totalEntries}</div>
              <div className="text-sm text-gray-600">Registros</div>
            </div>
            <div className="bg-white/70 rounded-2xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalEntries > 0 ? Math.round((moodCounts.happy || 0) / totalEntries * 100) : 0}%
              </div>
              <div className="text-sm text-gray-600">Dias Felizes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}