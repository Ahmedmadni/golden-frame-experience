import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  adminListGallery,
  createUploadUrl,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "@/lib/gallery.functions";
import { getMyRole } from "@/lib/bookings.functions";
import { supabase } from "@/integrations/supabase/client";
import { AdminNav } from "@/components/site/AdminNav";
import { toast } from "sonner";
import { Loader2, Trash2, Upload, Star, Eye, EyeOff } from "lucide-react";
import { CATEGORIES } from "@/lib/site-data";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-xl px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Access issue</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function GalleryAdmin() {
  const qc = useQueryClient();
  const roleFn = useServerFn(getMyRole);
  const listFn = useServerFn(adminListGallery);
  const uploadFn = useServerFn(createUploadUrl);
  const createFn = useServerFn(createGalleryItem);
  const updateFn = useServerFn(updateGalleryItem);
  const deleteFn = useServerFn(deleteGalleryItem);

  const roleQ = useQuery({ queryKey: ["me-role"], queryFn: () => roleFn() });
  const listQ = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: () => listFn(),
    enabled: roleQ.data?.isAdmin === true,
  });

  const [form, setForm] = useState({
    title: "",
    title_ar: "",
    category: CATEGORIES[0],
    location: "",
    featured: false,
    file: null as File | null,
  });
  const [uploading, setUploading] = useState(false);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ["admin-gallery"] });
    qc.invalidateQueries({ queryKey: ["gallery"] });
  };

  const updateMut = useMutation({
    mutationFn: (v: { id: string; featured?: boolean; published?: boolean }) => updateFn({ data: v }),
    onSuccess: () => {
      invalidate();
      toast.success("Updated");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const deleteMut = useMutation({
    mutationFn: (v: { id: string; image_path: string }) => deleteFn({ data: v }),
    onSuccess: () => {
      invalidate();
      toast.success("Removed");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!form.file) return toast.error("Choose an image file");
    if (!form.title.trim()) return toast.error("Title is required");
    setUploading(true);
    try {
      const signed = await uploadFn({ data: { filename: form.file.name } });
      const { error: upErr } = await supabase.storage
        .from("gallery")
        .uploadToSignedUrl(signed.path, signed.token, form.file);
      if (upErr) throw upErr;
      await createFn({
        data: {
          title: form.title.trim(),
          title_ar: form.title_ar.trim() || null,
          category: form.category,
          image_path: signed.path,
          location: form.location.trim() || null,
          featured: form.featured,
          published: true,
        },
      });
      toast.success("Image added");
      setForm({ title: "", title_ar: "", category: CATEGORIES[0], location: "", featured: false, file: null });
      const input = document.getElementById("file-input") as HTMLInputElement | null;
      if (input) input.value = "";
      invalidate();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

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
        <h1 className="font-display text-3xl">Admin access required</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your user id: {roleQ.data?.userId}</p>
      </div>
    );
  }

  const items = listQ.data ?? [];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10">
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold">Studio dashboard</p>
      <h1 className="mb-6 font-display text-4xl md:text-5xl">Gallery</h1>
      <AdminNav current="gallery" />

      <form
        onSubmit={handleUpload}
        className="mb-12 grid gap-4 rounded-2xl border border-border bg-card/30 p-6 md:grid-cols-2"
      >
        <div className="md:col-span-2">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-gold">Upload new image</p>
        </div>
        <Field label="Title (EN)">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-md border border-border bg-background/60 px-3 py-2"
          />
        </Field>
        <Field label="Title (AR)">
          <input
            value={form.title_ar}
            onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
            className="w-full rounded-md border border-border bg-background/60 px-3 py-2"
          />
        </Field>
        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as typeof form.category })}
            className="w-full rounded-md border border-border bg-background/60 px-3 py-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Location">
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Cairo, Alexandria, El Gouna…"
            className="w-full rounded-md border border-border bg-background/60 px-3 py-2"
          />
        </Field>
        <Field label="Image file">
          <input
            id="file-input"
            required
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })}
            className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm"
          />
        </Field>
        <label className="flex items-end gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            className="h-4 w-4 accent-[color:var(--color-gold)]"
          />
          Featured
        </label>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={uploading}
            className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-xs uppercase tracking-widest text-background disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Upload image"}
          </button>
        </div>
      </form>

      {listQ.isLoading ? (
        <div className="grid place-items-center py-24">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
          No images yet. Upload your first frame above.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g) => (
            <div key={g.id} className="overflow-hidden rounded-2xl border border-border bg-card/30">
              <div className="aspect-[4/5] w-full overflow-hidden bg-muted">
                {g.signedUrl ? (
                  <img src={g.signedUrl} alt={g.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-muted-foreground">
                    Missing image
                  </div>
                )}
              </div>
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg">{g.title}</p>
                    <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {g.category}{g.location ? ` · ${g.location}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() =>
                      updateMut.mutate({ id: g.id, featured: !g.featured })
                    }
                    className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${
                      g.featured ? "border-gold text-gold" : "border-border text-muted-foreground"
                    }`}
                  >
                    <Star className="h-3 w-3" /> {g.featured ? "Featured" : "Feature"}
                  </button>
                  <button
                    onClick={() =>
                      updateMut.mutate({ id: g.id, published: !g.published })
                    }
                    className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest hover:border-gold hover:text-gold"
                  >
                    {g.published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {g.published ? "Published" : "Draft"}
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Delete this image?"))
                        deleteMut.mutate({ id: g.id, image_path: g.image_path });
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-red-500/40 px-3 py-1 text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
