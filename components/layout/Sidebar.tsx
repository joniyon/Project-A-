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
  Users,
  Layers,
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
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Nav config                                                           */
/* ------------------------------------------------------------------ */

const navGroupOne = [
  { href: "/campaigns", label: "Campaigns",  icon: Megaphone,       clickable: true  },
  { href: null,         label: "Dashboard",  icon: LayoutDashboard, clickable: false },
  { href: null,         label: "Analytics",  icon: BarChart2,       clickable: false },
  { href: null,         label: "Boosts",     icon: Zap,             clickable: false },
  { href: null,         label: "Database",   icon: Database,        clickable: false },
];

const navGroupTwo = [
  { href: null, label: "Team",          icon: Users,  clickable: false },
  { href: null, label: "Subscriptions", icon: Layers, clickable: false },
];

const bottomItems = [
  { href: null, label: "Get Help", icon: HelpCircle },
  { href: null, label: "Settings", icon: Settings   },
];

/* ------------------------------------------------------------------ */
/* NavItem                                                              */
/* ------------------------------------------------------------------ */

interface NavItemProps {
  href: string | null;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  clickable: boolean;
  collapsed: boolean;
}

function NavItem({ href, label, icon: Icon, isActive, clickable, collapsed }: NavItemProps) {
  const inner = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full transition-colors duration-150 select-none",
        collapsed && "justify-center px-0",
        isActive
          ? "bg-muted text-foreground font-medium"
          : clickable
            ? "text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer font-normal"
            : "text-muted-foreground hover:bg-muted hover:text-foreground cursor-default font-normal opacity-80"
      )}
    >
      <Icon
        size={20}
        strokeWidth={isActive ? 2 : 1.75}
        className="shrink-0"
      />
      {!collapsed && <span className="whitespace-nowrap leading-none">{label}</span>}
    </div>
  );

  const wrapped = clickable && href ? (
    <Link href={href} className="block w-full">
      {inner}
    </Link>
  ) : (
    <div className="w-full">{inner}</div>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{wrapped}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs font-medium">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return wrapped;
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                              */
/* ------------------------------------------------------------------ */

export default function Sidebar() {
  const pathname   = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "relative flex flex-col h-full bg-background border-r border-border",
          "transition-[width] duration-300 ease-in-out overflow-hidden shrink-0",
          open ? "w-[232px]" : "w-[56px]"
        )}
      >
        {/* ── Logo row ── */}
        <div className="flex items-center justify-between h-16 px-4 shrink-0 border-b border-border">
          {/* Logo — only visible when expanded */}
          {open && (
            <span
              className="text-[17px] text-foreground tracking-tight whitespace-nowrap"
              style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}
            >
              Cube Campaign
            </span>
          )}

          {/* Toggle — right side when expanded, left-aligned (logo position) when collapsed */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-md",
              "text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0",
              !open && "mx-auto"
            )}
            aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          >
            {open
              ? <PanelLeftClose size={20} strokeWidth={1.75} />
              : <PanelLeftOpen  size={20} strokeWidth={1.75} />
            }
          </button>
        </div>

        {/* ── Nav Group 1 ── */}
        <nav className="px-2 pt-3 pb-1 space-y-0.5"
        >
          {navGroupOne.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={item.href ? pathname.startsWith(item.href) : false}
              collapsed={!open}
            />
          ))}
        </nav>

        {/* ── Separator ── */}
        <div className="px-2 py-3">
          <Separator />
        </div>

        {/* ── Nav Group 2 ── */}
        <nav className="px-2 pb-1 space-y-0.5 flex-1">
          {navGroupTwo.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={false}
              collapsed={!open}
            />
          ))}
        </nav>

        {/* ── Bottom section ── */}
        <div className="shrink-0">
          <Separator />
          <div className="px-2 py-3 space-y-0.5">
            {bottomItems.map(({ label, icon: Icon }) => {
              const inner = (
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full",
                    "text-muted-foreground hover:bg-muted hover:text-foreground",
                    "cursor-default transition-colors font-normal",
                    !open && "justify-center px-0"
                  )}
                >
                  <Icon size={20} strokeWidth={1.75} className="shrink-0" />
                  {open && <span className="whitespace-nowrap">{label}</span>}
                </div>
              );

              if (!open) {
                return (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <div className="w-full">{inner}</div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="text-xs font-medium">
                      {label}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={label} className="w-full">{inner}</div>;
            })}
          </div>

          {/* ── User profile ── */}
          <Separator />
          <div
            className={cn(
              "flex items-center gap-3 px-4 py-4",
              !open && "justify-center px-2"
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-7 h-7 shrink-0 cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback
                    className="text-[11px] font-medium bg-muted text-foreground"
                  >
                    JA
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              {!open && (
                <TooltipContent side="right" className="text-xs">
                  joniyon · arowokajohn1@gmail.com
                </TooltipContent>
              )}
            </Tooltip>

            {open && (
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate leading-none mb-0.5">
                  joniyon
                </p>
                <p className="text-[11px] text-muted-foreground truncate leading-none">
                  arowokajohn1@gmail.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
