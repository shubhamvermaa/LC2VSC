import Navbar from './components/Navbar';
import './global.css'
export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  const style = {
    fontFamily:"JetBrains Mono",
  }
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.cdnfonts.com/css/jetbrains-mono" rel="stylesheet"></link>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body style = {style}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}