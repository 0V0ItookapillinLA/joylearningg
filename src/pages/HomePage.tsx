const HomePage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#1f2937'
        }}>
          欢迎来到 Joy Learning
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#4b5563',
          marginBottom: '20px'
        }}>
          这是一个学习在线课程、AI对练和考试的平台
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          marginTop: '40px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>📚 知识库</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>浏览和学习课程资料</p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>🤖 AI对练</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>与AI进行实时对话训练</p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>✅ 考试中心</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>参加综合评估和考试</p>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>👥 社区</h3>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>查看排行榜和用户互动</p>
          </div>
        </div>
        
        <p style={{
          fontSize: '14px',
          color: '#9ca3af',
          marginTop: '40px'
        }}>
          ✓ 依赖已安装，应用正在加载完整功能...
        </p>
      </div>
    </div>
  );
};

export default HomePage;

