import { useState } from 'react'
import { submitBooking } from '../lib/bookings'

const journeyOptions = [
  'The Inner Clearing',
  'Undersong',
  'The Sky Reveal',
  'Nightfall Communion',
  'Not sure yet',
]

export default function ContactForm({ tone = 'dark' }) {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    journey: '',
    message: '',
  })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitBooking(form)
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const light = tone === 'light'
  const fieldBase =
    'w-full bg-transparent pb-3 pt-2 outline-none transition-colors duration-500 font-light placeholder:font-light'
  const fieldColor = light
    ? 'text-bark placeholder:text-bark/40 border-b border-bark/20 focus:border-clay'
    : 'text-paper placeholder:text-fog/40 border-b border-paper/20 focus:border-amber'
  const labelColor = light ? 'text-bark/55' : 'text-mist'

  if (status === 'sent') {
    return (
      <div
        className={`rounded-2xl border p-10 ${
          light ? 'border-bark/15 bg-parch/40' : 'border-paper/10 bg-bark/30'
        }`}
      >
        <p className={`eyebrow ${light ? 'text-bark' : 'text-clay'}`}>Received</p>
        <p className={`display mt-4 text-3xl ${light ? 'text-bark' : 'text-paper'}`}>
          Thank you. We’ll be in touch soon.
        </p>
        <p className={`prose-serif mt-4 ${light ? 'text-bark/70' : 'text-fog/70'}`}>
          Your inquiry has arrived. Take a breath — there’s no rush. We read every message with care
          and will reach out to find the journey, and the time, that fits.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-9">
      <div className="grid gap-9 md:grid-cols-2">
        <label className="block">
          <span className={`meta ${labelColor}`}>Name</span>
          <input
            required
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your name"
            className={`${fieldBase} ${fieldColor} mt-2`}
          />
        </label>
        <label className="block">
          <span className={`meta ${labelColor}`}>Email</span>
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@email.com"
            className={`${fieldBase} ${fieldColor} mt-2`}
          />
        </label>
        <label className="block">
          <span className={`meta ${labelColor}`}>Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Optional"
            className={`${fieldBase} ${fieldColor} mt-2`}
          />
        </label>
        <label className="block">
          <span className={`meta ${labelColor}`}>Journey</span>
          <select
            name="journey"
            value={form.journey}
            onChange={onChange}
            className={`${fieldBase} ${fieldColor} mt-2 ${light ? 'text-bark' : 'text-paper'}`}
          >
            <option value="" className="bg-ink text-paper">
              Choose a path
            </option>
            {journeyOptions.map((j) => (
              <option key={j} value={j} className="bg-ink text-paper">
                {j}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className={`meta ${labelColor}`}>What are you hoping to move through</span>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          rows={4}
          placeholder="Clarity, release, or simply space to breathe…"
          className={`${fieldBase} ${fieldColor} mt-2 resize-none`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`meta rounded-full px-8 py-4 transition-all duration-500 disabled:opacity-60 ${
            light
              ? 'bg-bark text-paper hover:bg-moss'
              : 'border border-amber/60 text-amber hover:bg-amber hover:text-ink'
          }`}
        >
          {status === 'sending' ? 'Sending…' : 'Submit'}
        </button>
        {status === 'error' && (
          <span className={`meta ${light ? 'text-[#a2401f]' : 'text-clay'}`}>
            Something went wrong — please try again.
          </span>
        )}
      </div>
    </form>
  )
}
