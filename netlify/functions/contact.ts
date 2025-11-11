import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';

interface ContactFormData {
  name: string;
  message: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    const data: ContactFormData = JSON.parse(event.body || '{}');

    // Validate input
    if (!data.name || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name and message are required' }),
      };
    }

    if (data.name.length > 100) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name is too long (max 100 characters)' }),
      };
    }

    if (data.message.length > 2000) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is too long (max 2000 characters)' }),
      };
    }

    // Get Telegram credentials from environment variables
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Check if Telegram credentials are configured
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Telegram credentials not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Contact form is not configured. Please try again later.'
        }),
      };
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
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Failed to send message. Please try again later.'
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Message sent successfully!'
      }),
    };
  } catch (error) {
    console.error('Contact form error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'An unexpected error occurred. Please try again later.'
      }),
    };
  }
};

export { handler };
