import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function AreaDoCriadorPage() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="sticky top-16" />
      </SidebarProvider>
    </>
  );
}
