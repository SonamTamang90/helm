import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { container: "h-6 w-6",   text: "text-xs" },
  md: { container: "h-8 w-8",   text: "text-xs" },
  lg: { container: "h-10 w-10", text: "text-sm" },
};

export default function Avatar({
  src,
  alt = "",
  initials,
  size = "md",
}: AvatarProps) {
  const { container, text } = sizeMap[size];

  if (src) {
    return (
      <div className={`${container} relative shrink-0 overflow-hidden rounded-full`}>
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${container} flex shrink-0 items-center justify-center rounded-full bg-surface-raised`}
      aria-label={alt || initials}
    >
      {initials && (
        <span className={`${text} font-medium leading-none text-foreground`}>
          {initials}
        </span>
      )}
    </div>
  );
}
