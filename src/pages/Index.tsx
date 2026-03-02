import { BookOpen, Github, Linkedin } from "lucide-react";
import XingIcon from "../components/XingIcon";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/dennismenken",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/dennismenken/",
    label: "LinkedIn",
  },
  {
    icon: "xing" as const,
    href: "https://www.xing.com/profile/Dennis_Menken",
    label: "Xing",
  },
  {
    icon: BookOpen,
    href: "/log",
    label: "Log",
    internal: true,
  },
];

export default function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Particle container - hydrated on client */}
      <div id="particle-root" className="fixed inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* Hero */}
        <div className="animate-fade-up text-center">
          <h1 className="font-bold text-5xl text-foreground tracking-tight sm:text-7xl md:text-8xl lg:text-9xl">
            Dennis Menken
          </h1>
          <p className="mt-4 animate-fade-up-delay font-mono text-base text-primary uppercase tracking-[0.3em] md:text-lg">
            End-to-End
            <br className="sm:hidden" /> Solutions Architect
          </p>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex animate-fade-up-delay-2 items-center gap-6">
          {socialLinks.map((link) => {
            const content = (
              <div className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-secondary/30 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(170_60%_50%/0.15)]">
                {link.icon === "xing" ? (
                  <XingIcon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                ) : (
                  <link.icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-base text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {link.label}
                </span>
              </div>
            );

            if (link.internal) {
              return (
                <a key={link.label} href={link.href} aria-label={link.label}>
                  {content}
                </a>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                {content}
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute right-0 bottom-0 left-0 z-10 flex animate-fade-in-delay items-center justify-center gap-4 p-6">
        <a
          href="/imprint"
          className="font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          Impressum
        </a>
        <span className="text-muted-foreground/30">·</span>
        <a
          href="/privacy"
          className="font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          Datenschutz
        </a>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(2rem); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-up {
          animation: fade-up 1s ease-out 0.1s both;
        }
        .animate-fade-up-delay {
          animation: fade-up 1s ease-out 0.4s both;
        }
        .animate-fade-up-delay-2 {
          animation: fade-up 1s ease-out 0.8s both;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 1.1s both;
        }
      `,
        }}
      />
    </div>
  );
}
