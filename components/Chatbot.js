import { useState, useRef, useEffect } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ offsetX: 0, offsetY: 0, target: null });
  const isDragging = useRef(false);

  const toggle = () => {
    if (!open) {
      setPosition({ x: buttonPosition.x - 240, y: buttonPosition.y - 420 });
    }
    setOpen(!open);
  };

  useEffect(() => {
    // place the button and window near the bottom right on mount
    const btnX = window.innerWidth - 80; // button width plus margin
    const btnY = window.innerHeight - 80; // button height plus margin
    setButtonPosition({ x: btnX, y: btnY });
    const x = window.innerWidth - 320; // window width plus margin
    const y = window.innerHeight - 420; // window height plus margin
    setPosition({ x, y });
  }, []);

  const startDrag = (clientX, clientY, target) => {
    dragStart.current = {
      offsetX:
        target === 'window'
          ? clientX - position.x
          : clientX - buttonPosition.x,
      offsetY:
        target === 'window'
          ? clientY - position.y
          : clientY - buttonPosition.y,
      target,
    };
    isDragging.current = false;
  };

  const onMouseDown = (e) => {
    startDrag(e.clientX, e.clientY, 'window');
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseDownButton = (e) => {
    startDrag(e.clientX, e.clientY, 'button');
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    isDragging.current = true;
    if (dragStart.current.target === 'window') {
      setPosition({ x: e.clientX - dragStart.current.offsetX, y: e.clientY - dragStart.current.offsetY });
    } else if (dragStart.current.target === 'button') {
      setButtonPosition({ x: e.clientX - dragStart.current.offsetX, y: e.clientY - dragStart.current.offsetY });
    }
  };

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    dragStart.current.target = null;
  };

  const onTouchStart = (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, 'window');
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    e.preventDefault();
  };

  const onTouchStartButton = (e) => {
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY, 'button');
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    e.preventDefault();
  };

  const onTouchMove = (e) => {
    const touch = e.touches[0];
    if (dragStart.current.target === 'window') {
      setPosition({ x: touch.clientX - dragStart.current.offsetX, y: touch.clientY - dragStart.current.offsetY });
    } else if (dragStart.current.target === 'button') {
      setButtonPosition({ x: touch.clientX - dragStart.current.offsetX, y: touch.clientY - dragStart.current.offsetY });
    }
  };

  const onTouchEnd = () => {
    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    dragStart.current.target = null;
  };

  const onButtonClick = () => {
    if (isDragging.current) {
      isDragging.current = false;
      return;
    }
    toggle();
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
      <button
        className="chatbot-button"
        style={{ top: buttonPosition.y, left: buttonPosition.x }}
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
