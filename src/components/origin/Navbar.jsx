import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { base44 } from "@/api/base44Client";
import originLogo from "@/assets/origin-logo.png";

const knowledgeCentreLinks = [
  { label: "Articles", path: "/articles" },
  { label: "Guides", path: "/guides" },
  { label: "FAQ", path: "/faq" },
  { label: "Tools", path: "/tools" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileKcOpen, setMobileKcOpen] = useState(false);
  const [kcOpen, setKcOpen] = useState(false);
  const [, setUser] = useState(null);
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
    setMobileKcOpen(false);
    setKcOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const isKcActive = ["/articles", "/guides", "/faq", "/tools"].some((p) =>
    location.pathname.startsWith(p)
  );

  const linkClass = (path) =>
    `text-sm font-body tracking-wide transition-colors hover:text-accent-navy ${
      location.pathname === path ? "text-accent-navy" : "text-midnight/70"
    }`;

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
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => {
            base44.analytics.track({ eventName: "nav_logo_click" });
          }}
        >
          <img
            src={originLogo}
            alt="Origin Concierge logo"
            className="h-8 w-8 object-contain shrink-0"
          />

          <span className="font-heading text-xl font-light tracking-tight text-midnight whitespace-nowrap">
            Origin Property{" "}
            <span className="text-golden font-normal">Concierge</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/buyer-advisory" className={linkClass("/buyer-advisory")}>
            Buyer Advisory
          </Link>

          <Link
            to="/property-management"
            className={linkClass("/property-management")}
          >
            Property Management
          </Link>

          <Link to="/conveyancing" className={linkClass("/conveyancing")}>
            Conveyancing
          </Link>

          <Link
            to="/mortgage-finance"
            className={linkClass("/mortgage-finance")}
          >
            Mortgage &amp; Finance
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setKcOpen(true)}
            onMouseLeave={() => setKcOpen(false)}
          >
            <button
              type="button"
              className={`text-sm font-body tracking-wide transition-colors hover:text-accent-navy flex items-center gap-1 ${
                isKcActive ? "text-accent-navy" : "text-midnight/70"
              }`}
            >
              Knowledge Centre
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  kcOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {kcOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                <div className="w-80 bg-white rounded-xl shadow-xl border border-stone overflow-hidden">
                  <p className="px-5 pt-3 pb-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-golden">
                    Knowledge Centre
                  </p>

                  {knowledgeCentreLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block px-5 py-3 text-sm font-medium transition-colors hover:bg-stone/30 border-t border-stone/50 ${
                        location.pathname === link.path
                          ? "text-accent-navy bg-stone/20"
                          : "text-midnight"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/book-consultation"
            className="bg-midnight text-parchment text-sm px-5 py-2.5 rounded-full hover:bg-accent-navy transition-colors font-medium"
            onClick={() => {
              base44.analytics.track({
                eventName: "cta_clicked",
                properties: { cta: "nav_book_call" },
              });
            }}
          >
            Book a Call
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-midnight"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-parchment/95 backdrop-blur-xl border-t border-stone px-6 py-6 space-y-1">
          <Link
            to="/buyer-advisory"
            className="block text-base text-midnight/80 hover:text-accent-navy py-2"
          >
            Buyer Advisory
          </Link>

          <Link
            to="/property-management"
            className="block text-base text-midnight/80 hover:text-accent-navy py-2"
          >
            Property Management
          </Link>

          <Link
            to="/conveyancing"
            className="block text-base text-midnight/80 hover:text-accent-navy py-2"
          >
            Conveyancing
          </Link>

          <Link
            to="/mortgage-finance"
            className="block text-base text-midnight/80 hover:text-accent-navy py-2"
          >
            Mortgage &amp; Finance
          </Link>

          <button
            type="button"
            className="flex items-center justify-between w-full text-base text-midnight/80 hover:text-accent-navy py-2"
            onClick={() => setMobileKcOpen(!mobileKcOpen)}
          >
            Knowledge Centre
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                mobileKcOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {mobileKcOpen && (
            <div className="pl-4 space-y-1 pb-1 border-l-2 border-golden/40 ml-1">
              <p className="text-[10px] font-semibold tracking-[0.18em] uppercase text-golden pt-2 pb-1">
                Knowledge Centre
              </p>

              {knowledgeCentreLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-sm font-medium py-2.5 ${
                    location.pathname === link.path
                      ? "text-accent-navy"
                      : "text-midnight"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
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