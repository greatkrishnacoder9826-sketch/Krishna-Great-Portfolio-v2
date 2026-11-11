// Details below were read from the project's GitHub repository (code, README, notebook). Edit only with verified facts.
export default {
  "id": "karwahi",
  "name": "KARWAHI",
  "category": [
    "generative-ai",
    "web-dev"
  ],
  "status": "featured",
  "summary": "A personal AI companion web app with Hinglish chat, voice mode and user-controlled memory, built with a Node.js/Express backend and Supabase.",
  "description": "KARWAHI is a personal AI companion project focused on a more natural, personal conversational experience. A browser frontend talks to an Express API that calls an LLM through Groq, stores conversations, memories and notes about people in Supabase, and supports voice input and output. Features listed here come from the repository code; the live deployment may differ.",
  "problem": "Most chatbots stop at question-answering. This project explores how an AI can become a more personalised, ongoing conversational companion while staying honest about being an AI.",
  "objectives": [
    "Build a more personal AI conversational experience",
    "Improve backend and database integration",
    "Explore AI-powered application development",
    "Develop and deploy a complete full-stack AI project",
    "Keep improving usability, reliability and personalisation"
  ],
  "technologies": [
    "HTML, CSS, JavaScript (frontend)",
    "Node.js",
    "Express.js",
    "Supabase (Auth + Postgres, Row Level Security)",
    "Groq API (chat model)",
    "ElevenLabs (speech-to-text and text-to-speech)",
    "helmet, cors, express-rate-limit",
    "Node.js built-in test runner",
    "Cloudflare Pages (frontend)",
    "Render (backend)"
  ],
  "architecture": [
    "The browser frontend signs users in with Supabase Auth (email and password).",
    "The frontend calls the Express API with the user’s access token.",
    "Auth middleware verifies the token with Supabase; the user id comes from the verified token, never from the request body.",
    "The chat route first checks for explicit memory commands (remember / forget / list) and runs them on the backend.",
    "Otherwise it builds a prompt from the system personality, recent conversation history, relevant saved memories and people notes, then asks the Groq model for a reply.",
    "Voice routes transcribe recorded audio and synthesise spoken replies through ElevenLabs, with per-user usage tracking.",
    "Conversations, memories, people and events are stored in Supabase Postgres tables protected by Row Level Security.",
    "The frontend is deployed on Cloudflare Pages and the backend on Render."
  ],
  "features": [
    "Email and password sign-up and sign-in through Supabase Auth",
    "AI chat powered by a Groq-hosted model, with Hinglish as the default style",
    "Persona rules that keep the AI honest: it never claims to be human and does not invent facts about the user",
    "Voice mode: speech-to-text and text-to-speech through ElevenLabs",
    "User-controlled memories: add, edit, delete, plus text commands such as “remember: …”",
    "People and relationship notes with events, used as context only when relevant",
    "Export endpoint for the user’s data",
    "Security basics: helmet, CORS origin restriction, request size limit, rate limiting (60 requests per minute on /api) and Row Level Security",
    "Central error handler that hides provider details",
    "32 automated test cases across 4 test files (API, commands, relationships, voice)"
  ],
  "challenges": [],
  "results": [
    "Frontend and backend are deployed (Cloudflare Pages and Render, as described in the project README).",
    "The repository contains 32 automated test cases in 4 test files."
  ],
  "links": {
    "repo": "https://github.com/greatkrishnacoder9826-sketch/KARWAHI",
    "demo": "https://karwahi.pages.dev/",
    "docs": "",
    "related": []
  }
}
