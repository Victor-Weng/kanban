import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation";
import { AuthContextProvider } from './AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanban",
  description: "Kanban board demo",
  icons: {
    icon: 'icon.jpg',
    shortcut: 'icon.jpg',
    apple: 'icon.jopg',
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  // short-hand destructuring of children property from props (props.children)
  // the incoming prop type must have a children property of React.ReactNode type like a string or JSX

  // lang lets browser translate the page
  return (
    <AuthContextProvider>
    <html lang="en">
      <body className="vert">
        <div className="header"><Navigation></Navigation></div>
        <div className="middle">
          <div className="sidebar">
            sidebar
          </div>
          <div className="content">
            {children}
          </div>
        </div>
        <div className="footer"><p>im footer</p></div>
      </body>
    </html>
    </AuthContextProvider>
  );
}
