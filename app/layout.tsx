import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Fira_Code, JetBrains_Mono, Source_Code_Pro, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GrainBackground from "../components/GrainBackground";

const inter = Inter({ variable: "--font-inter", subsets: ['latin'], weight: ['400','600','700'] });
const fira = Fira_Code({ variable: "--font-fira", subsets: ['latin'], weight: ['400','600'] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ['latin'], weight: ['400','600','700'] });
const sourceCode = Source_Code_Pro({ variable: "--font-source-code", subsets: ['latin'], weight: ['400','600','700'] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ['latin'], weight: ['400','600','700'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moses Chidera Okonkwo - Full-Stack Developer",
  description: "Full-stack web developer and software engineer specializing in APIs, databases, and modern frontend frameworks. Building robust backend systems with clean interfaces.",
  keywords: "Moses Okonkwo, Full-stack developer, Software engineer,Javascript, python, React, Next.js, Node.js, APIs, Databases",
  authors: [{ name: "Moses C. Okonkwo" }],
  icons: {
    icon: [
      { url: "https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png", sizes: "40x40", type: "image/png" },
      { url: "https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png", sizes: "32x32", type: "image/png" },
      { url: "https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png", sizes: "192x192", type: "image/png" },
      { url: "https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: "https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png",
    apple: { url: "https://res.cloudinary.com/dn0ipf9zx/image/upload/v1766235159/mozlogo_kqpigs.png", sizes: "180x180" },
  },
  openGraph: {
    title: "Moses C. Okonkwo - Full-Stack Developer",
    description: "Full-stack web developer building robust applications with modern technologies",
    type: "website",
  },
  twitter: {
    card: "summary",
    creator: "@0x_moze",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${fira.variable} ${jetbrains.variable} ${sourceCode.variable} ${robotoMono.variable} antialiased`}
      >
        <GrainBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
