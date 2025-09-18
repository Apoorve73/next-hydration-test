import { NextApiRequest, NextApiResponse } from 'next';

export interface LessonData {
  id: string;
  title: string;
  progress: number;
  userStats: {
    completedExercises: number;
    totalExercises: number;
    timeSpent: number; // in seconds
  };
  recommendations: string[];
  lastAccessed: string; // ISO date string
}

// In-memory storage for demo purposes (in real app, this would be a database)
let lessonDataStore: { [key: string]: LessonData } = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<LessonData>) {
  const { method } = req;

  if (method === 'GET') {
    // Handle GET request - fetch lesson data
    const lessonId = req.query.lessonId as string || 'language-models-intro';
    
    // Check if we have cached data for this lesson
    if (lessonDataStore[lessonId]) {
      return res.status(200).json(lessonDataStore[lessonId]);
    }

    // Generate initial mock data
    const mockData: LessonData = {
      id: lessonId,
      title: `Introduction to Language Models`,
      progress: Math.floor(Math.random() * 40) + 60, // 60-100%
      userStats: {
        completedExercises: Math.floor(Math.random() * 3) + 2, // 2-4
        totalExercises: 5,
        timeSpent: Math.floor(Math.random() * 600) + 900, // 900-1500 seconds
      },
      recommendations: [
        'Try the advanced tokenization exercise',
        'Review transformer architecture concepts',
        'Practice with the interactive code examples'
      ],
      lastAccessed: new Date().toISOString(),
    };

    // Store it for future requests
    lessonDataStore[lessonId] = mockData;
    
    return res.status(200).json(mockData);
  }

  if (method === 'POST') {
    // Handle POST request - update lesson progress
    const { lessonId, action } = req.body;

    if (!lessonId) {
      return res.status(400).json({ error: 'lessonId is required' } as any);
    }

    // Get existing data or create new
    let lessonData = lessonDataStore[lessonId];
    if (!lessonData) {
      lessonData = {
        id: lessonId,
        title: `Introduction to Language Models`,
        progress: 60,
        userStats: {
          completedExercises: 2,
          totalExercises: 5,
          timeSpent: 900,
        },
        recommendations: [
          'Try the advanced tokenization exercise',
          'Review transformer architecture concepts',
          'Practice with the interactive code examples'
        ],
        lastAccessed: new Date().toISOString(),
      };
    }

    // Update based on action
    if (action === 'complete_exercise') {
      const updatedExercises = Math.min(
        lessonData.userStats.completedExercises + 1,
        lessonData.userStats.totalExercises
      );
      const newProgress = Math.min(lessonData.progress + 10, 100);

      lessonData = {
        ...lessonData,
        progress: newProgress,
        userStats: {
          ...lessonData.userStats,
          completedExercises: updatedExercises,
        },
        lastAccessed: new Date().toISOString(),
      };
    }

    // Store updated data
    lessonDataStore[lessonId] = lessonData;

    return res.status(200).json(lessonData);
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).json({ error: `Method ${method} Not Allowed` } as any);
}