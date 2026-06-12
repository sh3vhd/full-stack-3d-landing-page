import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

const examples = {
  basic: {
    label: "Quick Start",
    code: `import { Nebula } from "@nebula/sdk";

const ai = new Nebula({ apiKey: process.env.NEBULA_KEY });

// Stream a completion
const stream = await ai.chat.stream({
  model: "nebula-1-turbo",
  messages: [
    { role: "user", content: "Explain quantum entanglement" }
  ]
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}`,
  },
  agent: {
    label: "Agent",
    code: `import { Agent, tool } from "@nebula/sdk";

const weather = tool({
  name: "get_weather",
  description: "Get current weather for a city",
  parameters: { city: "string" },
  run: async ({ city }) => {
    const res = await fetch(\`https://api.weather.com/\${city}\`);
    return res.json();
  }
});

const agent = new Agent({
  model: "nebula-pro",
  tools: [weather],
  instructions: "You are a helpful travel assistant."
});

const reply = await agent.run("What should I wear in Tokyo today?");
console.log(reply);`,
  },
  vision: {
    label: "Vision",
    code: `import { Nebula } from "@nebula/sdk";

const ai = new Nebula({ apiKey: process.env.NEBULA_KEY });

// Analyze an image
const result = await ai.vision.analyze({
  model: "nebula-vision",
  image: "https://example.com/photo.jpg",
  prompt: "Describe what's happening in this image"
});

console.log(result.description);
console.log(result.objects);
console.log(result.sentiment);`,
  },
};

export function CodeDemo() {
  const [tab, setTab] = useState<"basic" | "agent" | "vision">("basic");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(examples[tab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="demo" className="relative py-24 px-4 sm:px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, <span className="gradient-text">powerful API</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Get started in 3 lines. Scale to millions of requests.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10"
        >
          {/* Tabs */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex gap-1 ml-4">
                {(Object.keys(examples) as Array<keyof typeof examples>).map((k) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      tab === k
                        ? "bg-white/10 text-white"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {examples[k].label}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-xs text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Code */}
          <div className="p-6 overflow-x-auto">
            <pre className="code-font text-sm leading-relaxed">
              <code className="text-white/90">{examples[tab].code}</code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
