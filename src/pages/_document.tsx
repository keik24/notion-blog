import Document, { Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from '../lib/gtag'

export default class extends Document {
  render() {
    return (
      <html>
        <Head>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=UA-168771799-1`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-168771799-1');
            `,
      }}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}