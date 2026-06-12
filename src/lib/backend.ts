/**
 * Mock backend for Nebula.
 * Simulates real REST endpoints with delays, validation, and persistence (localStorage).
 * In a production build, swap `call` for real fetch() to your API.
 */

type Endpoint =
  | "GET /api/stats"
  | "GET /api/readme"
  | "POST /api/subscribe"
  | "POST /api/playground"
  | "POST /api/feedback"
  | "GET /api/models";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function writeJSON<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export interface Stats {
  stars: number;
  contributors: number;
  downloads: number;
  uptime: number;
}

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  context: number;
  speed: "fast" | "medium" | "slow";
  description: string;
}

export interface PlaygroundResponse {
  ok: boolean;
  latency_ms: number;
  model: string;
  completion: string;
  tokens: { prompt: number; completion: number; total: number };
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  latency_ms: number;
  endpoint: string;
}

/* -------- handlers -------- */

async function handleStats(): Promise<Stats> {
  const stored = readJSON<Stats>("nebula.stats", {
    stars: 42817,
    contributors: 386,
    downloads: 2_145_903,
    uptime: 99.98,
  });
  // Simulate live growth
  stored.stars += Math.floor(Math.random() * 3);
  stored.downloads += Math.floor(Math.random() * 40);
  writeJSON("nebula.stats", stored);
  return stored;
}

async function handleSubscribe(body: { email: string }): Promise<{ subscribed: boolean; id: string }> {
  const email = body?.email?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("INVALID_EMAIL");
  }
  const list = readJSON<string[]>("nebula.subscribers", []);
  if (list.includes(email)) {
    return { subscribed: true, id: btoa(email).slice(0, 12) };
  }
  list.push(email);
  writeJSON("nebula.subscribers", list);
  return { subscribed: true, id: btoa(email).slice(0, 12) };
}

async function handlePlayground(body: {
  prompt: string;
  model: string;
  temperature?: number;
}): Promise<PlaygroundResponse> {
  const prompt = body?.prompt?.trim() ?? "";
  if (!prompt) throw new Error("EMPTY_PROMPT");
  const start = performance.now();
  const samples = [
    `Based on "${prompt.slice(0, 60)}...", Nebula generated a concise answer leveraging ${body.model}. The response is optimized for low-latency inference.`,
    `Nebula analyzed your input and synthesized a structured response using semantic retrieval. Here is the result for: "${prompt.slice(0, 50)}...".`,
    `Using ${body.model} at temperature ${body.temperature ?? 0.7}, here is a coherent completion: the concept you asked about relates to modern AI orchestration patterns.`,
  ];
  const completion = samples[Math.floor(Math.random() * samples.length)];
  const latency = performance.now() - start + 120 + Math.random() * 260;
  return {
    ok: true,
    latency_ms: Math.round(latency),
    model: body.model,
    completion,
    tokens: {
      prompt: prompt.split(/\s+/).length,
      completion: completion.split(/\s+/).length,
      total: prompt.split(/\s+/).length + completion.split(/\s+/).length,
    },
  };
}

async function handleFeedback(body: { message: string; rating: number }): Promise<{ received: boolean }> {
  if (!body?.message || body.message.length < 4) throw new Error("MESSAGE_TOO_SHORT");
  const list = readJSON<Array<{ message: string; rating: number; at: string }>>("nebula.feedback", []);
  list.push({ message: body.message, rating: body.rating, at: new Date().toISOString() });
  writeJSON("nebula.feedback", list);
  return { received: true };
}

async function handleModels(): Promise<ModelInfo[]> {
  return [
    { id: "nebula-1", name: "Nebula-1 Turbo", provider: "Nebula Labs", context: 32000, speed: "fast", description: "Our flagship balanced model." },
    { id: "nebula-pro", name: "Nebula Pro", provider: "Nebula Labs", context: 128000, speed: "medium", description: "Deep reasoning & long-context tasks." },
    { id: "nebula-lite", name: "Nebula Lite", provider: "Nebula Labs", context: 8000, speed: "fast", description: "Ultra-low latency for edge devices." },
    { id: "nebula-vision", name: "Nebula Vision", provider: "Nebula Labs", context: 16000, speed: "medium", description: "Multimodal image & text reasoning." },
  ];
}

/* -------- router -------- */

export async function call<T>(
  endpoint: Endpoint,
  body?: Record<string, unknown>
): Promise<ApiResponse<T>> {
  const start = performance.now();
  await delay(280 + Math.random() * 420);
  let data: unknown;

  try {
    switch (endpoint) {
      case "GET /api/stats":
        data = await handleStats();
        break;
      case "POST /api/subscribe":
        data = await handleSubscribe(body as { email: string });
        break;
      case "POST /api/playground":
        data = await handlePlayground(body as { prompt: string; model: string; temperature?: number });
        break;
      case "POST /api/feedback":
        data = await handleFeedback(body as { message: string; rating: number });
        break;
      case "GET /api/models":
        data = await handleModels();
        break;
      case "GET /api/readme":
        data = { content: "see readme module" };
        break;
    }
  } catch (err) {
    throw err;
  }

  return {
    status: 200,
    data: data as T,
    latency_ms: Math.round(performance.now() - start),
    endpoint,
  };
}
