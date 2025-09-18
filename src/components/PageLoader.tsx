import React from 'react';

const PageLoader: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* Spinner */}
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e1e5e9',
        borderTop: '4px solid #0366d6',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '16px',
      }} />
      
      {/* Loading text */}
      <p style={{
        color: '#586069',
        fontSize: '16px',
        fontWeight: '500',
        margin: 0,
      }}>
        Loading lesson...
      </p>
      
      {/* CSS animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
