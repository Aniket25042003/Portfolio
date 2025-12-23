# Portfolio Voice Agent Backend

This is the backend server for the AI Voice Agent feature on Aniket Patel's portfolio website.

## Tech Stack

- **Express.js** - Web server
- **Groq API** - LLM for generating conversational responses (LLaMA 3.3 70B)
- **ElevenLabs API** - Text-to-Speech with custom voice
- **Web Speech API** - Browser-native Speech-to-Text (frontend)

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (Vercel)                           │
│  ┌──────────────┐  ┌─────────────────┐  ┌──────────────────┐   │
│  │ Voice Agent  │  │ Web Speech API  │  │  Audio Playback  │   │
│  │  Component   │──│ (Speech-to-Text)│  │  (TTS Response)  │   │
│  └──────────────┘  └─────────────────┘  └──────────────────┘   │
│          │                                       ▲              │
└──────────┼───────────────────────────────────────┼──────────────┘
           │                                       │
           ▼                                       │
┌─────────────────────────────────────────────────────────────────┐
│                     Backend (Railway)                           │
│  ┌────────────────────┐      ┌──────────────────────────────┐  │
│  │  /api/voice/chat   │──────│  Groq API (LLaMA 3.3 70B)   │  │
│  │  (LLM Endpoint)    │      │  Generates AI responses      │  │
│  └────────────────────┘      └──────────────────────────────┘  │
│  ┌────────────────────┐      ┌──────────────────────────────┐  │
│  │  /api/voice/tts    │──────│  ElevenLabs API              │  │
│  │  (TTS Endpoint)    │      │  Text-to-Speech (Your Voice) │  │
│  └────────────────────┘      └──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend folder with the following variables:

```env
# Groq API Key (get from https://console.groq.com)
GROQ_API_KEY=your_groq_api_key_here

# ElevenLabs API Key (get from https://elevenlabs.io)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# ElevenLabs Voice ID (Aniket Patel's cloned voice)
ELEVENLABS_VOICE_ID=KvIKE6JRtC73GKYsPXPl

# Frontend URL (for CORS - your Vercel deployment URL)
FRONTEND_URL=https://your-portfolio-domain.vercel.app

# Port (Railway will provide this automatically)
PORT=3001
```

### 3. Run Locally

```bash
npm run dev
```

The server will start at `http://localhost:3001`

### 4. Frontend Environment Variable

In your Vercel project settings, add:

```env
VITE_VOICE_BACKEND_URL=https://your-railway-app.railway.app
```

Or for local development, the frontend defaults to `http://localhost:3001`.

## API Endpoints

### Health Check
```
GET /api/health
```

### Chat (Groq LLM)
```
POST /api/voice/chat
Content-Type: application/json

{
  "message": "Tell me about your projects",
  "conversationHistory": [] // Optional: previous messages for context
}
```

### Text-to-Speech (ElevenLabs)
```
POST /api/voice/tts
Content-Type: application/json

{
  "text": "Hello, I'm Aniket Patel!"
}
```

Returns base64 encoded audio.

### Text-to-Speech Stream
```
POST /api/voice/tts/stream
Content-Type: application/json

{
  "text": "Hello, I'm Aniket Patel!"
}
```

Returns audio/mpeg stream directly.

## Deployment

### Backend on Railway

1. Create a new project on [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Add all environment variables in Railway's dashboard:
   - `GROQ_API_KEY`
   - `ELEVENLABS_API_KEY`
   - `ELEVENLABS_VOICE_ID`
   - `FRONTEND_URL` (your Vercel URL)
5. Deploy!

Railway will automatically detect the Node.js app and run `npm start`.

### Frontend on Vercel

1. In your Vercel project settings, go to Environment Variables
2. Add: `VITE_VOICE_BACKEND_URL` = `https://your-app.railway.app`
3. Redeploy

## Features

### Rate Limiting
- **Server-side**: 30 requests per minute per IP address
- **Client-side**: 2 minutes max session per user
- **Warning**: At 1:45, the agent says goodbye and suggests contact form/resume

### Session Management
- Conversation history maintained for context (last 10 messages)
- Automatic cleanup on session end
- Visual timer showing remaining time

### Browser Compatibility
- Works best in **Chrome** and **Edge** (Web Speech API support)
- Safari: Limited support
- Firefox: Requires enabling in flags

## Security Notes

- API keys are never exposed to the client
- All sensitive operations happen server-side
- CORS is configured to only allow requests from your frontend URL
- Rate limiting prevents abuse
- Voice ID is server-side only
