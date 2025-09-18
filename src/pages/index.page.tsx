import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: '700',
          color: '#24292e',
          margin: '0 0 16px 0'
        }}>
          Next.js Hydration Test
        </h1>
        
        <p style={{ 
          fontSize: '20px', 
          color: '#586069',
          lineHeight: '1.5',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Proof of concept demonstrating how precompiled MDX content can coexist with 
          dynamic components in a Next.js application.
        </p>
      </header>

      <div style={{
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '32px',
        backgroundColor: '#f8f9fa',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0',
          fontSize: '24px',
          color: '#24292e'
        }}>
          🎯 What This Demonstrates
        </h2>
        
        <ul style={{ 
          paddingLeft: '20px',
          lineHeight: '1.6',
          color: '#586069'
        }}>
          <li><strong>Page Router API:</strong> Using Next.js Page Router with getServerSideProps</li>
          <li><strong>Next.js API Routes:</strong> Backend API endpoint returning dynamic data</li>
          <li><strong>MDX with React Components:</strong> Markdown content with embedded interactive components</li>
          <li><strong>next-mdx-remote:</strong> Server-side MDX compilation and rendering</li>
          <li><strong>Hybrid Architecture:</strong> Static precompiled content + dynamic client-side components</li>
        </ul>
      </div>

      <div style={{
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '32px',
        backgroundColor: 'white',
        marginBottom: '32px'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0',
          fontSize: '24px',
          color: '#24292e'
        }}>
          📚 Available Lessons
        </h2>
        
        <div style={{
          padding: '20px',
          border: '1px solid #d1d5da',
          borderRadius: '6px',
          backgroundColor: '#fafbfc'
        }}>
          <h3 style={{ 
            margin: '0 0 8px 0',
            fontSize: '18px',
            color: '#24292e'
          }}>
            Introduction to Language Models
          </h3>
          
          <p style={{ 
            margin: '0 0 16px 0',
            color: '#586069',
            fontSize: '14px'
          }}>
            Learn the fundamentals of language models and how they work. 
            Includes interactive code examples and quizzes.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <span style={{
              backgroundColor: '#f1f8ff',
              color: '#0366d6',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              15 min
            </span>
            <span style={{
              backgroundColor: '#f0fff4',
              color: '#28a745',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Beginner
            </span>
          </div>
          
          <Link 
            href="/lesson/language-models-intro"
            style={{
              display: 'inline-block',
              backgroundColor: '#0366d6',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Start Lesson →
          </Link>
        </div>
      </div>

      <div style={{
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '32px',
        backgroundColor: 'white'
      }}>
        <h2 style={{ 
          margin: '0 0 20px 0',
          fontSize: '24px',
          color: '#24292e'
        }}>
          🏗️ Architecture Overview
        </h2>
        
        <div style={{
          backgroundColor: '#f6f8fa',
          padding: '20px',
          borderRadius: '6px',
          fontFamily: 'Monaco, Consolas, "Courier New", monospace',
          fontSize: '14px',
          color: '#24292e',
          overflowX: 'auto'
        }}>
          <pre style={{ margin: 0 }}>
{`┌─────────────────────┐    ┌──────────────────────┐
│   Static Content    │    │   Dynamic Content    │
│                     │    │                      │
│ • MDX Files         │    │ • API Routes         │
│ • Precompiled       │    │ • Client-side Fetch  │
│ • Server-rendered   │    │ • Real-time Data     │
│ • Interactive       │    │ • User-specific      │
│   Components        │    │                      │
└─────────────────────┘    └──────────────────────┘
           │                           │
           └─────────┬─────────────────┘
                     │
              ┌──────▼──────┐
              │   Next.js   │
              │    Page     │
              │  (Hybrid)   │
              └─────────────┘`}
          </pre>
        </div>
        
        <p style={{ 
          marginTop: '16px',
          color: '#586069',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          This architecture allows for optimal performance: static content loads immediately 
          while dynamic content hydrates progressively, providing both speed and interactivity.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
