import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMyBookings } from "@/lib/gallery.functions";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/my-bookings")({
  component: MyBookings,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function MyBookings() {
  const listFn = useServerFn(listMyBookings);
  const q = useQuery({ queryKey: ["my-bookings"], queryFn: () => listFn() });

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-10">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Your studio</p>
      <h1 className="mb-10 font-display text-4xl md:text-5xl">My bookings</h1>

      {q.isLoading ? (
        <div className="grid place-items-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
        </div>
      ) : (q.data ?? []).length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
          <p className="text-muted-foreground">You haven't submitted a booking yet.</p>
          <Link
            to="/book"
            className="mt-6 inline-block rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-widest text-background"
          >
            Book a session
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {(q.data ?? []).map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="rounded-2xl border border-border bg-card/30 p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl">{b.event_type}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {b.event_date}{b.event_time ? ` · ${b.event_time}` : ""}
                    {b.city ? ` · ${b.city}` : ""}
                  </p>
                </div>
                <span className="rounded-full border border-gold/40 px-3 py-1 text-[10px] uppercase tracking-widest text-gold">
                  {b.status}
                </span>
              </div>
              {b.package_name && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Package: <span className="text-foreground">{b.package_name}</span>
                </p>
              )}
              {b.notes && (
                <p className="mt-3 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
                  {b.notes}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
