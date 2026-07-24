"use client";

import { Bell, Menu } from "lucide-react";

interface AppHeaderProps {
  title: string;
  showMenu?: boolean;
  showNotification?: boolean;
  notificationCount?: number;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
}

export default function AppHeader({
  title,
  showMenu = true,
  showNotification = true,
  notificationCount = 0,
  onMenuClick,
  onNotificationClick,
}: AppHeaderProps) {
  return (
    <header
      className="
        fixed
        top-0
        left-1/2
        -translate-x-1/2
        w-full
        max-w-[430px]
        h-16
        z-50
        flex
        items-center
        justify-between
        px-5
        bg-surface/80
        backdrop-blur-md
        shadow-sm
      "
    >
      {/* Left */}
      <div className="w-10 flex justify-start">
        {showMenu && (
          <button
            onClick={onMenuClick}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-50 transition-colors"
          >
            <Menu size={22} className="text-primary-600" />
          </button>
        )}
      </div>

      {/* Center */}
      <h1 className="text-lg font-bold text-primary-700 text-center">
        {title}
      </h1>

      {/* Right */}
      <div className="w-10 flex justify-end">
        {showNotification && (
          <button
            onClick={onNotificationClick}
            className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-50 transition-colors"
          >
            <Bell size={22} className="text-primary-600" />

            {notificationCount > 0 && (
              <span className="absolute top-2 right-2 flex items-center justify-center min-w-2 h-2 rounded-full bg-danger" />
            )}
          </button>
        )}
      </div>
    </header>
  );
}