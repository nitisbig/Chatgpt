import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const toggle = () => setOpen(!open);

  useEffect(() => {
    // place the window near the bottom right on mount
    const x = window.innerWidth - 320; // width of window plus margin
    const y = window.innerHeight - 420; // height of window plus margin
    setPosition({ x, y });
  }, []);

  const startDrag = (clientX, clientY) => {
    dragStart.current = {
      offsetX: clientX - position.x,
      offsetY: clientY - position.y,
    };
  };

  const onMouseDown = (e) => {
    startDrag(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX - dragStart.current.offsetX, y: e.clientY - dragStart.current.offsetY });
  };

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    e.preventDefault();
  };

  const onTouchMove = (e) => {
    const touch = e.touches[0];
    setPosition({ x: touch.clientX - dragStart.current.offsetX, y: touch.clientY - dragStart.current.offsetY });
  };

  const onTouchEnd = () => {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  return (
    <>
      {open && (
        <div
          className="chatbot-window glass-card"
          style={{ top: position.y, left: position.x }}
        >
          <div
            className="chatbot-header"
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
          >
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
