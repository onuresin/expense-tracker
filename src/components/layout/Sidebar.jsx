import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";

export default function Sidebar() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const navItems = [
    { to: "/", label: t("sidebar.overview"), end: true },
    { to: "/islemler", label: t("sidebar.transactions") },
    { to: "/borclar", label: t("sidebar.debts") },
  ];

  return (
    <aside className="sticky top-0 flex h-screen w-60 flex-shrink-0 flex-col bg-navy-950 text-slate-200">
      <div className="flex items-center gap-3 px-5 py-6">
        <BrandMark />
        <div>
          <p className="text-base font-semibold leading-tight text-white">{t("sidebar.brandTitle")}</p>
          <p className="text-xs text-slate-400">{t("sidebar.brandSubtitle")}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-navy-800 text-gold-400"
                  : "text-slate-300 hover:bg-navy-900 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-3 border-t border-navy-800 px-4 py-4">
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="flex flex-1 items-center justify-between rounded-md bg-navy-900 px-3 py-2 text-xs font-medium text-slate-300 transition hover:text-white"
          >
            <span>{theme === "dark" ? t("sidebar.darkTheme") : t("sidebar.lightTheme")}</span>
            <span>{theme === "dark" ? "🌙" : "☀️"}</span>
          </button>
          <button
            onClick={toggleLanguage}
            aria-label="Change language"
            title={language === "tr" ? "Switch to English" : "Türkçe'ye geç"}
            className="rounded-md bg-navy-900 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:text-white"
          >
            {language === "tr" ? "EN" : "TR"}
          </button>
        </div>

        <div>
          <p className="truncate text-xs text-slate-400">{currentUser?.email}</p>
          <button
            onClick={logout}
            className="mt-1 text-xs font-medium text-gold-400 hover:text-gold-300"
          >
            {t("sidebar.logout")}
          </button>
        </div>
      </div>
    </aside>
  );
}

// Basit, tek renkli (altın) bir marka simgesi - yükselen finansal grafiği temsil eden
// üç çubuk. Harici bir dosya/font gerektirmez, SVG olduğu için her boyutta net görünür.
function BrandMark() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="10" fill="url(#brandGradient)" />
      <rect x="9" y="19" width="4" height="9" rx="1" fill="#0B1220" />
      <rect x="16" y="14" width="4" height="14" rx="1" fill="#0B1220" />
      <rect x="23" y="8" width="4" height="20" rx="1" fill="#0B1220" />
      <defs>
        <linearGradient id="brandGradient" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4AF37" />
          <stop offset="1" stopColor="#A6841F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
