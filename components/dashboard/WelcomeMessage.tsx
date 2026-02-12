"use client";

export default function WelcomeMessage() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">
        {greeting}, Sonam
      </h1>
      <p className="mt-1 text-sm text-muted">
        Here&apos;s what&apos;s happening with your revenue today.
      </p>
    </div>
  );
}
