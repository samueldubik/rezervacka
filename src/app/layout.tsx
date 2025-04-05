import Head from 'next/head'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Rezervacka',
  description: 'Rezervačný systém J9',
  icons: '/favicon.png'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  )
}
