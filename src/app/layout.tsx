import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../styles/StreamTheme.css";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { AdminProvider } from "providers/AdminProvider";
import { checkRole } from "~/lib/roles";

export const metadata = {
  title: "Dz Incubato",
  description: "Online Incubator",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} bg-`}>
      <ClerkProvider>
        <body>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AdminProvider initialIsAdmin={checkRole("admin")}>
                {children}
              </AdminProvider>
              <Toaster />
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
