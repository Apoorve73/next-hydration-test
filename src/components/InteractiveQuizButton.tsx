import React from 'react';
import { useGetLessonDataQuery, useUpdateLessonProgressMutation } from '@/services/Lessons';

interface InteractiveQuizButtonProps {
  onComplete?: () => void;
}

const InteractiveQuizButton: React.FC<InteractiveQuizButtonProps> = ({ onComplete }) => {
  const { data: currentLesson } = useGetLessonDataQuery('language-models-intro');
  const [updateProgress, { isLoading: loading }] = useUpdateLessonProgressMutation();

  const handleComplete = async () => {
    if (currentLesson && currentLesson.userStats.completedExercises < currentLesson.userStats.totalExercises) {
      try {
        await updateProgress({
          lessonId: 'language-models-intro',
          exerciseCompleted: true,
        }).unwrap();
        onComplete?.();
      } catch (error) {
        console.error('Failed to update progress:', error);
        alert('Failed to update progress. Please try again.');
      }
    } else {
      alert('All exercises completed for this lesson!');
    }
  };

  return (
    <button
      onClick={handleComplete}
      disabled={loading || (currentLesson && currentLesson.userStats.completedExercises >= currentLesson.userStats.totalExercises)}
      style={{
        backgroundColor: loading ? '#6c757d' : '#28a745',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        marginTop: '8px',
        opacity: (loading || (currentLesson && currentLesson.userStats.completedExercises >= currentLesson.userStats.totalExercises)) ? 0.6 : 1,
      }}
    >
      {loading ? '⏳ Updating...' : '🎯 Complete Exercise (RTK Query)'}
    </button>
  );
};

export default InteractiveQuizButton;
