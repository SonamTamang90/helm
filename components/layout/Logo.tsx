export default function Logo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Helm"
    >
      {/* Outer arc — 300° sweep, 60° gap on the right */}
      <path
        d="M 23.53 19.5 A 11 11 0 1 1 23.53 8.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Inner arc — 300° sweep, same gap position */}
      <path
        d="M 19.63 17.25 A 6.5 6.5 0 1 1 19.63 10.75"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Accent dot in the gap between the two arcs */}
      <circle cx="22.75" cy="14" r="1.5" fill="white" />
    </svg>
  );
}
