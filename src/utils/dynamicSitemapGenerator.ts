
interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  images?: Array<{
    loc: string;
    title: string;
    caption: string;
    geoLocation?: string;
  }>;
  alternates?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export const generateDynamicSitemap = (): string => {
  const baseUrl = 'https://mindset-coach-martina.ch';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Get last modified dates from localStorage or default to current date
  const getLastModified = (section: string): string => {
    try {
      const adminContent = localStorage.getItem('adminContentOverrides');
      if (adminContent) {
        const content = JSON.parse(adminContent);
        if (content[section]) {
          return new Date().toISOString().split('T')[0];
        }
      }
    } catch (error) {
      console.error('Error reading admin content for sitemap:', error);
    }
    return currentDate;
  };

  const urls: SitemapUrl[] = [
    {
      loc: baseUrl,
      lastmod: getLastModified('Hero'),
      changefreq: 'weekly',
      priority: 1.0,
      images: [
        {
          loc: `${baseUrl}/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png`,
          title: 'Mindset Coaching mit Martina - Persönliche Entwicklung',
          caption: 'Transformatives Mindset Coaching für ein erfülltes Leben',
          geoLocation: 'Zürich, Switzerland'
        },
        {
          loc: `${baseUrl}/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png`,
          title: 'Martina Domeniconi - Life Coach',
          caption: 'Professionelle Mindset Coaching Expertin',
          geoLocation: 'Zürich, Switzerland'
        }
      ],
      alternates: [
        {
          hreflang: 'de-ch',
          href: baseUrl
        },
        {
          hreflang: 'de',
          href: baseUrl
        },
        {
          hreflang: 'x-default',
          href: baseUrl
        }
      ]
    },
    {
      loc: `${baseUrl}/#services`,
      lastmod: getLastModified('Services'),
      changefreq: 'monthly',
      priority: 0.9,
      alternates: [
        {
          hreflang: 'de-ch',
          href: `${baseUrl}/#services`
        },
        {
          hreflang: 'de',
          href: `${baseUrl}/#services`
        }
      ]
    },
    {
      loc: `${baseUrl}/#about`,
      lastmod: getLastModified('About'),
      changefreq: 'monthly',
      priority: 0.8,
      alternates: [
        {
          hreflang: 'de-ch',
          href: `${baseUrl}/#about`
        },
        {
          hreflang: 'de',
          href: `${baseUrl}/#about`
        }
      ]
    },
    {
      loc: `${baseUrl}/#pricing`,
      lastmod: getLastModified('PricingWithQuote'),
      changefreq: 'monthly',
      priority: 0.9,
      alternates: [
        {
          hreflang: 'de-ch',
          href: `${baseUrl}/#pricing`
        },
        {
          hreflang: 'de',
          href: `${baseUrl}/#pricing`
        }
      ]
    },
    {
      loc: `${baseUrl}/#contact`,
      lastmod: getLastModified('Contact'),
      changefreq: 'monthly',
      priority: 0.9,
      alternates: [
        {
          hreflang: 'de-ch',
          href: `${baseUrl}/#contact`
        },
        {
          hreflang: 'de',
          href: `${baseUrl}/#contact`
        }
      ]
    },
    // Legal pages
    {
      loc: `${baseUrl}/privacy`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/terms`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    },
    {
      loc: `${baseUrl}/impressum`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.3
    }
  ];

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
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

    // Add alternate language versions
    if (url.alternates && url.alternates.length > 0) {
      url.alternates.forEach(alternate => {
        urlXml += `
    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`;
      });
    }

    // Add images
    if (url.images && url.images.length > 0) {
      url.images.forEach(image => {
        urlXml += `
    <image:image>
      <image:loc>${image.loc}</image:loc>
      <image:title>${image.title}</image:title>
      <image:caption>${image.caption}</image:caption>`;
        if (image.geoLocation) {
          urlXml += `
      <image:geo_location>${image.geoLocation}</image:geo_location>`;
        }
        urlXml += `
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

export const updateSitemapOnContentChange = () => {
  const sitemapContent = generateDynamicSitemap();
  
  // In a real implementation, you would upload this to your server
  // For now, we'll store it and provide download functionality
  localStorage.setItem('generatedSitemap', sitemapContent);
  
  // Dispatch event to notify about sitemap update
  window.dispatchEvent(new CustomEvent('sitemapUpdated', { 
    detail: { sitemap: sitemapContent } 
  }));
  
  return sitemapContent;
};

export const downloadUpdatedSitemap = () => {
  const sitemapContent = generateDynamicSitemap();
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
