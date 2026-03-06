import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pt-taskflow-leonardo.vercel.app/"),
  title: "TaskFlow | Manage Tasks Faster with a Clean, Modern To-Do App",
  description:
    "TaskFlow is a modern task manager built with Next.js, Zustand, and Tailwind CSS. Organize, search, and complete tasks with fast optimistic updates and a clean UI.",
  keywords: [
    "taskflow",
    "todo app",
    "task manager",
    "next.js",
    "zustand",
    "tailwind css",
    "optimistic updates",
    "productivity",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", rel: "shortcut icon" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    title: "TaskFlow | Manage Tasks Faster with a Clean, Modern To-Do App",
    description:
      "Plan, track, and complete tasks in a polished interface with pagination, search, and optimistic updates for instant feedback.",
    siteName: "TaskFlow",
    url: "/",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "TaskFlow app preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow | Manage Tasks Faster with a Clean, Modern To-Do App",
    description:
      "A modern Next.js to-do app with Zustand state management and optimistic updates for a snappy experience.",
    images: ["/og.webp"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[auto_1fr] min-h-screen`}
      >
        {children}
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
