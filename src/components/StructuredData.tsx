
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  pageType?: 'home' | 'services' | 'about' | 'pricing' | 'contact';
}

const StructuredData = ({ pageType = 'home' }: StructuredDataProps) => {
  const baseUrl = 'https://mindset-coach-martina.ch';
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    "name": "Mindset Coaching mit Martina",
    "alternateName": "Martina Domeniconi Coaching",
    "description": "Professionelles Mindset Coaching für persönliche Entwicklung und Transformation in Zürich",
    "url": baseUrl,
    "logo": `${baseUrl}/lovable-uploads/abb0bc70-ae8b-43ce-867f-d7beece5a8a2.png`,
    "image": `${baseUrl}/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ruedi-Walter-strasse 4",
      "addressLocality": "Zürich",
      "postalCode": "8050",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.4108,
      "longitude": 8.5434
    },
    "telephone": "+41 788 400 481",
    "email": "info@mindset-coach-martina.ch",
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "CHF 90-150",
    "serviceArea": {
      "@type": "Place",
      "name": "Zürich, Schweiz"
    },
    "foundingDate": "2023",
    "sameAs": [
      "https://www.linkedin.com/in/martina-domeniconi",
      "https://www.instagram.com/martinadomeniconi.coaching"
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Martina Domeniconi",
    "jobTitle": "Mindset Coach",
    "description": "Zertifizierte Mindset Coach spezialisiert auf persönliche Entwicklung und Transformation",
    "url": baseUrl,
    "image": `${baseUrl}/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png`,
    "worksFor": {
      "@id": `${baseUrl}/#organization`
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zürich",
      "addressCountry": "CH"
    },
    "telephone": "+41 788 400 481",
    "email": "info@mindset-coach-martina.ch"
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mindset Coaching",
    "description": "Individuelles 1:1 Mindset Coaching für persönliche Entwicklung, Zielerreichung und Lebensveränderung",
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "serviceType": "Life Coaching",
    "category": "Personal Development",
    "offers": {
      "@type": "Offer",
      "price": "90",
      "priceCurrency": "CHF",
      "description": "Einzelsitzung Mindset Coaching (45-60 Minuten)",
      "availability": "https://schema.org/InStock"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Zürich, Schweiz"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coaching Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Persönliches Wachstum Coaching"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Potenzialentfaltung Coaching"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Selbstbewusstsein Coaching"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "name": "Mindset Coaching mit Martina",
    "url": baseUrl,
    "description": "Professionelles Mindset Coaching für persönliche Entwicklung und Transformation",
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = pageType !== 'home' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": pageType.charAt(0).toUpperCase() + pageType.slice(1),
        "item": `${baseUrl}/#${pageType}`
      }
    ]
  } : null;

  const allSchemas = [
    organizationSchema,
    personSchema,
    serviceSchema,
    websiteSchema,
    ...(breadcrumbSchema ? [breadcrumbSchema] : [])
  ];

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(allSchemas)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
