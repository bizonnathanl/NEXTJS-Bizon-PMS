// app/layout.tsx
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "Bizon PMS",
  description: "Mon tableau de bord",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex bg-light-purple">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
