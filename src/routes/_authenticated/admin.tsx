import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listBookings, updateBookingStatus, getMyRole } from "@/lib/bookings.functions";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Clock, XCircle, Star, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Access issue</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

type Status = "pending" | "confirmed" | "completed" | "cancelled";
const STATUSES: Status[] = ["pending", "confirmed", "completed", "cancelled"];

function AdminPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const roleFn = useServerFn(getMyRole);
  const listFn = useServerFn(listBookings);
  const updateFn = useServerFn(updateBookingStatus);

  const roleQ = useQuery({ queryKey: ["me-role"], queryFn: () => roleFn() });
  const bookingsQ = useQuery({
    queryKey: ["bookings"],
    queryFn: () => listFn(),
    enabled: roleQ.data?.isAdmin === true,
  });

  const mut = useMutation({
    mutationFn: (v: { id: string; status: Status }) => updateFn({ data: v }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking updated");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  if (roleQ.isLoading) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!roleQ.data?.isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-40 text-center">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">Studio dashboard</p>
        <h1 className="font-display text-4xl">Admin access required</h1>
        <p className="mt-4 text-muted-foreground">
          Your account is signed in but not yet an admin. Ask the studio owner to grant admin access
          to your user id:
        </p>
        <code className="mt-4 inline-block rounded-md border border-border bg-muted/30 px-3 py-2 text-xs">
          {roleQ.data?.userId}
        </code>
      </div>
    );
  }

  const bookings = bookingsQ.data ?? [];
  const counts = STATUSES.reduce<Record<Status, number>>(
    (acc, s) => ({ ...acc, [s]: bookings.filter((b) => b.status === s).length }),
    { pending: 0, confirmed: 0, completed: 0, cancelled: 0 },
  );

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Studio dashboard</p>
          <h1 className="font-display text-4xl md:text-5xl">Bookings</h1>
        </div>
        <button
          onClick={() => router.invalidate()}
          className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-widest hover:border-gold"
        >
          Refresh
        </button>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {STATUSES.map((s) => (
          <div key={s} className="rounded-2xl border border-border bg-card/40 p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{s}</p>
            <p className="mt-2 font-display text-3xl text-gold">{counts[s]}</p>
          </div>
        ))}
      </div>

      {bookingsQ.isLoading ? (
        <div className="grid place-items-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
          No bookings yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="rounded-2xl border border-border bg-card/30 p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl">{b.full_name}</h3>
                    <StatusBadge status={b.status as Status} />
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {b.event_type} · {b.event_date}{b.event_time ? ` · ${b.event_time}` : ""}
                  </p>
                  <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                    <Field label="Phone" value={b.phone} />
                    <Field label="Email" value={b.email} />
                    <Field label="City" value={b.city ?? "—"} />
                    <Field label="Location" value={b.location ?? "—"} />
                    <Field label="Package" value={b.package_name ?? "—"} />
                    <Field label="Budget" value={b.budget ?? "—"} />
                    <Field label="Guests" value={b.guests_count?.toString() ?? "—"} />
                    <Field label="Duration" value={b.duration_hours ? `${b.duration_hours}h` : "—"} />
                    <Field label="Video" value={b.add_video ? "Yes" : "No"} />
                  </div>
                  {b.notes && (
                    <p className="mt-3 rounded-lg border border-border/60 bg-muted/20 p-3 text-sm text-muted-foreground">
                      {b.notes}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {STATUSES.filter((s) => s !== b.status).map((s) => (
                    <button
                      key={s}
                      disabled={mut.isPending}
                      onClick={() => mut.mutate({ id: b.id, status: s })}
                      className="rounded-full border border-border px-3 py-1.5 text-[11px] uppercase tracking-widest transition hover:border-gold hover:text-gold disabled:opacity-50"
                    >
                      Mark {s}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-widest text-muted-foreground">
                Received {new Date(b.created_at).toLocaleString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { icon: typeof Clock; cls: string }> = {
    pending: { icon: Clock, cls: "border-yellow-500/40 text-yellow-400" },
    confirmed: { icon: Star, cls: "border-gold/50 text-gold" },
    completed: { icon: CheckCircle2, cls: "border-emerald-500/40 text-emerald-400" },
    cancelled: { icon: XCircle, cls: "border-red-500/40 text-red-400" },
  };
  const { icon: Icon, cls } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-widest ${cls}`}>
      <Icon className="h-3 w-3" /> {status}
    </span>
  );
}
