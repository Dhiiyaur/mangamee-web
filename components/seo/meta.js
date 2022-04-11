import Head from "next/head";

export const SEO = ({ title, image }) => {
    return (
        <Head>
            {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <title>{title}</title>

            <meta property="og:image" content={image} />
            <meta property="twitter:image" content={image} /> */}


            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="description" content="test SEO" />

            <meta itemProp="name" content="Animapu - Lite" />
            <meta itemProp="description" content="test SEO" />
            <meta itemProp="image" content={image} />

            <meta name="og:type" content="website" />
            <meta name="og:title" content={title} />
            <meta name="og:description" content="test SEO" />
            <meta name="og:image" content={image} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Mangamee" />
            <meta name="twitter:description" content="test SEO" />
            <meta name="twitter:image" content={image} />
        </Head>
    )
}