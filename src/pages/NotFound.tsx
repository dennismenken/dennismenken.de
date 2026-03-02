export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 font-bold font-mono text-6xl text-foreground">404</h1>
        <p className="mb-6 text-muted-foreground">Diese Seite existiert nicht.</p>
        <a
          href="/"
          className="font-mono text-base text-primary transition-colors hover:text-primary/80"
        >
          Zurück zur Startseite
        </a>
      </div>
    </div>
  );
}
