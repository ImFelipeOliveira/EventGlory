import Header from "@/components/main-layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="flex-1 h-[calc(100vh-4rem)] overflow-hidden">
        <main>{children}</main>
      </div>
    </div>
  );
}
