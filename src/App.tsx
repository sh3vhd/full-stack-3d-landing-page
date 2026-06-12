import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { CodeDemo } from "./components/CodeDemo";
import { ReadmeSection } from "./components/ReadmeSection";
import { ApiPlayground } from "./components/ApiPlayground";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#05050a] text-white relative">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CodeDemo />
        <ReadmeSection />
        <ApiPlayground />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
