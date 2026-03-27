const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '72px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#1f2937' }}>404</h1>
        <p style={{ fontSize: '20px', color: '#6b7280', marginBottom: '30px' }}>页面未找到</p>
        <a href="/" style={{
          display: 'inline-block',
          padding: '10px 20px',
          backgroundColor: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '16px'
        }}>
          返回首页
        </a>
      </div>
    </div>
  );
};

export default NotFound;
