import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
}

const SEO = ({
  title = "Candivet - Hire Smarter. Get Hired Faster.",
  description = "Candivet is the #1 global AI-powered platform designed to simplify hiring for recruiters and job seekers alike. Whether you're looking to find top talent or land your dream job, we optimize every step of the process.",
  canonical,
  ogImage = "https://candivet.com/seo-logo.png",
  ogType = "website",
  noIndex = false,
}: SEOProps) => {
  const canonicalUrl = canonical || "https://candivet.com/";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Candivet" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#065844" />
    </Head>
  );
};

export default SEO;
