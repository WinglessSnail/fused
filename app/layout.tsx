import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export const viewport: Viewport = {
  themeColor: "#dc2626",
};

export const metadata: Metadata = {
  title: "Fused",
  description: "Fuzed Tangled",
  generator: "Next.js",
  manifest: "/manifest.json",
  authors: [{ name: "Fuzed" }],
  icons: [
    { rel: "apple-touch-icon", url: "/icon.png" },
    { rel: "icon", url: "/icon.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
