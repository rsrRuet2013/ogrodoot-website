import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

export const metadata: Metadata = {
  title: "Team Ogrodoot | RUET Mars Rover Team",
  description: "Official website of Team Ogrodoot — The premier Mars Rover Team of Rajshahi University of Engineering & Technology (RUET). Designing the future of planetary exploration.",
  keywords: ["Team Ogrodoot", "RUET Rover Team", "RUET Mars Rover", "University Rover Challenge", "URC", "Robotics", "Engineering", "Bangladesh"],
  authors: [{ name: "Team Ogrodoot RUET" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-[#050505] text-star-white selection:bg-mars-red selection:text-white antialiased overflow-x-hidden">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1 flex flex-col w-full relative">{children}</main>
          <Footer />
          <CustomCursor />
        </TooltipProvider>
      </body>
    </html>
  );
}
