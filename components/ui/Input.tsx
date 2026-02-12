interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export default function Input({ icon, className = "", ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted">
          {icon}
        </div>
      )}
      <input
        className={`h-8 w-full rounded border border-border bg-surface text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-1 focus:ring-border ${icon ? "pl-8 pr-3" : "px-3"} ${className}`}
        {...props}
      />
    </div>
  );
}
