import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Apex Finance logo"
      >
        <circle cx="16" cy="16" r="16" fill="hsl(var(--primary))" />
        <path
          d="M16.216 11.416L19.664 20.576H18.032L17.264 18.592H13.6L12.832 20.576H11.2L14.648 11.416H16.216ZM15.432 13.12L14.224 16.928H16.64L15.432 13.12Z"
          fill="hsl(var(--primary-foreground))"
        />
      </svg>
      <span className="text-xl font-bold text-foreground font-headline">Apex Finance</span>
    </div>
  )
}
