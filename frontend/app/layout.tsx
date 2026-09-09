import type { Metadata } from "next";
import "./globals.css";
import Footbar from "./layout/footbar";
import Header from "./layout/header";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: "Gloria - настоящие истории, настоящие люди",
  description: "Gloria подбирает подросткам реальные истории людей, которые столкнулись с той же трудностью и смогли её преодолеть.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Caveat:wght@600;700&family=Unbounded:wght@800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {children}
        </main>
        <Footbar />
      </body>
    </html>
  );
}
