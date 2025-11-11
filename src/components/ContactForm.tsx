import { useState } from 'preact/hooks';
import type { FunctionalComponent } from 'preact';
import './ContactForm.css';

const ContactForm: FunctionalComponent = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    // Client-side validation
    if (!name.trim() || !message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all fields.',
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
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Thank you! Your message has been sent.',
        });
        setName('');
        setMessage('');
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
        disabled={loading || !name.trim() || !message.trim()}
      >
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
