import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbNavigation = ({ items }: BreadcrumbNavigationProps) => {
  const allItems = [
    { name: 'Home', url: 'https://mindset-coach-martina.ch/' },
    ...items
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": allItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center space-x-2 text-sm text-muted-foreground mb-6"
      >
        <Home className="w-4 h-4" />
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            {index > 0 && <ChevronRight className="w-4 h-4" />}
            {item.url ? (
              <a 
                href={item.url}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <span className="text-foreground font-medium">
                {item.name}
              </span>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};