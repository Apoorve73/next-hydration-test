# Next.js Hydration Test - RTK Query Integration

This project demonstrates a hybrid architecture combining **static precompiled MDX content** with **dynamic React components** that fetch data using **RTK Query**, all integrated with **server-side caching and hydration**. This architecture mirrors patterns used in SkillUp frontend and serves as a proof of concept for efficient data fetching and caching strategies.

## 🚀 **Key Features**

### **1. RTK Query Integration**
- **RTK Query** for efficient data fetching and caching
- **5-minute server-side caching** (configurable)
- **Automatic cache invalidation** on mutations
- **Server-side prefetching** with cache hydration

### **2. Hybrid Content Architecture**
- **Static Content**: MDX files compiled at build-time using `next-mdx-remote`
- **Dynamic Components**: React components that fetch real-time data via RTK Query
- **Seamless Integration**: Both content types coexist on the same page

### **3. Advanced Caching Strategy**
- **Server-side cache**: 5 minutes (300 seconds)
- **Automatic retries**: Up to 2 retries on failure
- **Cache invalidation**: Smart invalidation on data updates
- **Optimistic updates**: Immediate UI feedback

### **4. Interactive MDX Components**
- **Embedded React Components**: Custom components directly in markdown
- **Interactive Elements**: Code blocks, quizzes, and progress trackers
- **Real-time Updates**: Components update cache and trigger re-renders

## 🏗️ **Architecture Overview**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Static MDX    │    │  RTK Query       │    │  Next.js API    │
│   Content       │◄──►│  Components      │◄──►│  Routes         │
│                 │    │                  │    │                 │
│ • Lesson text   │    │ • useQuery hooks │    │ • GET /lesson   │
│ • Code examples │    │ • useMutation    │    │ • POST /lesson  │
│ • Quizzes       │    │ • Cache mgmt     │    │ • Data storage  │
│ • Embedded      │    │ • Invalidation   │    │ • Business logic│
│   components    │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌──────────────────┐
                    │   RTK Query      │
                    │   Cache Store    │
                    │                  │
                    │ • 5min cache     │
                    │ • Server hydrate │
                    │ • Auto refetch   │
                    │ • Optimistic UI  │
                    └──────────────────┘
```

## 📁 **Project Structure**

```
src/
├── components/
│   ├── InteractiveCodeBlock.tsx    # Embeddable code component
│   ├── InteractiveQuizButton.tsx   # RTK Query mutation button
│   ├── ProgressTracker.tsx         # RTK Query data component
│   └── QuizWidget.tsx              # Interactive quiz component
├── lib/
│   └── mdx.ts                      # MDX compilation utilities
├── pages/
│   ├── api/
│   │   └── lesson-data.ts          # API route (GET/POST)
│   ├── lesson/
│   │   └── [slug].page.tsx         # Dynamic lesson pages
│   ├── _app.page.tsx               # App wrapper with RTK Query
│   └── index.page.tsx              # Homepage
├── services/
│   ├── common/
│   │   ├── baseQuery.ts            # Base query configuration
│   │   └── rootApi.ts              # Root RTK Query API
│   └── Lessons.ts                  # Lesson-specific endpoints
└── content/
    └── language-models-intro.mdx   # Sample lesson content
```

## 🔧 **Technology Stack**

- **Next.js 15.2.4** - React framework with Page Router API
- **React 18.3.1** - UI library
- **RTK Query** (via @reduxjs/toolkit 2.9.0) - Data fetching and caching
- **next-redux-wrapper 8.1.0** - Redux SSR integration
- **next-mdx-remote 5.0.0** - MDX compilation
- **gray-matter 4.0.3** - Frontmatter parsing
- **TypeScript 5.9.2** - Type safety

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**

```bash
# Clone and install dependencies
git clone <repository-url>
cd next-hydration-test
npm install
```

### **Development**

```bash
# Start development server
npm run dev

# Visit http://localhost:3001
```

### **Available Scripts**

```bash
npm run dev        # Start development server on port 3001
npm run build      # Build for production
npm run start      # Start production server
npm run type-check # Run TypeScript checks
```

## 📖 **RTK Query Usage Examples**

### **1. Service Definition**

```typescript
// src/services/Lessons.ts
export const lessonsAPI = rootApi.injectEndpoints({
  endpoints: (builder) => ({
    getLessonData: builder.query<LessonData, string>({
      query: (lessonId) => `/lesson-data?lessonId=${lessonId}`,
      providesTags: (result, error, lessonId) => [
        { type: 'LessonData', id: lessonId },
      ],
      keepUnusedDataFor: 300, // 5 minutes
    }),
    
    updateLessonProgress: builder.mutation<LessonData, UpdateArgs>({
      query: ({ lessonId, exerciseCompleted }) => ({
        url: `/lesson-data`,
        method: 'POST',
        body: { lessonId, action: 'complete_exercise' },
      }),
      invalidatesTags: (result, error, { lessonId }) => [
        { type: 'LessonData', id: lessonId },
      ],
    }),
  }),
});
```

### **2. Component Usage**

```typescript
// Using RTK Query hooks
const ProgressTracker: React.FC = () => {
  const { data, isLoading, error } = useGetLessonDataQuery('lesson-id');
  const [updateProgress, { isLoading: isUpdating }] = useUpdateLessonProgressMutation();

  const handleUpdate = async () => {
    try {
      await updateProgress({ lessonId: 'lesson-id', exerciseCompleted: true }).unwrap();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div>
      {isLoading ? 'Loading...' : `Progress: ${data?.progress}%`}
      <button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Complete Exercise'}
      </button>
    </div>
  );
};
```

### **3. Server-side Prefetching**

```typescript
// pages/lesson/[slug].page.tsx
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async ({ params }) => {
    const slug = params?.slug as string;
    
    // Prefetch data server-side
    await store.dispatch(lessonsAPI.endpoints.getLessonData.initiate(slug));
    
    // Wait for all queries to complete
    await Promise.all(store.dispatch(lessonsAPI.util.getRunningQueriesThunk()));
    
    return { props: { lesson } };
  }
);
```

## 🎯 **RTK Query Configuration**

### **Root API Setup**

```typescript
// src/services/common/rootApi.ts
export const rootApi = createApi({
  reducerPath: 'rootApi',
  baseQuery: retry(baseQuery, { maxRetries: 2 }),
  keepUnusedDataFor: 300, // 5 minutes global cache
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  tagTypes: ['LessonData', 'LessonContent'],
  endpoints: () => ({}),
});
```

### **Store Configuration**

```typescript
// src/store/index.ts
export const makeStore = (ctx?: Context) =>
  configureStore({
    reducer: {
      [rootApi.reducerPath]: rootApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: ctx },
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(rootApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
  });
```

## 🔄 **Data Flow with RTK Query**

1. **Server-Side (SSR)**:
   - Compile MDX content from filesystem
   - Prefetch data using RTK Query endpoints
   - Populate RTK Query cache server-side
   - Render complete page with cached data

2. **Client-Side (Hydration)**:
   - React hydrates the server-rendered HTML
   - RTK Query cache rehydrates with server data
   - Components use cached data immediately
   - Background refetching as needed

3. **Runtime Updates**:
   - User interactions trigger RTK Query mutations
   - Mutations automatically invalidate related cache entries
   - Components re-render with fresh data
   - Optimistic updates provide immediate feedback

## 🧪 **Testing the RTK Query Integration**

### **API Endpoints Test**
```bash
# Test GET endpoint
curl http://localhost:3001/api/lesson-data?lessonId=language-models-intro

# Test POST endpoint  
curl -X POST -H "Content-Type: application/json" \
  -d '{"lessonId":"language-models-intro","action":"complete_exercise"}' \
  http://localhost:3001/api/lesson-data
```

### **Caching Test**
1. Visit `/lesson/language-models-intro`
2. Note the progress percentage
3. Click "Complete Exercise" button
4. Progress updates immediately (optimistic update)
5. Refresh page - data persists (server-side cache)
6. Wait 5+ minutes and refresh - new random data (cache expired)

### **Error Handling Test**
1. Stop the development server
2. Try interacting with components
3. Observe error states and retry behavior
4. Restart server - automatic recovery

## 🎨 **Customization**

### **Adjusting Cache Duration**
```typescript
// Global cache (rootApi.ts)
keepUnusedDataFor: 300, // 5 minutes

// Per-endpoint cache (Lessons.ts)
getLessonData: builder.query({
  // ...
  keepUnusedDataFor: 600, // 10 minutes for this endpoint
}),
```

### **Adding New Endpoints**
```typescript
// Add to src/services/Lessons.ts
getQuizData: builder.query<QuizData, string>({
  query: (quizId) => `/quiz-data?quizId=${quizId}`,
  providesTags: ['QuizData'],
}),
```

### **Custom Error Handling**
```typescript
// Add error middleware
const rtkQueryErrorLogger: Middleware = (api) => (next) => (action) => {
  if (action.type.endsWith('/rejected')) {
    console.error('RTK Query Error:', action.error);
  }
  return next(action);
};
```

## 🚀 **Performance Benefits**

### **Caching Efficiency**
- ✅ **5-minute server cache** reduces API calls
- ✅ **Automatic deduplication** prevents duplicate requests
- ✅ **Background refetching** keeps data fresh
- ✅ **Selective invalidation** updates only changed data

### **Bundle Optimization**
- ✅ **Code splitting** via endpoint injection
- ✅ **Tree shaking** removes unused endpoints
- ✅ **Minimal runtime** compared to traditional Redux

### **Developer Experience**
- ✅ **Auto-generated hooks** for all endpoints
- ✅ **TypeScript integration** with full type safety
- ✅ **DevTools support** for debugging
- ✅ **Optimistic updates** for better UX

## 📚 **Learning Resources**

- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [RTK Query Examples](https://github.com/reduxjs/redux-toolkit/tree/master/examples)
- [Next.js with RTK Query](https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering)
- [Caching and Invalidation](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test RTK Query integration thoroughly
5. Submit a pull request

---

**Built with ❤️ as a proof of concept for RTK Query integration in modern Next.js applications with 5-minute server-side caching.**