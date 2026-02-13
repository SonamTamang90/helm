"use client";

interface WelcomeMessageProps {
  name: string;
}

export default function WelcomeMessage({ name }: WelcomeMessageProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">
        {greeting}, {name}
      </h1>
      <p className="mt-1 text-sm text-muted">
        Here&apos;s what&apos;s happening with your revenue today.
      </p>
    </div>
  );
}
