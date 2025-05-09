import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "./providers";
import { Provider } from "jotai";
import "@livekit/components-styles";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voc-al",
  description: "Evaluation platform for Voice AI models.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={`antialiased`}>
          <PostHogProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </PostHogProvider>
        </body>
      </Provider>
    </html>
  );
}
