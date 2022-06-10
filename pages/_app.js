import {Seo} from '@/components/Seo';
import '@/styles/globals.css';
import { usePanelbear } from '@panelbear/panelbear-nextjs';

function MyApp({ Component, pageProps }) {
    usePanelbear('DsV7BApUMRt');
    return (
        <>
        <Seo />
        <Component {...pageProps} />
        </>
    );
}

export default MyApp;
