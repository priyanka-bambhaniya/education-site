import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { env } from "@/lib/env";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${env.NEXT_PUBLIC_APP_NAME} | K-12 Learning Analytics`,
    template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description:
    "EduInsight Pro is a production-grade K-12 learning analytics SaaS built on Next.js 14, Tailwind CSS, and Supabase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
