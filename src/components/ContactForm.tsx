import { useState, useEffect, useRef } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import './ContactForm.css';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          'expired-callback': () => void;
          'error-callback': () => void;
          theme?: 'light' | 'dark' | 'auto';
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '';

const ContactForm: FunctionalComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaReady, setCaptchaReady] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const captchaRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Load Turnstile script
    if (document.querySelector('script[src*="turnstile"]')) {
      // Script already loaded, try to render
      renderCaptcha();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad';
    script.async = true;
    script.defer = true;

    (window as Window & { onTurnstileLoad?: () => void }).onTurnstileLoad = () => {
      renderCaptcha();
    };

    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  const renderCaptcha = () => {
    if (!captchaRef.current || !window.turnstile || !TURNSTILE_SITE_KEY) {
      return;
    }

    // Clear any existing widget
    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }

    widgetIdRef.current = window.turnstile.render(captchaRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        setCaptchaToken(token);
        setCaptchaReady(true);
      },
      'expired-callback': () => {
        setCaptchaToken('');
        setCaptchaReady(false);
      },
      'error-callback': () => {
        setCaptchaToken('');
        setCaptchaReady(false);
      },
      theme: 'auto',
    });
  };

  const resetCaptcha = () => {
    setCaptchaToken('');
    setCaptchaReady(false);
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // Client-side validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields.',
      });
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.',
      });
      setLoading(false);
      return;
    }

    // Validate captcha
    if (!captchaToken) {
      setStatus({
        type: 'error',
        message: 'Please complete the captcha verification.',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          captchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent.',
        });
        setName('');
        setEmail('');
        setMessage('');
        resetCaptcha();
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please check your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="contact-form">
      <div class="form-group">
        <label htmlFor="name" class="form-label">
          Name <span class="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          class="form-input"
          value={name}
          onInput={(e) => setName((e.target as HTMLInputElement).value)}
          maxLength={100}
          required
          disabled={loading}
          aria-required="true"
        />
      </div>

      <div class="form-group">
        <label htmlFor="email" class="form-label">
          Email <span class="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          class="form-input"
          value={email}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          maxLength={100}
          required
          disabled={loading}
          aria-required="true"
        />
      </div>

      <div class="form-group">
        <label htmlFor="message" class="form-label">
          Message <span class="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          class="form-textarea"
          value={message}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          rows={6}
          maxLength={2000}
          required
          disabled={loading}
          aria-required="true"
        />
        <div class="char-count">
          {message.length} / 2000
        </div>
      </div>

      <div class="form-group captcha-container">
        <div ref={captchaRef} class="captcha-widget" />
        {!TURNSTILE_SITE_KEY && (
          <p class="captcha-warning">Captcha not configured</p>
        )}
      </div>

      {status.type && (
        <div
          class={`form-status ${status.type === 'success' ? 'form-status-success' : 'form-status-error'}`}
          role="alert"
        >
          {status.message}
        </div>
      )}

      <button
        type="submit"
        class="form-submit"
        disabled={loading || !name.trim() || !email.trim() || !message.trim() || !captchaToken}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
