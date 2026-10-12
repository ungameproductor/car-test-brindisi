import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import DotsField from "@/components/DotsField";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0F151C",
};

export const metadata: Metadata = {
  title: "Car Test Brindisi | Centro revisioni e officina meccanica",
  description:
    "Centro revisioni e officina meccanica a Brindisi. Revisioni auto e moto, meccanica, diagnosi, pulizia FAP e ricarica aria condizionata.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
    >
      <body>
        <DotsField />
        <div className="relative z-[1]">{children}</div>
      </body>
    </html>
  );
}
