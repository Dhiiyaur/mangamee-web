import '@/styles/globals.css';
import { AuthProvider } from '@/contexts/store'

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
