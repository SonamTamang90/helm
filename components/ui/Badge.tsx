type BadgeVariant = "success" | "warning" | "destructive" | "neutral";

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  success:     "bg-emerald-500/10 text-emerald-500",
  warning:     "bg-amber-500/10  text-amber-500",
  destructive: "bg-red-500/10    text-red-500",
  neutral:     "bg-surface-raised text-muted",
};

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}
