import { AppSidebar } from "@/components/AppSidebar";
import Header from "@/components/main-layout/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import WrapperLayout from "@/components/main-layout/layout-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger/>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
