import Head from "next/head";

export const Seo = (props) => {
    return (
        <Head>
            <title>Mangamee</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <link rel='manifest' href='/manifest.json' />

            {props ?
                (
                    <>
                        <meta name="og:title" content="Mangamee" />
                        <meta name="og:description" content={props.desc} />
                        <meta property="og:image" content={props.cover} />
                        <meta name="twitter:title" content="Mangamee" />
                        <meta name="twitter:description" content={props.desc} />
                        <meta property="twitter:image" content={props.cover} />
                    </>
                ) : (
                    <>
                        <meta name="og:title" content="Mangamee" />
                        <meta name="og:description" content="" />
                        <meta property="og:image" content="https://mangamee.vercel.app/icons/cover.png" />
                        <meta name="twitter:title" content="Mangamee" />
                        <meta name="twitter:description" content="" />
                        <meta property="twitter:image" content="https://mangamee.vercel.app/icons/cover.png" />
                    </>
                )
            }
        </Head>
    )
}