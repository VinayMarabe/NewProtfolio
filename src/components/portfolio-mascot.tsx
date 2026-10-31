import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Bot, ChevronLeft, ChevronRight, MessageCircle, Minimize2, Send, Sparkles, X } from "lucide-react";

type TourStop = {
  id: string;
  title: string;
  message: string;
};

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const tourStops: TourStop[] = [
  { id: "home", title: "Welcome", message: "Welcome to Vinay's portfolio! I'm your guide. I'll show you the work, skills, and experience behind the projects." },
  { id: "about", title: "About Vinay", message: "Vinay is an AI/ML developer who builds practical products with Generative AI, NLP, machine learning, and full-stack engineering." },
  { id: "skills", title: "Technical toolkit", message: "Explore the technologies Vinay uses, including Python, LangChain and RAG, FastAPI, PyTorch, React, SQL, and MCP." },
  { id: "projects", title: "Selected projects", message: "Here are four featured builds: a sponsored ASD research pipeline, CareerAI, SonicLens, and a WhatsApp news summarizer. Open any card for its architecture and impact." },
  { id: "experience", title: "Experience & education", message: "This section covers Vinay's AIML internship, earlier technical training, and academic background in AI/ML and computer science." },
  { id: "contact", title: "Let's connect", message: "That's the tour! If you're hiring, collaborating, or exploring an AI project, use the contact links here to reach Vinay." },
];

function answerPortfolioQuestion(question: string): string {
  const q = question.toLowerCase();

  if (/hello|hi |hey|who are you|what can you do/.test(q)) {
    return "Hi! I'm Vinay's portfolio guide. I can help you explore his skills, projects, education, experience, and contact details. You can also start the guided tour.";
  }
  if (/resume|cv|download/.test(q)) {
    return "You can open or download Vinay's resume using the “View Resume” button in the hero section at the top of the page.";
  }
  if (/contact|email|linkedin|hire|reach/.test(q)) {
    return "The Contact section has Vinay's LinkedIn, GitHub, and email links. He's open to AI/ML opportunities, product teams, and research collaborations.";
  }
  if (/experience|intern|work|thynk|vikramaa/.test(q)) {
    return "Vinay worked as an AIML Intern at Thynk Tech India from November 2025 to April 2026, developing EdTech AI solutions and prototyping Generative AI features. He also completed technical training at Vikramaa Technologies.";
  }
  if (/education|college|degree|study|university/.test(q)) {
    return "Vinay is pursuing a B.E. in Artificial Intelligence & Machine Learning at ISBM College of Engineering, Nande (2023–2026). He previously completed a Diploma in Computer Science Engineering at Government Polytechnic, Solapur (2020–2023).";
  }
  if (/skill|technology|tech stack|language|python|react|fastapi|langchain|rag|pytorch|database|sql|mcp/.test(q)) {
    return "His portfolio highlights Python, LangChain/RAG, FastAPI, PyTorch and machine learning, JavaScript/React, Java, REST APIs, SQL/databases, Git/GitHub, and Model Context Protocol. The Skills section has the full list.";
  }
  if (/autism|asd|medical|research|fMRI|brain|metaformer/.test(q)) {
    return "The sponsored ASD research project investigates resting-state fMRI using ABIDE-I data, functional-connectivity representations, Sparse Stacked Autoencoders, and a METAFormer architecture. Open the first project card for the problem, architecture, and impact.";
  }
  if (/careerai|recruit|job|resume intelligence|interview/.test(q)) {
    return "CareerAI is a RAG-based recruitment platform concept with resume intelligence, adaptive interviews, dynamic scoring, and recruiter analytics.";
  }
  if (/soniclens|audio|audiobook|voice|tts/.test(q)) {
    return "SonicLens is a multi-voice audiobook system. It uses an LLM workflow to identify speakers and emotions, then structures the content for expressive text-to-speech generation.";
  }
  if (/news|whatsapp|summar/.test(q)) {
    return "The News Summarizer WhatsApp Bot curates headlines with GNews, creates concise summaries using Gemini and LangChain, and sends daily digests through Twilio.";
  }
  if (/japan|japanese|language/.test(q)) {
    return "Vinay is also learning Japanese. His portfolio lists a beginner Japanese-language certification.";
  }
  if (/location|where|pune|india/.test(q)) {
    return "Vinay is based in Pune, India.";
  }

  return "I don't have a verified portfolio detail for that yet. Try asking about Vinay's projects, technical skills, AIML experience, education, resume, or contact information.";
}

function MascotAvatar({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Friendly portfolio robot mascot" className={compact ? "size-10 shrink-0" : "size-16 shrink-0"}>
      <defs>
        <linearGradient id="mascot-shell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9fbff" />
          <stop offset="100%" stopColor="#67d8e8" />
        </linearGradient>
        <linearGradient id="mascot-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#122b3a" />
          <stop offset="100%" stopColor="#08141f" />
        </linearGradient>
      </defs>
      <path d="M60 9v12" stroke="#75e6f2" strokeWidth="5" strokeLinecap="round" />
      <circle cx="60" cy="8" r="6" fill="#75e6f2" />
      <rect x="19" y="25" width="82" height="73" rx="27" fill="url(#mascot-shell)" stroke="#e7fdff" strokeWidth="3" />
      <rect x="27" y="34" width="66" height="53" rx="19" fill="url(#mascot-face)" />
      <circle cx="46" cy="57" r="5.5" fill="#75e6f2" />
      <circle cx="74" cy="57" r="5.5" fill="#75e6f2" />
      <path d="M47 72q13 12 26 0" fill="none" stroke="#75e6f2" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M19 51h-7q-5 0-5 6v10q0 6 5 6h7M101 51h7q5 0 5 6v10q0 6-5 6h-7" fill="#55bfd2" stroke="#baf8ff" strokeWidth="3" />
      <path d="M39 99v8m42-8v8" stroke="#75e6f2" strokeWidth="6" strokeLinecap="round" />
      <path d="M47 108h-9m44 0h-9" stroke="#75e6f2" strokeWidth="4" strokeLinecap="round" />
      <circle cx="34" cy="82" r="3" fill="#75e6f2" opacity=".8" />
      <circle cx="86" cy="82" r="3" fill="#75e6f2" opacity=".8" />
    </svg>
  );
}

export function PortfolioMascot() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"tour" | "ask">("tour");
  const [tourIndex, setTourIndex] = useState(0);
  const [tourActive, setTourActive] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: "Hi! Ask me about Vinay's work, or take the guided tour to explore the portfolio." },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, open, mode]);

  const currentStop = tourStops[tourIndex];

  const goToStop = (index: number) => {
    const bounded = Math.max(0, Math.min(index, tourStops.length - 1));
    setTourIndex(bounded);
    document.getElementById(tourStops[bounded].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const startTour = () => {
    setMode("tour");
    setTourActive(true);
    setOpen(true);
    goToStop(0);
  };

  const nextStop = () => {
    if (tourIndex === tourStops.length - 1) {
      setTourActive(false);
      setOpen(false);
      return;
    }
    goToStop(tourIndex + 1);
  };

  const sendQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    setMessages((current) => [
      ...current,
      { role: "user", text: trimmed },
      { role: "assistant", text: answerPortfolioQuestion(trimmed) },
    ]);
    setQuestion("");
  };

  return (
    <div className="portfolio-mascot fixed bottom-5 right-5 z-[70] sm:bottom-7 sm:right-7">
      {open && (
        <section className="mascot-panel mb-3 flex w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-primary/30 bg-popover shadow-[0_20px_80px_-24px_rgba(0,0,0,.8)]" aria-label="Portfolio guide">
          <div className="flex items-center gap-3 border-b border-border bg-surface/90 p-4">
            <MascotAvatar compact />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold">Vinay's Portfolio Buddy</p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">Your interactive guide</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-2 text-muted-foreground transition hover:bg-elevated hover:text-foreground" aria-label="Minimize guide"><Minimize2 className="size-4" /></button>
          </div>

          <div className="grid grid-cols-2 gap-1 border-b border-border p-2">
            <button type="button" onClick={() => setMode("tour")} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs transition ${mode === "tour" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-elevated"}`}><Sparkles className="size-3.5" />Guided tour</button>
            <button type="button" onClick={() => setMode("ask")} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs transition ${mode === "ask" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-elevated"}`}><MessageCircle className="size-3.5" />Ask about me</button>
          </div>

          {mode === "tour" ? (
            <div className="p-4">
              <div className="mb-3 flex items-center justify-between font-mono text-[9px] uppercase text-muted-foreground"><span>Portfolio tour</span><span>{tourIndex + 1} / {tourStops.length}</span></div>
              <div className="mb-3 h-1 overflow-hidden rounded-full bg-elevated"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((tourIndex + 1) / tourStops.length) * 100}%` }} /></div>
              <p className="font-display text-lg font-semibold">{currentStop.title}</p>
              <p className="mt-2 min-h-20 text-sm leading-6 text-muted-foreground">{currentStop.message}</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <button type="button" onClick={() => { setTourActive(true); goToStop(Math.max(0, tourIndex - 1)); }} disabled={tourIndex === 0} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground transition hover:bg-elevated disabled:opacity-40"><ChevronLeft className="size-3.5" />Back</button>
                <button type="button" onClick={() => { if (!tourActive) setTourActive(true); nextStop(); }} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-110">{tourIndex === tourStops.length - 1 ? "Finish tour" : "Next section"}<ChevronRight className="size-3.5" /></button>
              </div>
            </div>
          ) : (
            <div className="flex h-[22rem] flex-col">
              <div className="flex-1 space-y-3 overflow-y-auto p-3" aria-live="polite">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <p className={`max-w-[88%] rounded-2xl px-3 py-2 text-xs leading-5 ${message.role === "user" ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-elevated text-foreground"}`}>{message.text}</p>
                  </div>
                ))}
                <div ref={endRef} />
              </div>
              <form onSubmit={sendQuestion} className="flex items-center gap-2 border-t border-border p-3">
                <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about skills, projects..." aria-label="Ask a portfolio question" className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-xs outline-none placeholder:text-muted-foreground focus:border-primary" />
                <button type="submit" disabled={!question.trim()} className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition hover:brightness-110 disabled:opacity-40" aria-label="Send question"><Send className="size-4" /></button>
              </form>
              <p className="px-3 pb-3 text-[9px] leading-4 text-muted-foreground">Answers are grounded in the portfolio content; no external AI service is called.</p>
            </div>
          )}
        </section>
      )}

      <div className="flex items-end justify-end gap-3">
        {!open && <div className="mascot-hint rounded-full border border-primary/25 bg-popover/95 px-3 py-2 text-[11px] text-foreground shadow-lg">Explore my portfolio with me</div>}
        <button type="button" onClick={() => setOpen((value) => !value)} className="group relative grid size-[4.5rem] place-items-center rounded-full border border-primary/40 bg-surface shadow-[0_0_36px_var(--glow-primary)] transition hover:-translate-y-1 hover:border-primary" aria-label={open ? "Close portfolio guide" : "Open portfolio guide"}>
          <span className="absolute inset-1 rounded-full border border-primary/20" />
          <MascotAvatar compact />
          <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full border-2 border-background bg-success"><span className="size-1 rounded-full bg-background" /></span>
        </button>
      </div>
    </div>
  );
}
