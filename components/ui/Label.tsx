interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export default function Label({ children, className = "", ...props }: LabelProps) {
  return (
    <label
      className={`text-xs font-medium text-foreground ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
