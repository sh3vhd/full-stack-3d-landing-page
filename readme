export const README_MD = `![Nebula banner](https://via.placeholder.com/1)

# 🌌 Nebula — The AI SDK for Modern Developers

> Build intelligent applications in minutes, not months. Nebula is a unified SDK that gives you access to state-of-the-art AI models, vector search, and agentic workflows — with a beautiful API and first-class TypeScript support.

![GitHub stars](https://img.shields.io/badge/stars-42.8k-8b5cf6) ![License](https://img.shields.io/badge/license-MIT-22d3ee) ![Version](https://img.shields.io/badge/version-2.4.0-a78bfa) ![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)

---

## ✨ Features

- 🚀 **Unified API** — One SDK for text, vision, audio, and embeddings
- 🧠 **Agentic workflows** — Build tools, chains, and autonomous agents
- ⚡ **Blazing fast** — Streaming-first, edge-ready, sub-100ms latency
- 🔐 **Enterprise security** — SOC 2 Type II, GDPR, HIPAA ready
- 🎨 **Beautiful defaults** — Pre-built UI components & themes
- 📦 **Tiny footprint** — Only 14kb gzipped

---

## 📦 Installation

\`\`\`bash
npm install @nebula/sdk
# or
pnpm add @nebula/sdk
# or
bun add @nebula/sdk
\`\`\`

---

## 🚀 Quick Start

\`\`\`typescript
import { Nebula } from "@nebula/sdk";

const ai = new Nebula({ apiKey: process.env.NEBULA_KEY });

// Stream a completion in 3 lines
const stream = await ai.chat.stream({
  model: "nebula-1-turbo",
  messages: [
    { role: "user", content: "Explain quantum entanglement like I'm five" }
  ]
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
}
\`\`\`

---

## 🛠 Advanced: Building an Agent

\`\`\`typescript
import { Agent, tool } from "@nebula/sdk";

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
console.log(reply);
\`\`\`

---

## 📊 Benchmarks

| Model            | Latency (p50) | Context | Tokens/s |
|------------------|---------------|---------|----------|
| Nebula-1 Turbo   | 84ms          | 32k     | 312      |
| Nebula Pro       | 142ms         | 128k    | 184      |
| Nebula Lite      | 22ms          | 8k      | 890      |
| Nebula Vision    | 210ms         | 16k     | 95       |

---

## 🌐 Community

- [Discord](https://discord.gg/nebula) — 18,000+ developers
- [GitHub Discussions](https://github.com/nebula-ai/nebula/discussions)
- [Twitter / X](https://twitter.com/nebula_ai)
- [Blog](https://nebula.dev/blog)

---

## 📝 License

Nebula is released under the [MIT License](LICENSE).

\`\`\`
Made with 💜 by Nebula Labs
\`\`\`
`;
