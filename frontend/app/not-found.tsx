import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-8">
      <h1 className="mb-2 text-h1">Page not found</h1>
      <p className="mb-6 text-sm text-muted-foreground">The route you requested does not exist in this build.</p>
      <Link href="/library" className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
        Back to library
      </Link>
    </main>
  );
}
