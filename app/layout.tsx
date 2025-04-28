// app/layout.tsx
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Bizon PMS',
  description: 'Mon tableau de bord',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-light-purple">
        <main className="flex-1 p-4">{children}</main>
      </body>
    </html>
  )
}
