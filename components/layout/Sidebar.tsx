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
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Nav config                                                           */
/* ------------------------------------------------------------------ */

const navItems = [
  { href: "/campaigns", label: "Campaigns", icon: Megaphone,       badge: "42", active: true  },
  { href: null,         label: "Dashboard", icon: LayoutDashboard, badge: null,  active: false },
  { href: null,         label: "Analytics", icon: BarChart2,       badge: null,  active: false },
  { href: null,         label: "Boosts",    icon: Zap,             badge: "3",   active: false },
  { href: null,         label: "Database",  icon: Database,        badge: null,  active: false },
];

const bottomItems = [
  { href: null, label: "Get Help", icon: HelpCircle },
  { href: null, label: "Settings", icon: Settings },
];

/* ------------------------------------------------------------------ */
/* Component                                                            */
/* ------------------------------------------------------------------ */

export default function Sidebar() {
  const pathname   = usePathname();
  const [open, setOpen] = useState(true); // true = expanded

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "relative flex flex-col h-full bg-background border-r border-border",
          "transition-[width] duration-300 ease-in-out overflow-hidden",
          open ? "w-[220px]" : "w-[56px]"
        )}
      >
        {/* ── Logo row ── */}
        <div className="flex items-center h-[60px] shrink-0 border-b border-border px-3 gap-2">
          {/* Collapse toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {open
              ? <PanelLeftClose size={20} strokeWidth={1.75} />
              : <PanelLeftOpen  size={20} strokeWidth={1.75} />}
          </button>

          {/* Brand name — fades out when collapsed */}
          <span
            className={cn(
              "text-[17px] text-foreground tracking-tight whitespace-nowrap transition-opacity duration-200",
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
          >
            Cube Campaign
          </span>
        </div>

        {/* ── Main nav ── */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-hidden">
          {navItems.map(({ href, label, icon: Icon, badge }) => {
            const isActive = href ? pathname.startsWith(href) : false;
            const isClickable = !!href;

            const inner = (
              <div
                className={cn(
                  "group flex items-center gap-3 px-2 py-2 rounded-md text-sm w-full",
                  "transition-colors duration-150",
                  open ? "justify-between" : "justify-center",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isClickable
                      ? "text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-default opacity-70"
                )}
              >
                {/* Icon + label */}
                <div className={cn("flex items-center gap-3", !open && "justify-center")}>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2 : 1.75}
                    className="shrink-0"
                  />
                  {open && (
                    <span className="font-medium whitespace-nowrap leading-none">
                      {label}
                    </span>
                  )}
                </div>

                {/* Badge */}
                {open && badge && (
                  <Badge
                    variant="secondary"
                    className={cn(
                      "text-[10px] font-semibold h-5 min-w-5 px-1.5 rounded",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {badge}
                  </Badge>
                )}
              </div>
            );

            const wrapped = isClickable ? (
              <Link key={label} href={href!} className="block w-full">
                {inner}
              </Link>
            ) : (
              <div key={label} className="w-full">
                {inner}
              </div>
            );

            /* Tooltip when collapsed */
            if (!open) {
              return (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>{wrapped}</TooltipTrigger>
                  <TooltipContent side="right">
                    <span>{label}</span>
                    {badge && (
                      <span className="ml-1.5 text-muted-foreground">({badge})</span>
                    )}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return wrapped;
          })}
        </nav>

        <Separator />

        {/* ── Bottom nav ── */}
        <div className="px-2 py-3 space-y-0.5">
          {bottomItems.map(({ label, icon: Icon }) => {
            const inner = (
              <div
                className={cn(
                  "group flex items-center gap-3 px-2 py-2 rounded-md text-sm w-full",
                  "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  "cursor-default transition-colors duration-150",
                  !open && "justify-center"
                )}
              >
                <Icon size={20} strokeWidth={1.75} className="shrink-0" />
                {open && <span className="font-medium whitespace-nowrap">{label}</span>}
              </div>
            );

            if (!open) {
              return (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <div className="w-full">{inner}</div>
                  </TooltipTrigger>
                  <TooltipContent side="right">{label}</TooltipContent>
                </Tooltip>
              );
            }

            return <div key={label} className="w-full">{inner}</div>;
          })}
        </div>

        <Separator />

        {/* ── User profile ── */}
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-4 overflow-hidden",
            !open && "justify-center"
          )}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-8 h-8 shrink-0 cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
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
              <p className="text-xs font-semibold text-foreground truncate">joniyon</p>
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
