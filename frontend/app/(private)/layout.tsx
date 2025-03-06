import Header from "@/components/main-layout/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div>
        <main>{children}</main>
      </div>
    </div>
  );
}
