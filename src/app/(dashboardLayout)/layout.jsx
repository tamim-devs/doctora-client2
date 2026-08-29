

export const dynamic = "force-dynamic";

import DashboardSideBar from "@/components/dashboard/DashboardSidebar";
import { getUser } from "@/lib/session";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="flex min-h-screen">
        <DashboardSideBar />

        <main className="min-w-0 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;