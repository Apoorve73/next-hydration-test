import React, { useState } from 'react';

interface InteractiveCodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const InteractiveCodeBlock: React.FC<InteractiveCodeBlockProps> = ({
  code,
  language,
  title = 'Interactive Code Example'
}) => {
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(`Output from ${language} code:\n> Hello, World!\n> Code executed successfully!`);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div style={{
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      margin: '20px 0',
      overflow: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#f6f8fa',
        padding: '12px 16px',
        borderBottom: '1px solid #e1e5e9',
        fontSize: '14px',
        fontWeight: '600'
      }}>
        {title}
      </div>
      
      <div style={{ padding: '16px' }}>
        <pre style={{
          backgroundColor: '#f6f8fa',
          padding: '12px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '14px',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace'
        }}>
          <code>{code}</code>
        </pre>
        
        <button
          onClick={runCode}
          disabled={isRunning}
          style={{
            backgroundColor: isRunning ? '#6c757d' : '#0066cc',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            marginTop: '12px',
            fontSize: '14px'
          }}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
        
        {output && (
          <div style={{
            marginTop: '12px',
            padding: '12px',
            backgroundColor: '#1e1e1e',
            color: '#00ff00',
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'Monaco, Consolas, "Courier New", monospace',
            whiteSpace: 'pre-wrap'
          }}>
            {output}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveCodeBlock;
