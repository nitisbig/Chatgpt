import { useState } from 'react';

export default function Explore() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleExplore = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { sender: 'user', text }]);
    setInput('');
    try {
      const response = await fetch('/api/explore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 20px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>Explore Page</h1>
      <div style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}>
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px',
            height: '300px',
            overflowY: 'auto',
            marginBottom: '12px',
            background: 'rgba(255,255,255,0.5)',
          }}
        >
          {messages.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <strong>{msg.sender === 'user' ? 'You' : 'AI'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleExplore}
            style={{
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

