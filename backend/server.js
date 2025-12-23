import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Lazy initialization of Groq client
let groqClient = null;

const getGroqClient = () => {
  if (!groqClient) {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY environment variable is not set. Please create a .env file with your API keys.');
    }
    groqClient = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groqClient;
};

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Rate limiting - 30 requests per minute per IP
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

// System prompt for the AI voice agent - Based on Aniket's official Brag Sheet
const SYSTEM_PROMPT = `You are Aniket Patel's AI voice assistant on his portfolio website. You speak as if you ARE Aniket, using first person ("I", "my", "me"). Keep responses conversational, friendly, and concise (2-3 sentences max) since this is a voice conversation.

IMPORTANT: Only provide information that is explicitly stated below. Do NOT make up or hallucinate any information. If asked about something not covered here, say "I don't have that specific information, but feel free to reach out to me directly or check my portfolio for more details."

=== EXPERIENCES ===

**AI/ML Researcher at Ashland University:**
I developed an end-to-end AI and IoT solution for agriculture combining a crop recommendation engine, automated irrigation controller, and plant disease detection model. The crop recommendation model improved crop selection accuracy by 30%, the AI-driven irrigation reduced water waste by 25%, and the disease detection model achieved 98% classification accuracy. I also conducted performance benchmarking of T5 Small, YOLOv5, and custom CNN across CPU, GPU, and TPU environments. I evaluated multiple transformer-based language models across 1,600 test cases to analyze bias, consistency, and reasoning reliability. I compared regression models on datasets with varying feature complexity for real-world applications.

**Deep Learning Researcher at Wilkes University:**
I focused on protein-protein interaction site prediction for computational biology and drug discovery. I designed a custom deep learning model in TensorFlow that outperformed DeepPPISP and D-PPIsite by 15% in prediction accuracy. Applied data preprocessing techniques including normalization, outlier removal, and dimensionality reduction, which improved model performance by an additional 25%.

=== PROJECTS ===

**Coursewiser:**
A course-specific AI teaching assistant that helps students understand lecture material. I fine-tuned LLaMA 3.2 3B using course lecture slides, notes, and instructor materials. Used a two-phase fine-tuning pipeline for course-specific semantics and instruction-response behavior. This increased academic query understanding accuracy by 70% and improved response quality by 45%. Deployed on AWS EC2 with React frontend, Node.js backend, and Firebase for auth and data. Technologies: LLaMA 3.2 3B, transformer fine-tuning, instruction tuning, Node.js, React, AWS EC2, Firebase.

**AI Theft Detection System:**
A real-time multimodal AI system for intelligent theft detection. Integrated YOLOv8 for real-time object detection, VideoMAE for temporal motion analysis, and a multimodal LLM for context reasoning. Achieved 65% improvement in detection accuracy over traditional systems. Designed an AI reasoning layer that cut false alerts by 40%. Used OpenCV for video processing and FastAPI backend. SQLite storage with auto-generated HTML reports reduced manual video review by 80%. Technologies: YOLOv8, VideoMAE, OpenCV, FastAPI, SQLite, multimodal LLM.

**Fathom:**
An AI-powered desktop app for database analysis using natural language instead of SQL. Built with Electron and React for desktop, FastAPI for backend. Uses locally hosted LLM through Ollama for fully offline, privacy-preserving analytics. SQLAlchemy for query execution, Plotly for interactive visualizations. Reduced manual SQL querying time by 80%. Technologies: Electron, React, TailwindCSS, TypeScript, FastAPI, Ollama, SQLAlchemy, Plotly.

**MarketMinds:**
A multi-agent AI system for automated product and market research. Built with CrewAI and Gemini LLM, featuring specialized agents (Product, Competitor, Review, Strategist). LangChain orchestrates agent workflows. Pulls real-time data via SerpAPI, FastAPI backend, React frontend. Reduced manual research time by 60%. Technologies: CrewAI, Gemini LLM, LangChain, SerpAPI, FastAPI, React.

**Prepwiser:**
An AI-powered mock interview platform. Built with React frontend, Supabase for auth and storage, LiveKit for real-time video/audio, and Tavus for realistic AI interviewers. Analyzes resume and job description to generate personalized questions, increasing relevance by 60%. Provides instant AI-driven feedback, improving interview performance by 40%. Doubled candidate preparedness overall. Technologies: React, Supabase, LiveKit, Tavus, WebRTC.

**CodDoc:**
An AI tool that auto-generates professional README files for GitHub repos by analyzing actual code. Uses multi-agent architecture with five specialized AI agents that inspect repo structure, source code, dependencies, and config files. Built with Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui. Powered by Gemini AI and LangGraph for agent orchestration. Reduces documentation effort from hours to seconds. Technologies: Next.js 14, React, TypeScript, Tailwind CSS, Gemini AI, LangGraph.

=== TECHNICAL SKILLS ===

Programming Languages: Python, Java, C++, SQL (MySQL, PostgreSQL), JavaScript, TypeScript, Bash

AI/ML & Libraries: PyTorch, TensorFlow, Transformers, CNNs, Scikit-Learn, Pandas, NumPy, SciPy, Matplotlib, Seaborn, Plotly, LangChain, LangGraph, CrewAI

Computer Vision & NLP: YOLOv5, YOLOv8, VideoMAE, ResNet, LLaMA, BERT, GPT-style Models, T5, RAG, NLTK

MLOps & Deployment: FastAPI, Flask, Docker, Kubernetes, ONNX, TensorRT, MLflow, RESTful APIs

Cloud & Tools: AWS, GCP, Microsoft Azure, Git, GitHub, Jupyter Notebook, Google Colab, Kaggle, Visual Studio

=== CONTACT ===
Email: aniketg2003patel@gmail.com

=== RESPONSE GUIDELINES ===
1. Keep responses SHORT (2-3 sentences max) - this is voice, not text
2. Be conversational and friendly
3. ONLY use information provided above - never make up facts
4. If unsure, say "I don't have that specific information" and suggest checking the portfolio or contacting directly
5. Speak naturally as Aniket would speak`;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve intro audio file (pre-recorded to save TTS characters)
app.get('/api/voice/intro', (req, res) => {
  const introPath = path.join(__dirname, 'intro.mp3');
  
  if (!fs.existsSync(introPath)) {
    console.error('❌ intro.mp3 not found at:', introPath);
    return res.status(404).json({ error: 'Intro audio file not found' });
  }
  
  console.log('🎵 Serving intro.mp3');
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
  fs.createReadStream(introPath).pipe(res);
});

// Serve outro audio file (pre-recorded to save TTS characters)
app.get('/api/voice/outro', (req, res) => {
  const outroPath = path.join(__dirname, 'outro.mp3');
  
  if (!fs.existsSync(outroPath)) {
    console.error('❌ outro.mp3 not found at:', outroPath);
    return res.status(404).json({ error: 'Outro audio file not found' });
  }
  
  console.log('🎵 Serving outro.mp3');
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
  fs.createReadStream(outroPath).pipe(res);
});

// Test endpoint to verify API connections
app.get('/api/test', async (req, res) => {
  const results = {
    groq: { status: 'unknown', message: '' },
    elevenlabs: { status: 'unknown', message: '' },
  };

  // Test Groq
  try {
    const completion = await getGroqClient().chat.completions.create({
      messages: [{ role: 'user', content: 'Say "test" in one word' }],
      model: 'llama-3.1-8b-instant',
      max_tokens: 10,
    });
    results.groq = { status: 'ok', message: completion.choices[0]?.message?.content || 'No response' };
  } catch (error) {
    results.groq = { status: 'error', message: error.message };
  }

  // Test ElevenLabs
  try {
    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'KvIKE6JRtC73GKYsPXPl';
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: 'Test',
        model_id: 'eleven_multilingual_v2',
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    });

    if (response.ok) {
      const buffer = await response.arrayBuffer();
      results.elevenlabs = { status: 'ok', message: `Audio received: ${buffer.byteLength} bytes` };
    } else {
      const errorText = await response.text();
      results.elevenlabs = { status: 'error', message: `${response.status}: ${errorText}` };
    }
  } catch (error) {
    results.elevenlabs = { status: 'error', message: error.message };
  }

  res.json(results);
});

// Chat endpoint - Groq LLM
app.post('/api/voice/chat', async (req, res) => {
  console.log('📥 Chat request received');
  
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ success: false, error: 'Message is required' });
    }

    console.log('💬 User message:', message);

    // Build messages array with conversation history
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message },
    ];

    console.log('🤖 Calling Groq API...');
    
    const completion = await getGroqClient().chat.completions.create({
      messages,
      model: 'llama-3.1-8b-instant', // Using faster model for voice
      temperature: 0.7,
      max_tokens: 150, // Keep responses short for voice
      top_p: 0.9,
    });

    const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't process that request.";
    
    console.log('✅ Groq response:', response);

    res.json({
      success: true,
      response,
      usage: completion.usage,
    });
  } catch (error) {
    console.error('❌ Groq API Error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process chat request',
      message: error.message,
    });
  }
});

// Text-to-Speech endpoint - ElevenLabs
app.post('/api/voice/tts', async (req, res) => {
  console.log('🔊 TTS request received');
  
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ success: false, error: 'Text is required' });
    }

    console.log('📝 Text to speak:', text.substring(0, 50) + '...');

    if (!process.env.ELEVENLABS_API_KEY) {
      console.error('❌ ELEVENLABS_API_KEY not set');
      return res.status(500).json({ 
        success: false, 
        error: 'ElevenLabs API key not configured',
        message: 'Please set ELEVENLABS_API_KEY in your environment variables.'
      });
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'KvIKE6JRtC73GKYsPXPl';
    console.log('🎤 Using voice ID:', voiceId);

    const requestBody = {
      text,
      model_id: 'eleven_multilingual_v2', // Updated to use v2 model
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      },
    };

    console.log('🌐 Calling ElevenLabs API...');
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ ElevenLabs API Error:', response.status, errorText);
      throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
    }

    console.log('✅ ElevenLabs response received');

    // Get audio buffer
    const audioBuffer = await response.arrayBuffer();
    console.log('📦 Audio buffer size:', audioBuffer.byteLength, 'bytes');
    
    // Send as base64 encoded audio
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    
    res.json({
      success: true,
      audio: base64Audio,
      contentType: 'audio/mpeg',
    });
  } catch (error) {
    console.error('❌ TTS Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to generate speech',
      message: error.message,
    });
  }
});

// Stream TTS endpoint (alternative - returns audio stream directly)
app.post('/api/voice/tts/stream', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const voiceId = process.env.ELEVENLABS_VOICE_ID || 'KvIKE6JRtC73GKYsPXPl';

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Pipe the stream directly to the response
    const reader = response.body.getReader();
    
    const pump = async () => {
      const { done, value } = await reader.read();
      if (done) {
        res.end();
        return;
      }
      res.write(Buffer.from(value));
      return pump();
    };

    await pump();
  } catch (error) {
    console.error('TTS Stream Error:', error);
    res.status(500).json({
      error: 'Failed to stream speech',
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Voice Agent Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
  
  // Check for required environment variables
  const missingVars = [];
  if (!process.env.GROQ_API_KEY) missingVars.push('GROQ_API_KEY');
  if (!process.env.ELEVENLABS_API_KEY) missingVars.push('ELEVENLABS_API_KEY');
  
  if (missingVars.length > 0) {
    console.warn(`\n⚠️  Warning: Missing environment variables: ${missingVars.join(', ')}`);
    console.warn(`   Make sure you have a .env file in the backend folder.`);
    console.warn(`   You can copy env.example to .env and add your API keys.\n`);
  } else {
    console.log(`✅ All environment variables loaded`);
  }
});
