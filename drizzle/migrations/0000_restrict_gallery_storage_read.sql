DROP POLICY IF EXISTS "Public read gallery bucket" ON storage.objects;
CREATE POLICY "Read published gallery files"
ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'gallery' AND (
    EXISTS (SELECT 1 FROM public.gallery_items g WHERE g.image_path = storage.objects.name AND g.published = true)
    OR private.has_role(auth.uid(), 'admin'::public.app_role)
  )
);