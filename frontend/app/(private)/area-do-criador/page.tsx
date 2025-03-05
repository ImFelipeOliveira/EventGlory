import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function AreaDoCriadorPage() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        Área do Criador
      </SidebarProvider>
    </>
  );
}
