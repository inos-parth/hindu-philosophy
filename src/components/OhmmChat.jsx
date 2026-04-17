import React, { useEffect, useRef, useState } from "react";
import { answer } from "../lib/answerEngine.js";

// Returns the browser's SpeechRecognition constructor or null.
function getSpeechRecognition() {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export default function OhmmChat({ open, onClose, onPick }) {
  const [messages, setMessages] = useState(() => initialMessages());
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [status, setStatus] = useState("");
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Autoscroll to the newest message.
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  // Focus input when opened.
  useEffect(() => {
    if (open && inputRef.current) {
      const t = setTimeout(() => inputRef.current.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Escape key closes.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function send(text) {
    const q = String(text || input || "").trim();
    if (!q) return;
    const userMsg = { id: uid(), role: "user", text: q };
    const reply = answer(q);
    const botMsg = {
      id: uid(),
      role: "bot",
      text: reply.text,
      picks: reply.picks || [],
      suggestions: reply.suggestions || []
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  function onInputKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  // In-chat mic dictates into the input. This is a deliberate user action
  // (they tapped the mic), not wake-word activation.
  function toggleDictation() {
    const Rec = getSpeechRecognition();
    if (!Rec) {
      setStatus("Voice input isn't supported in this browser.");
      return;
    }

    if (listening) {
      try { recognitionRef.current && recognitionRef.current.stop(); } catch (_) {}
      setListening(false);
      return;
    }

    const rec = new Rec();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    let finalTranscript = "";

    rec.onstart = () => {
      setListening(true);
      setStatus("Listening…");
    };
    rec.onresult = (ev) => {
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const t = ev.results[i][0].transcript;
        if (ev.results[i].isFinal) finalTranscript += t;
        else interim += t;
      }
      setInput(finalTranscript || interim);
    };
    rec.onerror = (e) => {
      setStatus(e.error === "not-allowed" ? "Microphone blocked." : "Voice error: " + e.error);
      setListening(false);
    };
    rec.onend = () => {
      setListening(false);
      setStatus("");
      if (finalTranscript.trim()) {
        send(finalTranscript);
      }
    };

    recognitionRef.current = rec;
    try {
      rec.start();
    } catch (err) {
      setStatus("Couldn't start the microphone.");
      setListening(false);
    }
  }

  if (!open) return null;

  return (
    <div className="ohmm-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="ohmm-modal" role="dialog" aria-label="Ohmm chat">
        <div className="ohmm-head">
          <span className="om-big">ॐ</span>
          <div>
            <h3>Ohmm</h3>
            <p>A guide to Hindu philosophy · beta</p>
          </div>
          <button className="ohmm-close" onClick={onClose} aria-label="Close chat">×</button>
        </div>

        <div className="ohmm-body" ref={bodyRef}>
          {messages.map((m) => (
            <div key={m.id} className={`ohmm-msg ${m.role}`}>
              <div>{m.text}</div>

              {m.picks && m.picks.length > 0 && (
                <div className="ohmm-suggestions" style={{ marginTop: 8 }}>
                  {m.picks.map((p) =>
                    p.kind === "node" ? (
                      <button
                        key={p.id}
                        onClick={() => onPick && onPick(p.id)}
                        title="Open this node in the tree"
                      >
                        Open {p.name}
                      </button>
                    ) : (
                      <button key={p.id} disabled title="This is an FAQ topic, not a tree node">
                        {p.name}
                      </button>
                    )
                  )}
                </div>
              )}

              {m.suggestions && m.suggestions.length > 0 && (
                <div className="ohmm-suggestions">
                  {m.suggestions.map((s, i) => (
                    <button key={i} onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="ohmm-foot">
          <input
            ref={inputRef}
            className="ohmm-input"
            placeholder="Ask about schools, teachers, texts, or concepts…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onInputKey}
          />
          <button
            className={`ohmm-mic ${listening ? "active" : ""}`}
            onClick={toggleDictation}
            aria-label={listening ? "Stop dictation" : "Dictate a question"}
            title={listening ? "Stop" : "Dictate"}
          >
            {listening ? "■" : "🎤"}
          </button>
          <button className="ohmm-btn" onClick={() => send()} disabled={!input.trim()}>
            Ask
          </button>
          <div className="ohmm-status">{status}</div>
        </div>
      </div>
    </div>
  );
}

function initialMessages() {
  return [
    {
      id: uid(),
      role: "bot",
      text:
        "Namaste — I'm Ohmm. Ask me anything about Hindu philosophy, from the six darśanas to mokṣa, or try one of these:",
      suggestions: [
        "What is Advaita Vedānta?",
        "Compare Sāṃkhya and Yoga",
        "Who was Śaṅkara?",
        "What is the difference between mokṣa and nirvāṇa?"
      ]
    }
  ];
}

let counter = 0;
function uid() {
  counter += 1;
  return "m" + counter + "_" + Math.random().toString(36).slice(2, 8);
}
