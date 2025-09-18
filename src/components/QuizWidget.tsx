import React, { useState } from 'react';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizWidgetProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

const QuizWidget: React.FC<QuizWidgetProps> = ({
  question,
  options,
  explanation
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedOption) {
      setShowResult(true);
    }
  };

  const selectedOptionData = options.find(opt => opt.id === selectedOption);
  const isCorrect = selectedOptionData?.isCorrect || false;

  return (
    <div style={{
      border: '1px solid #e1e5e9',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: '#fafbfc'
    }}>
      <h4 style={{ margin: '0 0 16px 0', color: '#24292e' }}>
        📝 Quick Check
      </h4>
      
      <p style={{ fontSize: '16px', marginBottom: '16px', fontWeight: '500' }}>
        {question}
      </p>
      
      <div style={{ marginBottom: '16px' }}>
        {options.map((option) => (
          <label
            key={option.id}
            style={{
              display: 'block',
              padding: '8px 12px',
              margin: '8px 0',
              backgroundColor: 'white',
              border: '1px solid #d1d5da',
              borderRadius: '4px',
              cursor: 'pointer',
              borderColor: selectedOption === option.id ? '#0366d6' : '#d1d5da'
            }}
          >
            <input
              type="radio"
              name="quiz-option"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={(e) => setSelectedOption(e.target.value)}
              style={{ marginRight: '8px' }}
              disabled={showResult}
            />
            {option.text}
          </label>
        ))}
      </div>
      
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={!selectedOption}
          style={{
            backgroundColor: selectedOption ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: selectedOption ? 'pointer' : 'not-allowed',
            fontSize: '14px'
          }}
        >
          Check Answer
        </button>
      )}
      
      {showResult && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          borderRadius: '4px',
          backgroundColor: isCorrect ? '#d4edda' : '#f8d7da',
          borderColor: isCorrect ? '#c3e6cb' : '#f5c6cb',
          border: '1px solid'
        }}>
          <p style={{ 
            margin: '0 0 8px 0', 
            fontWeight: '600',
            color: isCorrect ? '#155724' : '#721c24'
          }}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
          </p>
          {explanation && (
            <p style={{ 
              margin: 0, 
              fontSize: '14px',
              color: isCorrect ? '#155724' : '#721c24'
            }}>
              {explanation}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizWidget;
