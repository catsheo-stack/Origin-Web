import React from 'react';
import { Search, Bell, ChevronDown, Command, Menu } from 'lucide-react';

export default function TopBar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 h-16 bg-white/80 backdrop-blur border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 gap-3 sm:gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Menu size={18} className="text-gray-600" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium text-gray-900">Property Management</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles, projects, keywords…"
            className="w-full h-9 pl-9 pr-16 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-gray-300"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5">
            <Command size={10} />K
          </kbd>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors">
          <Bell size={17} className="text-gray-500" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </button>
        <button className="flex items-center gap-2 pl-1 pr-1 sm:pr-2 py-1 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gray-900 text-white text-xs font-medium flex items-center justify-center">
            OP
          </div>
          <ChevronDown size={14} className="text-gray-400 hidden sm:block" />
        </button>
      </div>
    </header>
  );
}