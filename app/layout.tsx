import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from '@/components/ThemeToggle'
import { Sidebar } from '@/components/SideBar'
import "./globals.css";

const Inter = localFont({
  src: "./fonts/Inter.woff2",
  variable: "--font-inter",
  weight: "100 900",
});

const GeistVF = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Storyboard Tool",
  description: "Design Tool for creating Storyboards based on Comics Aesthetics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${Inter.variable} ${GeistVF.variable} antialiased select-none font-geist`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem>
          <div className="relative h-screen flex flex-col md:flex-row">
            <Sidebar />
            <main className="flex-grow h-screen flex flex-col">
              <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
              </div>
              {children}
              <div className="text-xs text-center text-muted-foreground py-4">
                Storyboard Tool | Flux LoRa | Enhancing your Design Process
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
