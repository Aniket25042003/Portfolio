import { useState, useRef, useCallback, useEffect } from 'react';

// Backend URL - Change this to your Railway deployment URL in production
const BACKEND_URL = import.meta.env.VITE_VOICE_BACKEND_URL || 'http://localhost:3001';

// Debug logger - only logs in development
const debugLog = (...args: any[]) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

// Error logger - less verbose in production
const errorLog = (message: string, error?: any) => {
  if (import.meta.env.DEV) {
    console.error(message, error);
  } else {
    // In production, only log generic message without sensitive details
    console.error(message);
  }
};

// Session message limits
const MAX_USER_QUESTIONS = 3; // User can ask 3 questions before closing

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface UseVoiceAgentReturn {
  isActive: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  isProcessing: boolean;
  questionsAsked: number;
  error: string | null;
  startSession: () => void;
  stopSession: () => void;
}

export const useVoiceAgent = (): UseVoiceAgentReturn => {
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const conversationHistoryRef = useRef<Message[]>([]);
  const isSessionEndedRef = useRef(false);
  const isActiveRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const isProcessingRef = useRef(false);
  const isListeningRef = useRef(false);
  const questionsAskedRef = useRef(0);

  // Keep refs in sync with state
  useEffect(() => { isActiveRef.current = isActive; }, [isActive]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);
  useEffect(() => { isProcessingRef.current = isProcessing; }, [isProcessing]);
  useEffect(() => { isListeningRef.current = isListening; }, [isListening]);
  useEffect(() => { questionsAskedRef.current = questionsAsked; }, [questionsAsked]);

  // Initialize Web Speech API
  const initSpeechRecognition = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return null;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    return recognition;
  }, []);

  // Helper function to start listening
  const tryStartListening = useCallback(() => {
    if (!recognitionRef.current || isListeningRef.current || isSpeakingRef.current || isProcessingRef.current || isSessionEndedRef.current) {
      return;
    }

    setError(null);

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      errorLog('Failed to start listening', err);
      if ((err as Error).message?.includes('already started')) {
        return;
      }
    }
  }, []);

  // Play pre-recorded audio file (intro or outro)
  const playPreRecordedAudio = useCallback((type: 'intro' | 'outro', onEnd?: () => void) => {
    debugLog(`🎵 Playing ${type} audio...`);
    setIsSpeaking(true);
    isSpeakingRef.current = true;

    const audio = new Audio(`${BACKEND_URL}/api/voice/${type}`);
    audioRef.current = audio;

    audio.onended = () => {
      debugLog(`🔇 ${type} audio ended`);
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      onEnd?.();
    };

    audio.onerror = (e) => {
      errorLog(`Audio playback error (${type})`, e);
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setError(`Failed to play ${type} audio`);
      onEnd?.();
    };

    audio.play().catch((err) => {
      errorLog(`Audio play failed (${type})`, err);
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      onEnd?.();
    });
  }, []);

  // Text-to-Speech using ElevenLabs via backend (only for answers)
  const speak = useCallback(async (text: string, autoListenAfter: boolean = true) => {
    if (!text || isSessionEndedRef.current) {
      debugLog('⚠️ Speak skipped: no text or session ended');
      return;
    }

    debugLog('🔊 Speaking:', text.substring(0, 50) + '...');
    setIsSpeaking(true);
    isSpeakingRef.current = true;

    try {
      const res = await fetch(`${BACKEND_URL}/api/voice/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${res.status}: Failed to generate speech`);
      }

      const data = await res.json();
      
      if (data.success && data.audio) {
        const audioBlob = new Blob(
          [Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))],
          { type: 'audio/mpeg' }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.pause();
          URL.revokeObjectURL(audioRef.current.src);
        }

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          debugLog('🔇 Audio playback ended');
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          URL.revokeObjectURL(audioUrl);
          
          if (autoListenAfter && isActiveRef.current && !isSessionEndedRef.current) {
            debugLog('🎤 Auto-starting listening after speak...');
            setTimeout(() => tryStartListening(), 300);
          }
        };

        audio.onerror = () => {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          setError('Failed to play audio');
          URL.revokeObjectURL(audioUrl);
        };

        await audio.play();
      } else {
        throw new Error('No audio data received from server');
      }
    } catch (err) {
      errorLog('Text-to-speech error', err);
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      setError(`Speech failed: ${(err as Error).message}`);
      
      if (autoListenAfter && isActiveRef.current && !isSessionEndedRef.current) {
        setTimeout(() => tryStartListening(), 500);
      }
    }
  }, [tryStartListening]);

  // End session with outro
  const endSessionWithOutro = useCallback(() => {
    debugLog('🔚 Ending session with outro...');
    isSessionEndedRef.current = true;
    setIsProcessing(false);
    isProcessingRef.current = false;
    
    playPreRecordedAudio('outro', () => {
      setIsActive(false);
      isActiveRef.current = false;
    });
  }, [playPreRecordedAudio]);

  // Get AI response from Groq via backend
  const getAIResponse = useCallback(async (userMessage: string) => {
    if (isSessionEndedRef.current) {
      return;
    }

    // Increment question count
    const newQuestionCount = questionsAskedRef.current + 1;
    setQuestionsAsked(newQuestionCount);
    questionsAskedRef.current = newQuestionCount;
    
    debugLog(`💬 Question ${newQuestionCount}/${MAX_USER_QUESTIONS}: ${userMessage}`);

    // Check if this is the last question (3rd question) - play outro instead of answering
    if (newQuestionCount >= MAX_USER_QUESTIONS) {
      debugLog('📍 Max questions reached, playing outro...');
      endSessionWithOutro();
      return;
    }

    setIsProcessing(true);
    isProcessingRef.current = true;
    setError(null);

    try {
      conversationHistoryRef.current.push({ role: 'user', content: userMessage });

      const res = await fetch(`${BACKEND_URL}/api/voice/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistoryRef.current,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || data.error || `HTTP ${res.status}: Failed to get AI response`);
      }
      
      if (data.success && data.response) {
        conversationHistoryRef.current.push({ role: 'assistant', content: data.response });
        setIsProcessing(false);
        isProcessingRef.current = false;
        await speak(data.response);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      errorLog('Chat API error', err);
      setIsProcessing(false);
      isProcessingRef.current = false;
      setError(`Failed to get response: ${(err as Error).message}`);
      
      // Don't count failed attempts
      setQuestionsAsked(prev => prev - 1);
      questionsAskedRef.current = questionsAskedRef.current - 1;
      
      if (isActiveRef.current && !isSessionEndedRef.current) {
        setTimeout(() => tryStartListening(), 1000);
      }
    }
  }, [speak, tryStartListening, endSessionWithOutro]);

  // Start voice session
  const startSession = useCallback(() => {
    const recognition = initSpeechRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    isSessionEndedRef.current = false;
    conversationHistoryRef.current = [];
    setQuestionsAsked(0);
    questionsAskedRef.current = 0;
    setError(null);
    setIsActive(true);
    isActiveRef.current = true;

    // Set up recognition event handlers
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const results = event.results;
      const lastResult = results[results.length - 1];
      
      if (lastResult.isFinal) {
        const finalTranscript = lastResult[0].transcript.trim();
        
        if (finalTranscript && !isSessionEndedRef.current) {
          setIsListening(false);
          getAIResponse(finalTranscript);
        } else if (!finalTranscript) {
          setIsListening(false);
          setTimeout(() => {
            if (isActiveRef.current && !isSessionEndedRef.current) {
              tryStartListening();
            }
          }, 300);
        }
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      errorLog('Speech recognition error', event.error);
      setIsListening(false);
      
      if (event.error === 'no-speech' || event.error === 'aborted') {
        setTimeout(() => {
          if (isActiveRef.current && !isSessionEndedRef.current && !isSpeakingRef.current && !isProcessingRef.current) {
            tryStartListening();
          }
        }, 500);
      } else {
        setError(`Speech recognition error: ${event.error}`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      setTimeout(() => {
        if (isActiveRef.current && !isSessionEndedRef.current && !isSpeakingRef.current && !isProcessingRef.current && !isListeningRef.current) {
          tryStartListening();
        }
      }, 300);
    };

    // Play pre-recorded intro, then start listening
    playPreRecordedAudio('intro', () => {
      if (isActiveRef.current && !isSessionEndedRef.current) {
        debugLog('🎤 Starting to listen after intro...');
        tryStartListening();
      }
    });
  }, [initSpeechRecognition, getAIResponse, tryStartListening, playPreRecordedAudio]);

  // Stop voice session
  const stopSession = useCallback(() => {
    isSessionEndedRef.current = true;
    
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
      recognitionRef.current = null;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsActive(false);
    isActiveRef.current = false;
    setIsListening(false);
    setIsSpeaking(false);
    setIsProcessing(false);
    setQuestionsAsked(0);
    questionsAskedRef.current = 0;
    conversationHistoryRef.current = [];
    setError(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) { /* ignore */ }
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return {
    isActive,
    isListening,
    isSpeaking,
    isProcessing,
    questionsAsked,
    error,
    startSession,
    stopSession,
  };
};

// Type declarations for Web Speech API
interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  readonly isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly results: SpeechRecognitionResultList;
  readonly resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor;
    webkitSpeechRecognition: SpeechRecognitionConstructor;
  }
}
