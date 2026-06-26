import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nguyencongmanh.vercel.app"),
  title: "Manh Nguyen Cong — Full-Stack Developer",
  description:
    "Full-stack developer with 10+ years shipping production software — React, Next.js, React Native, Node.js, AWS and web3. 10 live App Store apps and platforms scaled to 200K monthly users.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "React Native",
    "Node.js",
    "AWS",
    "Web3",
    "Manh Nguyen",
  ],
  authors: [{ name: "Manh Nguyen Cong" }],
  icons: {
    icon: "/favicon.ico?v=2",
  },
  openGraph: {
    title: "Manh Nguyen Cong — Full-Stack Developer",
    description:
      "10+ years shipping production apps & platforms. 10 live App Store apps. React · Next.js · React Native · Node.js · AWS · Web3.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
