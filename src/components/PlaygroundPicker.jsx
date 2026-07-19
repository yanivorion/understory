import { useMemo, useState } from "react";
import { PLAYGROUND_MANIFESTS } from "../lib/playgroundRegistry";

const C = {
  bg: "#17130c",
  card: "#241f16",
  border: "#3a3226",
  text: "#f1ead9",
  textMuted: "#b7ac96",
  accent: "#c99a5b",
  accentText: "#17130c",
  inputBg: "#0f0c07",
};

export default function PlaygroundPicker({ onSelect, onClose }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PLAYGROUND_MANIFESTS;
    return PLAYGROUND_MANIFESTS.filter(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        m.type.toLowerCase().includes(q) ||
        (m.description || "").toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[80vh] flex flex-col rounded-xl shadow-2xl overflow-hidden"
        style={{ background: C.bg, border: `1px solid ${C.border}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${C.border}` }}>
          <h3 className="text-sm" style={{ color: C.text }}>
            Add playground component
          </h3>
          <button type="button" onClick={onClose} style={{ color: C.textMuted }}>
            ×
          </button>
        </div>
        <div className="p-4" style={{ borderBottom: `1px solid ${C.border}` }}>
          <input
            type="search"
            placeholder="Search components…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded px-3 py-2.5 text-sm outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
            autoFocus
          />
          <p className="text-[10px] mt-2 uppercase tracking-wide" style={{ color: C.textMuted }}>
            {filtered.length} of {PLAYGROUND_MANIFESTS.length} components
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className="w-full text-left rounded-lg px-3 py-3 mb-1 transition-colors hover:opacity-90"
              style={{ background: C.card, color: C.text, border: `1px solid ${C.border}` }}
            >
              <p className="text-sm font-medium">{item.label}</p>
              <p className="text-[10px] mt-1 uppercase tracking-wide" style={{ color: C.textMuted }}>
                {item.type}
              </p>
              {item.description && (
                <p className="text-xs mt-1.5 line-clamp-2" style={{ color: C.textMuted }}>
                  {item.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
