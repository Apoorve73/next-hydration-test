import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { wrapper } from '@/store';
import PageLoader from '@/components/PageLoader';

function App({ Component, ...rest }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Follow SkillUp Frontend pattern exactly
  const {
    store,
    props: { pageProps },
  } = wrapper.useWrappedStore(rest);

  // Setup RTK Query listeners - but only load the heavy parts when needed
  useEffect(() => {
    // Only setup listeners for lesson pages to avoid loading unnecessary code
    if (router.pathname.startsWith('/lesson/')) {
      import('@reduxjs/toolkit/query').then(({ setupListeners }) => {
        setupListeners(store.dispatch);
      });
    }
  }, [router.pathname, store.dispatch]);

  useEffect(() => {
    const handleStart = (url: string) => {
      // Only show loader for lesson page transitions
      if (url.includes('/lesson/')) {
        setLoading(true);
      }
    };
  
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);
  
  return (
    <>
      <Head>
        <title>Next.js Hydration Test</title>
        <meta name="description" content="Proof of concept for MDX + Dynamic Components" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Global Styles */}
      <style jsx global>{`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        html,
        body {
          max-width: 100vw;
          overflow-x: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #ffffff;
          color: #24292e;
          line-height: 1.6;
        }

        a {
          color: #0366d6;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        code {
          font-family: Monaco, Consolas, 'Courier New', monospace;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          body {
            font-size: 14px;
          }
          
          h1 {
            font-size: 28px !important;
          }
          
          h2 {
            font-size: 22px !important;
          }
          
          .content-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Loading animation */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Focus styles for accessibility */
        *:focus {
          outline: 2px solid #0366d6;
          outline-offset: 2px;
        }

        /* Button styles */
        button {
          font-family: inherit;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        button:disabled {
          cursor: not-allowed;
          opacity: 0.6;
        }

        /* Input styles */
        input[type="radio"] {
          margin-right: 8px;
          accent-color: #0366d6;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Print styles */
        @media print {
          * {
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
      
      <Provider store={store}>
        {loading && <PageLoader />}
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default App;
