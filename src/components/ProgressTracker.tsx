import React from 'react';
import { useGetLessonDataQuery } from '@/services/Lessons';

const ProgressTracker: React.FC = () => {
  const { data, isLoading: loading, error } = useGetLessonDataQuery('language-models-intro');

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min${minutes !== 1 ? 's' : ''}`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '16px',
            height: '16px',
            border: '2px solid #0066cc',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <span>Loading your progress...</span>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        border: '1px solid #dc3545',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f8d7da',
        color: '#721c24'
      }}>
        <h4 style={{ margin: '0 0 8px 0' }}>⚠️ Error Loading Progress</h4>
        <p style={{ margin: 0 }}>{error.toString()}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div style={{
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 16px 0', color: '#24292e', display: 'flex', alignItems: 'center', gap: '8px' }}>
        📊 Your Progress
        <span style={{ fontSize: '12px', color: '#6a737d', fontWeight: 'normal' }}>
          (Last updated: {formatDate(data.lastAccessed)})
        </span>
      </h3>

      {/* Progress Bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '14px', fontWeight: '500' }}>Overall Progress</span>
          <span style={{ fontSize: '14px', color: '#6a737d' }}>{data.progress}%</span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          backgroundColor: '#e1e5e9',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${data.progress}%`,
            height: '100%',
            backgroundColor: '#28a745',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '16px',
        marginBottom: '20px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#0366d6' }}>
            {data.userStats.completedExercises}/{data.userStats.totalExercises}
          </div>
          <div style={{ fontSize: '12px', color: '#6a737d' }}>Exercises</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#28a745' }}>
            {formatTime(data.userStats.timeSpent)}
          </div>
          <div style={{ fontSize: '12px', color: '#6a737d' }}>Time Spent</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#f66a0a' }}>
            {Math.round((data.userStats.completedExercises / data.userStats.totalExercises) * 100)}%
          </div>
          <div style={{ fontSize: '12px', color: '#6a737d' }}>Completion</div>
        </div>
      </div>

      {/* Recommendations */}
      {data.recommendations.length > 0 && (
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', color: '#24292e' }}>
            💡 Recommendations
          </h4>
          <ul style={{ 
            margin: 0, 
            paddingLeft: '20px',
            fontSize: '14px',
            color: '#586069'
          }}>
            {data.recommendations.map((rec, index) => (
              <li key={index} style={{ marginBottom: '4px' }}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
