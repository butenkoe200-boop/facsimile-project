import { Globe } from "lucide-react";

export function GmLogo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const title = tone === "light" ? "text-white" : "text-ink";
  const sub = tone === "light" ? "text-white/70" : "text-slate";
  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-serif text-[26px] leading-none tracking-tight ${title}`}
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        GM
      </span>
      <span className={`text-[8.5px] font-semibold uppercase leading-[1.25] tracking-[0.08em] ${sub}`}>
        International
        <br />
        Travel
      </span>
    </div>
  );
}

export function TravelPayMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 22V11h5.4c2.3 0 4 1.6 4 3.9s-1.7 4-4 4H14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="20.5" cy="12.6" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function TravelPayLogo({
  tone = "dark",
  size = "md",
}: {
  tone?: "dark" | "light";
  size?: "sm" | "md";
}) {
  const text = size === "sm" ? "text-[15px]" : "text-[21px]";
  return (
    <div className="flex items-center gap-2">
      <span className="text-gold">
        <TravelPayMark size={size === "sm" ? 20 : 26} />
      </span>
      <span className={`${text} font-semibold tracking-[0.12em]`}>
        <span className={tone === "light" ? "text-white" : "text-ink"}>TRAVEL </span>
        <span className="text-gold">PAY</span>
      </span>
    </div>
  );
}

export function LangSelector({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-white/85" : "text-slate";
  return (
    <button
      type="button"
      className={`flex items-center gap-1.5 text-[12px] font-medium ${color} transition-opacity hover:opacity-70`}
    >
      <Globe className="size-[15px]" />
      RU
      <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true">
        <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </button>
  );
}

/* ---------- Payment brand marks ---------- */

export function VisaMark() {
  return (
    <span className="text-[15px] font-bold italic tracking-tight text-brandblue">VISA</span>
  );
}

export function MasterCardMark() {
  return (
    <span className="relative flex h-[18px] w-[28px] items-center">
      <span className="absolute left-0 size-[18px] rounded-full bg-danger" />
      <span className="absolute left-[10px] size-[18px] rounded-full bg-warning mix-blend-multiply" />
    </span>
  );
}

export function MirMark() {
  return <span className="text-[15px] font-extrabold tracking-tight text-success">МИР</span>;
}

export function SbpMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 4l4 4v8l-4 4z" fill="oklch(0.62 0.19 25)" />
      <path d="M6 8l6-4v16l-6-4z" fill="oklch(0.6 0.16 145)" />
      <path d="M12 4l5 3-5 3z" fill="oklch(0.72 0.15 85)" />
      <path d="M12 14l5 3-5 3z" fill="oklch(0.55 0.19 265)" />
      <path d="M17 7l5 5-5 5z" fill="oklch(0.62 0.17 300)" />
    </svg>
  );
}

export function YaPayMark({ size = 22 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-danger font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.55 }}
    >
      Я
    </span>
  );
}

export function BankMark({ id, size = 32 }: { id: string; size?: number }) {
  const cls = "flex shrink-0 items-center justify-center rounded-[8px] font-bold text-white";
  const style = { width: size, height: size, fontSize: size * 0.55 };
  if (id === "alfa")
    return (
      <span className={`${cls} bg-danger`} style={style}>
        A
      </span>
    );
  if (id === "sber")
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-success"
        style={{ width: size, height: size }}
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 12a8 8 0 1113.5 5.8" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M8 11l4 3.5 7-6" fill="none" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
    );
  if (id === "tbank")
    return (
      <span className={`${cls} bg-warning text-navy`} style={style}>
        T
      </span>
    );
  if (id === "raif")
    return (
      <span className={`${cls} bg-warning text-navy`} style={style}>
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4l8 8-8 8M20 4l-8 8 8 8" fill="none" stroke="oklch(0.25 0.06 259)" strokeWidth="3" />
        </svg>
      </span>
    );
  if (id === "vtb")
    return (
      <span className={`${cls} bg-brandblue`} style={style}>
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 7h18M3 12h14M3 17h10" stroke="white" strokeWidth="2.6" strokeLinecap="round" />
        </svg>
      </span>
    );
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[8px] bg-brandblue text-[9px] font-bold text-white"
      style={{ width: size, height: size }}
    >
      ПСБ
    </span>
  );
}

export function PciBadge() {
  return (
    <span className="flex items-center gap-1 rounded-[6px] border border-line bg-card px-2 py-1">
      <span className="text-[13px] font-extrabold italic text-brandblue">PCI</span>
      <span className="text-[8px] font-bold uppercase leading-[1.1] text-slate">
        DSS
        <br />
        Compliant
      </span>
    </span>
  );
}
