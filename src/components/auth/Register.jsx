import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Şifreler eşleşmiyor.");
      return;
    }
    if (password.length < 6) {
      setError("Şifre en az 6 karakter olmalı.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Bu e-posta zaten kayıtlı.");
      } else {
        setError("Kayıt başarısız oldu. Tekrar dene.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-4 dark:bg-navy-950">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm dark:border-navy-800 dark:bg-navy-900">
        <h1 className="mb-6 text-2xl font-bold text-navy-950 dark:text-white">Kayıt Ol</h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-expense-light dark:bg-red-950/40 dark:text-expense-dark">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              E-posta
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Şifre
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Şifre (Tekrar)
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-navy-950 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/30 dark:border-navy-700 dark:bg-navy-800 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-gold-500 py-2 font-medium text-navy-950 transition hover:bg-gold-600 disabled:opacity-50"
          >
            {isSubmitting ? "Kaydediliyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Zaten hesabın var mı?{" "}
          <Link to="/login" className="font-medium text-gold-600 hover:underline dark:text-gold-400">
            Giriş yap
          </Link>
        </p>
      </div>
    </div>
  );
}
