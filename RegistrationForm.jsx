import { useState } from 'react'
import { MessageCircle, Mail, Info, AlertCircle } from 'lucide-react'
import { WHATSAPP_NUMBER, EMAIL, EMAIL_SUBJECT } from '../config'

const EXPERIENCES = ['Stay', 'Food', 'Music', 'Complete Experience']
const initial = { name: '', phone: '', email: '', guests: 2, experience: 'Complete Experience', city: '', message: '', consent: false }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 15) e.phone = 'Enter a valid mobile number (10 to 15 digits).'
  if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address, or leave it blank.'
  const g = Number(v.guests)
  if (!Number.isInteger(g) || g < 1 || g > 100) e.guests = 'Guests must be a whole number from 1 to 100.'
  if (!v.consent) e.consent = 'Please tick the box so we can contact you.'
  return e
}

function buildLines(v) {
  return [
    ['Name', v.name.trim()],
    ['Mobile / WhatsApp', v.phone.trim()],
    ['Email', v.email.trim() || 'Not provided'],
    ['Guests', String(v.guests)],
    ['Preferred experience', v.experience],
    ['City', v.city.trim() || 'Not provided'],
    ['Message', v.message.trim() || 'Not provided']
  ]
}

export default function RegistrationForm() {
  const [v, setV] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'whatsapp' | 'email' | null

  const set = (k) => (ev) => {
    const val = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value
    setV((p) => ({ ...p, [k]: val }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const check = () => {
    const e = validate(v)
    setErrors(e)
    setStatus(null)
    const first = Object.keys(e)[0]
    if (first) { document.getElementById(`f-${first}`)?.focus(); return false }
    return true
  }

  const sendWhatsApp = (ev) => {
    ev.preventDefault()
    if (!check()) return
    const body = buildLines(v).map(([k, val]) => `*${k}:* ${val}`).join('\n')
    const text = `🏜️ *LAVAN LOK – New Registration Enquiry*\n\n${body}\n\n✅ Consent to be contacted: Yes`
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setStatus('whatsapp')
  }

  const sendEmail = () => {
    if (!check()) return
    const body = ['Hello Lavan Lok team,', '', ...buildLines(v).map(([k, val]) => `${k}: ${val}`), '', 'Consent to be contacted: Yes'].join('\r\n')
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(body)}`
    setStatus('email')
  }

  const Field = ({ id, label, required, error, children }) => (
    <div>
      <label htmlFor={`f-${id}`} className="mb-1.5 block text-sm font-medium">
        {label} {required ? <span className="text-sunset" aria-hidden="true">*</span> : <span className="font-normal text-ink/50">(optional)</span>}
      </label>
      {children}
      {error && <p id={`e-${id}`} role="alert" className="mt-1 flex items-center gap-1 text-sm text-red-700"><AlertCircle size={14} />{error}</p>}
    </div>
  )
  const a11y = (id) => ({ id: `f-${id}`, 'aria-invalid': !!errors[id], 'aria-describedby': errors[id] ? `e-${id}` : undefined, className: `field ${errors[id] ? 'invalid' : ''}` })

  return (
    <form onSubmit={sendWhatsApp} noValidate className="grid gap-5 rounded-3xl border border-ink/10 bg-white/60 p-6 shadow-xl shadow-ink/5 backdrop-blur sm:p-10">
      <Field id="name" label="Full name" required error={errors.name}>
        <input {...a11y('name')} type="text" autoComplete="name" value={v.name} onChange={set('name')} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="phone" label="Mobile / WhatsApp number" required error={errors.phone}>
          <input {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98XXX XXXXX" value={v.phone} onChange={set('phone')} />
        </Field>
        <Field id="email" label="Email address" error={errors.email}>
          <input {...a11y('email')} type="email" autoComplete="email" value={v.email} onChange={set('email')} />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="guests" label="Number of guests" required error={errors.guests}>
          <input {...a11y('guests')} type="number" min="1" max="100" inputMode="numeric" value={v.guests} onChange={set('guests')} />
        </Field>
        <Field id="experience" label="Preferred experience" required>
          <select {...a11y('experience')} value={v.experience} onChange={set('experience')}>
            {EXPERIENCES.map((x) => <option key={x}>{x}</option>)}
          </select>
        </Field>
        <Field id="city" label="City">
          <input {...a11y('city')} type="text" autoComplete="address-level2" value={v.city} onChange={set('city')} />
        </Field>
      </div>
      <Field id="message" label="Additional message">
        <textarea {...a11y('message')} rows="4" value={v.message} onChange={set('message')} />
      </Field>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input id="f-consent" type="checkbox" checked={v.consent} onChange={set('consent')} aria-invalid={!!errors.consent} className="mt-1 h-5 w-5 shrink-0 accent-[#D9622B]" />
          <span>I agree to be contacted regarding Lavan Lok updates and event information.</span>
        </label>
        {errors.consent && <p role="alert" className="mt-1 flex items-center gap-1 text-sm text-red-700"><AlertCircle size={14} />{errors.consent}</p>}
      </div>

      <div className="grid gap-3 pt-2 sm:grid-cols-2">
        <button type="submit" className="btn bg-sunset text-white hover:bg-ink"><MessageCircle size={18} />Register your interest</button>
        <button type="button" onClick={sendEmail} className="btn border border-ink text-ink hover:bg-ink hover:text-salt"><Mail size={18} />Register via email</button>
      </div>
      <p className="text-center text-xs text-ink/60">Registering opens WhatsApp or your email app with your details filled in. You need to press Send there.</p>

      {status && (
        <div role="status" className="flex gap-3 rounded-2xl border border-gold/50 bg-gold/10 p-4 text-sm">
          <Info className="mt-0.5 shrink-0 text-gold" size={18} />
          <p>
            {status === 'whatsapp'
              ? 'WhatsApp should now be open with your enquiry written out. Your enquiry has not reached us yet: press Send in WhatsApp to complete it.'
              : 'Your email app should now be open with your enquiry written out. Nothing has been sent yet: press Send in your email app to complete it.'}
            {' '}If nothing opened, contact us directly using the links in the Let's Connect section below.
          </p>
        </div>
      )}
    </form>
  )
}
