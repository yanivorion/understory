// Booking submission seam.
//
// Right now the site runs as a standalone frontend, so submissions are
// stored locally (and logged) as a stand-in. When this app is wired to
// Base44, replace the body of submitBooking with:
//
//   import { base44 } from '../api/base44Client'
//   await base44.entities.Booking.create(payload)
//
// The Booking entity schema is already drafted in base44/entities/booking.jsonc
// (kept alongside this project) so the swap is a one-liner.

export async function submitBooking(form) {
  const payload = {
    name: form.name,
    email: form.email,
    phone: form.phone || '',
    journey: form.journey || 'Not sure yet',
    message: form.message || '',
    submitted_at: new Date().toISOString(),
  }

  // Simulate network latency so the UI transitions feel real in dev.
  await new Promise((r) => setTimeout(r, 700))

  try {
    const key = 'understory_bookings'
    const existing = JSON.parse(localStorage.getItem(key) || '[]')
    existing.push(payload)
    localStorage.setItem(key, JSON.stringify(existing))
  } catch {
    // storage may be unavailable; ignore in the standalone build
  }

  // eslint-disable-next-line no-console
  console.info('[Understory] booking inquiry captured', payload)
  return payload
}
