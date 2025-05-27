module.exports = {
  siteUrl: "https://www.candivet.com",
  generateRobotsTxt: true, // optional if you want robots.txt generated
  exclude: [
    "/admin/*",
    "/home/components/*", // exclude all component/internal wrapper URLs
    "/blog-post",
    "/dashboard/dashboard-home",
    "/dashboard/job-board/components/*",
    "/dashboard/job-board/job-board-filter",
    "/test-iframe",
  ],
};
