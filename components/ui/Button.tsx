type ButtonVariant = "primary" | "secondary" | "destructive";
type ButtonSize    = "sm" | "md";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:     "bg-primary text-white hover:bg-primary-hover",
  secondary:   "border border-border bg-surface text-foreground hover:bg-surface-raised",
  destructive: "bg-destructive-solid text-white hover:bg-destructive",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-7  px-3   text-xs",
  md: "h-8  px-3.5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
