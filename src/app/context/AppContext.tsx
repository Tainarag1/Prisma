import { createContext, useContext, useState, ReactNode } from "react";

export type Mood = "happy" | "neutral" | "sad" | "stressed" | "tired";

export interface MoodEntry {
  date: string; // YYYY-MM-DD
  mood: Mood;
  note?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  isWorrying: boolean;
}

interface AppContextValue {
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, "id">) => void;
  removeEvent: (id: string) => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const today = new Date();
const fmt = (d: Date) => d.toISOString().slice(0, 10);
const daysAgo = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return fmt(d);
};
const daysAhead = (n: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return fmt(d);
};

const initialMoodEntries: MoodEntry[] = [
  { date: daysAgo(0), mood: "happy", note: "Ótimo treino hoje" },
  { date: daysAgo(1), mood: "stressed", note: "Prazo se aproximando" },
  { date: daysAgo(2), mood: "neutral" },
  { date: daysAgo(4), mood: "tired", note: "Noite mal dormida" },
  { date: daysAgo(6), mood: "happy" },
  { date: daysAgo(8), mood: "sad", note: "Dia difícil" },
  { date: daysAgo(10), mood: "neutral" },
  { date: daysAgo(12), mood: "happy" },
  { date: daysAgo(14), mood: "stressed" },
];

const initialEvents: CalendarEvent[] = [
  { id: "1", title: "Apresentação no trabalho", date: daysAhead(5), isWorrying: true },
  { id: "2", title: "Consulta médica", date: daysAhead(12), isWorrying: false },
  { id: "3", title: "Reunião com a equipe", date: daysAhead(3), isWorrying: true },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(initialMoodEntries);
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodEntries((prev) => {
      const filtered = prev.filter((e) => e.date !== entry.date);
      return [...filtered, entry];
    });
  };

  const addEvent = (event: Omit<CalendarEvent, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setEvents((prev) => [...prev, { ...event, id }]);
  };

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider value={{ moodEntries, addMoodEntry, events, addEvent, removeEvent, isLoggedIn, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
