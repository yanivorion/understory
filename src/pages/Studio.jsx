import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "../api/base44Client";
import { useSiteConfig } from "../lib/ConfigProvider";
import { THEME_KEYS } from "../lib/siteConfigDefaults";

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

const TABS = ["Theme", "Content", "Journeys"];

function Field({ label, value, onChange, multiline }) {
  return (
    <label className="block">
      <span className="meta text-mist block mb-1.5">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="prose-serif font-light text-sm text-ink bg-paper border border-ink/15 rounded px-3 py-2.5 leading-relaxed outline-none focus:border-amber w-full resize-none"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="prose-serif font-light text-sm text-ink bg-paper border border-ink/15 rounded px-3 py-2.5 outline-none focus:border-amber w-full"
        />
      )}
    </label>
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
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="max-w-sm w-full bg-parch rounded-lg p-9">
        <h1 className="display text-2xl text-ink mb-2">Understory Studio</h1>
        <p className="prose-serif font-light text-ink/70 text-sm mb-7">Sign in to edit the live site.</p>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-ink/20 rounded px-4 py-3 prose-serif font-light text-sm bg-paper outline-none focus:border-amber"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-ink/20 rounded px-4 py-3 prose-serif font-light text-sm bg-paper outline-none focus:border-amber"
          />
          {error && <p className="text-[#a2401f] text-xs">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="meta bg-ink text-parch rounded-full py-3 hover:bg-amber hover:text-ink transition-colors disabled:opacity-50"
          >
            {busy ? "Signing in\u2026" : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => base44.auth.loginWithProvider("google", window.location.href)}
          className="mt-4 w-full meta border border-ink/25 rounded-full py-3 hover:border-amber hover:text-amber transition-colors"
        >
          Continue with Google
        </button>
        <Link to="/" className="block mt-6 text-center meta text-ink/50 hover:text-amber transition-colors">
          &larr; Back to site
        </Link>
      </div>
    </div>
  );
}

export default function Studio() {
  const { config, saveConfig, loading: configLoading } = useSiteConfig();
  const [user, setUser] = useState(undefined); // undefined = checking, null = anonymous
  const [tab, setTab] = useState("Theme");
  const [draft, setDraft] = useState(config);
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

  useEffect(() => {
    if (!configLoading) setDraft(config);
  }, [config, configLoading]);

  const updateField = (section, key, value) => {
    setDraft((d) => ({ ...d, [section]: { ...d[section], [key]: value } }));
  };

  const updateJourney = (slug, key, value) => {
    setDraft((d) => ({
      ...d,
      journeys: d.journeys.map((j) => (j.slug === slug ? { ...j, [key]: value } : j)),
    }));
  };

  const handleSave = async () => {
    setSaveState("saving");
    setSaveError(null);
    try {
      await saveConfig(draft);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (err) {
      setSaveState("error");
      setSaveError(err?.message || String(err));
    }
  };

  const logout = () => base44.auth.logout(`${window.location.origin}/studio`);

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <span className="meta text-paper/60">Checking session&hellip;</span>
      </div>
    );
  }

  if (!user) {
    return <LoginGate onLoggedIn={checkAuth} />;
  }

  return (
    <div className="min-h-screen bg-parch">
      <header className="border-b border-ink/10 px-6 md:px-10 py-5 flex items-center justify-between sticky top-0 bg-parch z-10">
        <div>
          <h1 className="display text-lg text-ink">Understory Studio</h1>
          <p className="meta text-ink/50 mt-1">Signed in as {user.email}</p>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/" target="_blank" className="meta text-ink/70 hover:text-amber transition-colors">
            View site &rarr;
          </Link>
          <button onClick={logout} className="meta text-ink/50 hover:text-amber transition-colors">
            Log out
          </button>
        </div>
      </header>

      <div className="px-6 md:px-10 py-8 max-w-[1000px] mx-auto">
        <div className="flex gap-2 mb-8">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`meta px-5 py-2.5 rounded-full transition-colors ${
                tab === t ? "bg-ink text-parch" : "text-ink/70 hover:text-amber"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "Theme" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {THEME_KEYS.map((key) => (
              <div key={key} className="flex items-center gap-4 bg-paper rounded-lg p-4">
                <input
                  type="color"
                  value={draft.theme[key]}
                  onChange={(e) => updateField("theme", key, e.target.value)}
                  className="h-11 w-11 rounded cursor-pointer border border-ink/15 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="meta text-ink/70 block mb-1">{THEME_LABELS[key]}</label>
                  <input
                    type="text"
                    value={draft.theme[key]}
                    onChange={(e) => updateField("theme", key, e.target.value)}
                    className="font-mono text-xs text-ink/50 bg-transparent w-full outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Content" && (
          <div className="flex flex-col gap-10">
            <section>
              <h2 className="eyebrow text-amber mb-4">Hero</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field label="Eyebrow" value={draft.hero.eyebrow} onChange={(v) => updateField("hero", "eyebrow", v)} />
                <Field label="Title" value={draft.hero.title} onChange={(v) => updateField("hero", "title", v)} />
                <Field label="Tagline" value={draft.hero.tagline} onChange={(v) => updateField("hero", "tagline", v)} />
                <Field
                  label="Scroll hint"
                  value={draft.hero.scrollHint}
                  onChange={(v) => updateField("hero", "scrollHint", v)}
                />
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-amber mb-4">Philosophy</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field
                  label="Eyebrow"
                  value={draft.philosophy.eyebrow}
                  onChange={(v) => updateField("philosophy", "eyebrow", v)}
                />
                <Field
                  label="Lead sentence"
                  value={draft.philosophy.lead}
                  onChange={(v) => updateField("philosophy", "lead", v)}
                />
                <Field
                  label="Text"
                  value={draft.philosophy.text}
                  onChange={(v) => updateField("philosophy", "text", v)}
                  multiline
                />
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-amber mb-4">Recognition</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field
                  label="Eyebrow"
                  value={draft.recognition.eyebrow}
                  onChange={(v) => updateField("recognition", "eyebrow", v)}
                />
                <Field
                  label="Press mentions (comma-separated)"
                  value={draft.recognition.items.join(", ")}
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
                  value={draft.recognition.award}
                  onChange={(v) => updateField("recognition", "award", v)}
                />
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-amber mb-4">Arrival</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field
                  label="Eyebrow"
                  value={draft.arrival.eyebrow}
                  onChange={(v) => updateField("arrival", "eyebrow", v)}
                />
                <Field
                  label="Line 1"
                  value={draft.arrival.line1}
                  onChange={(v) => updateField("arrival", "line1", v)}
                />
                <Field
                  label="Line 2"
                  value={draft.arrival.line2}
                  onChange={(v) => updateField("arrival", "line2", v)}
                />
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-amber mb-4">Contact</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field
                  label="Eyebrow"
                  value={draft.contact.eyebrow}
                  onChange={(v) => updateField("contact", "eyebrow", v)}
                />
                <Field
                  label="Heading"
                  value={draft.contact.heading}
                  onChange={(v) => updateField("contact", "heading", v)}
                />
                <Field
                  label="Blurb"
                  value={draft.contact.blurb}
                  onChange={(v) => updateField("contact", "blurb", v)}
                  multiline
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Email" value={draft.contact.email} onChange={(v) => updateField("contact", "email", v)} />
                  <Field label="Phone" value={draft.contact.phone} onChange={(v) => updateField("contact", "phone", v)} />
                  <Field
                    label="Address line 1"
                    value={draft.contact.addressLine1}
                    onChange={(v) => updateField("contact", "addressLine1", v)}
                  />
                  <Field
                    label="Address line 2"
                    value={draft.contact.addressLine2}
                    onChange={(v) => updateField("contact", "addressLine2", v)}
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-amber mb-4">Footer</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field
                  label="Tagline"
                  value={draft.footer.tagline}
                  onChange={(v) => updateField("footer", "tagline", v)}
                  multiline
                />
                <Field
                  label="Bottom note"
                  value={draft.footer.bottomNote}
                  onChange={(v) => updateField("footer", "bottomNote", v)}
                />
              </div>
            </section>
          </div>
        )}

        {tab === "Journeys" && (
          <div className="flex flex-col gap-8">
            {draft.journeys.map((journey) => (
              <div key={journey.slug} className="bg-paper rounded-lg p-5">
                <h2 className="eyebrow text-amber mb-4">{journey.slug}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                </div>
                <div className="mt-4">
                  <Field
                    label="Intro"
                    value={journey.intro}
                    onChange={(v) => updateJourney(journey.slug, "intro", v)}
                    multiline
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-ink px-6 md:px-10 py-4 flex items-center justify-between z-20">
        <span className="meta text-parch/60">
          {saveState === "saving" && "Saving\u2026"}
          {saveState === "saved" && "Saved — live for anyone loading the site."}
          {saveState === "error" && `Error: ${saveError}`}
          {saveState === "idle" && "Unsaved changes are local until you save."}
        </span>
        <button
          onClick={handleSave}
          disabled={saveState === "saving"}
          className="meta bg-amber text-ink px-8 py-3 rounded-full hover:bg-clay transition-colors disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
      <div className="h-20" />
    </div>
  );
}
