import { useState, type FormEvent } from "react";
import { ArrowRight, Bot, ChevronLeft, ChevronRight, MessageCircle, Send, Sparkles, X } from "lucide-react";

type TourStop = { id: string; title: string; message: string };
type ChatMessage = { role: "user" | "assistant"; content: string };

const tourStops: TourStop[] = [
  { id: "home", title: "Welcome", message: "Welcome to Vinay's portfolio! I'm Byte, your guide. I'll show you the work, tools, and experience behind the projects." },
  { id: "about", title: "About Vinay", message: "Vinay is an AI/ML developer focused on turning Generative AI, NLP, and machine learning into useful products." },
  { id: "skills", title: "Technical skills", message: "Explore the technical toolkit: Python, RAG and LangChain, FastAPI, PyTorch, React, APIs, SQL, and MCP." },
  { id: "projects", title: "Featured projects", message: "This is where the work comes to life: medical AI research, CareerAI, SonicLens, and an automated news briefing bot." },
  { id: "experience", title: "Experience & education", message: "Review Vinay's AIML internship, earlier technical training, and BE in Artificial Intelligence and Machine Learning." },
  { id: "contact", title: "Get in touch", message: "Interested in collaborating or discussing an AI/ML role? Use the contact links to reach Vinay." },
];

const suggestions = ["Tell me about the ASD research project", "What are Vinay's strongest technical skills?", "Explain the SonicLens project", "What roles is Vinay interested in?"];

function localAnswer(question: string) {
  const q = question.toLowerCase();
  if (/asd|autis|fMRI|brain|medical/.test(q)) return "Vinay's sponsored research project explores hybrid deep learning for Autism Spectrum Disorder detection using ABIDE-I resting-state fMRI. The pipeline builds functional-connectivity representations and combines Sparse Stacked Autoencoders (SSAE) with a METAFormer model. The portfolio describes it as a research and decision-support workflow, not a standalone clinical diagnosis.";
  if (/sonic|audio|book|voice|speech/.test(q)) return "SonicLens is a multi-voice audiobook project. It uses Gemini to structure manuscript chunks, identify speakers and emotions, then feeds those scene cues into a multi-voice text-to-speech pipeline with a FastAPI and React application.";
  if (/career|recruit|resume|job|interview/.test(q)) return "CareerAI is a RAG-based recruitment platform concept with resume intelligence, adaptive interview paths, dynamic response scoring, and recruiter analytics.";
  if (/skill|technology|stack|python|react|fastapi|langchain/.test(q)) return "The portfolio highlights Python, LangChain/RAG, FastAPI, PyTorch and machine learning, JavaScript/React, REST APIs, SQL/databases, Git/GitHub, and Model Context Protocol.";
  if (/experience|intern|education|college|degree/.test(q)) return "The portfolio lists an AIML internship at Thynk Tech India (Nov 2025–Apr 2026), earlier training at Vikramaa Technologies, a BE in AI & ML at ISBM College of Engineering (2023–2026), and a computer science diploma from Government Polytechnic, Solapur (2020–2023).";
  if (/contact|email|linkedin|github|hire|available/.test(q)) return "Vinay is open to AI/ML opportunities, product teams, and research collaborations. Use the LinkedIn, GitHub, and email links in the Contact section to connect.";
  return "I can help you explore Vinay's AI/ML work, technical skills, ASD research, CareerAI, SonicLens, experience, education, and contact details. Try one of the suggested questions, or open the matching portfolio section.";
}

function Mascot() {
  return (
    <div className="companion-mascot" role="img" aria-label="Byte, a friendly robot developer mascot">
      <span className="companion-mascot-glow" />
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60 10v12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="60" cy="8" r="5" fill="#72e6dc" />
        <rect x="20" y="26" width="80" height="68" rx="24" fill="#142b3b" stroke="#72e6dc" strokeWidth="3" />
        <path d="M20 48H12v22h8M100 48h8v22h-8" fill="#1b3c4c" stroke="#72e6dc" strokeWidth="3" strokeLinejoin="round" />
        <rect x="30" y="38" width="60" height="42" rx="15" fill="#071722" />
        <ellipse cx="45" cy="57" rx="6" ry="8" fill="#72e6dc" />
        <ellipse cx="75" cy="57" rx="6" ry="8" fill="#72e6dc" />
        <path d="M47 69q13 10 26 0" fill="none" stroke="#72e6dc" strokeWidth="3" strokeLinecap="round" />
        <path d="M38 94v8m44-8v8" stroke="#72e6dc" strokeWidth="5" strokeLinecap="round" />
        <rect x="38" y="99" width="44" height="12" rx="6" fill="#1b3c4c" stroke="#72e6dc" strokeWidth="2" />
        <path d="M44 31l-7-7m39 7 7-7" stroke="#a5a4ff" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className="companion-spark companion-spark-one">✦</span>
      <span className="companion-spark companion-spark-two">+</span>
    </div>
  );
}

export function PortfolioCompanion() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"tour" | "ask">("tour");
  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hey! I'm Byte. Ask me about Vinay's projects, skills, or experience—or let me guide you around." },
  ]);
  const [sending, setSending] = useState(false);

  const currentStop = tourStops[step]!;
  const goToStop = (nextStep: number) => {
    const bounded = Math.max(0, Math.min(tourStops.length - 1, nextStep));
    setStep(bounded);
    document.getElementById(tourStops[bounded]!.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const sendQuestion = async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed || sending) return;
    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setQuestion("");
    setSending(true);
    try {
      const response = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      if (!response.ok) throw new Error("AI service unavailable");
      const data = await response.json() as { answer?: string };
      if (!data.answer) throw new Error("Empty AI response");
      setMessages((current) => [...current, { role: "assistant", content: data.answer! }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: localAnswer(trimmed) + " (Quick portfolio answer; live AI chat is not configured yet.)" }]);
    } finally {
      setSending(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendQuestion(question);
  };

  return (
    <>
      {open && (
        <aside className="companion-panel" aria-label="Portfolio guide">
          <div className="companion-header">
            <div className="flex min-w-0 items-center gap-3">
              <div className="companion-avatar-small"><Mascot /></div>
              <div className="min-w-0"><p className="font-display text-sm font-semibold">Byte <span className="companion-online-dot" /></p><p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Vinay's portfolio guide</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="companion-icon-button" aria-label="Close portfolio guide"><X className="size-4" /></button>
          </div>
          <div className="companion-tabs" role="tablist" aria-label="Companion mode">
            <button type="button" role="tab" aria-selected={mode === "tour"} className={mode === "tour" ? "is-active" : ""} onClick={() => setMode("tour")}><Sparkles className="size-3.5" /> Guided tour</button>
            <button type="button" role="tab" aria-selected={mode === "ask"} className={mode === "ask" ? "is-active" : ""} onClick={() => setMode("ask")}><MessageCircle className="size-3.5" /> Ask me</button>
          </div>
          {mode === "tour" ? (
            <div className="companion-tour">
              <div className="companion-speech"><Mascot /><div><p className="font-mono text-[9px] uppercase tracking-wider text-primary">Step {step + 1} of {tourStops.length} · {currentStop.title}</p><p className="mt-2 text-sm leading-6 text-foreground/90">{currentStop.message}</p></div></div>
              <div className="companion-progress" aria-label={`Tour step ${step + 1} of ${tourStops.length}`}>{tourStops.map((stop, index) => <button key={stop.id} type="button" aria-label={`Go to ${stop.title}`} onClick={() => goToStop(index)} className={index <= step ? "is-complete" : ""} />)}</div>
              <div className="flex items-center justify-between gap-2"><button type="button" className="companion-secondary" disabled={step === 0} onClick={() => goToStop(step - 1)}><ChevronLeft className="size-4" /> Back</button><button type="button" className="companion-primary" onClick={() => goToStop(step === tourStops.length - 1 ? 0 : step + 1)}>{step === tourStops.length - 1 ? "Restart tour" : "Next section"} <ChevronRight className="size-4" /></button></div>
              <button type="button" className="companion-text-link" onClick={() => setMode("ask")}>Have a question? Ask Byte <ArrowRight className="size-3" /></button>
            </div>
          ) : (
            <div className="companion-chat">
              <div className="companion-messages" aria-live="polite">
                {messages.map((message, index) => <div key={index} className={`companion-message ${message.role === "user" ? "from-user" : "from-bot"}`}>{message.content}</div>)}
                {sending && <div className="companion-message from-bot companion-typing">Byte is thinking…</div>}
              </div>
              <div className="companion-suggestions">{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => void sendQuestion(suggestion)} disabled={sending}>{suggestion}</button>)}</div>
              <form className="companion-input-row" onSubmit={submit}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about a project or skill…" aria-label="Ask Byte a question" maxLength={500} /><button type="submit" disabled={!question.trim() || sending} aria-label="Send question"><Send className="size-4" /></button></form>
              <p className="companion-disclaimer">Answers are grounded in the portfolio content. Avoid sharing personal information.</p>
            </div>
          )}
        </aside>
      )}
      <button type="button" className="companion-launcher" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Close Byte portfolio guide" : "Open Byte portfolio guide"}>
        {open ? <X className="size-5" /> : <><Mascot /><span className="companion-launcher-label">Meet Byte <span>Portfolio guide</span></span><span className="companion-launcher-arrow"><ArrowRight className="size-4" /></span></>}
      </button>
    </>
  );
}
