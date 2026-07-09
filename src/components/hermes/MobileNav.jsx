import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { navItems } from './navItems';

export default function MobileNav({ open, onClose }) {
  const { pathname } = useLocation();
  if (!open) return null;
  return (
    <div className="lg:hidden fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-64 bg-white h-full shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-900">Hermes Lab</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
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
      </div>
    </div>
  );
}