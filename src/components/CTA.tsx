import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { call } from "../lib/backend";

export function CTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setError("");
    try {
      await call<{ subscribed: boolean }>("POST /api/subscribe", { email });
      setState("success");
      setEmail("");
    } catch (err) {
      setState("error");
      setError(err instanceof Error && err.message === "INVALID_EMAIL"
        ? "Please enter a valid email"
        : "Something went wrong");
    }
  };

  return (
    <section id="pricing" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="aurora" style={{ opacity: 0.5 }} />
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500 rounded-full blur-[120px] opacity-40" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500 rounded-full blur-[120px] opacity-30" />

          <div className="relative">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Ready to build the <span className="gradient-text">future</span>?
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
              Join 18,000+ developers. Get early access to new models, tips, and
              exclusive updates.
            </p>

            <form onSubmit={submit} className="max-w-md mx-auto">
              <div className="flex gap-2 glass rounded-xl p-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  disabled={state === "loading" || state === "success"}
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={state === "loading" || state === "success"}
                  className="btn-glow px-5 py-2 rounded-lg font-medium text-white text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  {state === "loading" ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : state === "success" ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
              {state === "error" && (
                <p className="mt-2 text-sm text-red-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </p>
              )}
              <p className="mt-3 text-xs text-white/40">
                No spam. Unsubscribe anytime.
              </p>
            </form>

            {/* Pricing teaser */}
            <div className="mt-12 grid sm:grid-cols-3 gap-4">
              {[
                { name: "Free", price: "$0", desc: "10k tokens/mo", features: ["1 project", "Community support"] },
                { name: "Pro", price: "$29", desc: "5M tokens/mo", features: ["Unlimited projects", "Priority support", "Custom models"], highlight: true },
                { name: "Enterprise", price: "Custom", desc: "Unlimited", features: ["Dedicated infra", "SLA 99.99%", "On-prem option"] },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`rounded-xl p-5 text-left transition-transform hover:-translate-y-1 ${
                    p.highlight
                      ? "bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30"
                      : "glass"
                  }`}
                >
                  <div className="text-xs text-white/50 mb-1">{p.name}</div>
                  <div className="text-2xl font-bold mb-1">
                    {p.price}
                    {p.price !== "Custom" && (
                      <span className="text-sm text-white/40 font-normal">/mo</span>
                    )}
                  </div>
                  <div className="text-xs text-white/50 mb-3">{p.desc}</div>
                  <ul className="space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="text-xs text-white/70 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
