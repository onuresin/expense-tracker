import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import MobileTabBar from "./MobileTabBar";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-ivory dark:bg-navy-950 lg:flex-row">
      <Sidebar />
      <MobileHeader />

      <main className="flex-1 overflow-y-auto p-6 pb-24 lg:pb-6">
        {/* key={pathname}: rota degisince bu div yeniden monte edilir, bu da
            index.css'teki "page-fade" animasyonunu her sayfa gecisinde tekrar tetikler. */}
        <div key={location.pathname} className="page-fade">
          <Outlet />
        </div>
      </main>

      <MobileTabBar />
    </div>
  );
}
