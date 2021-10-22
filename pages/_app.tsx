import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from 'store'
import Footer from 'components/Footer'
import Header from 'components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}><Header/><Component {...pageProps} /><Footer/></Provider>
}
export default MyApp
