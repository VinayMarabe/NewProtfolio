# Vinay Marabe — Portfolio

A React + TypeScript portfolio built with TanStack Start and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

## Portfolio companion (Byte)

The floating companion includes two modes:

- **Guided tour:** navigates visitors through Home, About, Skills, Projects, Experience, and Contact.
- **Ask Byte:** answers portfolio questions using a server-side Gemini endpoint. If Gemini is not configured or unavailable, the UI falls back to curated local portfolio answers.

To enable live AI answers, copy `.env.example` to `.env` and set:

```env
GEMINI_API_KEY=your_server_side_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Never prefix the key with `VITE_` or expose it in client-side code. Configure the same variables as encrypted secrets in your hosting provider for production. The chat endpoint is `POST /api/portfolio-chat`.

## Custom avatar asset

The current mascot is a lightweight SVG placeholder so the tour and chat can be integrated independently of the avatar artwork. To replace it with the animated avatar runtime from [Bible Strong Avatar Lab](https://github.com/smontlouis/bible-strong-avatar-lab), export the mascot definition as a `.avatar.json` file and add it to the app. The runtime package and avatar definition are intentionally not bundled until that export is available.

## Production notes

- Run `npm run lint` and `npm run build` before deployment.
- Add server-side rate limiting and usage controls to the chat endpoint before exposing a paid Gemini key publicly.
- Keep the avatar runtime's license and attribution notices when adding it.
