
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TermsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Terms = ({ isOpen, onClose }: TermsProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-forest">
            Allgemeine Geschäftsbedingungen Mindset-Coaching
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 space-y-6 text-foreground">
          <section>
            <h3 className="font-medium text-lg mb-2">1. Allgemeines</h3>
            <p className="text-muted-foreground">
              Der Coach unterstützt im Coaching den Klienten eine positive mentale Grundhaltung einzunehmen, 
              was zu mehr Lebensfreude und Gelassenheit führen kann. Der Kunde / die Kundin trägt dabei alle 
              Entscheidungen selbst, es besteht keine Haftung des Coaches ausser bei Vorsatz oder 
              Grobfahrlässigkeit, und ist maximal auf den Wert von einer Coaching Session beschränkt.
            </p>
            <p className="mt-2 text-muted-foreground">
              Ein Coaching dauert je nach Verlauf zwischen 40 und 60 Minuten.
            </p>
          </section>
          
          <section>
            <h3 className="font-medium text-lg mb-2">2. Absage eines Termins</h3>
            <p className="text-muted-foreground">
              Vereinbarte Termine sind grundsätzlich verbindlich.
            </p>
            <p className="mt-2 text-muted-foreground">
              Abmeldungen haben telefonisch zu erfolgen.
            </p>
            <ul className="list-disc pl-6 mt-2 text-muted-foreground space-y-1">
              <li>Bis 30 Tage vor dem Termin: keine Gebühren</li>
              <li>Bis 24 Std vor dem Termin: 50% wir verrechnet</li>
              <li>Keine Abmeldung oder Abmeldung weniger als 24h vor Termin: 100% wird verrechnet</li>
            </ul>
          </section>
          
          <section>
            <h3 className="font-medium text-lg mb-2">4. Höhere Gewalt und sonstige Leistungshindernisse</h3>
            <p className="text-muted-foreground">
              Martina Domeniconi ist berechtigt, bei höherer Gewalt die vereinbarten Coachingtermine zu verschieben,
              hierunter fallen auch Leistungshindernisse, die aufgrund von Krankheit, Unfall oder ähnlichem entstanden sind.
            </p>
          </section>
          
          <section>
            <h3 className="font-medium text-lg mb-2">5. Preise und Zahlung</h3>
            <p className="text-muted-foreground">
              Es gelten die offiziellen Preise der Homepage.
            </p>
          </section>
          
          <section>
            <h3 className="font-medium text-lg mb-2">5. Gerichtsstand</h3>
            <p className="text-muted-foreground">
              Der Gerichtsstand ist Zürich. Die Vertragsparteien vereinbaren, vor dem Beschreiten des Rechtsweges,
              eine mediative Konfliktlösung zu.
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Terms;
