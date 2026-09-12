// Narration playback.
//
// Production drops pre-recorded MP3s into web-demo/public/narration/<step-id>.mp3.
// If a file exists for the step it is played; otherwise we fall back to the
// browser's speech synthesis so the demo is fully narrated during development.

const AUDIO_BASE_PATH = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/narration`;

let currentAudio: HTMLAudioElement | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;
let generation = 0;

export interface NarrationHandle {
  stop: () => void;
}

export function stopNarration(): void {
  generation++;
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.onerror = null;
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

function speak(text: string, gen: number, onStart: () => void, onEnd: () => void): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) { onEnd(); return; }
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.97;
  utt.pitch = 1;
  utt.onstart = () => { if (gen === generation) onStart(); };
  utt.onend = () => { if (gen === generation) onEnd(); };
  utt.onerror = () => { if (gen === generation) onEnd(); };
  currentUtterance = utt;
  window.speechSynthesis.speak(utt);
}

/**
 * Play narration for a step. Tries /narration/<stepId>.mp3 first, then TTS.
 * onStart / onEnd are only invoked if this narration is still the current one.
 */
export function playNarration(
  stepId: string,
  text: string,
  onStart: () => void,
  onEnd: () => void,
): NarrationHandle {
  stopNarration();
  const gen = generation;

  if (typeof window === 'undefined') return { stop: () => {} };

  const audio = new Audio(`${AUDIO_BASE_PATH}/${stepId}.mp3`);
  currentAudio = audio;

  audio.onended = () => { if (gen === generation) { currentAudio = null; onEnd(); } };
  audio.onerror = () => {
    // No recorded file for this step — fall back to TTS.
    if (gen !== generation) return;
    currentAudio = null;
    speak(text, gen, onStart, onEnd);
  };
  audio.oncanplay = () => { if (gen === generation) onStart(); };
  audio.play().catch(() => {
    // Autoplay may be blocked before first user gesture; TTS also needs a gesture,
    // so there is nothing more to do here — the next key press will narrate.
    if (gen === generation && currentAudio === audio) { currentAudio = null; onEnd(); }
  });

  return { stop: stopNarration };
}

export function isNarrating(): boolean {
  if (currentAudio && !currentAudio.paused && !currentAudio.ended) return true;
  if (typeof window !== 'undefined' && window.speechSynthesis?.speaking) return true;
  return false;
}
