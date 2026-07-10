import type { Metadata, Viewport } from "next";
import { Outfit, Work_Sans } from "next/font/google";
import Script from "next/script";
import { WhatsAppProvider } from "@/components/whatsapp-chooser";
import { SITE_URL } from "@/lib/site-data";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title:
    "Clínica Odontológica Barra Bonita | Dentista no Recreio dos Bandeirantes",
  description:
    "Clínica Odontológica Barra Bonita no Absolutto Business Towers, Recreio dos Bandeirantes. Ortodontia, implantes, endodontia, prótese, clareamento, restaurações e estética odontológica.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Clínica Odontológica Barra Bonita",
    title:
      "Clínica Odontológica Barra Bonita | Dentista no Recreio dos Bandeirantes",
    description:
      "Atendimento odontológico completo no Absolutto Business Towers, no Recreio dos Bandeirantes.",
    images: [
      {
        url: "/og-image-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Clínica Odontológica Barra Bonita",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clínica Odontológica Barra Bonita",
    description:
      "Cuidado odontológico completo no Recreio dos Bandeirantes.",
    images: ["/og-image-v2.jpg"],
  },
  category: "health",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f534e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${workSans.variable} antialiased`}
    >
      <body>
        <WhatsAppProvider>{children}</WhatsAppProvider>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-7BE21XPLT4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7BE21XPLT4');
        `}
      </Script>
    </html>
  );
}
