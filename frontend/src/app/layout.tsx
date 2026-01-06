import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { VoiceNavigator } from "@/components/voice-navigator";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SkipToContent } from "@/components/skip-to-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AccessLearn AI",
  description: "Inclusive Education Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const contrast = localStorage.getItem('accesslearn_contrast');
                  const textSize = localStorage.getItem('accesslearn_text_size');
                  if (contrast === 'high-contrast') document.documentElement.classList.add('high-contrast');
                  if (textSize === 'large') document.documentElement.style.fontSize = '18px';
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col build-v2-active`}
      >
        <SkipToContent />
        <Navbar />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <VoiceNavigator />
      </body>
    </html>
  );
}
