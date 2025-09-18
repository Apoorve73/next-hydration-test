import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { incrementCompletedExercises } from '@/store/slices/lessonSlice';

interface InteractiveQuizButtonProps {
  onComplete?: () => void;
}

const InteractiveQuizButton: React.FC<InteractiveQuizButtonProps> = ({ onComplete }) => {
  const dispatch = useAppDispatch();

  const handleComplete = () => {
    // Update Redux store when quiz is completed
    dispatch(incrementCompletedExercises());
    onComplete?.();
  };

  return (
    <button
      onClick={handleComplete}
      style={{
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        marginTop: '8px'
      }}
    >
      🎯 Complete Exercise (Updates Redux Store)
    </button>
  );
};

export default InteractiveQuizButton;
