import OpenAI from 'openai';

const apiKey =
  process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;

const client = new OpenAI({
  apiKey,
  baseURL: 'https://api.groq.com/openai/v1',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!apiKey) {
    console.error('GROQ_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'system',
          content:
            'You are supportive ai assistant. Max token 500. You are build by Flowdira ltd. And Your owner is Nitesh. You only answer related to books and it\'s content.',
        },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
    });

    const reply = completion.choices?.[0]?.message?.content || '';
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch completion' });
  }
}
