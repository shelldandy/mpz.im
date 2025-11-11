import type { APIRoute } from 'astro';

const TELEGRAM_BOT_TOKEN = import.meta.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = import.meta.env.TELEGRAM_CHAT_ID;

interface ContactFormData {
  name: string;
  message: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Parse request body
    const data: ContactFormData = await request.json();

    // Validate input
    if (!data.name || !data.message) {
      return new Response(
        JSON.stringify({ error: 'Name and message are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (data.name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Name is too long (max 100 characters)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (data.message.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Message is too long (max 2000 characters)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if Telegram credentials are configured
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return new Response(
        JSON.stringify({ error: 'Contact form is not configured. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
🔔 New Contact Form Submission

👤 Name: ${data.name}

💬 Message:
${data.message}
    `.trim();

    // Send to Telegram
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Failed to send message. Please try again later.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
