
import { Helmet } from 'react-helmet-async';

interface EnhancedStructuredDataProps {
  pageType?: 'home' | 'services' | 'about' | 'pricing' | 'contact';
}

const EnhancedStructuredData = ({ pageType = 'home' }: EnhancedStructuredDataProps) => {
  const baseUrl = 'https://mindset-coach-martina.ch';
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${baseUrl}/#organization`,
    "name": "Mindset Coaching mit Martina",
    "alternateName": "Martina Domeniconi Coaching",
    "legalName": "Martina Domeniconi",
    "description": "Professionelles Mindset Coaching für persönliche Entwicklung und Transformation in Zürich",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/lovable-uploads/abb0bc70-ae8b-43ce-867f-d7beece5a8a2.png`,
      "width": 512,
      "height": 512
    },
    "image": [
      `${baseUrl}/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png`,
      `${baseUrl}/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png`
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ruedi-Walter-strasse 4",
      "addressLocality": "Zürich",
      "postalCode": "8050",
      "addressRegion": "ZH",
      "addressCountry": "CH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.4108,
      "longitude": 8.5434
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+41 788 400 481",
      "email": "info@mindset-coach-martina.ch",
      "contactType": "customer service",
      "availableLanguage": ["de", "de-CH"],
      "areaServed": "CH"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "CHF 90-150",
    "currenciesAccepted": "CHF",
    "paymentAccepted": ["Cash", "Bank Transfer", "Online Payment"],
    "serviceArea": {
      "@type": "Place",
      "name": "Zürich, Schweiz"
    },
    "foundingDate": "2023",
    "sameAs": [
      "https://www.linkedin.com/in/martina-domeniconi",
      "https://www.instagram.com/martinadomeniconi.coaching"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    "name": "Martina Domeniconi",
    "givenName": "Martina",
    "familyName": "Domeniconi",
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
    "email": "info@mindset-coach-martina.ch",
    "knowsLanguage": ["de", "de-CH"],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "Zertifizierter Life Coach",
      "credentialCategory": "Professional Certification"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#service`,
    "name": "Mindset Coaching",
    "description": "Individuelles 1:1 Mindset Coaching für persönliche Entwicklung, Zielerreichung und Lebensveränderung",
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "serviceType": "Life Coaching",
    "category": "Personal Development",
    "brand": {
      "@id": `${baseUrl}/#organization`
    },
    "offers": {
      "@type": "Offer",
      "price": "90",
      "priceCurrency": "CHF",
      "description": "Einzelsitzung Mindset Coaching (45-60 Minuten)",
      "availability": "https://schema.org/InStock",
      "validFrom": "2023-01-01",
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition"
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
            "name": "Persönliches Wachstum Coaching",
            "description": "Coaching für persönliche Entwicklung und Selbstfindung"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Potenzialentfaltung Coaching",
            "description": "Entdeckung und Entwicklung Ihrer verborgenen Potenziale"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Selbstbewusstsein Coaching",
            "description": "Stärkung des Selbstvertrauens und der inneren Stärke"
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
    },
    "inLanguage": "de-CH",
    "copyrightHolder": {
      "@id": `${baseUrl}/#person`
    },
    "copyrightYear": "2023"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Was ist Mindset Coaching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mindset Coaching ist ein gezielter Prozess zur Veränderung von Denkmustern und Glaubenssätzen, um persönliche Ziele zu erreichen und ein erfüllteres Leben zu führen."
        }
      },
      {
        "@type": "Question",
        "name": "Wie läuft eine Coaching-Sitzung ab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Coaching-Sitzung dauert 45-60 Minuten und findet online statt. Wir arbeiten an Ihren individuellen Zielen und entwickeln praktische Strategien für Ihren Alltag."
        }
      },
      {
        "@type": "Question",
        "name": "Was kostet eine Coaching-Sitzung?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eine Einzelsitzung kostet CHF 90. Das Erstgespräch ist kostenlos und unverbindlich."
        }
      }
    ]
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
    ...(pageType === 'home' ? [faqSchema] : []),
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

export default EnhancedStructuredData;
