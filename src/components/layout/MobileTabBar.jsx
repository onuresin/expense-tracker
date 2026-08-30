import { NavLink } from "react-router-dom";
import { useLanguage } from "../../hooks/useLanguage";
import { OverviewIcon, TransactionsIcon, DebtsIcon } from "./NavIcons";

const NAV_ITEMS = [
  { to: "/", key: "overview", end: true, Icon: OverviewIcon },
  { to: "/islemler", key: "transactions", Icon: TransactionsIcon },
  { to: "/borclar", key: "debts", Icon: DebtsIcon },
];

// Sadece lg altinda gorunen, ekranin altina sabitlenmis navigasyon bari.
// 3 ana bolum oldugu ve kullanici bunlar arasinda sik gecis yapacagi icin
// (hamburger menu gibi "once ac sonra tikla" yerine) tek dokunusla erisim
// sagliyor - guncel fintech uygulamalarinda (Revolut, N26 vb.) standart olan
// desen bu. iPhone'larda alt "home indicator" ile cakismasin diye safe-area
// padding'i de ekliyoruz.
export default function MobileTabBar() {
  const { t } = useLanguage();

  const labels = {
    overview: t("sidebar.overview"),
    transactions: t("sidebar.transactions"),
    debts: t("sidebar.debts"),
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 flex border-t border-navy-800 bg-navy-950 lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {NAV_ITEMS.map(({ to, key, end, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium ${
              isActive ? "text-gold-400" : "text-slate-400"
            }`
          }
        >
          <Icon className="h-5 w-5" />
          <span>{labels[key]}</span>
        </NavLink>
      ))}
    </nav>
  );
}
