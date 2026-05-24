"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Megaphone,
  BarChart2,
  Zap,
  Database,
  HelpCircle,
  Settings,
  Users,
  Layers,
  ArrowLeftToLine,
  ArrowRightToLine,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Nav config — Dashboard first, no badges                             */
/* ------------------------------------------------------------------ */

const mainNav = [
  { href: null,         label: "Dashboard", icon: LayoutDashboard, clickable: false },
  { href: "/campaigns", label: "Campaigns", icon: Megaphone,       clickable: true  },
  { href: "/analytics", label: "Analytics", icon: BarChart2,       clickable: true  },
  { href: null,         label: "Boosts",    icon: Zap,             clickable: false },
  { href: "/database",  label: "Database",  icon: Database,        clickable: true  },
];

const secondaryNav = [
  { href: null, label: "Team",          icon: Users,  clickable: false },
  { href: null, label: "Subscriptions", icon: Layers, clickable: false },
];

const bottomNav = [
  { label: "Get Help", icon: HelpCircle },
  { label: "Settings", icon: Settings   },
];

/* ------------------------------------------------------------------ */
/* NavItem                                                              */
/* ------------------------------------------------------------------ */

function NavItem({
  href,
  label,
  icon: Icon,
  clickable,
  isActive,
  open,
}: {
  href: string | null;
  label: string;
  icon: React.ElementType;
  clickable: boolean;
  isActive: boolean;
  open: boolean;
}) {
  const rowClass = cn(
    "group flex items-center w-full px-2 py-2 rounded-md text-sm transition-colors duration-150 select-none",
    open ? "gap-3" : "justify-center",
    isActive
      ? "bg-muted text-foreground font-medium"
      : clickable
        ? "text-muted-foreground hover:bg-muted/60 hover:text-foreground cursor-pointer"
        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground cursor-default opacity-50"
  );

  const inner = (
    <div className={rowClass}>
      <Icon
        size={20}
        strokeWidth={1.5}
        className={cn(
          "shrink-0 transition-colors",
          isActive
            ? "text-foreground"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      />
      {open && (
        <span className="whitespace-nowrap leading-none">{label}</span>
      )}
    </div>
  );

  const wrapped = clickable && href ? (
    <Link href={href} className="block w-full">{inner}</Link>
  ) : (
    <div className="w-full">{inner}</div>
  );

  if (!open) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{wrapped}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    );
  }

  return wrapped;
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                              */
/* ------------------------------------------------------------------ */

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "relative flex flex-col h-full bg-background border-r border-border",
          "transition-[width] duration-300 ease-in-out overflow-hidden",
          open ? "w-[224px]" : "w-[56px]"
        )}
      >
        {/* ── Logo / toggle row ── */}
        <div className="flex items-center h-[64px] shrink-0 border-b border-border px-3">
          {open ? (
            <>
              <span
                className="flex-1 text-[17px] text-foreground tracking-tight whitespace-nowrap"
                style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
              >
                Cube Campaign
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <ArrowLeftToLine size={20} strokeWidth={1.5} />
              </button>
            </>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setOpen(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <ArrowRightToLine size={20} strokeWidth={1.5} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* ── Main nav ── */}
        <nav className="px-2 pt-4 pb-2 space-y-0.5">
          {mainNav.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={item.href ? pathname.startsWith(item.href) : false}
              open={open}
            />
          ))}
        </nav>

        {/* ── Separator + secondary nav ── */}
        <div className="px-2 pt-2 pb-2">
          <Separator className="mb-3" />
          <div className="space-y-0.5">
            {secondaryNav.map((item) => (
              <NavItem
                key={item.label}
                {...item}
                isActive={false}
                open={open}
              />
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        <Separator />

        {/* ── Bottom nav ── */}
        <div className="px-2 py-3 space-y-0.5">
          {bottomNav.map(({ label, icon: Icon }) => {
            const row = (
              <div
                className={cn(
                  "flex items-center gap-3 px-2 py-2 rounded-md text-sm",
                  "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                  "cursor-default transition-colors w-full",
                  !open && "justify-center"
                )}
              >
                <Icon size={20} strokeWidth={1.5} className="shrink-0" />
                {open && <span className="whitespace-nowrap">{label}</span>}
              </div>
            );

            return !open ? (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <div className="w-full">{row}</div>
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ) : (
              <div key={label} className="w-full">{row}</div>
            );
          })}
        </div>

        <Separator />

        {/* ── User profile ── */}
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-4",
            !open && "justify-center"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-8 h-8 shrink-0 cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs font-medium bg-muted text-foreground">
                  JA
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            {!open && (
              <TooltipContent side="right">
                joniyon · arowokajohn1@gmail.com
              </TooltipContent>
            )}
          </Tooltip>

          {open && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">joniyon</p>
              <p className="text-[11px] text-muted-foreground truncate">
                arowokajohn1@gmail.com
              </p>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
