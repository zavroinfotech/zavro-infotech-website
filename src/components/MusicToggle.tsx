"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/audio/background-music.mp3";
// This recording opens very softly (about -23 dBFS for the first seconds), so a low cap made it
// effectively inaudible. 0.9 keeps a little headroom; visitors still control loudness with
// their device volume.
const TARGET_VOLUME = 0.9;
const CLICK_FADE_MS = 700;
const AUTOPLAY_FADE_MS = 1600; // slower, so the music eases in while the intro plays
const HINT_MS = 8000;
const HEARTBEAT_MS = 15000; // while playing, check the server is still reachable
const HANDSHAKE_MS = 150; // how long a new tab waits to hear whether another tab is playing
const PREF_KEY = "zavro-music"; // "off" once the visitor has turned the music off
const CHANNEL = "zavro-music";

type Status = "idle" | "loading" | "playing" | "error";
type Message = { type: "playing" | "off" | "query"; id: string };

const setOffPref = (off: boolean) => {
  try {
    if (off) sessionStorage.setItem(PREF_KEY, "off");
    else sessionStorage.removeItem(PREF_KEY);
  } catch {
    /* storage can be blocked */
  }
};

/**
 * Background music. On load it makes ONE attempt to start (browsers may refuse audible
 * autoplay). If that is refused, nothing is forced: the music button pulses briefly with a
 * short hint, and playback starts on the visitor's first press of the button.
 *
 * Only one tab ever plays: tabs of this site talk to each other, a new tab does not start if
 * another is already playing, starting music in one tab pauses the others, and turning it OFF
 * stops every tab. Playback also stops when the page is closed or navigated away. The header is
 * part of the shared layout, so the track keeps playing between pages without restarting.
 */
export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const idRef = useRef("");
  const fadeRef = useRef<number | undefined>(undefined);
  const hintTimerRef = useRef<number | undefined>(undefined);
  const handshakeRef = useRef<number | undefined>(undefined);
  const heartbeatRef = useRef<number | undefined>(undefined);
  const attemptedRef = useRef(false);
  const [status, setStatus] = useState<Status>("idle");
  const [blocked, setBlocked] = useState(false); // autoplay was refused by the browser
  const [hint, setHint] = useState(false);

  const post = (type: Message["type"]) => {
    channelRef.current?.postMessage({ type, id: idRef.current } satisfies Message);
  };

  const fadeTo = (audio: HTMLAudioElement, ms: number) => {
    window.clearInterval(fadeRef.current);
    const started = performance.now();
    fadeRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - started) / ms);
      audio.volume = TARGET_VOLUME * t;
      if (t === 1) window.clearInterval(fadeRef.current);
    }, 40);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!idRef.current) idRef.current = Math.random().toString(36).slice(2);
    const id = idRef.current;

    // Only one audio element may exist in this tab (e.g. after a hot reload in development).
    const w = window as unknown as { __zavroAudio?: HTMLAudioElement };
    if (w.__zavroAudio && w.__zavroAudio !== audio) w.__zavroAudio.pause();
    w.__zavroAudio = audio;

    const stopLocal = () => {
      window.clearInterval(fadeRef.current);
      audio.pause();
    };

    // The whole track gets buffered, so a page would keep looping it even if the site went
    // away. While playing, check the file is still reachable and stop if it is not.
    const stopHeartbeat = () => window.clearInterval(heartbeatRef.current);
    const startHeartbeat = () => {
      stopHeartbeat();
      heartbeatRef.current = window.setInterval(async () => {
        try {
          await fetch(SRC, { method: "HEAD", cache: "no-store" });
        } catch {
          stopLocal(); // network failure: server or connection is gone
        }
      }, HEARTBEAT_MS);
    };

    const onPlaying = () => {
      setStatus("playing");
      startHeartbeat();
      post("playing"); // other tabs hand over
    };
    const onWaiting = () => setStatus((s) => (s === "playing" ? "loading" : s));
    const onPause = () => {
      stopHeartbeat();
      setStatus((s) => (s === "error" ? s : "idle"));
    };
    const onError = () => setStatus("error");
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    audio.addEventListener("error", onError);

    // Talk to other tabs of this site
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CHANNEL);
    } catch {
      /* not supported: single-tab behaviour only */
    }
    channelRef.current = channel;
    let otherTabPlaying = false;
    channel?.addEventListener("message", (e: MessageEvent<Message>) => {
      const m = e.data;
      if (!m || m.id === id) return;
      if (m.type === "playing") {
        otherTabPlaying = true;
        if (!audio.paused) stopLocal(); // another tab started: hand over, never overlap
      } else if (m.type === "off") {
        setOffPref(true);
        stopLocal(); // OFF in any tab stops every tab
      } else if (m.type === "query" && !audio.paused) {
        post("playing");
      }
    });

    // Stop sound when this page is closed, reloaded or navigated away from
    const onPageHide = () => stopLocal();
    window.addEventListener("pagehide", onPageHide);

    const startAutoplay = () => {
      setStatus("loading");
      audio.muted = false;
      audio.volume = 0;
      audio
        .play()
        .then(() => fadeTo(audio, AUTOPLAY_FADE_MS))
        .catch((err: unknown) => {
          const name = err instanceof DOMException ? err.name : "";
          if (name === "NotAllowedError") {
            // Autoplay refused: show a gentle prompt on the button, do not retry.
            setStatus("idle");
            setBlocked(true);
            setHint(true);
            hintTimerRef.current = window.setTimeout(() => setHint(false), HINT_MS);
          } else if (name === "AbortError") {
            setStatus("idle");
          } else {
            setStatus("error");
          }
        });
    };

    // One autoplay attempt per page load (never repeated). Skipped if the visitor turned the
    // music off earlier in this session, or if another tab is already playing.
    let pendingHandshake = false;
    if (!attemptedRef.current) {
      attemptedRef.current = true;
      let off = false;
      try {
        off = sessionStorage.getItem(PREF_KEY) === "off";
      } catch {
        /* ignore */
      }
      if (!off) {
        if (channel) {
          pendingHandshake = true;
          post("query");
          handshakeRef.current = window.setTimeout(() => {
            pendingHandshake = false;
            if (!otherTabPlaying) startAutoplay();
          }, HANDSHAKE_MS);
        } else {
          startAutoplay();
        }
      }
    }

    return () => {
      // If the handshake was still pending (e.g. React Strict Mode's test unmount), allow the
      // real mount to make the attempt.
      if (pendingHandshake) {
        window.clearTimeout(handshakeRef.current);
        attemptedRef.current = false;
      }
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
      audio.removeEventListener("error", onError);
      window.removeEventListener("pagehide", onPageHide);
      stopHeartbeat();
      channel?.close();
      channelRef.current = null;
    };
  }, []);

  // Clean up timers if the header ever unmounts
  useEffect(
    () => () => {
      window.clearInterval(fadeRef.current);
      window.clearTimeout(hintTimerRef.current);
      window.clearTimeout(handshakeRef.current);
      window.clearInterval(heartbeatRef.current);
    },
    [],
  );

  // Show an error message for a few seconds, then let the button return to normal.
  useEffect(() => {
    if (status !== "error") return;
    const t = window.setTimeout(() => setStatus("idle"), 6000);
    return () => window.clearTimeout(t);
  }, [status]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    window.clearInterval(fadeRef.current);
    setHint(false);

    // OFF: pause the real audio immediately, remember the choice, and stop every other tab too.
    if (!audio.paused) {
      audio.pause();
      setOffPref(true);
      post("off");
      return;
    }

    setBlocked(false);
    setStatus("loading");
    setOffPref(false);
    try {
      // If an earlier load failed, try the file again from scratch.
      if (audio.error) audio.load();
      audio.muted = false;
      audio.volume = 0;
      await audio.play(); // allowed: this runs inside the visitor's click
      fadeTo(audio, CLICK_FADE_MS);
    } catch {
      setStatus("error");
    }
  };

  const on = status === "playing" || status === "loading";
  const label =
    status === "error"
      ? "Background music could not be played. Try again"
      : status === "loading"
        ? "Loading background music"
        : status === "playing"
          ? "Pause background music"
          : blocked
            ? "Play background music. Your browser blocked autoplay"
            : "Play background music";

  return (
    <span className="relative inline-flex">
      <audio ref={audioRef} src={SRC} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-pressed={on}
        aria-busy={status === "loading"}
        aria-label={label}
        title={label}
        className="group relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink text-ink transition-[background-color,color,transform] duration-200 hover:bg-ink hover:text-porcelain active:scale-95"
      >
        {/* Soft Oxide ring while the browser is waiting for the first press */}
        {hint ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full border-2 border-oxide"
          />
        ) : null}
        {/* Three bars: they move while music plays, pulse while loading, and rest when off. */}
        <span
          aria-hidden="true"
          className={`flex h-4 items-end gap-[3px] ${status === "loading" ? "animate-pulse" : ""}`}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-[3px] origin-bottom rounded-full bg-current ${status === "playing" ? "music-bar" : ""}`}
              style={{
                height: status === "playing" ? "100%" : ["45%", "75%", "55%"][i],
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </span>
        {/* Oxide dot marks "playing" without relying on motion */}
        {status === "playing" ? (
          <span
            aria-hidden="true"
            className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-oxide ring-2 ring-porcelain"
          />
        ) : null}
      </button>

      {/* Gentle prompt when the browser refused autoplay (fixed, so it never shifts the layout) */}
      {hint && status === "idle" ? (
        <span
          role="status"
          className="fixed right-5 top-[72px] z-50 w-56 max-w-[calc(100vw-2.5rem)] rounded-md border border-ink bg-porcelain px-3 py-2 text-xs leading-snug text-ink shadow-lg sm:right-8"
        >
          Music is ready. Press the music button to play.
        </span>
      ) : null}

      {/* Visible error message (also announced to screen readers) */}
      {status === "error" ? (
        <span
          role="alert"
          className="fixed right-5 top-[72px] z-50 w-56 max-w-[calc(100vw-2.5rem)] rounded-md bg-ink px-3 py-2 text-xs leading-snug text-porcelain shadow-lg sm:right-8"
        >
          The music couldn&rsquo;t be played. Please try the button again.
        </span>
      ) : null}
    </span>
  );
}
