import type { ReactNode } from "react"
import { Providers } from "./providers"
import '../index.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PulseOps',
  icons: {
    icon: '/favicon.svg',
  }
}

export default function RootLayout( {children}: {children: ReactNode} ) {
    return (
        <html lang="ru">
            <body>
                <Providers>
                    <div id="root">{children}</div>
                </Providers>
            </body>
        </html>
    )
}