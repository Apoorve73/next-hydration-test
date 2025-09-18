# Next.js Hydration Test

This is a proof of concept demonstrating how precompiled MDX content can coexist with dynamic components in a Next.js application, similar to what would be needed in the SkillUp frontend.

## 🎯 What This Demonstrates

- **Page Router API**: Using Next.js Page Router with `getServerSideProps`
- **Redux Toolkit**: State management with server-side hydration (mimics SkillUp frontend)
- **Next.js API Routes**: Backend API endpoint returning dynamic data
- **MDX with React Components**: Markdown content with embedded interactive components
- **next-mdx-remote**: Server-side MDX compilation and rendering
- **Hybrid Architecture**: Static precompiled content + dynamic Redux-connected components

## 🏗️ Architecture

```
┌─────────────────────┐    ┌──────────────────────┐
│   Static Content    │    │   Dynamic Content    │
│                     │    │                      │
│ • MDX Files         │    │ • API Routes         │
│ • Precompiled       │    │ • Client-side Fetch  │
│ • Server-rendered   │    │ • Real-time Data     │
│ • Interactive       │    │ • User-specific      │
│   Components        │    │                      │
└─────────────────────┘    └──────────────────────┘
           │                           │
           └─────────┬─────────────────┘
                     │
              ┌──────▼──────┐
              │   Next.js   │
              │    Page     │
              │  (Hybrid)   │
              └─────────────┘
```

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

## 📁 Project Structure

```
src/
├── components/
│   ├── InteractiveCodeBlock.tsx     # Static component used in MDX
│   ├── InteractiveQuizButton.tsx    # Redux-connected component
│   ├── QuizWidget.tsx              # Static component used in MDX
│   └── ProgressTracker.tsx         # Redux-connected component
├── lib/
│   └── mdx.ts                      # MDX processing utilities
├── store/
│   ├── slices/
│   │   └── lessonSlice.ts          # Redux slice for lesson data
│   ├── hooks.ts                    # Typed Redux hooks
│   └── index.ts                    # Store configuration
├── pages/
│   ├── api/
│   │   └── lesson-data.ts          # API route for dynamic data
│   ├── lesson/
│   │   └── [slug].page.tsx         # Dynamic lesson page with Redux
│   ├── _app.page.tsx               # App wrapper with Redux provider
│   ├── _document.page.tsx          # HTML document structure
│   └── index.page.tsx              # Home page
└── content/
    └── language-models-intro.mdx    # Sample lesson content
```

## 🔄 How It Works

### Static Content (Precompiled)
- MDX files are processed at request time using `next-mdx-remote`
- Interactive components (`InteractiveCodeBlock`, `QuizWidget`) are embedded in MDX
- Content is server-rendered for optimal performance

### Dynamic Content (Client-side)
- `ProgressTracker` component fetches data from `/api/lesson-data`
- Shows loading states and handles errors
- Updates in real-time based on user interactions

### Page Rendering Flow
1. **Server-side**: `getServerSideProps` loads MDX content and populates Redux store
2. **Initial Render**: Static HTML with precompiled content + Redux state sent to browser
3. **Hydration**: React components become interactive with Redux state preserved
4. **Interactive Updates**: Components can dispatch Redux actions to update shared state

## 🔧 Key Technologies

- **Next.js 15.2.4**: Page Router with SSR
- **React 18.3.1**: Component framework
- **Redux Toolkit**: State management with server-side hydration
- **next-redux-wrapper**: Redux integration for Next.js SSR
- **next-mdx-remote 5.0.0**: MDX compilation and rendering
- **gray-matter 4.0.3**: Frontmatter parsing
- **TypeScript**: Type safety

## 💡 Benefits of This Architecture

1. **Performance**: Static content loads immediately
2. **SEO**: Server-rendered content is indexable
3. **Flexibility**: Mix static and dynamic content as needed
4. **User Experience**: Progressive enhancement with loading states
5. **Scalability**: Can handle both content-heavy and interactive features

## 🔗 Compatibility with SkillUp Frontend

This architecture matches the patterns used in SkillUp frontend:
- Uses same Next.js version (15.2.4) and React version (18.3.1)
- Follows Page Router pattern with `.page.tsx` extensions
- Similar component structure and TypeScript usage
- Compatible with existing build and deployment processes

## 📝 Example Usage

Visit `/lesson/language-models-intro` to see:
- Precompiled MDX content with embedded React components
- Interactive code blocks and quizzes (static)
- Dynamic progress tracker (fetches from API)
- Seamless integration of both content types
