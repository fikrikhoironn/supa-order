'use client'
import './globals.css'
import { Inter, DM_Sans } from 'next/font/google'
import {Providers} from "@/app/providers";

const inter = Inter({ subsets: ['latin'] })
const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}
