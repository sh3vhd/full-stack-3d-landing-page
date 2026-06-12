import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  Zap,
  Brain,
  Shield,
  Layers,
  Sparkles,
  Globe,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast",
    description: "Sub-100ms latency with edge-first architecture and streaming responses.",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Brain,
    title: "Agentic Workflows",
    description: "Build autonomous agents with tools, chains, and memory in minutes.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II, GDPR, HIPAA compliant. Your data stays yours.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Layers,
    title: "Unified API",
    description: "One SDK for text, vision, audio, embeddings, and vector search.",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "Beautiful Defaults",
    description: "Pre-built UI components, themes, and responsive layouts out of the box.",
    gradient: "from-purple-400 to-indigo-500",
  },
  {
    icon: Globe,
    title: "Global Edge Network",
    description: "Deploy to 50+ regions. Scale from zero to millions automatically.",
    gradient: "from-cyan-400 to-teal-500",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need to{" "}
            <span className="gradient-text">ship AI</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A complete toolkit for building intelligent applications with confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <TiltCard key={i} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (x - 0.5) * 20,
      y: (y - 0.5) * -20,
    });
  };

  const reset = () => setTilt({ x: 0, y: 0 });

  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        className="tilt-card h-full"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
        }}
      >
        <div className="glass rounded-2xl p-6 h-full hover:bg-white/5 transition-colors group">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-white/60 leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
