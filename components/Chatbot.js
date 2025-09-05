import { useState } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <>
      {open && (
        <div className="chatbot-window glass-card">
          <div className="chatbot-header">
            <span>Chat with us</span>
            <button className="chatbot-close" onClick={toggle} aria-label="Close chat">&times;</button>
          </div>
          <div className="chatbot-body">
            <p>Hello! How can we help you?</p>
          </div>
        </div>
      )}
      <button className="chatbot-button" onClick={toggle} aria-label="Open chat">
        💬
      </button>
    </>
  );
}
