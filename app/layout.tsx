import type { Metadata } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExitIntentModal } from "@/components/ExitIntentModal";
import { OrganizationJsonLd, PersonJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `We Buy Houses in Visalia, CA | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-white font-sans text-gray-900">
        <OrganizationJsonLd />
        <PersonJsonLd name={site.people.ops.name} jobTitle={site.people.ops.title} />
        <PersonJsonLd name={site.people.ceo.name} jobTitle={site.people.ceo.title} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ExitIntentModal />
      </body>
    </html>
  );
}
