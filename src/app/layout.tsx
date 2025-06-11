import "./globals.css";
import Navbar from "@/components/Navbar";
import { AppProvider } from "@/store";
import { ThemeProvider } from "@/store/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'News Blog Manager',
  description: 'Manage articles, analytics, payouts, and exports',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground transition-colors duration-200">
        <ThemeProvider>
        <AppProvider>
          <Navbar />
          <main className="pt-6">{children}</main>
        </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
