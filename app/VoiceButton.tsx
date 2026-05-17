'use client';
import { useState, useRef } from 'react';

interface Props {
  onResult: (text: string) => void;
  lang?: string;
}

export default function VoiceButton({ onResult, lang = 'en-IN' }: Props) {
  const [listening, setListening] = useState(false);
  const recRef = useRef<any>(null);

  const startListen = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert('Voice not supported in this browser. Try Chrome.'); return; }
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e: any) => { onResult(e.results[0][0].transcript); };
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    rec.start();
  };

  const stop = () => { recRef.current?.stop(); setListening(false); };

  return (
    <button className={`btn-voice ${listening ? 'listening' : ''}`} onClick={listening ? stop : startListen} title={listening ? 'Tap to stop' : 'Tap to speak'}>
      {listening ? '⏹️' : '🎙️'}
    </button>
  );
}
