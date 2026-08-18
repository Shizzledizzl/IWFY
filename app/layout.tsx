import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/store";
import { PhoneShell } from "@/components/PhoneShell";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IWFY — I Will Find You",
  description:
    "Prototype voor IWFY. Zoek naar een gedeelde ontmoeting, niet naar een persoon.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f4efe8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${figtree.variable} ${fraunces.variable} font-sans antialiased`}>
        <AppProvider>
          <PhoneShell>{children}</PhoneShell>
        </AppProvider>
      </body>
    </html>
  );
}
