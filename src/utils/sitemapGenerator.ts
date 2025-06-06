
interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    loc: string;
    title: string;
    caption: string;
  }>;
}

export const generateSitemap = (): string => {
  const baseUrl = 'https://mindset-coach-martina.ch';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const urls: SitemapUrl[] = [
    {
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png`,
          title: 'Mindset Coaching mit Martina - Persönliche Entwicklung',
          caption: 'Transformatives Mindset Coaching für ein erfülltes Leben'
        },
        {
          loc: `${baseUrl}/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png`,
          title: 'Martina Domeniconi - Life Coach',
          caption: 'Professionelle Mindset Coaching Expertin'
        }
      ]
    },
    {
      loc: `${baseUrl}/#services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/#about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/#pricing`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/#contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.9
    }
  ];

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">`;

  const urlsXml = urls.map(url => {
    let urlXml = `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>`;

    if (url.images && url.images.length > 0) {
      url.images.forEach(image => {
        urlXml += `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>
      <image:geo_location>Zürich, Switzerland</image:geo_location>
    </image:image>`;
      });
    }

    urlXml += `
  </url>`;
    return urlXml;
  }).join('\n');

  return `${xmlHeader}
${urlsXml}
</urlset>`;
};

export const updateSitemap = async () => {
  const sitemapContent = generateSitemap();
  console.log('Generated sitemap:', sitemapContent);
  
  // In a real implementation, you would upload this to your server
  // For now, we'll just log it and provide download functionality
  return sitemapContent;
};

export const downloadSitemap = () => {
  const sitemapContent = generateSitemap();
  const blob = new Blob([sitemapContent], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
