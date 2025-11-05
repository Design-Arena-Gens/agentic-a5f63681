"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      setStatus('success');
      setMessage(data.message || 'Thanks! I will get back to you.');
      e.currentTarget.reset();
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-screen">
        <h2 className="section-heading">Contact</h2>
        <p className="mt-3 subtle max-w-2xl">Have a project in mind? Let?s talk.</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <form onSubmit={onSubmit} className="card p-6" aria-describedby="contact-desc">
            <p id="contact-desc" className="sr-only">Use this form to send a message.</p>
            <div className="grid gap-4">
              <label className="grid gap-2">
                <span className="text-sm subtle">Name</span>
                <input required name="name" type="text" autoComplete="name" className="rounded-lg bg-muted/80 border border-white/10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm subtle">Email</span>
                <input required name="email" type="email" autoComplete="email" className="rounded-lg bg-muted/80 border border-white/10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm subtle">Message</span>
                <textarea required name="message" rows={5} className="rounded-lg bg-muted/80 border border-white/10 px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400" />
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="rounded-lg bg-primary-500/10 text-primary-200 px-4 py-2 border border-primary-500/30 hover:bg-primary-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-60"
                >
                  {status === 'loading' ? 'Sending?' : 'Send message'}
                </button>
                {status !== 'idle' && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={status === 'success' ? 'text-emerald-400' : 'text-rose-400'}
                    role="status"
                    aria-live="polite"
                  >
                    {message}
                  </motion.span>
                )}
              </div>
            </div>
          </form>

          <div className="grid gap-4">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="card p-5 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
              <span className="font-medium">GitHub</span>
              <p className="subtle">Open?source projects and contributions</p>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="card p-5 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
              <span className="font-medium">LinkedIn</span>
              <p className="subtle">Connect professionally</p>
            </a>
            <a href="mailto:hello@example.com" className="card p-5 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
              <span className="font-medium">Email</span>
              <p className="subtle">hello@example.com</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
