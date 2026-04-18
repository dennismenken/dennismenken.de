import { ArrowLeft } from "lucide-react";
import type { BlogPost } from "../blog";

interface LogProps {
  posts: BlogPost[];
}

export default function Log({ posts }: LogProps) {
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

        <h1 className="mb-8 font-bold text-3xl text-foreground">Logbuch</h1>

        {posts.length === 0 ? (
          <p className="font-mono text-base text-muted-foreground">Noch keine Einträge.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <a
                  href={`/log/${post.slug}`}
                  className="group block rounded-lg border border-border bg-card/50 p-5 transition-all duration-200 hover:border-primary/30 hover:bg-card"
                >
                  <time
                    dateTime={post.datetime}
                    className="font-mono text-base text-muted-foreground"
                  >
                    {post.date}
                  </time>
                  <h2 className="mt-1 font-semibold text-foreground text-lg transition-colors group-hover:text-primary">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="mt-2 line-clamp-2 text-base text-muted-foreground">
                      {post.description}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
