import Link from 'next/link';

const navItems = [
  { href: '/', icon: '🏠', label: 'Home' },
  { href: '/explore', icon: '🧭', label: 'Explore' },
  { href: '/ask', icon: '❓', label: 'Ask' },
  { href: '/about', icon: 'ℹ️', label: 'About' }
];

export default function NavBar() {
  return (
    <nav style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      padding: '8px 16px',
      display: 'flex',
      gap: '16px',
      zIndex: 1000
    }}>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} style={{ textDecoration: 'none', color: '#333' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '8px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
