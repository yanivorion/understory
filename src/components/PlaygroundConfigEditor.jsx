import { getPlaygroundManifest } from "../lib/playgroundRegistry";

const C = {
  border: "#3a3226",
  text: "#f1ead9",
  textMuted: "#b7ac96",
  inputBg: "#0f0c07",
};

function Field({ label, value, onChange, multiline, type = "text" }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded px-3 py-2 text-sm outline-none resize-y"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        />
      ) : (
        <input
          type={type}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded px-3 py-2 text-sm outline-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        />
      )}
    </label>
  );
}

export default function PlaygroundConfigEditor({ playgroundId, config, onChange }) {
  const manifest = getPlaygroundManifest(playgroundId);
  const fields = manifest?.manifest?.editorElement?.data || {};
  const groups = {};

  Object.entries(fields).forEach(([key, field]) => {
    const group = field.group || "General";
    if (!groups[group]) groups[group] = [];
    groups[group].push({ key, field });
  });

  if (!manifest) {
    return <p className="text-xs" style={{ color: C.textMuted }}>Unknown playground component.</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-xs" style={{ color: C.textMuted }}>
        {manifest.description || manifest.label}
      </p>
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <h4 className="text-[10px] uppercase tracking-wide mb-3" style={{ color: C.textMuted }}>
            {group}
          </h4>
          <div className="flex flex-col gap-3">
            {items.map(({ key, field }) => {
              const value = config?.[key] ?? field.defaultValue ?? "";

              if (field.dataType === "booleanValue") {
                return (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value === true || value === "true"}
                      onChange={(e) => onChange(key, e.target.checked)}
                    />
                    <span className="text-xs" style={{ color: C.text }}>
                      {field.displayName || key}
                    </span>
                  </label>
                );
              }

              if (field.dataType === "select") {
                return (
                  <label key={key} className="block">
                    <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
                      {field.displayName || key}
                    </span>
                    <select
                      value={String(value)}
                      onChange={(e) => onChange(key, e.target.value)}
                      className="w-full rounded px-3 py-2 text-sm outline-none"
                      style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
                    >
                      {(field.options || []).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              }

              if (field.dataType === "color") {
                return (
                  <label key={key} className="flex items-center gap-3">
                    <input
                      type="color"
                      value={value || "#141009"}
                      onChange={(e) => onChange(key, e.target.value)}
                      className="h-9 w-9 rounded cursor-pointer"
                      style={{ border: `1px solid ${C.border}` }}
                    />
                    <span className="text-xs" style={{ color: C.text }}>
                      {field.displayName || key}
                    </span>
                  </label>
                );
              }

              if (field.dataType === "number") {
                return (
                  <Field
                    key={key}
                    label={field.displayName || key}
                    type="number"
                    value={String(value)}
                    onChange={(v) => onChange(key, v)}
                  />
                );
              }

              return (
                <Field
                  key={key}
                  label={field.displayName || key}
                  value={String(value)}
                  onChange={(v) => onChange(key, v)}
                  multiline={String(value).length > 80}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
