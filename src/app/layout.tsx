<<<<<<< HEAD
export const dynamic = 'force-dynamic';
import type { Metadata } from "next";
import "./globals.css"; // MUST be present to apply styles

export const metadata: Metadata = {
  title: "ESSI MAROC - Portail Académique",
  description: "École Supérieure des Sciences Infirmières",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
=======
import type { Metadata } from "next";
import "./globals.css"; // MUST be present to apply styles

export const metadata: Metadata = {
  title: "ESSI MAROC - Portail Académique",
  description: "École Supérieure des Sciences Infirmières",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}