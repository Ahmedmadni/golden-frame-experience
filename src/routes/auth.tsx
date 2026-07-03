import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · Ahmed Almadani" },
      { name: "description", content: "Sign in or create an account for Ahmed Almadani Studio." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(t("auth.signIn"));
        navigate({ to: "/" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
        });
        if (error) throw error;
        toast.success("Check your inbox");
        navigate({ to: "/" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function google() {
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) toast.error(res.error.message ?? "Google sign-in failed");
  }

  const fld = "w-full rounded-md border border-input bg-surface/60 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-ring";

  return (
    <section className="mx-auto flex min-h-dvh max-w-md items-center justify-center px-6 py-32">
      <div className="w-full">
        <div className="mb-10 text-center">
          <span className="inline-grid h-12 w-12 place-items-center rounded-full border border-gold/60 font-display text-gold">AM</span>
          <h1 className="mt-6 font-display text-4xl">{mode === "in" ? t("auth.signIn") : t("auth.signUp")}</h1>
        </div>

        <button onClick={google} className="mb-6 flex w-full items-center justify-center gap-3 rounded-full border border-border bg-surface/60 py-3 text-sm font-medium transition hover:border-gold">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5.04c1.63 0 3.09.56 4.24 1.66l3.16-3.16C17.45 1.72 14.9.72 12 .72 7.36.72 3.4 3.39 1.49 7.28l3.68 2.86C6.09 7.36 8.83 5.04 12 5.04z"/><path fill="#4285F4" d="M23.28 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.34c-.28 1.48-1.1 2.74-2.36 3.58l3.6 2.79c2.11-1.95 3.7-4.83 3.7-8.48z"/><path fill="#FBBC05" d="M5.17 14.14a7.2 7.2 0 0 1 0-4.28L1.49 7A11.97 11.97 0 0 0 .72 12c0 1.93.46 3.75 1.29 5.35l3.68-2.86z"/><path fill="#34A853" d="M12 23.28c3.24 0 5.96-1.07 7.94-2.9l-3.6-2.79c-1 .68-2.28 1.09-4.34 1.09-3.17 0-5.91-2.32-6.83-5.44l-3.68 2.86C3.4 20.61 7.36 23.28 12 23.28z"/></svg>
          {t("auth.google")}
        </button>

        <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> {t("auth.or")} <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-4">
          {mode === "up" && (
            <input placeholder={t("auth.name")} value={name} onChange={(e) => setName(e.target.value)} className={fld} />
          )}
          <input type="email" required placeholder={t("auth.email")} value={email} onChange={(e) => setEmail(e.target.value)} className={fld} />
          <input type="password" required minLength={6} placeholder={t("auth.password")} value={password} onChange={(e) => setPassword(e.target.value)} className={fld} />
          <button disabled={loading} type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold py-3 text-sm font-medium uppercase tracking-widest text-background transition disabled:opacity-60">
            {mode === "in" ? t("auth.signIn") : t("auth.signUp")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <button onClick={() => setMode(mode === "in" ? "up" : "in")} className="mt-6 block w-full text-center text-xs uppercase tracking-widest text-muted-foreground hover:text-gold">
          {mode === "in" ? t("auth.toggle.toSignUp") : t("auth.toggle.toSignIn")}
        </button>
      </div>
    </section>
  );
}
