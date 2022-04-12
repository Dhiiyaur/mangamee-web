import {Seo} from '@/components/Seo';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <>
        <Seo />
        <Component {...pageProps} />
        </>
    );
}

export default MyApp;
