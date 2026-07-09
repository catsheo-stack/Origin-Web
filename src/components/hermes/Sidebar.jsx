import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { navItems } from './navItems';

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-gray-100 bg-white h-screen sticky top-0">
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 tracking-tight leading-none">Hermes Lab</p>
          <p className="text-[10px] text-gray-400 mt-0.5">AI Marketing OS</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon size={17} className={active ? 'text-gray-900' : 'text-gray-400'} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-300 tracking-wider uppercase">Foundation v1.0</p>
      </div>
    </aside>
  );
}