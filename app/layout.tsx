import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Fira_Code, JetBrains_Mono, Source_Code_Pro, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import GrainBackground from "../components/GrainBackground";
import PageSwipeListener from "../components/PageSwipeListener";
import PageNavigation from "../components/PageNavigation";

const inter = Inter({ variable: "--font-inter", subsets: ['latin'], weight: ['400', '600', '700'] });
const fira = Fira_Code({ variable: "--font-fira", subsets: ['latin'], weight: ['400', '600'] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ['latin'], weight: ['400', '600', '700'] });
const sourceCode = Source_Code_Pro({ variable: "--font-source-code", subsets: ['latin'], weight: ['400', '600', '700'] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ['latin'], weight: ['400', '600', '700'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define the base URL for metadata
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : 'https://moz-flame.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Moses Chidera Okonkwo - Full-Stack Developer",
    template: "%s | Moses Chidera Okonkwo"
  },
  description: "Full-stack web developer and software engineer specializing in APIs, databases, and modern frontend frameworks. Building robust backend systems with clean interfaces.",
  applicationName: "Moses Portfolio",
  authors: [{ name: "Moses C. Okonkwo", url: "https://www.linkedin.com/in/m-chidera-okonkwo/" }],
  generator: "Next.js",
  keywords: ["Moses Okonkwo", "Full-stack developer", "Software engineer", "Javascript", "Python", "React", "Next.js", "Node.js", "APIs", "Databases", "Web Development", "Frontend", "Backend"],
  creator: "Moses C. Okonkwo",

  publisher: "Moses C. Okonkwo",
  openGraph: {
    title: "Moses C. Okonkwo - Full-Stack Developer",
    description: "Full-stack web developer building robust applications with modern technologies",
    url: baseUrl,
    siteName: "Moses Chidera Okonkwo Portfolio",
    locale: "en_US",

    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moses C. Okonkwo - Full-Stack Developer",
    description: "Full-stack web developer building robust applications with modern technologies",
    creator: "@0x_moze",
  },
  alternates: {
    canonical: baseUrl,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Moses Chidera Okonkwo",
  "url": baseUrl,
  "sameAs": [
    "https://www.linkedin.com/in/m-chidera-okonkwo/",
    "https://github.com/moses-Dera",
    "https://x.com/0x_moze"
  ],
  "jobTitle": "Full-Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  },
  "description": "Full-stack web developer and software engineer specializing in APIs, databases, and modern frontend frameworks."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${fira.variable} ${jetbrains.variable} ${sourceCode.variable} ${robotoMono.variable} antialiased min-h-screen selection:bg-accent selection:text-white flex flex-col relative z-10 bg-background text-foreground`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storedTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.add('light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <GrainBackground />
        <Navbar />
        <PageSwipeListener />
        <PageNavigation />
        <main className="flex-1 flex flex-col pb-16">
          {children}
        </main>
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
