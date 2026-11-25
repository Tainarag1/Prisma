import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, UserCircle2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import logo from "../../assets/logo.png";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { logout } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card/95 border border-border rounded-3xl shadow-glow p-6 backdrop-blur-xl">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Prisma Logo" className="w-12 h-12" />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>

        <div className="flex flex-col items-center gap-4 text-center pb-6 border-b border-border mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-primary/10 text-primary shadow-sm">
            <UserCircle2 className="w-10 h-10" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Perfil</p>
            <h1 className="text-2xl font-bold text-foreground">Sarah</h1>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Conta</p>
            <p className="text-foreground font-semibold mt-2">sarah@example.com</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Preferências</p>
            <p className="text-foreground font-medium mt-2">Tema claro</p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair da conta
          </button>
        </div>
      </div>
    </div>
  );
}
