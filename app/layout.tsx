import { Cormorant_Garamond, Archivo } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400"], variable: "--font-display" });
const sans = Archivo({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-sans" });

export const metadata = { title: "Specter Prime — Roofing & Construction", description: "Roofing and construction, Lagos." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}