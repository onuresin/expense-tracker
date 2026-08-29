import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-ivory dark:bg-navy-950">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {/* key={pathname}: rota degisince bu div yeniden monte edilir, bu da
            asagidaki "page-fade" CSS animasyonunu her sayfa gecisinde tekrar tetikler. */}
        <div key={location.pathname} className="page-fade">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
