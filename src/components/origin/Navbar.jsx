import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { base44 } from "@/api/base44Client";

const navItems = [
  { label: "Property Management", path: "/property-management" },
  { label: "Property Guides", path: "/property-guides" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < lastY || y < 80);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-parchment/95 backdrop-blur-xl shadow-sm"
          : "bg-parchment/80 backdrop-blur-xl"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1" onClick={() => { base44.analytics.track({ eventName: "nav_logo_click" }); }}>
          <span className="font-heading text-xl font-light tracking-tight text-midnight">
            Origin Property{" "}
            <span className="text-golden font-normal">Concierge</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-body tracking-wide transition-colors hover:text-accent-navy ${
                location.pathname === item.path
                  ? "text-accent-navy"
                  : "text-midnight/70"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin/articles"
              className="text-sm font-body tracking-wide text-golden hover:text-golden/80 transition-colors"
            >
              Admin
            </Link>
          )}
          <Link
            to="/book-consultation"
            className="bg-midnight text-parchment text-sm px-5 py-2.5 rounded-full hover:bg-accent-navy transition-colors font-medium"
            onClick={() => { base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "nav_book_call" } }); }}
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-midnight"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-parchment/95 backdrop-blur-xl border-t border-stone px-6 py-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block text-base text-midnight/80 hover:text-accent-navy py-2"
            >
              {item.label}
            </Link>
          ))}
          {user?.role === "admin" && (
            <Link
              to="/admin/articles"
              className="block text-base text-golden hover:text-golden/80 py-2"
            >
              Admin
            </Link>
          )}
          <Link
            to="/book-consultation"
            className="block bg-midnight text-parchment text-center text-sm px-5 py-3 rounded-full hover:bg-accent-navy transition-colors font-medium mt-4"
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}