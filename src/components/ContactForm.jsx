import { useEffect, useId, useRef, useState } from 'react'
import { CircleAlert, CircleCheck, LoaderCircle, RotateCcw, Send } from 'lucide-react'
import { contactEmail, formEndpoint } from '../lib/contactChannels'
import { cx } from '../lib/helpers'
import Button from './ui/Button'
import Card from './ui/Card'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MESSAGE_MIN = 10
const MESSAGE_MAX = 2000

const emptyValues = { name: '', email: '', message: '', _honey: '' }

// Returns an object like { name: 'Please enter your name.' } - empty object means "all good".
function validate({ name, email, message }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!EMAIL_PATTERN.test(email.trim())) errors.email = 'Please enter a valid email address so I can reply.'
  if (message.trim().length < MESSAGE_MIN) errors.message = `Please write at least ${MESSAGE_MIN} characters.`
  return errors
}

const inputStyles = (hasError) =>
  cx(
    'w-full rounded-xl border bg-bg px-4 text-fg placeholder:text-muted/70',
    'transition-colors duration-200 hover:border-accent/40 focus-visible:border-accent',
    hasError ? 'border-red-500' : 'border-line',
  )

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default function ContactForm() {
  const uid = useId()
  const ids = { name: `${uid}-name`, email: `${uid}-email`, message: `${uid}-message` }

  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  // 'idle' -> 'sending' -> 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const [sentTo, setSentTo] = useState('')

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)
  const successRef = useRef(null)

  // After a successful send, move keyboard / screen-reader focus to the confirmation.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear that field's error as soon as the person starts fixing it.
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'sending') return

    const found = validate(values)
    setErrors(found)
    const firstInvalid = ['name', 'email', 'message'].find((field) => found[field])
    if (firstInvalid) {
      // Put the cursor in the first field that needs fixing
      const refs = { name: nameRef, email: emailRef, message: messageRef }
      refs[firstInvalid].current?.focus()
      return
    }

    // The hidden "_honey" field is a trap for spam bots. Real people never see or fill it.
    if (values._honey) {
      setStatus('success')
      return
    }

    setStatus('sending')
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
      _subject: `Portfolio message from ${values.name.trim()}`,
      _template: 'table',
      _captcha: 'false',
      _honey: '',
    }

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(20000),
      })
      const data = await response.json().catch(() => ({}))

      if (!response.ok || String(data.success) !== 'true') {
        // Before the owner has clicked the one-time "Activate Form" email from FormSubmit,
        // it answers "success: false" with a message about Activation. That is a setup
        // step, not a real failure, so show a more accurate message for it.
        const needsActivation = /activat/i.test(String(data.message || ''))
        setStatus(needsActivation ? 'inactive' : 'error')
        return
      }

      setSentTo(payload.email)
      setValues(emptyValues)
      setStatus('success')
    } catch {
      // Keep what the visitor typed so nothing is lost, and show a friendly message.
      setStatus('error')
    }
  }

  const sendAnother = () => {
    setStatus('idle')
    setErrors({})
  }

  // ---------- Success screen ----------
  if (status === 'success') {
    return (
      <Card hover={false} className="p-6 sm:p-8">
        <div ref={successRef} tabIndex={-1} role="status" className="flex flex-col items-start gap-4 outline-none">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20">
            <CircleCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <h3 className="font-display text-xl font-semibold text-fg">Message sent</h3>
          <p className="text-muted">
            Thank you for getting in touch.{sentTo && <> I will reply to <span className="font-medium text-fg">{sentTo}</span>.</>}
          </p>
          <Button variant="secondary" icon={RotateCcw} onClick={sendAnother}>
            Send another message
          </Button>
        </div>
      </Card>
    )
  }

  // ---------- The form ----------
  const sending = status === 'sending'

  return (
    <Card hover={false} as="form" noValidate onSubmit={handleSubmit} aria-labelledby={`${uid}-title`} className="relative p-6 sm:p-8">
      <h3 id={`${uid}-title`} className="font-display text-xl font-semibold text-fg">
        Send me a message
      </h3>
      <p className="mt-1 text-sm text-muted">Write a short message and it will go straight to my inbox.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field id={ids.name} label="Your name" error={errors.name}>
          <input
            ref={nameRef}
            id={ids.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={values.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${ids.name}-error` : undefined}
            className={cx(inputStyles(errors.name), 'min-h-12')}
          />
        </Field>
        <Field id={ids.email} label="Your email" error={errors.email}>
          <input
            ref={emailRef}
            id={ids.email}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={150}
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${ids.email}-error` : undefined}
            className={cx(inputStyles(errors.email), 'min-h-12')}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field id={ids.message} label="Message" error={errors.message}>
          <textarea
            ref={messageRef}
            id={ids.message}
            name="message"
            rows={5}
            required
            maxLength={MESSAGE_MAX}
            value={values.message}
            onChange={handleChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${ids.message}-error` : undefined}
            className={cx(inputStyles(errors.message), 'resize-y py-3')}
          />
        </Field>
      </div>

      {/* Spam trap: hidden from people and screen readers; bots tend to fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={values._honey} onChange={handleChange} />
        </label>
      </div>

      {(status === 'error' || status === 'inactive') && (
        <div
          role="alert"
          className="mt-5 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div className="space-y-2">
            <p>
              {status === 'inactive'
                ? 'This message form is not switched on yet'
                : 'Sorry, your message could not be sent. Please try again in a moment'}
              {contactEmail && (
                <>
                  {status === 'inactive' ? '. Please email me directly at ' : ', or email me directly at '}
                  <a href={`mailto:${contactEmail}`} className="font-semibold underline">
                    {contactEmail}
                  </a>
                </>
              )}
              .
            </p>
            {/* Shown only while developing on your own computer (npm run dev), never to visitors */}
            {import.meta.env.DEV && status === 'inactive' && (
              <p className="font-medium">
                Developer note: FormSubmit has emailed you an &quot;Activate Form&quot; link (check Spam and Promotions). Click it once and
                this form will start working.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button
          type="submit"
          icon={sending ? LoaderCircle : Send}
          iconClassName={sending ? 'motion-safe:animate-spin' : ''}
          disabled={sending}
          aria-busy={sending}
        >
          {sending ? 'Sending...' : 'Send message'}
        </Button>
        <p className="text-xs text-muted">Your message is delivered by FormSubmit, an email-forwarding service.</p>
      </div>
    </Card>
  )
}
