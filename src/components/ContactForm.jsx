import { useState } from "react";

const FIELDS = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: false },
];

export default function ContactForm({ tone = "light" }) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    intent: "",
  });
  const [status, setStatus] = useState("idle");

  const isDark = tone === "dark";
  const inputBase =
    "w-full bg-transparent border-0 border-b py-3 font-body text-[16px] outline-none transition-colors placeholder:font-body";
  const inputTone = isDark
    ? "border-line-dark text-paper placeholder:text-paper/35 focus:border-clay-soft"
    : "border-line text-ink placeholder:text-ink-faint focus:border-clay";
  const labelTone = isDark ? "text-paper/45" : "text-ink-faint";

  const handleChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.name || !values.email) return;
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    try {
      const existing = JSON.parse(localStorage.getItem("understory-inquiries") || "[]");
      localStorage.setItem(
        "understory-inquiries",
        JSON.stringify([...existing, { ...values, submittedAt: new Date().toISOString() }])
      );
    } catch {
      /* localStorage unavailable — proceed silently */
    }
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="py-10">
        <div className={`eyebrow mb-4 ${isDark ? "text-clay-soft" : "text-clay"}`}>Received</div>
        <p className={`font-display text-[26px] md:text-[30px] leading-snug tracking-[0.01em] ${isDark ? "text-paper" : "text-ink"}`}>
          Thank you for reaching out. We'll write back within a day or two, gently.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.name === "phone" ? "md:col-span-2" : ""}>
            <label htmlFor={field.name} className={`meta-row block mb-2 ${labelTone}`}>
              {field.label}
              {field.required ? " *" : ""}
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              required={field.required}
              value={values[field.name]}
              onChange={handleChange}
              className={`${inputBase} ${inputTone}`}
            />
          </div>
        ))}
      </div>

      <div>
        <label htmlFor="intent" className={`meta-row block mb-2 ${labelTone}`}>
          What are you hoping to move through
        </label>
        <input
          id="intent"
          name="intent"
          type="text"
          value={values.intent}
          onChange={handleChange}
          placeholder="Optional"
          className={`${inputBase} ${inputTone}`}
        />
      </div>

      <div>
        <label htmlFor="message" className={`meta-row block mb-2 ${labelTone}`}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          className={`${inputBase} ${inputTone} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`mt-4 self-start meta-row px-8 py-4 rounded-full transition-colors disabled:opacity-60 ${
          isDark
            ? "bg-paper text-forest hover:bg-clay-soft"
            : "bg-ink text-parchment hover:bg-clay"
        }`}
      >
        {status === "sending" ? "Sending…" : "Submit"}
      </button>
    </form>
  );
}
