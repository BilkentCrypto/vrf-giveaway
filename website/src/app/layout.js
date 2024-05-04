import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Giveaway",
  description: "Created by Bilkent Blockchain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>

    </html>
  );
}
