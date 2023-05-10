import { Figtree } from 'next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '@/styles/globals.css';

const figtree = Figtree({ subsets: ['latin'] });

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Varsity</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <main className={figtree.className}>
      <Component {...pageProps} />
    </main>
  </>
);

export default App;
