import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "../api/base44Client";
import { useSiteConfig } from "../lib/ConfigProvider";
import { THEME_KEYS } from "../lib/siteConfigDefaults";

const THEME_LABELS = {
  parchment: "Parchment",
  parchmentDeep: "Parchment (deep)",
  paper: "Paper",
  ink: "Ink",
  inkSoft: "Ink (soft)",
  inkFaint: "Ink (faint)",
  forest: "Forest",
  forestDeep: "Forest (deep)",
  moss: "Moss",
  clay: "Clay (accent)",
  claySoft: "Clay (soft)",
};

const TABS = ["Theme", "Content", "Journeys"];

function Field({ label, value, onChange, multiline }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="meta-row text-ink-faint">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="font-body text-sm text-ink bg-parchment border border-line rounded px-3 py-2.5 leading-relaxed outline-none focus:border-clay"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-body text-sm text-ink bg-parchment border border-line rounded px-3 py-2.5 outline-none focus:border-clay"
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
      <div className="max-w-sm w-full bg-parchment rounded-lg p-9">
        <h1 className="font-display text-2xl text-ink mb-2">Understory Studio</h1>
        <p className="font-body text-ink-soft text-sm mb-7">Sign in to edit the live site.</p>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-line rounded px-4 py-3 font-body text-sm bg-paper outline-none focus:border-clay"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-line rounded px-4 py-3 font-body text-sm bg-paper outline-none focus:border-clay"
          />
          {error && <p className="text-clay text-xs">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="meta-row bg-ink text-parchment rounded-full py-3 hover:bg-clay transition-colors disabled:opacity-50"
          >
            {busy ? "Signing in\u2026" : "Sign In"}
          </button>
        </form>
        <button
          onClick={() => base44.auth.loginWithProvider("google", window.location.href)}
          className="mt-4 w-full meta-row border border-ink/30 rounded-full py-3 hover:border-clay hover:text-clay transition-colors"
        >
          Continue with Google
        </button>
        <Link to="/" className="block mt-6 text-center meta-row text-ink-faint hover:text-clay">
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
        <span className="meta-row text-parchment/60">Checking session&hellip;</span>
      </div>
    );
  }

  if (!user) {
    return <LoginGate onLoggedIn={checkAuth} />;
  }

  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-line px-6 md:px-10 py-5 flex items-center justify-between sticky top-0 bg-parchment z-10">
        <div>
          <h1 className="font-display text-lg text-ink">Understory Studio</h1>
          <p className="meta-row text-ink-faint mt-1">Signed in as {user.email}</p>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/" target="_blank" className="meta-row text-ink-soft hover:text-clay transition-colors">
            View site &rarr;
          </Link>
          <button onClick={logout} className="meta-row text-ink-faint hover:text-clay transition-colors">
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
              className={`meta-row px-5 py-2.5 rounded-full transition-colors ${
                tab === t ? "bg-ink text-parchment" : "text-ink-soft hover:text-clay"
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
                  className="h-11 w-11 rounded cursor-pointer border border-line shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="meta-row text-ink-soft block mb-1">{THEME_LABELS[key]}</label>
                  <input
                    type="text"
                    value={draft.theme[key]}
                    onChange={(e) => updateField("theme", key, e.target.value)}
                    className="font-mono text-xs text-ink-faint bg-transparent w-full outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "Content" && (
          <div className="flex flex-col gap-10">
            <section>
              <h2 className="eyebrow text-clay mb-4">Hero</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field label="Eyebrow" value={draft.hero.eyebrow} onChange={(v) => updateField("hero", "eyebrow", v)} />
                <Field
                  label="Title — line 1"
                  value={draft.hero.titleLine1}
                  onChange={(v) => updateField("hero", "titleLine1", v)}
                />
                <Field
                  label="Title — line 2"
                  value={draft.hero.titleLine2}
                  onChange={(v) => updateField("hero", "titleLine2", v)}
                />
                <Field label="Tagline" value={draft.hero.tagline} onChange={(v) => updateField("hero", "tagline", v)} />
              </div>
            </section>

            <section>
              <h2 className="eyebrow text-clay mb-4">Philosophy</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field
                  label="Eyebrow"
                  value={draft.philosophy.eyebrow}
                  onChange={(v) => updateField("philosophy", "eyebrow", v)}
                />
                <Field
                  label="Background image URL"
                  value={draft.philosophy.backgroundImage}
                  onChange={(v) => updateField("philosophy", "backgroundImage", v)}
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
              <h2 className="eyebrow text-clay mb-4">Recognition</h2>
              <div className="flex flex-col gap-4 bg-paper rounded-lg p-5">
                <Field
                  label="Press mentions (comma-separated)"
                  value={draft.recognition.press.join(", ")}
                  onChange={(v) =>
                    updateField(
                      "recognition",
                      "press",
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
          </div>
        )}

        {tab === "Journeys" && (
          <div className="flex flex-col gap-8">
            {draft.journeys.map((journey) => (
              <div key={journey.slug} className="bg-paper rounded-lg p-5">
                <h2 className="eyebrow text-clay mb-4">{journey.slug}</h2>
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
                    label="Description"
                    value={journey.description}
                    onChange={(v) => updateJourney(journey.slug, "description", v)}
                    multiline
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 inset-x-0 bg-ink px-6 md:px-10 py-4 flex items-center justify-between z-20">
        <span className="meta-row text-parchment/60">
          {saveState === "saving" && "Saving\u2026"}
          {saveState === "saved" && "Saved — live for anyone loading the site."}
          {saveState === "error" && `Error: ${saveError}`}
          {saveState === "idle" && "Unsaved changes are local until you save."}
        </span>
        <button
          onClick={handleSave}
          disabled={saveState === "saving"}
          className="meta-row bg-clay text-paper px-8 py-3 rounded-full hover:bg-clay-soft transition-colors disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
      <div className="h-20" />
    </div>
  );
}
