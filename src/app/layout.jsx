import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar'
import {SessionProvider} from 'next-auth/react'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth CRUD",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
