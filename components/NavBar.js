import Link from 'next/link';
import { useState, useEffect } from 'react';

const navItems = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/explore', icon: '🧭', label: 'Explore' },
  { href: '/ask', icon: '❓', label: 'Ask' },
  { href: '/about', icon: 'ℹ️', label: 'About' }
];

export default function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = '#333';
      document.body.style.color = '#fff';
    } else {
      document.body.style.background = '#fff';
      document.body.style.color = '#000';
    }
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setShowSettings(!showSettings)}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
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
          style={{
            position: 'fixed',
            top: '60px',
            left: '20px',
            background: darkMode ? '#222' : '#fff',
            border: '1px solid',
            borderColor: darkMode ? '#555' : '#ccc',
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
        background: darkMode ? '#222' : '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
