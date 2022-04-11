import Head from "next/head";

export const SEO = ({title, image}) => {
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:image" content={image} />
            <meta property="twitter:image" content={image} />
        </Head>
    )
}