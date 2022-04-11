import Head from "next/head";

export const SEO = (props) => {
    const { title, image } = props
    return (
        <Head>
            <title>{title}</title>
            <meta property="og:image" content={image} />
            <meta property="twitter:image" content={image} />
        </Head>
    )
}