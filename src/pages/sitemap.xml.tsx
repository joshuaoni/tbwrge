import { GetServerSideProps } from "next";
import { getBlogs, BlogItem } from "@/actions/blog";

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = "https://www.candivet.com";

  const staticPages = [
    "",
    "/about",
    "/blog",
    "/community",
    "/cookie-policy",
    "/dashboard/community",
    "/disclaimer",
    "/forgot-password",
    "/pricing",
    "/privacy-policy",
    "/reset-password",
    "/sign-in",
    "/sign-up",
    "/terms-of-service",
    "/verify-email",
  ];

  // Fetch dynamic content
  let dynamicUrls: Array<{ url: string; lastmod: string; priority: number }> =
    [];

  try {
    // Fetch approved blog posts
    const blogs = await getBlogs({ approved: true, page: 0 });
    const blogUrls = blogs.map((blog: BlogItem) => ({
      url: `/blog/${blog.id}`,
      lastmod: blog.updated_at || blog.created_at || new Date().toISOString(),
      priority: 0.8, // Higher priority for blog content
    }));
    dynamicUrls.push(...blogUrls);

    // Note: Community posts are excluded since they're dashboard pages
    // Only the community listing page (/dashboard/community) is included
  } catch (error) {
    console.error("Error fetching dynamic content for sitemap:", error);
    // Continue with static pages even if dynamic content fails
  }

  // Combine static and dynamic URLs
  const allUrls = [
    ...staticPages.map((page) => ({
      url: page,
      lastmod: new Date().toISOString(),
      priority: 0.7,
    })),
    ...dynamicUrls,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls
        .map(
          ({ url, lastmod, priority }) => `
        <url>
          <loc>${baseUrl}${url}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>daily</changefreq>
          <priority>${priority}</priority>
        </url>
      `
        )
        .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default Sitemap;
