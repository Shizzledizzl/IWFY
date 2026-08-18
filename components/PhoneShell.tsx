export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#e8dfd4] lg:flex lg:items-center lg:justify-center lg:py-8">
      <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-hidden bg-cream lg:min-h-[860px] lg:rounded-[1.75rem] lg:border lg:border-black/5 lg:shadow-[0_40px_90px_-28px_rgba(36,28,22,0.45)]">
        <div className="grain" />
        <div className="relative min-h-dvh lg:min-h-[860px]">{children}</div>
      </div>
    </div>
  );
}
