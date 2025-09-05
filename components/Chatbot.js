import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ offsetX: 0, offsetY: 0 });
  const isDragging = useRef(false);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    // place the button near the bottom right on mount
    const x = window.innerWidth - 80; // button width plus margin
    const y = window.innerHeight - 80; // button height plus margin
    setPosition({ x, y });
  }, []);

  const startDrag = (clientX, clientY) => {
    dragStart.current = {
      offsetX: clientX - position.x,
      offsetY: clientY - position.y,
    };
    isDragging.current = false;
  };

  const onMouseDownButton = (e) => {
    startDrag(e.clientX, e.clientY);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    isDragging.current = true;
    setPosition({
      x: e.clientX - dragStart.current.offsetX,
      y: e.clientY - dragStart.current.offsetY,
    });
  };

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  };

  const onTouchStartButton = (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    e.preventDefault();
  };

  const onTouchMove = (e) => {
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragStart.current.offsetX,
      y: touch.clientY - dragStart.current.offsetY,
    });
  };

  const onTouchEnd = () => {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
  };

  const onButtonClick = () => {
    if (isDragging.current) {
      isDragging.current = false;
      return;
    }
    toggle();
  };

  const windowStyle = {
    top: position.y - 420,
    left: position.x - 240,
  };

  return (
    <>
      {open && (
        <div className="chatbot-window glass-card" style={windowStyle}>
          <div className="chatbot-header">
            <span>Chat with us</span>
            <button
              className="chatbot-close"
              onClick={toggle}
              aria-label="Close chat"
            >
              &times;
            </button>
          </div>
          <div className="chatbot-body">
            <p>Hello! How can we help you?</p>
          </div>
        </div>
      )}
      <button
        className="chatbot-button"
        style={{ top: position.y, left: position.x }}
        onMouseDown={onMouseDownButton}
        onTouchStart={onTouchStartButton}
        onClick={onButtonClick}
        aria-label="Open chat"
      >
        💬
      </button>
    </>
  );
}
