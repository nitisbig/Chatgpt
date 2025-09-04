export default function Home() {
  const products = [
    {
      id: 1,
      title: 'Sample eBook',
      cover: 'https://via.placeholder.com/200x300?text=eBook+Cover'
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Product List</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '16px',
              maxWidth: '200px',
              textAlign: 'center'
            }}
          >
            <img
              src={product.cover}
              alt={product.title}
              style={{ width: '100%', height: 'auto', marginBottom: '12px' }}
            />
            <h3 style={{ margin: '8px 0' }}>{product.title}</h3>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                style={{
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Buy
              </button>
              <button
                style={{
                  backgroundColor: '#f39c12',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
