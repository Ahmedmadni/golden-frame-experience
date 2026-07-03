import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const SIGN_EXPIRY = 60 * 60 * 24 * 7; // 7 days

function serverClient() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

async function withSignedUrls<T extends { image_path: string }>(
  client: ReturnType<typeof serverClient>,
  rows: T[],
): Promise<Array<T & { signedUrl: string | null }>> {
  if (rows.length === 0) return [];
  const paths = rows.map((r) => r.image_path);
  const { data, error } = await client.storage.from("gallery").createSignedUrls(paths, SIGN_EXPIRY);
  if (error) throw new Error(error.message);
  const urlByPath = new Map(data?.map((d) => [d.path ?? "", d.signedUrl]) ?? []);
  return rows.map((r) => ({ ...r, signedUrl: urlByPath.get(r.image_path) ?? null }));
}

// ---------- Public ----------
export const listPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
  const client = serverClient();
  const { data, error } = await client
    .from("gallery_items")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return withSignedUrls(client, data ?? []);
});

// ---------- Admin: list all ----------
export const adminListGallery = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await context.supabase
      .from("gallery_items")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return withSignedUrls(serverClient(), data ?? []);
  });

// ---------- Admin: signed upload URL ----------
const UploadSchema = z.object({ filename: z.string().min(1).max(200) });

export const createUploadUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => UploadSchema.parse(d))
  .handler(async ({ context, data }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const safe = data.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safe}`;
    const { data: signed, error } = await context.supabase.storage
      .from("gallery")
      .createSignedUploadUrl(path);
    if (error) throw new Error(error.message);
    return { path, token: signed.token, signedUrl: signed.signedUrl };
  });

// ---------- Admin: create/update/delete ----------
const CreateSchema = z.object({
  title: z.string().min(1).max(120),
  title_ar: z.string().max(120).optional().nullable(),
  category: z.string().min(1).max(50),
  image_path: z.string().min(1),
  location: z.string().max(120).optional().nullable(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  sort_order: z.number().int().optional(),
});

export const createGalleryItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CreateSchema.parse(d))
  .handler(async ({ context, data }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase.from("gallery_items").insert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const UpdateSchema = CreateSchema.partial().extend({ id: z.string().uuid() });

export const updateGalleryItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => UpdateSchema.parse(d))
  .handler(async ({ context, data }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { id, ...patch } = data;
    const { error } = await context.supabase.from("gallery_items").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const DeleteSchema = z.object({ id: z.string().uuid(), image_path: z.string() });

export const deleteGalleryItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => DeleteSchema.parse(d))
  .handler(async ({ context, data }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    await context.supabase.storage.from("gallery").remove([data.image_path]);
    const { error } = await context.supabase.from("gallery_items").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ---------- User's own bookings ----------
export const listMyBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("bookings")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });
