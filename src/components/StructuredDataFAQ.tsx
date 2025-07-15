import { Helmet } from 'react-helmet-async';

const faqData = [
  {
    question: "Was ist Mindset Coaching?",
    answer: "Mindset Coaching ist eine Form des Lebenscoachings, die sich darauf konzentriert, limitierende Glaubenssätze und negative Denkmuster zu identifizieren und zu transformieren. Es hilft dabei, ein positives, wachstumsorientiertes Mindset zu entwickeln."
  },
  {
    question: "Wie läuft eine Coaching-Sitzung ab?",
    answer: "Eine typische Coaching-Sitzung dauert 60-90 Minuten und findet online über Zoom statt. Wir arbeiten gemeinsam an Ihren spezifischen Zielen und Herausforderungen durch bewährte Coaching-Techniken und Tools."
  },
  {
    question: "Für wen ist Mindset Coaching geeignet?",
    answer: "Mindset Coaching ist für alle geeignet, die persönliches Wachstum anstreben, ihre Denkweise verbessern möchten oder vor Herausforderungen stehen, die sie alleine nicht bewältigen können."
  },
  {
    question: "Wie viele Sitzungen benötige ich?",
    answer: "Die Anzahl der Sitzungen variiert je nach individuellen Zielen und Bedürfnissen. Oft zeigen sich erste Erfolge bereits nach 3-5 Sitzungen, während nachhaltige Veränderungen meist 8-12 Sitzungen erfordern."
  },
  {
    question: "Was kostet eine Coaching-Sitzung?",
    answer: "Die Preise variieren je nach Paket. Einzelsitzungen beginnen bei CHF 150, während Pakete mit mehreren Sitzungen ein besseres Preis-Leistungs-Verhältnis bieten. Kontaktieren Sie mich für ein individuelles Angebot."
  }
];

export const StructuredDataFAQ = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};