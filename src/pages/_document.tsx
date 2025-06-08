import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Candivet - Hire Smarter. Get Hired Faster.</title>
        <meta
          name="description"
          content="Candivet is the #1 global AI-powered platform designed to simplify hiring for recruiters and job seekers alike. Whether you're looking to find top talent or land your dream job, we optimize every step of the process."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/footer-logo.png" />
        <link rel="apple-touch-icon" href="/footer-logo.png" />
        <meta name="theme-color" content="#065844" />

        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-HCGCS9E392"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-HCGCS9E392');
            `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
