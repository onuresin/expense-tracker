import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useLanguage } from "../../hooks/useLanguage";
import BrandMark from "./BrandMark";
import CurrencyDropdown from "./CurrencyDropdown";

// Sadece lg altinda (telefon/tablet) gorunen ince ust bar. Ana navigasyon
// buradan degil, alttaki MobileTabBar'dan yapiliyor - burada sadece marka
// ve az kullanilan ayarlar (tema/dil/cikis) icin acilir bir menu var.
export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const initial = currentUser?.email ? currentUser.email[0].toUpperCase() : "?";

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-navy-800 bg-navy-950 px-4 py-3 text-slate-200 lg:hidden">
      <div className="flex items-center gap-2">
        <BrandMark size={28} />
        <p className="text-sm font-semibold text-white">{t("sidebar.brandTitle")}</p>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-sm font-semibold text-navy-950 ring-2 ring-navy-800 transition hover:ring-gold-500/50"
        >
          {/* currentUser.photoURL bugun icin hep bos (uygulama sadece e-posta/sifre
              ile giris destekliyor) ama ileride Google ile giris eklenirse otomatik
              olarak gercek fotografi gosterecek - simdilik harf-avatara duser. */}
          {currentUser?.photoURL ? (
            <img src={currentUser.photoURL} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </button>

        {/* Her zaman DOM'da tutuluyor, gorunurlugu opacity/scale ile kontrol
            ediliyor - boylece acilis/kapanis "transition" ile yumusak oluyor.
            origin-top-right: buton sag ustte oldugu icin buyume/kuculme oradan
            baslıyor (aksi halde sol-alttan aciliyormus gibi garip dururdu). */}
        <div
          className={`absolute right-0 z-30 mt-2 w-52 origin-top-right rounded-md border border-navy-800 bg-navy-900 p-2 shadow-lg transition duration-150 ease-out ${
            menuOpen
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-95 opacity-0"
          }`}
        >
          <p className="truncate px-2 py-1 text-xs text-slate-400">{currentUser?.email}</p>

          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-md px-2 py-2 text-xs font-medium text-slate-300 hover:bg-navy-800 hover:text-white"
          >
            <span>{theme === "dark" ? t("sidebar.darkTheme") : t("sidebar.lightTheme")}</span>
            <span>{theme === "dark" ? "🌙" : "☀️"}</span>
          </button>

          <button
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className="flex w-full items-center justify-between rounded-md px-2 py-2 text-xs font-medium text-slate-300 hover:bg-navy-800 hover:text-white"
          >
            <span>{language === "tr" ? "English" : "Türkçe"}</span>
            <span className="font-semibold">{language === "tr" ? "EN" : "TR"}</span>
          </button>

          <CurrencyDropdown />

          <button
            onClick={logout}
            className="mt-1 w-full rounded-md px-2 py-2 text-left text-xs font-medium text-gold-400 hover:bg-navy-800 hover:text-gold-300"
          >
            {t("sidebar.logout")}
          </button>
        </div>
      </div>
    </header>
  );
}
