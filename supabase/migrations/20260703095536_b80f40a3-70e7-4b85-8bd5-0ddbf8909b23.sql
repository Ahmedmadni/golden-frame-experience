
CREATE TABLE public.gallery_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_ar TEXT,
  category TEXT NOT NULL,
  image_path TEXT NOT NULL,
  location TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.gallery_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.gallery_items TO authenticated;
GRANT ALL ON public.gallery_items TO service_role;

ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads published gallery"
  ON public.gallery_items FOR SELECT
  USING (published = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins insert gallery"
  ON public.gallery_items FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update gallery"
  ON public.gallery_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete gallery"
  ON public.gallery_items FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_gallery_items_updated_at
  BEFORE UPDATE ON public.gallery_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage: public read, admin write on 'gallery' bucket
CREATE POLICY "Public read gallery bucket"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery');

CREATE POLICY "Admins upload gallery"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update gallery objects"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete gallery objects"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'gallery' AND public.has_role(auth.uid(), 'admin'));
