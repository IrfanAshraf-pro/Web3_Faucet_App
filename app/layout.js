import './globals.css'


export const metadata = {
  title: 'Faucet App',
  description: 'App to collect funds',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  )
}
