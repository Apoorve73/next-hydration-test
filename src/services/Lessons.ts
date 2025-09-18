import { rootApi } from './common/rootApi';

// Define the shape of the lesson data - matching what we had in the slice
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

// Interface for updating lesson progress
export interface UpdateLessonProgressArgs {
  lessonId: string;
  exerciseCompleted?: boolean;
}

const enhancedRootApi = rootApi.enhanceEndpoints({
  addTagTypes: [
    'LessonData',
  ],
});

export const lessonsAPI = enhancedRootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get lesson data from our Next.js API route
    getLessonData: builder.query<LessonData, string | void>({
      query: (lessonId = 'language-models-intro') => ({
        url: `/lesson-data?lessonId=${lessonId}`,
        method: 'GET',
      }),
      providesTags: (result, error, lessonId) => [
        { type: 'LessonData', id: lessonId || 'default' },
      ],
      // Server-side caching for 5 minutes, client-side for 2 minutes
      keepUnusedDataFor: 300, // 5 minutes
    }),

    // Update lesson progress (simulate completing an exercise)
    updateLessonProgress: builder.mutation<LessonData, UpdateLessonProgressArgs>({
      query: ({ lessonId, exerciseCompleted = true }) => ({
        url: `/lesson-data`,
        method: 'POST',
        body: {
          lessonId,
          action: exerciseCompleted ? 'complete_exercise' : 'update_progress',
        },
      }),
      // Invalidate the cache for this lesson to trigger a refetch
      invalidatesTags: (result, error, { lessonId }) => [
        { type: 'LessonData', id: lessonId },
      ],
    }),
  }),
  overrideExisting: true,
});

// Export hooks for use in components
export const {
  useGetLessonDataQuery,
  useLazyGetLessonDataQuery,
  useUpdateLessonProgressMutation,
  util: { getRunningQueriesThunk },
} = lessonsAPI;
