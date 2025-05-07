'use client'

import { createGlobalStyle } from 'styled-components'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const GlobalStyles = createGlobalStyle`
    :root {
        --background: #ffffff;
        --foreground: #212D40;
        --font-geist-sans: ${geistSans.style.fontFamily};
        --font-geist-mono: ${geistMono.style.fontFamily};
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --background:#212D40;
            --foreground: #ededed;
        }
    }

    html,
    body {
        max-width: 100vw;
        overflow-x: hidden;
    }

    body {
        color: var(--foreground);
        background: var(--background);
        font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    @media (prefers-color-scheme: dark) {
        html {
            color-scheme: dark;
        }
    }
`

export { geistSans, geistMono }
export default GlobalStyles
