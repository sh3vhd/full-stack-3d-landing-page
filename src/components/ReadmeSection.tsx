import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { README_MD } from "../lib/readme";
import { BookOpen } from "lucide-react";

const GithubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.41-4.04-1.41-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export function ReadmeSection() {
  return (
    <section id="readme" className="relative py-24 px-4 sm:px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Beautiful <span className="gradient-text">documentation</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to know, rendered from a single README.md file.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10"
        >
          {/* GitHub-style header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-white/60" />
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/60">nebula-ai</span>
                <span className="text-white/30">/</span>
                <span className="text-white font-semibold">nebula</span>
                <span className="text-white/40">/</span>
                <span className="text-white/80">README.md</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">248 lines</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
                <GithubIcon className="w-4 h-4" />
                View on GitHub
              </button>
            </div>
          </div>

          {/* Markdown content */}
          <div className="p-8 sm:p-12 gh-markdown max-h-[600px] overflow-y-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{README_MD}</ReactMarkdown>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
