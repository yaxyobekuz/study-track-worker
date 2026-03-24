// Router
import { Outlet } from "react-router-dom";

// Tanstack Query
import { useQuery } from "@tanstack/react-query";

// API
import { authAPI } from "@/features/auth/api/auth.api";

// Pages
import BlockedPage from "@/features/penalties/pages/BlockedPage";

// Components
import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/shadcn/sidebar";
import AppHeader from "@/shared/components/layout/AppHeader";
import AppSidebar from "@/shared/components/layout/AppSidebar";
import MainBackgroundPatterns from "../components/bg/MainBackgroundPatterns";

const DashboardLayout = () => {
  const { data: user } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => authAPI.getMe().then((res) => res.data.data),
  });

  if (user?.penaltyPoints >= 12) return <BlockedPage />;

  return (
    <>
      {/* Main */}
      <SidebarProvider className="relative z-10">
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex flex-1 flex-col gap-4 px-4 py-2">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* Background Patterns */}
      <MainBackgroundPatterns />
    </>
  );
};

export default DashboardLayout;
