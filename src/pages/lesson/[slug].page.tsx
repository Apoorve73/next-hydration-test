import React from 'react';
import { GetServerSideProps } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import { getLessonBySlug, type LessonContent } from '@/lib/mdx';
import ProgressTracker from '@/components/ProgressTracker';
import InteractiveCodeBlock from '@/components/InteractiveCodeBlock';
import QuizWidget from '@/components/QuizWidget';
import InteractiveQuizButton from '@/components/InteractiveQuizButton';
import { wrapper } from '@/store';
import { lessonsAPI } from '@/services/Lessons';

interface LessonPageProps {
  lesson: LessonContent;
}

// MDX components that will be available in the markdown content
const mdxComponents = {
  InteractiveCodeBlock,
  QuizWidget,
  InteractiveQuizButton,
  // Add other custom components here as needed
};

const LessonPage: React.FC<LessonPageProps> = ({ lesson }) => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
    }}>
      {/* Header Section */}
      <header style={{ marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #e1e5e9' }}>
        <h1 style={{ 
          margin: '0 0 8px 0', 
          fontSize: '32px', 
          fontWeight: '600',
          color: '#24292e'
        }}>
          {lesson.title}
        </h1>
        
        <p style={{ 
          margin: '0 0 16px 0', 
          fontSize: '18px', 
          color: '#586069',
          lineHeight: '1.5'
        }}>
          {lesson.description}
        </p>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '14px',
            color: '#6a737d'
          }}>
            <span>⏱️</span>
            <span>{lesson.duration}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            fontSize: '14px',
            color: '#6a737d'
          }}>
            <span>📈</span>
            <span>{lesson.difficulty}</span>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {lesson.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  backgroundColor: '#f1f8ff',
                  color: '#0366d6',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Dynamic Progress Component - This fetches data from API */}
        <aside style={{ order: 1 }}>
          <ProgressTracker />
        </aside>
        
        {/* Static MDX Content - This is precompiled */}
        <main style={{ 
          order: 2,
          lineHeight: '1.6',
          color: '#24292e'
        }}>
          <div style={{
            '& h1, & h2, & h3, & h4, & h5, & h6': {
              marginTop: '24px',
              marginBottom: '16px',
              fontWeight: '600',
              color: '#24292e'
            },
            '& p': {
              marginBottom: '16px',
              lineHeight: '1.6'
            },
            '& ul, & ol': {
              paddingLeft: '20px',
              marginBottom: '16px'
            },
            '& li': {
              marginBottom: '4px'
            },
            '& code': {
              backgroundColor: '#f6f8fa',
              padding: '2px 4px',
              borderRadius: '3px',
              fontSize: '85%',
              fontFamily: 'Monaco, Consolas, "Courier New", monospace'
            },
            '& pre': {
              backgroundColor: '#f6f8fa',
              padding: '16px',
              borderRadius: '6px',
              overflow: 'auto',
              fontSize: '14px',
              fontFamily: 'Monaco, Consolas, "Courier New", monospace'
            },
            '& blockquote': {
              borderLeft: '4px solid #dfe2e5',
              paddingLeft: '16px',
              color: '#6a737d',
              margin: '16px 0'
            },
            '& hr': {
              border: 'none',
              borderTop: '1px solid #e1e5e9',
              margin: '24px 0'
            }
          } as React.CSSProperties}>
            <MDXRemote {...lesson.content} components={mdxComponents} />
          </div>
        </main>
        
        {/* Footer */}
        <footer style={{ 
          order: 3,
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #e1e5e9',
          textAlign: 'center',
          color: '#6a737d',
          fontSize: '14px'
        }}>
          <p>
            This demonstrates how precompiled MDX content (static) can coexist with 
            dynamic components (ProgressTracker) that fetch data from APIs.
          </p>
          <p>
            <strong>Static Content:</strong> MDX lesson content, interactive components within MDX<br/>
            <strong>Dynamic Content:</strong> Progress tracker, user-specific data
          </p>
        </footer>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params }) => {
    const slug = params?.slug as string;
    
    if (!slug) {
      return {
        notFound: true,
      };
    }

    const lesson = await getLessonBySlug(slug);
    
    if (!lesson) {
      return {
        notFound: true,
      };
    }

    // Prefetch lesson data server-side using RTK Query
    try {
      // This will populate the RTK Query cache on the server
      await store.dispatch(lessonsAPI.endpoints.getLessonData.initiate(slug));
    } catch (error) {
      console.error('Failed to prefetch lesson data server-side:', error);
    }

    // Wait for all running queries to complete
    await Promise.all(store.dispatch(lessonsAPI.util.getRunningQueriesThunk()));

    return {
      props: {
        lesson,
      },
    };
  }
);

export default LessonPage;
