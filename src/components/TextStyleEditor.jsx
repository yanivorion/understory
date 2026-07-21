import { FONT_GROUPS } from "../lib/fontCatalog";
import { TEXT_STYLE_DEFAULTS, normalizeTextStyle, resolveTextStyle, textStyleToCss } from "../lib/textStyles";

const C = {
  cardAlt: "#1c1810",
  border: "#3a3226",
  textMuted: "#b7ac96",
  textFaint: "#7d745f",
  inputBg: "#0f0c07",
  text: "#f1ead9",
  accent: "#c99a5b",
};

const WEIGHTS = [
  { value: "", label: "Default" },
  { value: "100", label: "Thin 100" },
  { value: "200", label: "Extra Light 200" },
  { value: "300", label: "Light 300" },
  { value: "400", label: "Regular 400" },
  { value: "500", label: "Medium 500" },
  { value: "600", label: "Semi Bold 600" },
  { value: "700", label: "Bold 700" },
  { value: "800", label: "Extra Bold 800" },
  { value: "900", label: "Black 900" },
];

function numInput(value, onChange, { min, max, step = 1, placeholder = "Default" } = {}) {
  return (
    <input
      type="number"
      value={value ?? ""}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      onChange={(e) => {
        const raw = e.target.value;
        onChange(raw === "" ? null : parseFloat(raw));
      }}
      className="w-full rounded px-2 py-1.5 text-sm outline-none"
      style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
    />
  );
}

export default function TextStyleEditor({ value, onChange, preview = "The forest remembers.", styleKey, textStyles }) {
  const style = normalizeTextStyle(value);

  const patch = (partial) => onChange({ ...style, ...partial });

  const resolved = styleKey ? resolveTextStyle({ ...textStyles, [styleKey]: style }, styleKey) : style;
  const previewCss = textStyleToCss(resolved);
  if (resolved.fontId) {
    const font = FONT_GROUPS.flatMap((g) => g.fonts).find((f) => f.id === resolved.fontId);
    if (font) previewCss.fontFamily = font.family;
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="rounded-md px-3 py-4 text-center break-words"
        style={{ background: C.inputBg, border: `1px solid ${C.border}`, ...previewCss }}
      >
        {preview}
      </div>

      <label className="block">
        <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
          Font family
        </span>
        <select
          value={style.fontId || ""}
          onChange={(e) => patch({ fontId: e.target.value })}
          className="w-full rounded px-2 py-1.5 text-sm outline-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        >
          <option value="">Site default</option>
          {FONT_GROUPS.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.fonts.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Size
          </span>
          {numInput(style.fontSize, (v) => patch({ fontSize: v }), { min: 8, max: 200, step: 0.5 })}
        </label>
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Unit
          </span>
          <select
            value={style.fontSizeUnit || "px"}
            onChange={(e) => patch({ fontSizeUnit: e.target.value })}
            className="w-full rounded px-2 py-1.5 text-sm outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
          >
            {["px", "rem", "em", "vw", "vh", "%"].map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Weight
          </span>
          <select
            value={style.fontWeight ?? ""}
            onChange={(e) => patch({ fontWeight: e.target.value === "" ? null : Number(e.target.value) })}
            className="w-full rounded px-2 py-1.5 text-sm outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
          >
            {WEIGHTS.map((w) => (
              <option key={w.label} value={w.value}>
                {w.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Style
          </span>
          <select
            value={style.fontStyle || "normal"}
            onChange={(e) => patch({ fontStyle: e.target.value })}
            className="w-full rounded px-2 py-1.5 text-sm outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
          >
            <option value="normal">Normal</option>
            <option value="italic">Italic</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Line height
          </span>
          {numInput(style.lineHeight, (v) => patch({ lineHeight: v }), { min: 0.5, max: 3, step: 0.05 })}
        </label>
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Letter spacing
          </span>
          {numInput(style.letterSpacing, (v) => patch({ letterSpacing: v }), { min: -0.2, max: 0.5, step: 0.01 })}
        </label>
      </div>

      <label className="block">
        <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
          Letter spacing unit
        </span>
        <select
          value={style.letterSpacingUnit || "em"}
          onChange={(e) => patch({ letterSpacingUnit: e.target.value })}
          className="w-full rounded px-2 py-1.5 text-sm outline-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        >
          {["em", "px", "rem"].map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
          Color
        </span>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={style.color || "#ece3d3"}
            onChange={(e) => patch({ color: e.target.value })}
            className="h-9 w-9 rounded cursor-pointer shrink-0"
            style={{ border: `1px solid ${C.border}` }}
          />
          <input
            type="text"
            value={style.color || ""}
            placeholder="Inherit / theme"
            onChange={(e) => patch({ color: e.target.value })}
            className="flex-1 rounded px-2 py-1.5 text-sm font-mono outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
          />
          <button
            type="button"
            onClick={() => patch({ color: "" })}
            className="text-[10px] uppercase tracking-wide shrink-0"
            style={{ color: C.textMuted }}
          >
            Clear
          </button>
        </div>
      </label>

      <label className="block">
        <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
          Opacity ({style.opacity != null ? Math.round(style.opacity * 100) : 100}%)
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={style.opacity ?? 1}
          onChange={(e) => patch({ opacity: parseFloat(e.target.value) })}
          className="w-full"
        />
      </label>

      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Max width
          </span>
          {numInput(style.maxWidth, (v) => patch({ maxWidth: v }), { min: 1, max: 2000, step: 1, placeholder: "Auto" })}
        </label>
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Width unit
          </span>
          <select
            value={style.maxWidthUnit || "ch"}
            onChange={(e) => patch({ maxWidthUnit: e.target.value })}
            className="w-full rounded px-2 py-1.5 text-sm outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
          >
            {["ch", "px", "rem", "em", "%", "vw"].map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Align
          </span>
          <select
            value={style.textAlign || ""}
            onChange={(e) => patch({ textAlign: e.target.value })}
            className="w-full rounded px-2 py-1.5 text-sm outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
          >
            <option value="">Default</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </label>
        <label className="block">
          <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
            Transform
          </span>
          <select
            value={style.textTransform || ""}
            onChange={(e) => patch({ textTransform: e.target.value })}
            className="w-full rounded px-2 py-1.5 text-sm outline-none"
            style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
          >
            <option value="">None</option>
            <option value="uppercase">Uppercase</option>
            <option value="lowercase">Lowercase</option>
            <option value="capitalize">Capitalize</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
          Decoration
        </span>
        <select
          value={style.textDecoration || ""}
          onChange={(e) => patch({ textDecoration: e.target.value })}
          className="w-full rounded px-2 py-1.5 text-sm outline-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        >
          <option value="">None</option>
          <option value="underline">Underline</option>
          <option value="line-through">Strikethrough</option>
          <option value="overline">Overline</option>
        </select>
      </label>

      <button
        type="button"
        onClick={() => onChange({})}
        className="text-[10px] uppercase tracking-wide self-start"
        style={{ color: C.accent }}
      >
        Reset to site default
      </button>
    </div>
  );
}

export { TEXT_STYLE_DEFAULTS };
