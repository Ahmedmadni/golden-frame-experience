import { Link } from "@tanstack/react-router";

export function AdminNav({ current }: { current: "bookings" | "gallery" }) {
  const items = [
    { key: "bookings", label: "Bookings", to: "/admin" as const },
    { key: "gallery", label: "Gallery", to: "/admin/gallery" as const },
  ];
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {items.map((i) => (
        <Link
          key={i.key}
          to={i.to}
          className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-widest transition ${
            current === i.key
              ? "border-gold bg-gold text-background"
              : "border-border text-muted-foreground hover:border-gold hover:text-gold"
          }`}
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
}
