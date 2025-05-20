import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import MenuBar from "@/app/components/MenuBar";
import { ThemeProvider } from 'next-themes'
import Script from "next/script";
import ScrollToTop from "./components/backTop";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Casamento",
  description: "Casamento de Eduardo e Jéssica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Casamento Eduardo e Jéssica" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollToTop />
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
      >
        <MenuBar />
        {children}
        <Script id="clarity-script" strategy="afterInteractive">
          {`    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "pvfmqlyj3d");`}
        </Script>
      </ThemeProvider>

      </body>
    </html>
  );
}
