import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import TanstackTable from "@/components/tanstack-table";

export default function AreaDoCriadorPage() {
  return (
    <div className="flex-1 h-[calc(100vh-4rem)] overflow-hidden">
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="sticky" />
        <TanstackTable />
      </SidebarProvider>
    </div>
  );
}
