/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://thestudyabroadconsultant.ca',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
  },
}
