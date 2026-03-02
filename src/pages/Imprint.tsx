import { ArrowLeft } from "lucide-react";

export default function Imprint() {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <a
          href="/"
          className="mb-12 inline-flex items-center gap-2 font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück
        </a>

        <h1 className="mb-8 font-bold text-3xl text-foreground">Impressum</h1>

        <div className="space-y-6 font-mono text-base text-muted-foreground leading-relaxed">
          <section>
            <p>init 4 GmbH</p>
            <p>Böhmerstraße 35</p>
            <p>33330 Gütersloh</p>
          </section>

          <section>
            <p>Handelsregister: HRB 13749 GT</p>
            <p>Registergericht: Amtsgericht Gütersloh</p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-base text-foreground">Vertreten durch</h2>
            <p>Dennis Menken</p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-base text-foreground">Kontakt</h2>
            <p>Telefon: 05241 301 293 0</p>
            <p>E-Mail: mail@init-4.de</p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-base text-foreground">Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
            <p>DE323216411</p>
          </section>

          <section>
            <h2 className="mb-2 font-semibold text-base text-foreground">
              Verbraucherstreitbeilegung/Universalschlichtungsstelle
            </h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
