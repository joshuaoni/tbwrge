module.exports = {
  siteUrl: "https://www.candivet.com",
  generateRobotsTxt: true,
  exclude: [
    "/admin",
    "/admin/*",
    "/home/components/*", // exclude all component/internal wrapper URLs
    "/blog-posts",
    "/dashboard/candidates",
    "/dashboard/dashboard-home",
    "/dashboard/job-board/components/*",
    "/dashboard/job-board/job-board-filter",
    "/test-iframe",
  ],
};
