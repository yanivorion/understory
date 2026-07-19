import { useCallback, useEffect, useState } from "react";
import { base44 } from "../api/base44Client";
import { useSiteConfig } from "../lib/ConfigProvider";
import { THEME_KEYS, BACKGROUND_SECTIONS, BACKGROUND_TYPE_SUPPORT } from "../lib/siteConfigDefaults";
import { SEQUENCE_OPTIONS } from "../lib/frameSequences";

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
  arrival: "Arrival",
  recognition: "Recognition",
  contact: "Contact band",
};

// Shown in the color swatch when a section's color override is empty (i.e.
// "use the theme default") — matches each section's native Tailwind bg-*
// class so the swatch isn't misleadingly showing ink for everything.
const NATIVE_BG_HEX = {
  hero: "#141009",
  philosophy: "#041f0a",
  arrival: "#141009",
  recognition: "#141009",
  contact: "#e3d8c4",
};

const TABS = ["Theme", "Content", "Journeys", "Backgrounds"];

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
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(undefined); // undefined = checking, null = anonymous
  const [tab, setTab] = useState("Theme");
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const [saveError, setSaveError] = useState(null);

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
  }, []);

  const updateField = (section, key, value) => updateLocal({ [section]: { [key]: value } });
  const updateJourney = (slug, key, value) =>
    updateLocal({ journeys: config.journeys.map((j) => (j.slug === slug ? { ...j, [key]: value } : j)) });
  const updateBackground = (section, key, value) =>
    updateLocal({ backgrounds: { [section]: { [key]: value } } });

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

              {tab === "Backgrounds" &&
                BACKGROUND_SECTIONS.map((sectionKey) => {
                  const bg = config.backgrounds[sectionKey];
                  const supported = BACKGROUND_TYPE_SUPPORT[sectionKey] || ["color", "image", "scrub"];
                  return (
                    <SectionCard key={sectionKey} title={BACKGROUND_LABELS[sectionKey] || sectionKey}>
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
                              Scroll distance ({bg.scrubVh ?? 320}vh)
                            </span>
                            <input
                              type="range"
                              min="100"
                              max="500"
                              step="20"
                              value={bg.scrubVh ?? 320}
                              onChange={(e) => updateBackground(sectionKey, "scrubVh", parseInt(e.target.value, 10))}
                              className="w-full"
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
