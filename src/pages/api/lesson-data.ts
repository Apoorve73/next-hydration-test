import { NextApiRequest, NextApiResponse } from 'next';

interface LessonData {
  id: string;
  title: string;
  progress: number;
  userStats: {
    completedExercises: number;
    totalExercises: number;
    timeSpent: number;
  };
  recommendations: string[];
  lastAccessed: string;
}

interface ApiResponse {
  success: boolean;
  data: LessonData;
  timestamp: string;
}

// Simulate dynamic data that would come from a database
const mockLessonData: LessonData = {
  id: 'lesson-1',
  title: 'Introduction to Language Models',
  progress: 65,
  userStats: {
    completedExercises: 3,
    totalExercises: 5,
    timeSpent: 1200, // seconds
  },
  recommendations: [
    'Try the advanced tokenization exercise',
    'Review transformer architecture concepts',
    'Practice with the interactive code examples'
  ],
  lastAccessed: new Date().toISOString(),
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // Simulate some processing delay
  const delay = Math.random() * 500 + 200; // 200-700ms delay
  
  setTimeout(() => {
    // Add some randomness to simulate real dynamic data
    const dynamicData: LessonData = {
      ...mockLessonData,
      progress: Math.floor(Math.random() * 40) + 60, // 60-100%
      userStats: {
        ...mockLessonData.userStats,
        completedExercises: Math.floor(Math.random() * 3) + 2, // 2-4
        timeSpent: Math.floor(Math.random() * 600) + 900, // 900-1500 seconds
      },
      lastAccessed: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      data: dynamicData,
      timestamp: new Date().toISOString(),
    });
  }, delay);
}
