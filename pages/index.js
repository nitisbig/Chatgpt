import { useState } from 'react';

export default function Home() {
  const [dark, setDark] = useState(false);

  return (
    <div style={{
      backgroundColor: dark ? '#000' : '#fff',
      color: dark ? '#fff' : '#000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1>Hello World</h1>
      <button onClick={() => setDark(!dark)}>
        Toggle {dark ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}
