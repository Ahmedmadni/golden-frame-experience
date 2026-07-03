import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { EVENT_TYPES, PACKAGES } from "@/lib/site-data";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  full_name: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: z.string().email().max(255),
  event_type: z.string().min(1),
  event_date: z.string().min(1),
  event_time: z.string().max(30).optional().or(z.literal("")),
  city: z.string().max(80).optional().or(z.literal("")),
  location: z.string().max(200).optional().or(z.literal("")),
  guests_count: z.coerce.number().int().min(0).max(100000).optional().or(z.nan()),
  budget: z.string().max(60).optional().or(z.literal("")),
  package_name: z.string().max(60).optional().or(z.literal("")),
  add_video: z.boolean().optional(),
  duration_hours: z.coerce.number().int().min(0).max(72).optional().or(z.nan()),
  extras: z.string().max(500).optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>) => ({ pkg: (s.pkg as string) ?? "" }),
  head: () => ({
    meta: [
      { title: "Book a session · Ahmed Almadani" },
      { name: "description", content: "Reserve a photography or cinematic film session with Studio Almadani. The studio replies within 24 hours." },
      { property: "og:title", content: "Book a session · Ahmed Almadani" },
      { property: "og:description", content: "Reserve a photography or cinematic film session." },
      { property: "og:url", content: "/book" },
    ],
    links: [{ rel: "canonical", href: "/book" }],
  }),
  component: BookPage,
});

function BookPage() {
  const { t, lang } = useI18n();
  const search = Route.useSearch();
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { package_name: search.pkg, add_video: false },
  });

  async function onSubmit(v: FormValues) {
    const { error } = await supabase.from("bookings").insert({
      full_name: v.full_name,
      phone: v.phone,
      email: v.email,
      event_type: v.event_type,
      event_date: v.event_date,
      event_time: v.event_time || null,
      city: v.city || null,
      location: v.location || null,
      guests_count: Number.isFinite(v.guests_count) ? v.guests_count : null,
      budget: v.budget || null,
      package_name: v.package_name || null,
      add_video: !!v.add_video,
      duration_hours: Number.isFinite(v.duration_hours) ? v.duration_hours : null,
      extras: v.extras || null,
      notes: v.notes || null,
    });
    if (error) {
      toast.error(t("book.form.error"));
      return;
    }
    toast.success(t("book.form.success"));
    setDone(true);
  }

  const fld = "w-full rounded-md border border-input bg-surface/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-ring";
  const lbl = "mb-2 block text-xs uppercase tracking-widest text-muted-foreground";

  if (done) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-40 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-gold" />
        <h1 className="mt-6 font-display text-5xl">{t("book.form.success")}</h1>
        <p className="mt-4 text-muted-foreground">{t("book.sub")}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-40 md:pt-52">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          <span className="h-px w-10 bg-gold" /> {t("nav.book")}
        </p>
        <h1 className="font-display text-5xl leading-[1.02] md:text-7xl">{t("book.title")}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">{t("book.sub")}</p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-14 grid gap-6 md:grid-cols-2">
        <div>
          <label className={lbl}>{t("book.form.name")}</label>
          <input {...register("full_name")} className={fld} />
          {errors.full_name && <p className="mt-1 text-xs text-destructive">Required</p>}
        </div>
        <div>
          <label className={lbl}>{t("book.form.phone")}</label>
          <input {...register("phone")} className={fld} />
          {errors.phone && <p className="mt-1 text-xs text-destructive">Required</p>}
        </div>
        <div>
          <label className={lbl}>{t("book.form.email")}</label>
          <input type="email" {...register("email")} className={fld} />
          {errors.email && <p className="mt-1 text-xs text-destructive">Invalid email</p>}
        </div>
        <div>
          <label className={lbl}>{t("book.form.eventType")}</label>
          <select {...register("event_type")} className={fld}>
            <option value="">—</option>
            {EVENT_TYPES.map((e) => (
              <option key={e.value} value={e.value}>{lang === "ar" ? e.ar : e.en}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl}>{t("book.form.date")}</label>
          <input type="date" {...register("event_date")} className={fld} />
        </div>
        <div>
          <label className={lbl}>{t("book.form.time")}</label>
          <input type="time" {...register("event_time")} className={fld} />
        </div>
        <div>
          <label className={lbl}>{t("book.form.city")}</label>
          <input {...register("city")} placeholder="Cairo, Alexandria, El Gouna…" className={fld} />
        </div>
        <div>
          <label className={lbl}>{t("book.form.location")}</label>
          <input {...register("location")} className={fld} />
        </div>
        <div>
          <label className={lbl}>{t("book.form.guests")}</label>
          <input type="number" min={0} {...register("guests_count")} className={fld} />
        </div>
        <div>
          <label className={lbl}>{t("book.form.budget")}</label>
          <input {...register("budget")} placeholder="EGP 25,000 – 90,000" className={fld} />
        </div>
        <div>
          <label className={lbl}>{t("book.form.package")}</label>
          <select {...register("package_name")} className={fld}>
            <option value="">—</option>
            {PACKAGES.map((p) => (
              <option key={p.key} value={p.key}>{t(`${p.tKey}.name`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={lbl}>{t("book.form.duration")}</label>
          <input type="number" min={0} max={72} {...register("duration_hours")} className={fld} />
        </div>
        <div className="md:col-span-2">
          <label className={lbl}>{t("book.form.extras")}</label>
          <input {...register("extras")} className={fld} />
        </div>
        <div className="md:col-span-2">
          <label className={lbl}>{t("book.form.notes")}</label>
          <textarea {...register("notes")} rows={5} className={fld} />
        </div>
        <div className="md:col-span-2 flex items-center gap-3">
          <input id="add_video" type="checkbox" {...register("add_video")} className="h-4 w-4 accent-[oklch(0.78_0.13_85)]" />
          <label htmlFor="add_video" className="text-sm">{t("book.form.video")}</label>
        </div>

        <div className="md:col-span-2 mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-3 rounded-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-widest text-background transition hover:bg-gold/90 disabled:opacity-60"
          >
            {isSubmitting ? t("book.form.sending") : t("book.form.submit")}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
      </form>
    </section>
  );
}
