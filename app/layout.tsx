import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Boluwatife Alabi — Software Engineer", template: "%s — Boluwatife Alabi" },
  description: "Web and mobile software engineer building scalable, considered digital products.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: { title: "Boluwatife Alabi — Software Engineer", description: "Web and mobile products, engineered with purpose.", type: "website", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Boluwatife Alabi — Web & Mobile Software Engineer" }] },
  twitter: { card: "summary_large_image", title: "Boluwatife Alabi — Software Engineer", description: "Web and mobile products, engineered with purpose.", images: ["/og.png"] },
};

const themeScript = `(function(){try{var s=localStorage.getItem('ba-theme');var t=s||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>;
}
