import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface LessonData {
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

interface LessonState {
  currentLesson: LessonData | null;
  loading: boolean;
  error: string | null;
}

const initialState: LessonState = {
  currentLesson: null,
  loading: false,
  error: null,
};

// Async thunk for fetching lesson data
export const fetchLessonData = createAsyncThunk(
  'lesson/fetchLessonData',
  async (lessonId?: string) => {
    const response = await fetch('/api/lesson-data');
    if (!response.ok) {
      throw new Error('Failed to fetch lesson data');
    }
    const result = await response.json();
    return result.data;
  }
);

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setLessonData: (state, action: PayloadAction<LessonData>) => {
      state.currentLesson = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      if (state.currentLesson) {
        state.currentLesson.progress = action.payload;
        state.currentLesson.lastAccessed = new Date().toISOString();
      }
    },
    incrementCompletedExercises: (state) => {
      if (state.currentLesson) {
        state.currentLesson.userStats.completedExercises += 1;
        // Recalculate progress
        const { completedExercises, totalExercises } = state.currentLesson.userStats;
        state.currentLesson.progress = Math.round((completedExercises / totalExercises) * 100);
        state.currentLesson.lastAccessed = new Date().toISOString();
      }
    },
    addTimeSpent: (state, action: PayloadAction<number>) => {
      if (state.currentLesson) {
        state.currentLesson.userStats.timeSpent += action.payload;
        state.currentLesson.lastAccessed = new Date().toISOString();
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLessonData.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLesson = action.payload;
        state.error = null;
      })
      .addCase(fetchLessonData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch lesson data';
      });
  },
});

export const {
  setLessonData,
  updateProgress,
  incrementCompletedExercises,
  addTimeSpent,
  clearError,
} = lessonSlice.actions;

export default lessonSlice.reducer;
