import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Praveen Periyasamy | Senior Android Developer Portfolio",
  description: "Experienced Android Developer specializing in Kotlin, Jetpack Compose, MVVM, Clean Architecture, Room Database, Hilt, Retrofit, and scalable mobile applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white flex flex-col">
        {children}
      </body>
    </html>
  );
}
