
import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export const SEO = ({
  title = "Mindset Coaching mit Martina | Persönliche Entwicklung & Transformation",
  description = "Entdecken Sie transformatives Mindset Coaching mit Martina Domeniconi. Entwickeln Sie ein positives Mindset, erreichen Sie Ihre Ziele und leben Sie ein erfülltes Leben. Persönliche Online-Coachings in Zürich.",
  keywords = "Mindset Coaching, Persönlichkeitsentwicklung, Life Coach Zürich, Online Coaching, Selbstentwicklung, Transformationscoaching, Martina Domeniconi",
  image = "/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png",
  url = "https://mindset-coach-martina.ch"
}: SEOProps) => {
  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* OpenGraph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
