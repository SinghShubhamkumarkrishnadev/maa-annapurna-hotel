export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-xl font-bold tracking-tight">
            Next<span className="text-cyan-400">UI</span>
          </div>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#" className="transition hover:text-white">
              Home
            </a>
            <a href="#" className="transition hover:text-white">
              Features
            </a>
            <a href="#" className="transition hover:text-white">
              Pricing
            </a>
          </nav>

          <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.15),_transparent_35%)]" />

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              ✓ Tailwind CSS is working
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Modern Next.js
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                + Tailwind CSS
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              A complete Tailwind CSS test page to verify that your Next.js
              project, responsive utilities, colors, spacing, typography,
              gradients, hover states, and components are configured correctly.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition duration-200 hover:-translate-y-1 hover:bg-cyan-300">
                Primary Button
              </button>

              <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-white/10">
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Tailwind Test
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Everything is rendering correctly
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="⚡"
            title="Fast"
            description="Next.js development server with modern React and Tailwind CSS."
          />

          <FeatureCard
            icon="🎨"
            title="Beautiful"
            description="Colors, gradients, borders, shadows, spacing, and typography."
          />

          <FeatureCard
            icon="📱"
            title="Responsive"
            description="Resize your browser to test responsive Tailwind breakpoints."
          />
        </div>
      </section>

      {/* Test Panel */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl shadow-black/20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 inline-block rounded-lg bg-green-400/10 px-3 py-1 text-sm font-medium text-green-400">
                Setup Status
              </div>

              <h2 className="text-3xl font-bold">
                Your Tailwind utilities are active.
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                If you can see the styling on this page, Tailwind CSS is being
                processed correctly by your Next.js application.
              </p>
            </div>

            <div className="space-y-4">
              <StatusRow label="Next.js" status="Working" />
              <StatusRow label="TypeScript" status="Working" />
              <StatusRow label="Tailwind CSS" status="Working" />
              <StatusRow label="Responsive Design" status="Working" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row">
          <p>Next.js + Tailwind CSS</p>
          <p>Setup test page</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/[0.06]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl transition group-hover:scale-110">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-slate-400">{description}</p>
    </div>
  );
}

function StatusRow({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-900/70 px-5 py-4">
      <span className="font-medium text-slate-200">{label}</span>

      <span className="flex items-center gap-2 text-sm font-medium text-green-400">
        <span className="h-2 w-2 rounded-full bg-green-400" />
        {status}
      </span>
    </div>
  );
}