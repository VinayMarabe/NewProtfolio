import { createFileRoute } from "@tanstack/react-router";

const portfolioContext = `You are Byte, the friendly mascot guide for Vinay Marabe's developer portfolio. Answer accurately and concisely using only this portfolio context. If information is not present, say so rather than inventing it. Do not claim to be Vinay.

PROFILE
Vinay Marabe is an AI/ML developer focused on Generative AI, NLP, machine learning, and full-stack AI products. Portfolio location: Pune, India. Open to AI/ML opportunities, product teams, and research collaborations.

SKILLS
Python, LangChain/RAG, FastAPI, PyTorch/machine learning, JavaScript/React, Java, REST APIs, SQL/databases, Git/GitHub, Model Context Protocol.

PROJECTS
1. Hybrid Deep Learning Model for ASD Detection: sponsored research project using ABIDE-I resting-state fMRI, functional-connectivity representations, Sparse Stacked Autoencoders (SSAE), and METAFormer. It is a research/decision-support workflow, not a standalone clinical diagnostic.
2. CareerAI Platform: RAG-based recruitment platform with resume intelligence, adaptive interviews, dynamic scoring, and recruiter analytics.
3. SonicLens v1: multi-voice audiobook pipeline using Gemini for manuscript chunking, speaker/emotion identification, then multi-voice TTS with FastAPI and React.
4. News Summarizer WhatsApp Bot: GNews headlines, Gemini summaries through LangChain, and Twilio WhatsApp delivery.

EXPERIENCE & EDUCATION
AIML Intern at Thynk Tech India (Nov 2025–Apr 2026); Trainee at Vikramaa Technologies (Jul–Aug 2022). BE Artificial Intelligence & Machine Learning, ISBM College of Engineering (2023–2026); Diploma in Computer Science Engineering, Government Polytechnic Solapur (2020–2023).

CONTACT
LinkedIn: https://www.linkedin.com/in/vinay-marabe/
GitHub: https://github.com/VinayMarabe
Email: vinaymarbe40@gmail.com
`;

export const Route = createFileRoute("/api/portfolio-chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as { message?: unknown };
          const message = typeof body.message === "string" ? body.message.trim() : "";
          if (!message || message.length > 500) {
            return Response.json({ error: "Please send a message up to 500 characters." }, { status: 400 });
          }
          const apiKey = process.env.GEMINI_API_KEY;
          if (!apiKey) {
            return Response.json({ error: "AI chat is not configured." }, { status: 503 });
          }
          const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
          const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              system_instruction: { parts: [{ text: portfolioContext }] },
              contents: [{ role: "user", parts: [{ text: message }] }],
              generationConfig: { temperature: 0.35, maxOutputTokens: 350 },
            }),
            signal: AbortSignal.timeout(20000),
          });
          if (!upstream.ok) {
            console.error("Gemini portfolio chat returned", upstream.status);
            return Response.json({ error: "The AI assistant is temporarily unavailable." }, { status: 502 });
          }
          const result = await upstream.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
          const answer = result.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
          if (!answer) return Response.json({ error: "The AI assistant returned an empty response." }, { status: 502 });
          return Response.json({ answer });
        } catch (error) {
          console.error("Portfolio chat request failed", error);
          return Response.json({ error: "Unable to process the question right now." }, { status: 500 });
        }
      },
    },
  },
});
