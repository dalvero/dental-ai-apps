"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  History,
  Camera,
  GraduationCap,
  User,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const LEFT_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/history", label: "History", icon: History },
];

const RIGHT_ITEMS: NavItem[] = [
  { href: "/learn", label: "Learn", icon: GraduationCap },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
        className="
            fixed
            bottom-0
            left-1/2
            -translate-x-1/2
            w-full
            max-w-[430px]
            z-50
            flex
            items-center
            justify-around
            px-2
            py-3
            pb-[calc(env(safe-area-inset-bottom)+0.75rem)]
            bg-surface/90
            backdrop-blur-lg
            rounded-t-3xl
        "
        style={{
            boxShadow: "0px -10px 30px rgba(16,185,129,0.1)",
        }}
    >
      {LEFT_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} isActive={pathname === item.href} />
      ))}

      {/* Scan FAB */}
      <Link
        href="/scan"
        aria-label="Scan"
        className="relative -top-7 flex flex-col items-center gap-1 group"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-primary-500/20 blur-xl scale-125 group-hover:scale-150 transition-transform" />
        <span className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white shadow-[0_10px_25px_-8px_rgba(16,185,129,0.6)] active:scale-95 transition-transform">
          <Camera size={26} />
        </span>
        <span className="text-xs font-bold text-primary-600">Scan</span>
      </Link>

      {RIGHT_ITEMS.map((item) => (
        <NavLink key={item.href} item={item} isActive={pathname === item.href} />
      ))}
    </nav>
  );
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`flex flex-col items-center justify-center gap-0.5 rounded-full px-4 py-1.5 transition-colors ${
        isActive
          ? "bg-secondary-100 text-secondary-700"
          : "text-text-secondary hover:text-text"
      }`}
    >
      <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
      <span className="text-[11px] font-medium">{item.label}</span>
    </Link>
  );
}