import type { AppProps } from 'next/app'
import { ChakraProvider, DarkMode } from '@chakra-ui/react'
import { MainLayout } from 'components/layouts'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ChakraProvider>
  )}

export default MyApp
