import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const links = [
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
  { href: "#readme", label: "Docs" },
  { href: "#playground", label: "API" },
  { href: "#pricing", label: "Pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      ref={ref}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass-strong shadow-2xl shadow-purple-500/10" : "glass"
          }`}
        >
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <svg viewBox="0 0 32 32" className="relative w-8 h-8">
                <defs>
                  <radialGradient id="navlogo" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                    <stop offset="30%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </radialGradient>
                </defs>
                <circle cx="16" cy="16" r="14" fill="url(#navlogo)" />
                <circle cx="11" cy="13" r="2" fill="#fff" opacity="0.8" />
                <circle cx="20" cy="19" r="1.5" fill="#fff" opacity="0.6" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">Nebula</span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3.5 py-1.5 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-4 h-4" />
              Star
            </a>
            <button className="btn-glow px-4 py-1.5 text-sm font-medium rounded-lg text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Get started
            </button>
          </div>

          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-white/80 hover:text-white rounded-lg hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
