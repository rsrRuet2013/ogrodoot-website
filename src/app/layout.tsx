import type { Metadata } from "next";
import { Orbitron, Exo_2, Space_Grotesk, JetBrains_Mono, Rajdhani } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";

const orbitron = Orbitron({ 
  subsets: ['latin'], 
  variable: '--font-orbitron' 
});

const exo2 = Exo_2({ 
  subsets: ['latin'], 
  variable: '--font-exo2' 
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk' 
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains-mono' 
});

const rajdhani = Rajdhani({ 
  subsets: ['latin'], 
  variable: '--font-rajdhani',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "Team Ogrodoot | RUET Mars Rover Team",
  description: "Designing the future of Mars exploration from Bangladesh to the Universe. Official website of Team Ogrodoot, Rajshahi University of Engineering & Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased dark",
        orbitron.variable,
        exo2.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
        rajdhani.variable
      )}
    >
      <body className="min-h-full flex flex-col font-sans">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1 flex flex-col w-full">{children}</main>
          <Footer />
          <CustomCursor />
        </TooltipProvider>
      </body>
    </html>
  );
}
