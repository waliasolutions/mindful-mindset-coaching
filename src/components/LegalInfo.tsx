import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Shield } from "lucide-react";

interface LegalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

const LegalInfo = ({ isOpen, onClose, defaultTab = "impressum" }: LegalInfoProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-forest">
            Rechtliche Informationen
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="impressum" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Impressum</span>
            </TabsTrigger>
            <TabsTrigger value="datenschutz" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Datenschutz</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="impressum" className="mt-6 space-y-6 text-foreground">
            <section>
              <h3 className="font-medium text-xl mb-3">Impressum</h3>
              
              <div className="space-y-6">
                <section>
                  <h4 className="font-medium text-lg mb-2">Kontakt</h4>
                  <p className="text-muted-foreground">
                    Mindset Coach Martina<br />
                    Martina Domeniconi<br />
                    Ruedi Walterstr. 4<br />
                    8050 Zürich<br />
                    info@mindset-coach-martina.ch
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Realisierung Webdesign</h4>
                  <p className="text-muted-foreground">
                    <a 
                      href="https://walia-solutions.ch" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-moss transition-colors"
                    >
                      walia solutions
                    </a> – 8610 Uster
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Fotoshooting Website</h4>
                  <p className="text-muted-foreground">
                    <a 
                      href="https://liviabass.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-moss transition-colors"
                    >
                      Livia Bass
                    </a>
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Haftung für Inhalte & Links</h4>
                  <p className="text-muted-foreground">
                    Die Inhalte unserer Seiten wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, 
                    Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Angebot auf der Website</h4>
                  <p className="text-muted-foreground">
                    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                    Seiten verantwortlich.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Haftungsansprüche gegen Mindset Coach Martina wegen Schäden materieller oder immaterieller Art, 
                    welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, 
                    durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden 
                    ausgeschlossen. Mindset Coach Martina behält es sich ausdrücklich vor, Teile der Seiten oder das 
                    gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die 
                    Veröffentlichung zeitweise oder endgültig einzustellen.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Urheberrecht</h4>
                  <p className="text-muted-foreground">
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                    dem schweizerischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede 
                    Art der Verwertung ausserhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                    Zustimmung von Mindset Coach Martina. Sollten Sie trotzdem auf eine Urheberrechtsverletzung 
                    aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von 
                    Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                  </p>
                </section>
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="datenschutz" className="mt-6 space-y-6 text-foreground">
            <section>
              <h3 className="font-medium text-xl mb-3">Datenschutzerklärung</h3>
              
              <div className="space-y-6">
                <section>
                  <h4 className="font-medium text-lg mb-2">Grundlegendes</h4>
                  <p className="text-muted-foreground">
                    In Übereinstimmung mit Artikel 13 der Schweizerischen Bundesverfassung und den 
                    datenschutzrechtlichen Bestimmungen hat jede Person Anspruch auf Schutz ihrer Privatsphäre 
                    und Schutz vor Missbrauch persönlicher Daten. Wir nehmen den Schutz Ihrer Daten sehr ernst 
                    und behandeln Ihre personenbezogenen Informationen vertraulich und gemäß den gesetzlichen 
                    Vorschriften.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Wir arbeiten mit unseren Hosting-Providern zusammen, um Ihre Daten bestmöglich vor 
                    unberechtigtem Zugriff, Verlust oder Missbrauch zu schützen. Bitte beachten Sie jedoch, 
                    dass die Datenübertragung im Internet nie vollständig sicher sein kann.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Datenverarbeitung</h4>
                  <p className="text-muted-foreground">
                    Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder 
                    identifizierbare Person beziehen. Wir verarbeiten diese Daten in Übereinstimmung mit 
                    dem Schweizer Datenschutzrecht und, soweit anwendbar, der EU-Datenschutzgrundverordnung.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Die Dauer der Speicherung personenbezogener Daten richtet sich nach dem jeweiligen 
                    Verwendungszweck. Bei gesetzlichen Aufbewahrungspflichten werden die Daten entsprechend 
                    länger gespeichert und die Verarbeitung eingeschränkt.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Cookies und Analysedienste</h4>
                  <p className="text-muted-foreground">
                    Diese Website verwendet Cookies, kleine Textdateien, die auf Ihrem Gerät gespeichert werden. 
                    Sie helfen uns, die Nutzung der Website zu analysieren und unser Angebot zu verbessern. 
                    Sie können Ihren Browser so einstellen, dass er Sie über das Setzen von Cookies informiert 
                    oder Cookies generell ablehnt.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Wir setzen SSL/TLS-Verschlüsselung ein, um die Übertragung vertraulicher Inhalte zu schützen. 
                    Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in der Adresszeile Ihres Browsers.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Ihre Rechte</h4>
                  <p className="text-muted-foreground">
                    Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung 
                    Ihrer personenbezogenen Daten. Außerdem können Sie der Verarbeitung widersprechen und Ihre 
                    Daten in einem strukturierten Format erhalten.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Wenn Sie Fragen zum Datenschutz haben oder Ihre Rechte ausüben möchten, können Sie 
                    sich jederzeit an uns wenden.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Dienste von Drittanbietern</h4>
                  <p className="text-muted-foreground">
                    Diese Website kann Dienste wie Google Maps, Google Fonts oder YouTube einbinden. 
                    Diese Dienste können Cookies verwenden und Daten erheben. Wir bemühen uns, nur 
                    Dienste einzubinden, die einen angemessenen Datenschutz gewährleisten.
                  </p>
                </section>
                
                <section>
                  <h4 className="font-medium text-lg mb-2">Änderungen</h4>
                  <p className="text-muted-foreground">
                    Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen. Es gilt die 
                    jeweils aktuelle, auf unserer Website veröffentlichte Version.
                  </p>
                </section>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default LegalInfo;
