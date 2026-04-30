type ModulePageProps = {
  params: { id: string };
};

export default function ModulePage({ params }: ModulePageProps) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6">
      Module viewer for <span className="font-mono">{params.id}</span> coming next.
    </section>
  );
}
