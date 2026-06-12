import { motion } from "framer-motion";
import { useParallax } from "../hooks/useParallax";
import { ArrowRight, Play } from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export function Hero() {
  const { scroll, mouse } = useParallax();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Background layers */}
      <div className="aurora" />
      <div className="absolute inset-0 grid-bg" />
      <div className="noise" />

      {/* Parallax stars */}
      {[...Array(40)].map((_, i) => {
        const size = (i % 3) + 1;
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const depth = ((i % 3) + 1) * 0.15;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-white parallax-layer"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              opacity: 0.3 + (i % 5) * 0.1,
              transform: `translate3d(${mouse.x * depth * 20}px, ${
                mouse.y * depth * 20 + scroll * depth * 0.3
              }px, 0)`,
            }}
          />
        );
      })}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-white/80 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              v2.4.0 — Now with Vision & Agents
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
            >
              The <span className="gradient-text">AI SDK</span> for
              <br />
              modern developers
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-lg text-white/70 max-w-xl mb-8 leading-relaxed"
            >
              Build intelligent applications in minutes. A unified SDK for text, vision,
              agents and vector search — with beautiful defaults and sub-100ms latency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <button className="btn-glow px-6 py-3 rounded-xl font-medium text-white flex items-center gap-2 hover:scale-[1.02] transition-transform">
                Start building
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 rounded-xl font-medium text-white/90 glass hover:bg-white/10 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4 fill-white" />
                Watch demo
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-xl font-medium text-white/90 glass hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <GithubIcon className="w-4 h-4" />
                GitHub
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-10 flex items-center gap-6 text-sm text-white/50"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["#8b5cf6", "#22d3ee", "#f59e0b", "#ef4444"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-[#05050a]"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span>18k+ developers</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
                <span className="ml-1">4.9/5 on G2</span>
              </div>
            </motion.div>
          </div>

          {/* Right: 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[420px] lg:h-[520px] flex items-center justify-center"
          >
            <div
              className="relative w-full max-w-md mx-auto"
              style={{
                transform: `perspective(1200px) rotateX(${mouse.y * 6}deg) rotateY(${
                  -mouse.x * 6
                }deg)`,
                transition: "transform 0.2s ease-out",
              }}
            >
              <div className="orb" />
              {/* Orbiting particles */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    animation: `spin ${10 + i * 3}s linear infinite`,
                    animationDirection: i % 2 === 0 ? "normal" : "reverse",
                  }}
                >
                  <div
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: i % 2 === 0 ? "#a78bfa" : "#22d3ee",
                      boxShadow: `0 0 20px ${i % 2 === 0 ? "#a78bfa" : "#22d3ee"}`,
                      top: "50%",
                      left: `${-8 - i * 3}%`,
                    }}
                  />
                </div>
              ))}

              {/* Floating code card */}
              <div
                className="absolute -bottom-4 -right-4 glass-strong rounded-xl p-3 text-xs code-font max-w-[240px] shadow-2xl shadow-purple-500/20"
                style={{
                  transform: `translate3d(${mouse.x * 12}px, ${mouse.y * 12}px, 60px)`,
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="text-purple-300">
                  <span className="text-cyan-300">const</span> ai ={" "}
                  <span className="text-yellow-300">new</span> Nebula()
                </div>
                <div className="text-white/70">
                  ai.chat(<span className="text-green-300">"hi"</span>)
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Marquee of logos */}
        <div className="mt-20 relative">
          <p className="text-center text-xs uppercase tracking-widest text-white/40 mb-6">
            Trusted by teams at
          </p>
          <div className="relative overflow-hidden">
            <div className="marquee-track flex gap-12 whitespace-nowrap">
              {[...Array(2)].flatMap((_, r) =>
                ["Vercel", "Linear", "Stripe", "Notion", "Figma", "Supabase", "Railway", "Planetscale", "Clerk", "Resend"].map(
                  (name, i) => (
                    <span
                      key={`${r}-${i}`}
                      className="text-2xl font-bold text-white/20 hover:text-white/60 transition-colors"
                    >
                      {name}
                    </span>
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
