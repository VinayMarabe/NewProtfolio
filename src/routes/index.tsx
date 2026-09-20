import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowDown, ArrowRight, BrainCircuit, BriefcaseBusiness, ChevronRight,
  Code2, Database, ExternalLink, FileImage, FileText, Github, GraduationCap,
  Linkedin, Mail, MapPin, Network, ServerCog, Sparkles, X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import resumeAsset from "@/assets/vinay-marabe-resume.pdf.asset.json";
import sponsorshipAsset from "@/assets/vinay-asd-sponsorship-letter.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vinay Marabe — AI/ML & Generative AI Engineer" },
      { name: "description", content: "Vinay Marabe builds production-minded AI systems with Generative AI, RAG, NLP, machine learning, and full-stack engineering." },
      { property: "og:title", content: "Vinay Marabe — AI/ML & Generative AI Engineer" },
      { property: "og:description", content: "AI systems engineered from model to product — RAG, medical AI, NLP, and full-stack applications." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

const roles = ["AI/ML Engineer", "Generative AI Developer", "RAG & LLM Specialist"];

const navItems = [
  ["Home", "home"], ["About", "about"], ["Skills", "skills"],
  ["Projects", "projects"], ["Experience", "experience"], ["Contact", "contact"],
] as const;

const capabilities = [
  { icon: BrainCircuit, title: "AI/ML Engineering", copy: "Models built around measurable, real-world outcomes." },
  { icon: Sparkles, title: "Generative AI & RAG", copy: "Grounded LLM workflows with useful context and control." },
  { icon: ServerCog, title: "Backend & APIs", copy: "Reliable Python services that put intelligence into motion." },
  { icon: Code2, title: "Full-Stack Systems", copy: "Complete, user-focused products from interface to inference." },
];

type SkillTone = "cyan" | "emerald" | "teal" | "violet" | "blue" | "amber" | "orange" | "sky" | "white" | "purple";

const skills: { name: string; level: number; tone: SkillTone; copy: string }[] = [
  { name: "Python", level: 88, tone: "cyan", copy: "ML pipelines, data processing, automation, and backend logic." },
  { name: "LangChain / RAG", level: 85, tone: "emerald", copy: "Retrieval workflows, agents, prompt orchestration, and grounding." },
  { name: "FastAPI", level: 82, tone: "teal", copy: "Fast, typed APIs for model serving and intelligent products." },
  { name: "PyTorch / ML", level: 80, tone: "violet", copy: "Deep learning experiments, training, and model development." },
  { name: "JavaScript / React", level: 85, tone: "blue", copy: "Responsive interfaces for complete AI-powered experiences." },
  { name: "Java", level: 75, tone: "amber", copy: "Object-oriented application design and backend foundations." },
  { name: "REST APIs", level: 90, tone: "orange", copy: "Clear service contracts and dependable system integration." },
  { name: "SQL & Databases", level: 80, tone: "sky", copy: "Structured data modeling, queries, and application persistence." },
  { name: "Git & GitHub", level: 88, tone: "white", copy: "Version control, collaboration, and disciplined delivery." },
  { name: "Model Context Protocol", level: 85, tone: "purple", copy: "Building interoperable tools and context-aware AI integrations." },
];

const skillToneClasses: Record<SkillTone, string> = {
  cyan: "text-skill-cyan", emerald: "text-skill-emerald", teal: "text-skill-teal",
  violet: "text-skill-violet", blue: "text-skill-blue", amber: "text-skill-amber",
  orange: "text-skill-orange", sky: "text-skill-sky", white: "text-skill-white",
  purple: "text-skill-purple",
};

type Project = {
  number: string;
  category: string;
  title: string;
  summary: string;
  problem: string;
  architecture: string;
  impact: string;
  tech: string[];
  github: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    number: "01", category: "Sponsored · Medical AI", title: "Hybrid Deep Learning Model for ASD Detection",
    summary: "Clinical decision-support pipeline for Autism Spectrum Disorder detection from resting-state fMRI data, sponsored by Mass IT Solutions LLP.",
    problem: "ASD diagnosis can depend on lengthy, subjective assessment. This project investigates objective neuroimaging signals that can support earlier, more consistent clinical review.",
    architecture: "ABIDE-I resting-state fMRI is transformed into functional-connectivity representations, learned through Sparse Stacked Autoencoders and modeled with a METAFormer architecture behind a FastAPI service.",
    impact: "Creates an explainable research workflow that connects neuroimaging preparation, hybrid deep learning, and clinician-oriented decision support.",
    tech: ["ABIDE-I", "SSAE", "METAFormer", "FastAPI"],
    github: "https://github.com/VinayMarabe/Autism-Spectrum-Disorder-ASD-detection-systems", featured: true,
  },
  {
    number: "02", category: "Recruitment · GenAI", title: "CareerAI Platform",
    summary: "RAG-based recruitment platform with resume intelligence, adaptive interviews, dynamic scoring, and recruiter analytics.",
    problem: "Traditional screening and interview preparation are fragmented, repetitive, and rarely adapt to a candidate's actual experience.",
    architecture: "A RAG pipeline grounds LLM analysis in resume content, generates adaptive interview paths, scores responses dynamically, and feeds recruiter-facing analytics.",
    impact: "Unifies candidate preparation and recruiter insight in one AI-assisted workflow while keeping recommendations grounded in source material.",
    tech: ["RAG", "LLMs", "LangChain", "Analytics"],
    github: "https://github.com/VinayMarabe/CareerAI",
  },
  {
    number: "03", category: "Generative Audio", title: "SonicLens v1",
    summary: "AI audiobook system using LLM chunking for speaker and emotion detection before expressive, multi-voice generation.",
    problem: "Flat text-to-speech loses dialogue structure, speaker identity, and emotional context in long-form stories.",
    architecture: "Gemini analyzes and chunks the manuscript, identifies speakers and emotions, and passes structured scenes to a multi-voice TTS pipeline served through FastAPI and React.",
    impact: "Turns unstructured text into more expressive, listenable audio with far less manual direction and editing.",
    tech: ["Gemini API", "TTS", "FastAPI", "React"],
    github: "https://github.com/VinayMarabe/SonicLens",
  },
  {
    number: "04", category: "Automation · NLP", title: "News Summarizer WhatsApp Bot",
    summary: "Automated news workflow that curates headlines, creates concise summaries, and sends daily briefings through WhatsApp.",
    problem: "Following multiple news sources every day takes time and leaves readers sorting through repetitive or low-value stories.",
    architecture: "GNews supplies current headlines, Gemini summarizes selected articles through LangChain, and Twilio dispatches the final digest to WhatsApp.",
    impact: "Delivers a consistent, concise briefing automatically and demonstrates a practical event-to-message NLP pipeline.",
    tech: ["GNews", "Gemini", "LangChain", "Twilio"],
    github: "https://github.com/VinayMarabe/news_summarizer",
  },
];

const certifications = [
  { issuer: "Anthropic", title: "Introduction to Model Context Protocol", detail: "Issued Mar 2026 · ID: 8hmdbzauwan4", topic: "Model Context Protocol" },
  { issuer: "Google", title: "Google AI Essentials", detail: "Issued Mar 2026 · ID: 8OQBN67F98UO", topic: "Applied AI" },
  { issuer: "Microsoft & LinkedIn", title: "Career Essentials in Generative AI", detail: "Professional certificate", topic: "Generative AI" },
  { issuer: "FAST OFFER", title: "Japanese Language", detail: "Beginner certified", topic: "日本語" },
];

function Portfolio() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [letterOpen, setLetterOpen] = useState(false);

  useEffect(() => {
    const target = roles[roleIndex] ?? "AI/ML Engineer";
    const complete = typed === target;
    const empty = typed.length === 0;
    const delay = complete && !deleting ? 1500 : deleting ? 35 : 75;
    const timer = window.setTimeout(() => {
      if (complete && !deleting) setDeleting(true);
      else if (empty && deleting) {
        setDeleting(false);
        setRoleIndex((current) => (current + 1) % roles.length);
      } else setTyped(target.slice(0, typed.length + (deleting ? -1 : 1)));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [typed, deleting, roleIndex]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.1 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeProject && !letterOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") letterOpen ? setLetterOpen(false) : setActiveProject(null);
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [activeProject, letterOpen]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground selection:bg-primary/25">
      <ParticleField />
      <div className="ambient-mesh" aria-hidden="true" />

      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-4 sm:px-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#home" className="glass-panel grid size-11 place-items-center rounded-full border border-primary/35 font-mono text-xs font-bold text-primary" aria-label="Vinay Marabe home">VM</a>
          <nav className="glass-panel max-w-[calc(100vw-5rem)] overflow-x-auto rounded-full border border-border/70 p-1.5" aria-label="Primary navigation">
            <div className="flex min-w-max items-center">
              {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className="rounded-full px-3 py-2 font-mono text-[10px] text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground sm:px-4 sm:text-[11px]">{label}</a>)}
            </div>
          </nav>
          <span className="glass-panel hidden items-center gap-2 rounded-full border border-border/70 px-4 py-3 font-mono text-[9px] uppercase text-muted-foreground lg:flex"><span className="size-1.5 animate-pulse rounded-full bg-success" />Initializing System</span>
        </div>
      </header>

      <main className="relative z-10">
        <section id="home" className="relative flex min-h-[94svh] scroll-mt-24 items-center overflow-hidden pt-28">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pb-20 pt-12 lg:grid-cols-[1fr_360px] lg:px-10">
            <div className="animate-fade-in">
              <div className="glass-panel inline-flex items-center gap-2 rounded-full border border-success/30 px-3 py-2 font-mono text-[10px] uppercase text-success"><span className="size-1.5 animate-pulse rounded-full bg-success" />Available for new opportunities</div>
              <p className="mt-8 font-mono text-sm text-primary">Hi, I&apos;m Vinay Marabe.</p>
              <h1 className="mt-4 max-w-4xl font-display text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">I build intelligent<br /><span className="text-primary">AI systems.</span></h1>
              <div className="mt-6 flex min-h-9 items-center font-mono text-base text-muted-foreground sm:text-xl"><span className="mr-3 text-primary">&gt;</span>{typed}<span className="ml-1 h-6 w-px animate-pulse bg-primary" /></div>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">AI/ML developer turning Generative AI, NLP, and machine learning into scalable products that solve practical problems.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="sm"><a href="#projects">View Projects <ArrowRight className="size-4" /></a></Button>
                <Button asChild size="sm" variant="outline"><a href={resumeAsset.url} download="Vinay-Marabe-Resume.pdf"><FileText className="size-4" />View Resume</a></Button>
                <Button asChild size="sm" variant="ghost"><a href="#contact">Contact <Mail className="size-4" /></a></Button>
              </div>
            </div>
            <div className="relative mx-auto hidden aspect-square w-full max-w-80 place-items-center lg:grid" aria-hidden="true">
              <div className="absolute inset-0 rotate-45 border border-primary/15" />
              <div className="absolute inset-10 rotate-45 border border-border" />
              <div className="monogram-ring glass-panel grid size-48 place-items-center rounded-full border border-primary/40 shadow-[0_0_80px_var(--glow-primary)]"><span className="font-display text-6xl font-semibold text-primary">VM</span></div>
              <span className="absolute left-3 top-1/2 font-mono text-[9px] uppercase text-muted-foreground">AI / ML</span>
              <span className="absolute right-0 top-1/2 font-mono text-[9px] uppercase text-muted-foreground">Pune, IN</span>
            </div>
            <a href="#about" className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[9px] uppercase text-muted-foreground transition-colors hover:text-primary">Scroll<ArrowDown className="size-4 animate-bounce" /></a>
          </div>
        </section>

        <section id="about" className="scroll-mt-24 border-y border-border/70 bg-surface/80 py-24 backdrop-blur-sm lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10" data-reveal>
            <SectionTitle index="01" eyebrow="About Me" title="Engineering intelligence into useful products." />
            <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <p className="max-w-xl text-lg leading-8 text-muted-foreground">Detail-oriented AI/ML developer with hands-on experience in Generative AI, NLP, and complete AI systems. I design user-centric applications with RAG pipelines, LLM APIs, and machine learning models—from clinical research to recruitment and audio experiences.</p>
              <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {capabilities.map(({ icon: Icon, title, copy }) => <article key={title} className="group bg-background/95 p-6 transition-colors hover:bg-elevated"><Icon className="size-5 text-primary" /><h3 className="mt-6 font-display text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10" data-reveal>
            <SectionTitle index="02" eyebrow="Tech Arsenal" title="Tools chosen to build, connect, and ship." />
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {skills.map((skill, index) => <SkillGauge key={skill.name} {...skill} index={index} />)}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 border-y border-border/70 bg-surface/80 py-24 backdrop-blur-sm lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10" data-reveal>
            <SectionTitle index="03" eyebrow="Featured Projects" title="Applied AI, built end to end." />
            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {projects.map((project) => <button key={project.number} type="button" onClick={() => setActiveProject(project)} className="project-card group relative flex min-h-96 flex-col overflow-hidden rounded-lg border border-border bg-background/90 p-6 text-left sm:p-8" aria-label={`Open details for ${project.title}`}>
                {project.featured && <span className="absolute right-0 top-0 border-b border-l border-sponsor/40 bg-sponsor/10 px-3 py-2 font-mono text-[9px] uppercase text-sponsor">Sponsored</span>}
                <span className="font-mono text-xs text-primary">/{project.number}</span><p className="mt-12 font-mono text-[10px] uppercase text-muted-foreground">{project.category}</p>
                <h3 className="mt-3 max-w-lg font-display text-2xl font-semibold leading-tight sm:text-3xl">{project.title}</h3><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{project.summary}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-8">{project.tech.map((item) => <span key={item} className="rounded-full border border-border bg-surface px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground">{item}</span>)}</div>
                <span className="absolute bottom-7 right-7 flex items-center gap-2 font-mono text-[9px] uppercase text-muted-foreground transition-colors group-hover:text-primary">Explore <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" /></span>
              </button>)}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-border py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10" data-reveal>
            <p className="font-mono text-[10px] uppercase text-primary">Specialized AI Spotlight</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">From neural signals to explainable clinical inference.</h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">A structured pipeline transforms resting-state fMRI into clinically useful ASD predictions while preserving traceability across each stage.</p>
            <div className="mt-12 grid gap-3 lg:grid-cols-4">
              {[{ icon: Database, step: "01", title: "fMRI Input", copy: "ABIDE resting-state neuroimaging data" }, { icon: Network, step: "02", title: "Feature Extraction", copy: "Connectivity matrices and learned representations" }, { icon: BrainCircuit, step: "03", title: "Hybrid Model", copy: "SSAE and METAFormer architecture" }, { icon: Sparkles, step: "04", title: "Clinical Inference", copy: "Explainable decision-support output" }].map(({ icon: Icon, step, title, copy }, index) => <div key={title} className="glass-panel relative rounded-lg border border-border p-6"><div className="flex items-center justify-between"><Icon className="size-5 text-primary" /><span className="font-mono text-[10px] text-muted-foreground">{step}</span></div><h3 className="mt-8 font-display text-lg font-semibold">{title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{copy}</p>{index < 3 && <ChevronRight className="absolute -right-5 top-1/2 z-10 hidden size-6 text-primary lg:block" />}</div>)}
            </div>
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 border-b border-border bg-surface/80 py-24 backdrop-blur-sm lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10" data-reveal>
            <SectionTitle index="04" eyebrow="Experience & Education" title="Practical experience, strong foundations." />
            <div className="mt-12 grid gap-12 lg:grid-cols-2">
              <div><Subhead icon={BriefcaseBusiness} label="Professional Experience" /><div className="mt-7 border-l border-border pl-7"><Timeline period="Nov 2025 — Apr 2026" title="AIML Intern" place="Thynk Tech India" copy="Developed EdTech AI solutions, integrated ML models into product workflows, and prototyped Generative AI features." /><Timeline period="Jul 2022 — Aug 2022" title="Trainee" place="Vikramaa Technologies" copy="Completed industrial training in Java, backend development, object-oriented programming, and software architecture." last /></div></div>
              <div><Subhead icon={GraduationCap} label="Academic Background" /><div className="mt-7 border-l border-border pl-7"><Timeline period="2023 — 2026" title="B.E. Artificial Intelligence & Machine Learning" place="ISBM College of Engineering, Nande" copy="Bachelor’s degree focused on AI, machine learning, and applied software systems." /><Timeline period="2020 — 2023" title="Diploma in Computer Science Engineering" place="Government Polytechnic, Solapur" copy="Foundation in computer science, programming, databases, and software engineering." last /></div></div>
            </div>
          </div>
        </section>

        <section id="community" className="scroll-mt-24 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-5 lg:px-10" data-reveal>
            <SectionTitle index="05" eyebrow="Community & Certifications" title="Learning, sharing, and staying current." />
            <div className="mt-12 grid gap-4 lg:grid-cols-[0.7fr_1.3fr]">
              <article className="glass-panel rounded-lg border border-border p-7"><span className="font-mono text-[10px] uppercase text-primary">Community · 2025</span><h3 className="mt-5 font-display text-2xl font-semibold">Google Gemini Student Ambassador</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Campus ambassador at ISBM College of Engineering, supporting practical AI learning, student workshops, and developer community activities.</p></article>
              <div className="grid gap-3 sm:grid-cols-2">{certifications.map((cert) => <article key={cert.title} className="glass-panel group rounded-lg border border-border p-5 transition-colors hover:border-primary/60"><div className="flex items-start justify-between gap-4"><span className="font-mono text-[10px] uppercase text-primary">{cert.issuer}</span><span className="size-1.5 rounded-full bg-success" /></div><h3 className="mt-5 font-display text-lg font-semibold">{cert.title}</h3><p className="mt-3 text-xs text-muted-foreground">{cert.detail}</p><span className="mt-5 inline-block rounded-full border border-border px-2 py-1 font-mono text-[9px] uppercase text-muted-foreground">{cert.topic}</span></article>)}</div>
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 border-t border-border bg-surface/80 py-24 backdrop-blur-sm lg:py-32">
          <div className="mx-auto max-w-7xl px-5 text-center lg:px-10" data-reveal>
            <p className="font-mono text-[10px] uppercase text-primary">06 / Let&apos;s Connect</p><h2 className="mx-auto mt-5 max-w-3xl font-display text-4xl font-semibold sm:text-6xl">Have an AI problem worth solving?</h2><p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground">I&apos;m open to AI/ML opportunities, ambitious product teams, and research collaborations. Let&apos;s build something useful.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3"><SocialLink icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/vinay-marabe/" /><SocialLink icon={Github} label="GitHub" href="https://github.com/VinayMarabe" /><SocialLink icon={Mail} label="Email" href="mailto:vinaymarbe40@gmail.com" /></div>
            <div className="mt-12 flex items-center justify-center gap-2 font-mono text-[10px] uppercase text-muted-foreground"><MapPin className="size-3.5 text-primary" />Pune, India</div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border py-7"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 font-mono text-[10px] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-10"><p>© 2026 Vinay Marabe</p><p>Designed for useful intelligence.</p></div></footer>

      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} onLetter={() => setLetterOpen(true)} />}
      {letterOpen && <LetterViewer onClose={() => setLetterOpen(false)} />}
    </div>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(80, Math.floor(width / 18)) }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
        size: Math.random() * 1.3 + 0.35, alpha: Math.random() * 0.45 + 0.12,
      }));
    };
    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--particle-color").trim();
      particles.forEach((particle) => {
        particle.x = (particle.x + particle.vx + width) % width;
        particle.y = (particle.y + particle.vy + height) % height;
        context.globalAlpha = particle.alpha;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
      });
      context.globalAlpha = 1;
      if (!reduceMotion) frame = window.requestAnimationFrame(draw);
    };
    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}

function SkillGauge({ name, level, tone, copy, index }: { name: string; level: number; tone: SkillTone; copy: string; index: number }) {
  return <article className="skill-card group relative flex min-h-56 flex-col items-center justify-center rounded-lg border border-border bg-card/80 p-4 text-center backdrop-blur-md" style={{ animationDelay: `${index * 45}ms` }}>
    <div className={`skill-gauge relative size-24 ${skillToneClasses[tone]}`}>
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
        <circle cx="50" cy="50" r="41" pathLength="100" className="fill-none stroke-border" strokeWidth="7" />
        <circle cx="50" cy="50" r="41" pathLength="100" className="skill-progress fill-none stroke-current" strokeWidth="7" strokeLinecap="round" strokeDasharray="100" strokeDashoffset={100 - level} />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono text-sm font-bold text-foreground">{level}%</span>
    </div>
    <h3 className="mt-5 min-h-10 font-display text-sm font-semibold leading-5">{name}</h3>
    <div className="skill-tooltip pointer-events-none absolute inset-x-3 bottom-3 z-10 translate-y-2 rounded-md border border-border bg-popover px-3 py-2 text-left text-[10px] leading-4 text-popover-foreground opacity-0 shadow-xl transition-all group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">{copy}</div>
  </article>;
}

function ProjectModal({ project, onClose, onLetter }: { project: Project; onClose: () => void; onLetter: () => void }) {
  return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-overlay p-4 backdrop-blur-md" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className="modal-enter relative my-8 w-full max-w-3xl rounded-lg border border-border bg-popover p-6 shadow-2xl sm:p-8">
      <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4 rounded-full" aria-label="Close project details"><X className="size-5" /></Button>
      <div className="flex flex-wrap items-center gap-3 pr-12"><span className="font-mono text-[10px] uppercase text-primary">{project.category}</span>{project.featured && <span className="rounded-full border border-sponsor/50 bg-sponsor/10 px-3 py-1 font-mono text-[9px] font-bold uppercase text-sponsor shadow-[0_0_24px_var(--glow-sponsor)]">Sponsored</span>}</div>
      <h2 id="project-modal-title" className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-4xl">{project.title}</h2>
      <div className="mt-5 flex flex-wrap gap-2">{project.tech.map((item) => <span key={item} className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 font-mono text-[10px] text-primary">{item}</span>)}</div>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <DetailBlock label="Problem" copy={project.problem} />
        <DetailBlock label="Architecture" copy={project.architecture} />
        <DetailBlock label="Impact" copy={project.impact} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild><a href={project.github} target="_blank" rel="noreferrer"><Github className="size-4" />View Source Code</a></Button>
        {project.featured && <Button variant="sponsor" onClick={onLetter}><FileImage className="size-4" />View Sponsorship Letter</Button>}
      </div>
    </section>
  </div>;
}

function DetailBlock({ label, copy }: { label: string; copy: string }) {
  return <div className="border-t border-border pt-4"><p className="font-mono text-[9px] uppercase text-primary">{label}</p><p className="mt-3 text-xs leading-6 text-muted-foreground">{copy}</p></div>;
}

function LetterViewer({ onClose }: { onClose: () => void }) {
  return <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-overlay-strong p-3 backdrop-blur-md" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="letter-title" className="modal-enter relative my-5 w-full max-w-4xl rounded-lg border border-border bg-popover p-3 shadow-2xl sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3 px-1"><div><p className="font-mono text-[9px] uppercase text-sponsor">Verified document</p><h2 id="letter-title" className="mt-1 font-display text-lg font-semibold">Mass IT Solutions LLP — Sponsorship Letter</h2></div><Button variant="ghost" size="icon" onClick={onClose} className="shrink-0 rounded-full" aria-label="Close sponsorship letter"><X className="size-5" /></Button></div>
      <div className="max-h-[78vh] overflow-auto rounded-md bg-document p-2"><img src={sponsorshipAsset.url} alt="Mass IT Solutions LLP sponsorship letter for the Hybrid Deep Learning Model for Diagnosis of Autism Spectrum Disorder project" className="mx-auto h-auto w-full max-w-3xl" /></div>
      <div className="mt-3 flex justify-end"><Button asChild size="sm" variant="outline"><a href={sponsorshipAsset.url} target="_blank" rel="noreferrer">Open full size <ExternalLink className="size-4" /></a></Button></div>
    </section>
  </div>;
}

function SectionTitle({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return <div><p className="font-mono text-[10px] uppercase text-primary">{index} / {eyebrow}</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">{title}</h2></div>;
}

function Subhead({ icon: Icon, label }: { icon: ComponentType<{ className?: string }>; label: string }) {
  return <h3 className="flex items-center gap-3 font-mono text-xs uppercase text-foreground"><span className="grid size-9 place-items-center rounded-md border border-primary/40 bg-primary/10 text-primary"><Icon className="size-4" /></span>{label}</h3>;
}

function Timeline({ period, title, place, copy, last = false }: { period: string; title: string; place: string; copy: string; last?: boolean }) {
  return <article className={last ? "relative" : "relative pb-12"}><span className="absolute -left-[33px] top-1 size-3 border-2 border-surface bg-primary" /><p className="font-mono text-[10px] uppercase text-primary">{period}</p><h4 className="mt-3 font-display text-xl font-semibold">{title}</h4><p className="mt-1 text-sm font-medium text-foreground/75">{place}</p><p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground">{copy}</p></article>;
}

function SocialLink({ icon: Icon, label, href }: { icon: ComponentType<{ className?: string }>; label: string; href: string }) {
  return <Button asChild variant="outline"><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><Icon className="size-4" />{label}<ArrowRight className="size-3.5" /></a></Button>;
}