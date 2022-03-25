import '@/styles/globals.css';
// import Layout from '@/components/layout/Layout';
import { AuthProvider } from '@/contexts/store'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
