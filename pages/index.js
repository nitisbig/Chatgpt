export default function Home() {
  const products = [
    {
      id: 1,
      title: 'Sample eBook',
      cover: 'https://public-files.gumroad.com/g2rc7nnv627pd51mkop3anh1c0us',
      buyLink:
        'https://theveller.gumroad.com/l/GPTChain-byTheVeller-x-Misash?layout=discover&recommended_by=search&_gl=1' +
        '*kxqzoo*_ga*MTMzMzY4ODYwMC4xNzUyMjQ3MzEx*_ga_6LJN6D94N6*czE3NTY5OTQ5NjEkbzYkZzAkdDE3NTY5OTQ5NjEkajYwJGwwJGgw'
    }
  ];

  return (
    <div
      style={{
        padding: '20px',
        paddingTop: '80px',
        paddingLeft: '80px'
      }}
    >
      <h1>Product List</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div
            key={product.id}
            className="glass-card"
            style={{
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
              <a
                href={product.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#0070f3',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Buy
              </a>
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
