import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "../blog";

interface LogEntryProps {
  post: BlogPost;
  newer: BlogPost | null;
  older: BlogPost | null;
}

export default function LogEntry({ post, newer, older }: LogEntryProps) {
  return (
    <div className="min-h-screen bg-background px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <a
          href="/log"
          className="mb-12 inline-flex items-center gap-2 font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Logbuch
        </a>

        <article>
          <div className="font-mono text-base text-muted-foreground">
            {Math.floor(new Date(post.datetime).getTime() / 1000)}
            {" | "}
            <time dateTime={post.datetime}>{post.date}</time>
            {" UTC"}
          </div>
          <div
            className="prose mt-4 text-base text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

        {/* Navigation */}
        <nav className="mt-16 flex items-center justify-between border-border border-t pt-8">
          {older ? (
            <a
              href={`/log/${older.slug}`}
              className="group inline-flex items-center gap-2 font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span className="max-w-[10rem] truncate">{older.title}</span>
            </a>
          ) : (
            <span />
          )}

          <a
            href="/log"
            className="font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
          >
            Übersicht
          </a>

          {newer ? (
            <a
              href={`/log/${newer.slug}`}
              className="group inline-flex items-center gap-2 font-mono text-base text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="max-w-[10rem] truncate">{newer.title}</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
