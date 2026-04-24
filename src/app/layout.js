import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, Show, UserButton } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LexisGraph — AI-Powered Legal Compliance Platform",
  description:
    "Analyze policies, detect legal gaps, and stay compliant using knowledge graphs and GraphRAG. Automate regulatory compliance with AI.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          {/* Keep only signed-in profile action globally to avoid duplicate signed-out CTAs */}
          <header className="fixed top-4 right-4 z-[100] flex items-center gap-3">
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>

          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
