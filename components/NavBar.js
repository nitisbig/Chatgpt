import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const navItems = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/explore', icon: '🧭', label: 'Explore' },
  { href: '/ask', icon: '❓', label: 'Ask' },
  { href: '/about', icon: 'ℹ️', label: 'About' }
];

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const buttonRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = 'linear-gradient(135deg, #1f1f1f 0%, #3d3d3d 100%)';
      document.body.style.color = '#fff';
    } else {
      document.body.style.background = 'linear-gradient(135deg, #c3ecff 0%, #eafaf1 100%)';
      document.body.style.color = '#000';
    }
  }, [darkMode]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowSettings(false);
      }
    }

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  return (
    <>
      <Link
        href="/profile"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          overflow: 'hidden',
          background: darkMode ? 'rgba(34,34,34,0.4)' : 'rgba(255,255,255,0.4)',
          border: '1px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          zIndex: 1002
        }}
      >
        <span style={{ fontSize: '20px', color: darkMode ? '#fff' : '#333' }}>👤</span>
      </Link>

      <button
        ref={buttonRef}
        onClick={() => setShowSettings(!showSettings)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          borderRadius: '8px',
          color: darkMode ? '#fff' : '#333',
          zIndex: 1002
        }}
      >
        <span style={{ fontSize: '20px' }}>⚙️</span>
      </button>

      {showSettings && (
        <div
          ref={settingsRef}
          style={{
            position: 'fixed',
            top: '60px',
            right: '20px',
            background: darkMode ? 'rgba(34,34,34,0.4)' : 'rgba(255,255,255,0.4)',
            border: '1px solid',
            borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)',
            boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            padding: '12px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 1001
          }}
        >
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: darkMode ? '#444' : '#f0f0f0',
              border: 'none',
              borderRadius: '4px',
              padding: '8px',
              cursor: 'pointer',
              color: darkMode ? '#fff' : '#333'
            }}
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px'
            }}
          >
            {['Profile', 'Notifications', 'Privacy', 'Help'].map((label) => (
              <div
                key={label}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  background: darkMode ? '#444' : '#f0f0f0',
                  textAlign: 'center',
                  color: darkMode ? '#fff' : '#333'
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      )}

      <nav style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: darkMode ? 'rgba(34,34,34,0.4)' : 'rgba(255,255,255,0.4)',
        borderRadius: '12px',
        border: '1px solid',
        borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.3)',
        boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: '8px 16px',
        display: 'flex',
        gap: '16px',
        zIndex: 1000
      }}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: darkMode ? '#fff' : '#333' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px',
                borderRadius: '8px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#444' : '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
            </div>
          </Link>
        ))}
      </nav>
    </>
  );
}
