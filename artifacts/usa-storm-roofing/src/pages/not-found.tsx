import { ArrowLeft, Home, ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-16 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-12">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white">
            <ShieldAlert className="h-7 w-7 text-orange-400" />
          </div>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Page not found</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
            The page you requested is not available in this rebuild. Use the homepage to explore roofing, storm damage, siding, gutters, and window services.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="rounded-full px-6 py-6 text-sm font-semibold">
              <a href="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6 py-6 text-sm font-semibold">
              <a href="/" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Services
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
