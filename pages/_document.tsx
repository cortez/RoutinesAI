import Document, { Head, Html, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
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
          <meta property="og:title" content="Routines AI" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Routines AI" />
          <meta
            name="twitter:description"
            content="Generate your own personalized workout routine in seconds."
          />
          <meta
            property="og:image"
            content="https://rstr.in/mo3ymucdlps90r/routines-ai/-8Iz9ImUdY1"
          />
          <meta
            name="twitter:image"
            content="https://rstr.in/mo3ymucdlps90r/routines-ai/-8Iz9ImUdY1"
          />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="apple-mobile-web-app-title" content="Routines AI" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
