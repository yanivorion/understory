import { useCallback, useEffect, useState } from "react";
import { base44 } from "../api/base44Client";
import { useSiteConfig } from "../lib/ConfigProvider";
import { useEditorUI } from "../lib/EditorUIContext";
import { THEME_KEYS, BACKGROUND_TYPE_SUPPORT } from "../lib/siteConfigDefaults";
import { SEQUENCE_OPTIONS } from "../lib/frameSequences";
import {
  createCustomSection,
  defaultBackgroundForSection,
  getSectionLabel,
  insertSection,
  isPlaygroundSectionId,
  NATIVE_BG_HEX,
  reorderSections,
  resolveSectionOrder,
} from "../lib/homeSections";
import { createPlaygroundSection, PLAYGROUND_MANIFESTS } from "../lib/playgroundRegistry";
import PlaygroundConfigEditor from "./PlaygroundConfigEditor";
import PlaygroundPicker from "./PlaygroundPicker";
import TextStyleEditor from "./TextStyleEditor";
import { buildStripGradient, normalizeGradientStrip, stripOverlapVh } from "../lib/gradientStrip";
import { TEXT_FIELD_REGISTRY } from "../lib/textStyles";

// Fixed, theme-independent colors for the editor chrome. Deliberately NOT
// using the site's own bg-ink/text-paper/etc. utility classes — those are
// backed by CSS vars that this very panel lets someone edit, so the panel
// needs to stay legible no matter what the live theme is set to.
const C = {
  bg: "#17130c",
  card: "#241f16",
  cardAlt: "#1c1810",
  border: "#3a3226",
  text: "#f1ead9",
  textMuted: "#b7ac96",
  textFaint: "#7d745f",
  accent: "#c99a5b",
  accentText: "#17130c",
  inputBg: "#0f0c07",
  danger: "#d9784a",
};

const THEME_LABELS = {
  ink: "Ink",
  bark: "Bark (forest green)",
  umber: "Umber",
  moss: "Moss",
  sage: "Sage",
  clay: "Clay (peach accent)",
  amber: "Amber (gold)",
  paper: "Paper (cream)",
  parch: "Parchment",
  fog: "Fog",
  mist: "Mist",
};

const BACKGROUND_LABELS = {
  hero: "Hero",
  philosophy: "Philosophy",
  journeys: "Journeys",
  arrival: "Arrival",
  tryThis: "Try This",
  recognition: "Recognition",
  contact: "Contact band",
};

const TABS = ["Theme", "Typography", "Content", "Journeys", "Sections", "Components", "Backgrounds"];

function Field({ label, value, onChange, multiline }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full rounded px-3 py-2.5 text-sm leading-relaxed outline-none resize-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded px-3 py-2.5 text-sm outline-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        />
      )}
    </label>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded px-3 py-2.5 text-sm outline-none"
        style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function GradientEndpoint({ title, colorKey, opacityKey, strip, onChange, sectionKey, allowDefault, inheritFrom }) {
  const fallback = NATIVE_BG_HEX[sectionKey] || "#141009";
  const inherited = inheritFrom ? strip[inheritFrom] : "";
  const color = strip[colorKey] || inherited || fallback;
  const opacity = strip[opacityKey] ?? (opacityKey === "opacity" ? 1 : 0);

  return (
    <div className="rounded-md p-2.5" style={{ background: C.inputBg, border: `1px solid ${C.border}` }}>
      <span className="block mb-2 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
        {title}
      </span>
      <div className="flex items-center gap-2 mb-2">
        <input
          type="color"
          value={color}
          onChange={(e) => onChange({ ...strip, [colorKey]: e.target.value })}
          className="h-8 w-8 rounded cursor-pointer shrink-0"
          style={{ border: `1px solid ${C.border}` }}
        />
        {allowDefault && (
          <button
            type="button"
            onClick={() => onChange({ ...strip, [colorKey]: "" })}
            className="text-[10px] uppercase tracking-wide"
            style={{ color: C.textMuted }}
          >
            Section default
          </button>
        )}
      </div>
      <label className="block">
        <span className="block mb-1 text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
          Opacity ({Math.round(opacity * 100)}%)
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={opacity}
          onChange={(e) => onChange({ ...strip, [opacityKey]: parseFloat(e.target.value) })}
          className="w-full"
        />
      </label>
    </div>
  );
}

function GradientStripControls({ label, value, onChange, sectionKey, position }) {
  const strip = normalizeGradientStrip(value);
  const edgeLabel = position === "top" ? "Edge (top)" : "Edge (bottom)";
  const innerLabel = position === "top" ? "Inner (fade down)" : "Inner (fade up)";

  return (
    <div className="rounded-lg p-3" style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}>
      <label className="flex items-center gap-2 mb-3 cursor-pointer">
        <input
          type="checkbox"
          checked={!!strip.enabled}
          onChange={(e) => onChange({ ...strip, enabled: e.target.checked })}
        />
        <span className="text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
          {label}
        </span>
      </label>
      {strip.enabled && (
        <div className="flex flex-col gap-3">
          <div
            className="h-10 w-full rounded-md"
            style={{
              border: `1px solid ${C.border}`,
              background: buildStripGradient(strip, position, sectionKey),
            }}
            title="Gradient preview"
          />
          <div className="grid grid-cols-2 gap-2">
            <GradientEndpoint
              title={edgeLabel}
              colorKey="color"
              opacityKey="opacity"
              strip={strip}
              onChange={onChange}
              sectionKey={sectionKey}
              allowDefault
            />
            <GradientEndpoint
              title={innerLabel}
              colorKey="colorEnd"
              opacityKey="opacityEnd"
              strip={strip}
              onChange={onChange}
              sectionKey={sectionKey}
              allowDefault={false}
              inheritFrom="color"
            />
          </div>
          <label className="block">
            <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
              Strip height ({strip.height ?? 22}vh)
            </span>
            <input
              type="range"
              min="8"
              max="45"
              step="1"
              value={strip.height ?? 22}
              onChange={(e) => onChange({ ...strip, height: parseInt(e.target.value, 10) })}
              className="w-full"
            />
          </label>
          <label className="block">
            <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
              Overlap into neighbor ({strip.overlap ?? 100}%)
            </span>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={strip.overlap ?? 100}
              onChange={(e) => onChange({ ...strip, overlap: parseInt(e.target.value, 10) })}
              className="w-full"
            />
            <span className="mt-1 block text-[10px]" style={{ color: C.textFaint }}>
              Extends {stripOverlapVh(strip).toFixed(1)}vh into the {position === "top" ? "section above" : "section below"}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
function SectionCard({ title, children }) {
  return (
    <section>
      <h3 className="text-[11px] uppercase tracking-wide mb-3" style={{ color: C.accent }}>
        {title}
      </h3>
      <div className="flex flex-col gap-4 rounded-lg p-4" style={{ background: C.card }}>
        {children}
      </div>
    </section>
  );
}

function LoginGate({ onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await base44.auth.loginViaEmailPassword(email, password);
      onLoggedIn();
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-6">
      <div>
        <h2 className="text-lg" style={{ color: C.text, fontFamily: "Merriweather, Georgia, serif" }}>
          Understory Editor
        </h2>
        <p className="text-sm mt-1.5" style={{ color: C.textMuted }}>
          Sign in to edit the live site.
        </p>
      </div>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded px-4 py-3 text-sm outline-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded px-4 py-3 text-sm outline-none"
          style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
        />
        {error && (
          <p className="text-xs" style={{ color: C.danger }}>
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="rounded-full py-3 text-[11px] uppercase tracking-wide transition-opacity disabled:opacity-50"
          style={{ background: C.accent, color: C.accentText }}
        >
          {busy ? "Signing in\u2026" : "Sign In"}
        </button>
      </form>
      <button
        onClick={() => base44.auth.loginWithProvider("google", window.location.href)}
        className="rounded-full py-3 text-[11px] uppercase tracking-wide"
        style={{ border: `1px solid ${C.border}`, color: C.textMuted }}
      >
        Continue with Google
      </button>
    </div>
  );
}

export default function EditorPanel() {
  const { config, dirty, updateLocal, persist, discardLocal, loading: configLoading } = useSiteConfig();
  const { open, setOpen, setSelectedSection, selectedSection } = useEditorUI();
  const [user, setUser] = useState(undefined); // undefined = checking, null = anonymous
  const [tab, setTab] = useState("Theme");
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [saveError, setSaveError] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [componentQuery, setComponentQuery] = useState("");
  const sectionOrder = resolveSectionOrder(config);
  const selectedCustom = selectedSection ? config.customSections?.[selectedSection] : null;

  const checkAuth = useCallback(async () => {
    try {
      const me = await base44.auth.me();
      setUser(me);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // /studio is a discoverable entry point that just opens this panel, then
  // cleans itself out of the URL — the panel lives above the router, not as
  // its own route, so it can stay open while you browse the real site.
  useEffect(() => {
    if (window.location.pathname === "/studio") {
      setOpen(true);
      window.history.replaceState(null, "", "/");
    }
  }, [setOpen]);

  const addSectionAtEnd = () => {
    const custom = createCustomSection();
    const order = insertSection(sectionOrder, sectionOrder.length - 1, custom.id);
    updateLocal({
      homeSectionOrder: order,
      customSections: { ...(config.customSections || {}), [custom.id]: custom },
      backgrounds: { [custom.id]: defaultBackgroundForSection(custom.id) },
    });
    setSelectedSection(custom.id);
  };

  const addPlaygroundAtEnd = (playgroundId) => {
    const section = createPlaygroundSection(playgroundId);
    const order = insertSection(sectionOrder, sectionOrder.length - 1, section.id);
    updateLocal({
      homeSectionOrder: order,
      customSections: { ...(config.customSections || {}), [section.id]: section },
      backgrounds: { [section.id]: defaultBackgroundForSection(section.id) },
    });
    setSelectedSection(section.id);
    setPickerOpen(false);
  };

  const updatePlaygroundConfig = (sectionId, key, value) =>
    updateLocal({ customSections: { [sectionId]: { config: { [key]: value } } } });

  const filteredComponents = PLAYGROUND_MANIFESTS.filter((m) => {
    const q = componentQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      m.label.toLowerCase().includes(q) ||
      m.type.toLowerCase().includes(q) ||
      (m.description || "").toLowerCase().includes(q)
    );
  });

  const updateField = (section, key, value) => updateLocal({ [section]: { [key]: value } });
  const updateJourney = (slug, key, value) =>
    updateLocal({ journeys: config.journeys.map((j) => (j.slug === slug ? { ...j, [key]: value } : j)) });
  const updateBackground = (section, key, value) =>
    updateLocal({ backgrounds: { [section]: { [key]: value } } });
  const updateTextStyle = (key, value) =>
    updateLocal({ textStyles: { [key]: value } });

  const handleSave = async () => {
    setSaveState("saving");
    setSaveError(null);
    try {
      await persist();
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (err) {
      setSaveState("error");
      setSaveError(err?.message || String(err));
    }
  };

  const logout = () => base44.auth.logout(`${window.location.origin}/`);

  return (
    <>
      {pickerOpen && <PlaygroundPicker onSelect={addPlaygroundAtEnd} onClose={() => setPickerOpen(false)} />}
      {/* Always-visible toggle tab */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed z-[998] top-1/2 -translate-y-1/2 right-0 rounded-l-lg px-2 py-4 text-[11px] uppercase tracking-wide [writing-mode:vertical-rl] transition-transform"
        style={{
          background: C.accent,
          color: C.accentText,
          transform: open ? "translateX(-420px)" : undefined,
        }}
      >
        {open ? "Close" : "Edit"}
      </button>

      {/* Backdrop (click to close) — light scrim so the live site stays visible */}
      {open && (
        <div
          className="fixed inset-0 z-[996]"
          style={{ background: "rgba(0,0,0,0.25)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className="fixed z-[997] top-0 right-0 h-full w-full sm:w-[420px] flex flex-col shadow-2xl transition-transform duration-300"
        style={{
          background: C.bg,
          color: C.text,
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        {user === undefined ? (
          <div className="flex-1 flex items-center justify-center">
            <span className="text-sm" style={{ color: C.textMuted }}>
              Checking session&hellip;
            </span>
          </div>
        ) : !user ? (
          <LoginGate onLoggedIn={checkAuth} />
        ) : (
          <>
            <header
              className="px-5 py-4 flex items-center justify-between shrink-0"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div>
                <h1 className="text-base" style={{ fontFamily: "Merriweather, Georgia, serif" }}>
                  Understory Editor
                </h1>
                <p className="text-xs mt-0.5" style={{ color: C.textFaint }}>
                  {user.email}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={logout} className="text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
                  Log out
                </button>
                <button onClick={() => setOpen(false)} className="text-lg" style={{ color: C.textMuted }} aria-label="Close">
                  &times;
                </button>
              </div>
            </header>

            <div className="px-5 py-3 flex gap-1.5 flex-wrap shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-3.5 py-2 rounded-full text-[11px] uppercase tracking-wide transition-colors"
                  style={
                    tab === t
                      ? { background: C.accent, color: C.accentText }
                      : { background: C.cardAlt, color: C.textMuted }
                  }
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-8">
              {configLoading && (
                <p className="text-xs" style={{ color: C.textFaint }}>
                  Loading current config&hellip;
                </p>
              )}

              {tab === "Theme" && (
                <div className="grid grid-cols-1 gap-3">
                  {THEME_KEYS.map((key) => (
                    <div key={key} className="flex items-center gap-3 rounded-lg p-3" style={{ background: C.card }}>
                      <input
                        type="color"
                        value={config.theme[key]}
                        onChange={(e) => updateField("theme", key, e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer shrink-0"
                        style={{ border: `1px solid ${C.border}` }}
                      />
                      <div className="flex-1 min-w-0">
                        <label className="text-xs block mb-1" style={{ color: C.textMuted }}>
                          {THEME_LABELS[key]}
                        </label>
                        <input
                          type="text"
                          value={config.theme[key]}
                          onChange={(e) => updateField("theme", key, e.target.value)}
                          className="font-mono text-xs w-full outline-none bg-transparent"
                          style={{ color: C.textFaint }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "Typography" && (
                <>
                  <p className="text-sm" style={{ color: C.textMuted }}>
                    Per-field typography — font family (Wix / Google catalog), size, weight, spacing, color, alignment, and more. Changes preview live.
                  </p>
                  {[...new Set(TEXT_FIELD_REGISTRY.map((f) => f.group))].map((group) => (
                    <SectionCard key={group} title={group}>
                      {TEXT_FIELD_REGISTRY.filter((f) => f.group === group).map((field) => (
                        <details
                          key={field.key}
                          className="rounded-lg"
                          style={{ background: C.cardAlt, border: `1px solid ${C.border}` }}
                        >
                          <summary
                            className="cursor-pointer px-3 py-2.5 text-sm list-none"
                            style={{ color: C.text }}
                          >
                            {field.label}
                          </summary>
                          <div className="px-3 pb-3">
                            <TextStyleEditor
                              styleKey={field.key}
                              textStyles={config.textStyles}
                              value={config.textStyles?.[field.key] || {}}
                              onChange={(v) => updateTextStyle(field.key, v)}
                              preview={
                                field.key.includes("title") || field.key.includes("heading") || field.key.includes("line1")
                                  ? "Return to What Remembers You"
                                  : field.key.includes("eyebrow")
                                    ? "Philosophy"
                                    : "The forest holds what the mind has been avoiding."
                              }
                            />
                          </div>
                        </details>
                      ))}
                    </SectionCard>
                  ))}
                </>
              )}

              {tab === "Content" && (
                <>
                  <SectionCard title="Hero">
                    <Field label="Eyebrow" value={config.hero.eyebrow} onChange={(v) => updateField("hero", "eyebrow", v)} />
                    <Field label="Title" value={config.hero.title} onChange={(v) => updateField("hero", "title", v)} />
                    <Field label="Tagline" value={config.hero.tagline} onChange={(v) => updateField("hero", "tagline", v)} />
                    <Field
                      label="Scroll hint"
                      value={config.hero.scrollHint}
                      onChange={(v) => updateField("hero", "scrollHint", v)}
                    />
                  </SectionCard>

                  <SectionCard title="Philosophy">
                    <Field
                      label="Eyebrow"
                      value={config.philosophy.eyebrow}
                      onChange={(v) => updateField("philosophy", "eyebrow", v)}
                    />
                    <Field
                      label="Lead sentence"
                      value={config.philosophy.lead}
                      onChange={(v) => updateField("philosophy", "lead", v)}
                    />
                    <Field
                      label="Text"
                      value={config.philosophy.text}
                      onChange={(v) => updateField("philosophy", "text", v)}
                      multiline
                    />
                  </SectionCard>

                  <SectionCard title="Recognition">
                    <Field
                      label="Eyebrow"
                      value={config.recognition.eyebrow}
                      onChange={(v) => updateField("recognition", "eyebrow", v)}
                    />
                    <Field
                      label="Press mentions (comma-separated)"
                      value={config.recognition.items.join(", ")}
                      onChange={(v) =>
                        updateField(
                          "recognition",
                          "items",
                          v.split(",").map((s) => s.trim()).filter(Boolean)
                        )
                      }
                    />
                    <Field
                      label="Award"
                      value={config.recognition.award}
                      onChange={(v) => updateField("recognition", "award", v)}
                    />
                  </SectionCard>

                  <SectionCard title="Arrival">
                    <Field label="Eyebrow" value={config.arrival.eyebrow} onChange={(v) => updateField("arrival", "eyebrow", v)} />
                    <Field label="Line 1" value={config.arrival.line1} onChange={(v) => updateField("arrival", "line1", v)} />
                    <Field label="Line 2" value={config.arrival.line2} onChange={(v) => updateField("arrival", "line2", v)} />
                  </SectionCard>

                  <SectionCard title="Contact">
                    <Field label="Eyebrow" value={config.contact.eyebrow} onChange={(v) => updateField("contact", "eyebrow", v)} />
                    <Field label="Heading" value={config.contact.heading} onChange={(v) => updateField("contact", "heading", v)} />
                    <Field
                      label="Blurb"
                      value={config.contact.blurb}
                      onChange={(v) => updateField("contact", "blurb", v)}
                      multiline
                    />
                    <Field label="Email" value={config.contact.email} onChange={(v) => updateField("contact", "email", v)} />
                    <Field label="Phone" value={config.contact.phone} onChange={(v) => updateField("contact", "phone", v)} />
                    <Field
                      label="Address line 1"
                      value={config.contact.addressLine1}
                      onChange={(v) => updateField("contact", "addressLine1", v)}
                    />
                    <Field
                      label="Address line 2"
                      value={config.contact.addressLine2}
                      onChange={(v) => updateField("contact", "addressLine2", v)}
                    />
                  </SectionCard>

                  <SectionCard title="Footer">
                    <Field
                      label="Tagline"
                      value={config.footer.tagline}
                      onChange={(v) => updateField("footer", "tagline", v)}
                      multiline
                    />
                    <Field
                      label="Bottom note"
                      value={config.footer.bottomNote}
                      onChange={(v) => updateField("footer", "bottomNote", v)}
                    />
                  </SectionCard>
                </>
              )}

              {tab === "Journeys" &&
                config.journeys.map((journey) => (
                  <SectionCard key={journey.slug} title={journey.slug}>
                    <Field label="Title" value={journey.title} onChange={(v) => updateJourney(journey.slug, "title", v)} />
                    <Field
                      label="Tagline"
                      value={journey.tagline}
                      onChange={(v) => updateJourney(journey.slug, "tagline", v)}
                    />
                    <Field
                      label="Duration"
                      value={journey.duration}
                      onChange={(v) => updateJourney(journey.slug, "duration", v)}
                    />
                    <Field
                      label="Location"
                      value={journey.location}
                      onChange={(v) => updateJourney(journey.slug, "location", v)}
                    />
                    <Field label="Sound" value={journey.sound} onChange={(v) => updateJourney(journey.slug, "sound", v)} />
                    <Field
                      label="Intro"
                      value={journey.intro}
                      onChange={(v) => updateJourney(journey.slug, "intro", v)}
                      multiline
                    />
                  </SectionCard>
                ))}

              {tab === "Sections" && (
                <>
                  <p className="text-sm" style={{ color: C.textMuted }}>
                    Reorder sections on the page using the controls that appear on the left while editing. You can also
                    adjust order here.
                  </p>
                  {sectionOrder.map((sectionKey, index) => (
                    <div
                      key={sectionKey}
                      className="flex items-center justify-between gap-3 rounded-lg p-3"
                      style={{ background: C.card, border: `1px solid ${C.border}` }}
                    >
                      <div>
                        <p className="text-sm" style={{ color: C.text }}>
                          {getSectionLabel(sectionKey, config.customSections)}
                        </p>
                        <p className="text-[10px] uppercase tracking-wide mt-1" style={{ color: C.textFaint }}>
                          Position {index + 1}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() =>
                            updateLocal({ homeSectionOrder: reorderSections(sectionOrder, index, index - 1) })
                          }
                          className="rounded px-2 py-1 text-xs disabled:opacity-30"
                          style={{ background: C.border, color: C.text }}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          disabled={index === sectionOrder.length - 1}
                          onClick={() =>
                            updateLocal({ homeSectionOrder: reorderSections(sectionOrder, index, index + 1) })
                          }
                          className="rounded px-2 py-1 text-xs disabled:opacity-30"
                          style={{ background: C.border, color: C.text }}
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSectionAtEnd}
                    className="rounded-full py-3 text-[11px] uppercase tracking-wide"
                    style={{ background: C.accent, color: C.accentText }}
                  >
                    Add content section
                  </button>
                  <button
                    type="button"
                    onClick={() => setPickerOpen(true)}
                    className="rounded-full py-3 text-[11px] uppercase tracking-wide"
                    style={{ border: `1px solid ${C.border}`, color: C.textMuted }}
                  >
                    Add playground component
                  </button>
                </>
              )}

              {tab === "Components" && (
                <>
                  {selectedCustom && isPlaygroundSectionId(selectedSection, config.customSections) && (
                    <SectionCard title={`Edit: ${selectedCustom.label || selectedCustom.playgroundId}`}>
                      <PlaygroundConfigEditor
                        playgroundId={selectedCustom.playgroundId}
                        config={selectedCustom.config || {}}
                        onChange={(key, value) => updatePlaygroundConfig(selectedSection, key, value)}
                      />
                    </SectionCard>
                  )}
                  <input
                    type="search"
                    placeholder={`Search ${PLAYGROUND_MANIFESTS.length} components…`}
                    value={componentQuery}
                    onChange={(e) => setComponentQuery(e.target.value)}
                    className="w-full rounded px-3 py-2.5 text-sm outline-none"
                    style={{ background: C.inputBg, color: C.text, border: `1px solid ${C.border}` }}
                  />
                  <p className="text-[10px] uppercase tracking-wide" style={{ color: C.textFaint }}>
                    {filteredComponents.length} of {PLAYGROUND_MANIFESTS.length} — click to add at page end
                  </p>
                  <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
                    {filteredComponents.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => addPlaygroundAtEnd(item.id)}
                        className="text-left rounded-lg px-3 py-3"
                        style={{ background: C.card, border: `1px solid ${C.border}`, color: C.text }}
                      >
                        <p className="text-sm">{item.label}</p>
                        <p className="text-[10px] mt-1 uppercase tracking-wide" style={{ color: C.textFaint }}>
                          {item.type}
                        </p>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {tab === "Backgrounds" &&
                sectionOrder.map((sectionKey) => {
                  const bg = config.backgrounds[sectionKey] || defaultBackgroundForSection(sectionKey);
                  const supported = BACKGROUND_TYPE_SUPPORT[sectionKey] || ["color", "image", "scrub"];
                  return (
                    <SectionCard key={sectionKey} title={BACKGROUND_LABELS[sectionKey] || getSectionLabel(sectionKey, config.customSections)}>
                      <Select
                        label="Type"
                        value={bg.type}
                        onChange={(v) => updateBackground(sectionKey, "type", v)}
                        options={supported.map((t) => ({ value: t, label: t[0].toUpperCase() + t.slice(1) }))}
                      />

                      {bg.type === "color" && (
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={bg.color || NATIVE_BG_HEX[sectionKey] || "#141009"}
                            onChange={(e) => updateBackground(sectionKey, "color", e.target.value)}
                            className="h-10 w-10 rounded cursor-pointer shrink-0"
                            style={{ border: `1px solid ${C.border}` }}
                          />
                          <button
                            onClick={() => updateBackground(sectionKey, "color", "")}
                            className="text-[11px] uppercase tracking-wide"
                            style={{ color: C.textMuted }}
                          >
                            Reset to theme default
                          </button>
                        </div>
                      )}

                      {bg.type === "image" && (
                        <>
                          <Field
                            label="Image URL"
                            value={bg.image || ""}
                            onChange={(v) => updateBackground(sectionKey, "image", v)}
                          />
                          <label className="block">
                            <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
                              Overlay darkness ({Math.round((bg.overlay || 0) * 100)}%)
                            </span>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={bg.overlay || 0}
                              onChange={(e) => updateBackground(sectionKey, "overlay", parseFloat(e.target.value))}
                              className="w-full"
                            />
                          </label>
                        </>
                      )}

                      {bg.type === "scrub" && (
                        <>
                          <Select
                            label="Frame sequence"
                            value={bg.sequenceId || SEQUENCE_OPTIONS[0]?.id}
                            onChange={(v) => updateBackground(sectionKey, "sequenceId", v)}
                            options={SEQUENCE_OPTIONS.map((s) => ({ value: s.id, label: s.label }))}
                          />
                          <label className="block">
                            <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
                              Scroll distance ({bg.scrubVh ?? 320}vh) — section height is 100vh + this value
                            </span>
                            <input
                              type="range"
                              min="100"
                              max="2000"
                              step="50"
                              value={Math.min(bg.scrubVh ?? 320, 2000)}
                              onChange={(e) => updateBackground(sectionKey, "scrubVh", parseInt(e.target.value, 10))}
                              className="w-full"
                            />
                            <input
                              type="number"
                              min="100"
                              max="3000"
                              step="50"
                              value={bg.scrubVh ?? 320}
                              onChange={(e) => {
                                const v = parseInt(e.target.value, 10);
                                if (!Number.isNaN(v)) updateBackground(sectionKey, "scrubVh", Math.max(100, Math.min(3000, v)));
                              }}
                              className="mt-2 w-full rounded border px-2 py-1.5 text-sm"
                              style={{ borderColor: C.border, background: C.inputBg, color: C.text }}
                            />
                          </label>
                          <label className="block">
                            <span className="block mb-1.5 text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
                              Extra dark overlay ({Math.round((bg.overlay || 0) * 100)}%)
                            </span>
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={bg.overlay || 0}
                              onChange={(e) => updateBackground(sectionKey, "overlay", parseFloat(e.target.value))}
                              className="w-full"
                            />
                          </label>
                        </>
                      )}

                      <GradientStripControls
                        label="Top gradient strip"
                        position="top"
                        value={bg.gradientTop}
                        sectionKey={sectionKey}
                        onChange={(v) => updateBackground(sectionKey, "gradientTop", v)}
                      />
                      <GradientStripControls
                        label="Bottom gradient strip"
                        position="bottom"
                        value={bg.gradientBottom}
                        sectionKey={sectionKey}
                        onChange={(v) => updateBackground(sectionKey, "gradientBottom", v)}
                      />
                    </SectionCard>
                  );
                })}
            </div>

            <footer
              className="px-5 py-4 flex items-center justify-between gap-3 shrink-0"
              style={{ borderTop: `1px solid ${C.border}`, background: C.cardAlt }}
            >
              <span className="text-xs" style={{ color: C.textFaint }}>
                {saveState === "saving" && "Saving\u2026"}
                {saveState === "saved" && "Saved \u2014 live for everyone."}
                {saveState === "error" && `Error: ${saveError}`}
                {saveState === "idle" && dirty && "Previewing unsaved changes."}
                {saveState === "idle" && !dirty && "No unsaved changes."}
              </span>
              <div className="flex items-center gap-3 shrink-0">
                {dirty && (
                  <button onClick={discardLocal} className="text-[11px] uppercase tracking-wide" style={{ color: C.textMuted }}>
                    Discard
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={saveState === "saving" || !dirty}
                  className="rounded-full px-6 py-2.5 text-[11px] uppercase tracking-wide disabled:opacity-40"
                  style={{ background: C.accent, color: C.accentText }}
                >
                  Save
                </button>
              </div>
            </footer>
          </>
        )}
      </div>
    </>
  );
}
