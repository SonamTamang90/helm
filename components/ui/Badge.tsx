type BadgeVariant = "success" | "warning" | "destructive" | "neutral";

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  success:     "bg-success/10 text-success",
  warning:     "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
  neutral:     "bg-surface-raised text-muted",
};

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${variantClasses[variant]}`}>
      {label}
    </span>
  );
}
