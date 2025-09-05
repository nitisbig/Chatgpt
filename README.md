# First Codex AI Project

This repository contains a simple [Next.js](https://nextjs.org/) application.

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The home page displays "Hello World" and includes a button to toggle between light and dark modes.

### Chatbot

To enable the chatbot, provide your Groq API key via an environment variable
named `GROQ_API_KEY` (or `NEXT_PUBLIC_GROQ_API_KEY`). The API route reads this
value to authenticate requests to Groq.
By default, it uses the `openai/gpt-oss-20b` model for chat completions.
