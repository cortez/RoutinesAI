import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="bg-black">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Personalized workout plans generated with artificial intelligence."
          />
          <meta property="og:site_name" content="routinesai.com" />
          <meta
            property="og:description"
            content="Personalized workout plans generated with artificial intelligence."
          />
          <meta property="og:title" content="Routines" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="AI Workouts" />
          <meta
            name="twitter:description"
            content="Generate your own personalized workout routine in seconds."
          />
          <meta
            property="og:image"
            content="https://cortez.link/a/routines-meta.png"
          />
          <meta
            name="twitter:image"
            content="https://cortez.link/a/routines-meta.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
