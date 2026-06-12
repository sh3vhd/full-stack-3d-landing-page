import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, Loader2, Server, CheckCircle2, AlertCircle } from "lucide-react";
import { call, type ModelInfo, type PlaygroundResponse, type Stats } from "../lib/backend";

type Tab = "playground" | "models" | "stats";

export function ApiPlayground() {
  const [tab, setTab] = useState<Tab>("playground");

  return (
    <section id="playground" className="relative py-24 px-4 sm:px-6">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-white/80 mb-4">
            <Server className="w-3 h-3" />
            Live API
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Try the <span className="gradient-text">backend</span> live
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Real endpoints. Real responses. Explore Nebula's API right in your browser.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-6">
          {[
            { id: "playground" as Tab, label: "Chat Playground" },
            { id: "models" as Tab, label: "Models" },
            { id: "stats" as Tab, label: "Live Stats" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                tab === t.id
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10">
          {tab === "playground" && <Playground />}
          {tab === "models" && <ModelsPanel />}
          {tab === "stats" && <StatsPanel />}
        </div>
      </div>
    </section>
  );
}

function Playground() {
  const [prompt, setPrompt] = useState("Explain quantum computing in simple terms");
  const [model, setModel] = useState("nebula-1-turbo");
  const [temperature, setTemperature] = useState(0.7);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<PlaygroundResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await call<PlaygroundResponse>("POST /api/playground", {
        prompt,
        model,
        temperature,
      });
      setResponse(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
      {/* Left: request */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs code-font text-white/60">POST /api/playground</span>
        </div>

        <label className="block text-xs text-white/60 mb-1.5">Prompt</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white code-font focus:border-purple-500 focus:outline-none resize-none"
        />

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div>
            <label className="block text-xs text-white/60 mb-1.5">Model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="nebula-1-turbo">nebula-1-turbo</option>
              <option value="nebula-pro">nebula-pro</option>
              <option value="nebula-lite">nebula-lite</option>
              <option value="nebula-vision">nebula-vision</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/60 mb-1.5">
              Temperature: {temperature.toFixed(1)}
            </label>
            <input
              type="range"
              min={0}
              max={2}
              step={0.1}
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full mt-3 accent-purple-500"
            />
          </div>
        </div>

        <button
          onClick={run}
          disabled={loading || !prompt.trim()}
          className="mt-5 w-full btn-glow px-4 py-2.5 rounded-lg font-medium text-white flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              Run request
            </>
          )}
        </button>
      </div>

      {/* Right: response */}
      <div className="p-6 bg-black/30 min-h-[320px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-white/60">Response</span>
          {response && (
            <span className="text-xs code-font text-green-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              200 OK · {response.latency_ms}ms
            </span>
          )}
          {error && (
            <span className="text-xs code-font text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {error}
            </span>
          )}
        </div>
        <pre className="code-font text-xs text-white/90 overflow-auto max-h-[400px]">
          {response
            ? JSON.stringify(
                {
                  status: 200,
                  endpoint: "POST /api/playground",
                  latency_ms: response.latency_ms,
                  data: {
                    ok: response.ok,
                    model: response.model,
                    completion: response.completion,
                    tokens: response.tokens,
                  },
                },
                null,
                2
              )
            : "// Click 'Run request' to call the API"}
        </pre>
      </div>
    </div>
  );
}

function ModelsPanel() {
  const [models, setModels] = useState<ModelInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [latency, setLatency] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await call<ModelInfo[]>("GET /api/models");
      setModels(res.data);
      setLatency(res.latency_ms);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs code-font text-white/60">GET /api/models</span>
        {!loading && (
          <span className="text-xs code-font text-green-400">
            200 OK · {latency}ms
          </span>
        )}
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-12 text-white/50">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          Fetching models...
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          {models?.map((m) => (
            <div
              key={m.id}
              className="glass rounded-xl p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{m.name}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    m.speed === "fast"
                      ? "bg-green-500/20 text-green-300"
                      : m.speed === "medium"
                      ? "bg-yellow-500/20 text-yellow-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {m.speed}
                </span>
              </div>
              <p className="text-sm text-white/60 mb-2">{m.description}</p>
              <div className="flex items-center gap-3 text-xs text-white/40 code-font">
                <span>ctx: {m.context.toLocaleString()}</span>
                <span>·</span>
                <span>{m.provider}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatsPanel() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [latency, setLatency] = useState(0);

  const refresh = async () => {
    const res = await call<Stats>("GET /api/stats");
    setStats(res.data);
    setLatency(res.latency_ms);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs code-font text-white/60">GET /api/stats</span>
        <div className="flex items-center gap-3">
          <span className="text-xs code-font text-green-400">
            200 OK · {latency}ms
          </span>
          <button
            onClick={refresh}
            className="text-xs text-purple-300 hover:text-purple-200"
          >
            Refresh
          </button>
        </div>
      </div>
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBox label="Stars" value={stats.stars.toLocaleString()} accent="#a78bfa" />
          <StatBox
            label="Contributors"
            value={stats.contributors.toLocaleString()}
            accent="#22d3ee"
          />
          <StatBox
            label="Downloads"
            value={stats.downloads.toLocaleString()}
            accent="#f59e0b"
          />
          <StatBox label="Uptime" value={`${stats.uptime}%`} accent="#10b981" />
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="glass rounded-xl p-4 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: accent }}
      />
      <div className="text-xs text-white/50 mb-1">{label}</div>
      <div className="text-2xl font-bold" style={{ color: accent }}>
        {value}
      </div>
    </div>
  );
}
