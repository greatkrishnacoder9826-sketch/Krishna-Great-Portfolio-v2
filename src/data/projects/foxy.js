// Details below were read from the project's GitHub repository (code, README, notebook). Edit only with verified facts.
export default {
  "id": "foxy",
  "name": "FOXY (English Coach)",
  "category": [
    "generative-ai",
    "python-apps",
    "web-dev"
  ],
  "status": "standard",
  "summary": "A voice-based English speaking coach: speak a sentence, get it corrected with a simple Hinglish explanation, and hear the correction spoken back.",
  "description": "FOXY (the repository’s README calls it English Coach) is a small web app for a Hindi-speaking English learner. The learner records a sentence in the browser; the backend transcribes it, asks an LLM to correct it and explain the mistake in simple Hinglish, and speaks the result back. It is protected by an access code so it can be shared only with trusted people.",
  "problem": "Give a Hindi-speaking learner a low-friction way to practise spoken English and get instant correction and feedback.",
  "objectives": [
    "Let a learner speak a sentence and receive a corrected version",
    "Explain mistakes in simple Hinglish and ask a follow-up question to keep the conversation going",
    "Keep the app usable on free tiers of the speech and voice services"
  ],
  "technologies": [
    "Python",
    "FastAPI and Uvicorn",
    "Groq (Whisper large-v3-turbo for speech-to-text, a chat model for corrections)",
    "ElevenLabs (text-to-speech)",
    "edge-tts (free fallback voice)",
    "HTML and JavaScript frontend (single page)",
    "Render (render.yaml blueprint)"
  ],
  "architecture": [
    "The browser records microphone audio as 16 kHz WAV.",
    "The frontend sends it to POST /api/practice with an access code header.",
    "The backend checks the access code, file size (max 3 MB), minimum length and the daily speech-to-text limit.",
    "Groq Whisper transcribes the audio.",
    "A Groq chat model returns JSON with the corrected sentence, a short Hinglish explanation and a follow-up question.",
    "The corrected sentence is converted to speech with ElevenLabs, falling back to edge-tts and then the browser’s built-in voice.",
    "The frontend shows the transcript, the correction view, the explanation and plays the audio."
  ],
  "features": [
    "Speak a sentence and get a corrected version",
    "Mistake explanation in simple Hinglish",
    "Follow-up question to continue the conversation",
    "Access-code protection with constant-time comparison",
    "Upload size, minimum duration and daily speech-to-text usage limits",
    "Three-level voice fallback (ElevenLabs, edge-tts, browser voice)",
    "Health-check endpoint and one-click Render blueprint"
  ],
  "challenges": [
    {
      "challenge": "Free-tier limits on speech and voice services.",
      "solution": "A best-effort daily speech-to-text counter returns a friendly limit message, only the corrected sentence is spoken to save credits, and text-to-speech falls back from ElevenLabs to edge-tts to the browser voice."
    }
  ],
  "results": [],
  "links": {
    "repo": "https://github.com/greatkrishnacoder9826-sketch/FOXY",
    "demo": "",
    "docs": "",
    "related": []
  }
}
