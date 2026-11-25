import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  ArrowLeft,
} from "lucide-react";

import logo from "../../assets/logo.png";

interface MoodEntry {
  date: string;
  mood: string;
}

const moodIcons: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  stressed: "😰",
  tired: "😴",
};

const moodBg: Record<string, string> = {
  happy: "bg-violet-100",
  neutral: "bg-indigo-100",
  sad: "bg-pink-100",
  stressed: "bg-red-100",
  tired: "bg-slate-100",
};

const WEEK_DAYS = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
];

const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function CalendarScreen() {
  const navigate = useNavigate();

  // DADOS TEMPORÁRIOS
  const [moodEntries] = useState<MoodEntry[]>([
    {
      date: "2026-05-10",
      mood: "happy",
    },
    {
      date: "2026-05-11",
      mood: "sad",
    },
    {
      date: "2026-05-12",
      mood: "stressed",
    },
  ]);

  const [viewMonth, setViewMonth] = useState(
    new Date().getMonth()
  );

  const [viewYear, setViewYear] = useState(
    new Date().getFullYear()
  );

  const [selectedDay, setSelectedDay] =
    useState<string | null>(null);

  const [showAddEvent, setShowAddEvent] =
    useState(false);

  const today = new Date();

  const todayStr = today
    .toISOString()
    .slice(0, 10);

  const firstDay = new Date(
    viewYear,
    viewMonth,
    1
  ).getDay();

  const daysInMonth = new Date(
    viewYear,
    viewMonth + 1,
    0
  ).getDate();

  const fmt = (
    y: number,
    m: number,
    d: number
  ) =>
    `${y}-${String(m + 1).padStart(2, "0")}-${String(
      d
    ).padStart(2, "0")}`;

  const moodByDate = moodEntries.reduce(
    (acc, entry) => {
      acc[entry.date] = entry;
      return acc;
    },
    {} as Record<string, MoodEntry>
  );

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 pb-24">
      {/* HEADER */}
      <div className="bg-white px-6 py-6 rounded-b-3xl shadow-lg border-b border-purple-100">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center hover:bg-purple-200 transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Prisma Logo"
              className="w-10 h-10"
            />

            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Calendário Emocional
              </h1>

              <p className="text-sm text-gray-500">
                Acompanhe suas emoções
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO */}
      <div className="px-6 mt-6">
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-purple-100">
          {/* NAVEGAÇÃO MÊS */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center hover:bg-purple-200"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>

            <h2 className="text-lg font-bold text-gray-800">
              {MONTHS[viewMonth]} {viewYear}
            </h2>

            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center hover:bg-purple-200"
            >
              <ChevronRight className="w-5 h-5 text-purple-600" />
            </button>
          </div>

          {/* DIAS DA SEMANA */}
          <div className="grid grid-cols-7 mb-2">
            {WEEK_DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-semibold text-gray-400 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({
              length: firstDay,
            }).map((_, i) => (
              <div key={i}></div>
            ))}

            {Array.from({
              length: daysInMonth,
            }).map((_, i) => {
              const day = i + 1;

              const dateStr = fmt(
                viewYear,
                viewMonth,
                day
              );

              const entry =
                moodByDate[dateStr];

              const isToday =
                dateStr === todayStr;

              const isSelected =
                selectedDay === dateStr;

              return (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDay(
                      isSelected
                        ? null
                        : dateStr
                    )
                  }
                  className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all relative ${
                    isToday
                      ? "bg-purple-500 text-white shadow-lg"
                      : isSelected
                      ? "border-2 border-purple-400 bg-purple-100"
                      : entry
                      ? moodBg[entry.mood]
                      : "bg-gray-50 hover:bg-purple-50"
                  }`}
                >
                  <span className="text-sm font-semibold">
                    {day}
                  </span>

                  {entry && (
                    <span className="text-lg">
                      {
                        moodIcons[
                          entry.mood
                        ]
                      }
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* DETALHES */}
        {selectedDay && (
          <div className="bg-white rounded-3xl p-5 shadow-lg border border-purple-100 mt-5">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              {new Date(
                selectedDay +
                  "T00:00:00"
              ).toLocaleDateString(
                "pt-BR",
                {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                }
              )}
            </h3>

            {moodByDate[selectedDay] ? (
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">
                  {
                    moodIcons[
                      moodByDate[
                        selectedDay
                      ].mood
                    ]
                  }
                </span>

                <p className="text-gray-700">
                  Humor registrado
                </p>
              </div>
            ) : (
              <p className="text-gray-500 mb-4">
                Nenhum humor registrado
              </p>
            )}

            <button
              onClick={() =>
                setShowAddEvent(true)
              }
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Adicionar Evento
              </div>
            </button>
          </div>
        )}
      </div>

      {/* MODAL */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-800">
                Novo Evento
              </h3>

              <button
                onClick={() =>
                  setShowAddEvent(false)
                }
                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nome do evento"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-purple-400"
              />

              <input
                type="date"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-purple-400"
              />

              <button
                onClick={() =>
                  setShowAddEvent(false)
                }
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-2xl font-semibold shadow-lg"
              >
                Salvar Evento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}