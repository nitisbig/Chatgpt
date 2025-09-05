export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  // Allow using either GROQ_API_KEY or NEXT_PUBLIC_GROQ_API_KEY so the
  // route works whether the key is defined for server-side use only or
  // exposed to the client during development.
  const apiKey =
    process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;

  if (!apiKey) {
    console.error('GROQ_API_KEY is not set');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Groq API responded with ${response.status}: ${errorText}`
      );
    }

    const completion = await response.json();
    const reply = completion.choices?.[0]?.message?.content || '';
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch completion' });
  }
}
