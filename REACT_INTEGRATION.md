# React Framework Integration Guide

## What's New

The Prometheus Web Obfuscator now uses **React** with **Next.js 14** for a modern, scalable web interface.

### Key Changes

#### 1. **Project Structure**
```
Before:
- public/index.html (static)
- public/demo.html (static)
- api/obfuscate.js (serverless)

After:
- app/page.tsx (React home page)
- app/obfuscator/page.tsx (React obfuscator tool)
- app/api/obfuscate/route.ts (Next.js API route)
- app/api/html/route.ts (Next.js API route)
- app/components/ (Reusable React components)
```

#### 2. **New React Components**

**CodeEditor.tsx**
- Reusable input component with syntax highlighting preparation
- Character and line counting
- Adjustable size and placeholder text

**OutputPanel.tsx**
- Display obfuscated code with statistics
- Copy-to-clipboard functionality
- Load state indication

**ConfigPanel.tsx**
- Obfuscation preset selection (Light/Medium/High)
- Input type toggle (JavaScript/HTML)
- Detailed preset descriptions
- Action buttons (Obfuscate, Clear)

#### 3. **API Routes**
- `app/api/obfuscate/route.ts` - JavaScript obfuscation
- `app/api/html/route.ts` - HTML obfuscation
- Full TypeScript support with proper error handling

#### 4. **Styling**
- CSS Modules for component scoping
- Global styles in `app/globals.css`
- Responsive design with media queries
- Consistent color scheme (#667eea primary)

### Features

✅ **Component-Based UI**: Modular, reusable components
✅ **Server-Side Rendering**: SEO-friendly pages
✅ **API Routes**: Integrated backend with Next.js
✅ **TypeScript**: Full type safety
✅ **Responsive Design**: Mobile, tablet, and desktop
✅ **Fast Refresh**: HMR for development
✅ **Vercel Ready**: Optimized for production deployment

### Development Workflow

#### Local Development
```bash
npm install
npm run dev
```
Open http://localhost:3000

#### Building
```bash
npm run build
npm start
```

#### Linting
```bash
npm run lint
```

### Component Usage Examples

#### Using CodeEditor
```tsx
import CodeEditor from '@/app/components/CodeEditor'

<CodeEditor
  value={code}
  onChange={(value) => setCode(value)}
  label="Input Code"
  placeholder="Paste your code..."
/>
```

#### Using OutputPanel
```tsx
import OutputPanel from '@/app/components/OutputPanel'

<OutputPanel
  value={obfuscated}
  onCopy={() => navigator.clipboard.writeText(obfuscated)}
  label="Obfuscated Code"
  isLoading={false}
/>
```

#### Using ConfigPanel
```tsx
import ConfigPanel from '@/app/components/ConfigPanel'

<ConfigPanel
  preset="medium"
  inputType="javascript"
  onPresetChange={(p) => setPreset(p)}
  onInputTypeChange={(t) => setInputType(t)}
  onObfuscate={() => handleObfuscate()}
  onClear={() => handleClear()}
  isLoading={false}
/>
```

### File Structure Reference

```
app/
├── api/
│   ├── obfuscate/
│   │   └── route.ts          # POST /api/obfuscate
│   └── html/
│       └── route.ts          # POST /api/html
├── components/
│   ├── CodeEditor.tsx        # Input code editor
│   ├── CodeEditor.module.css
│   ├── ConfigPanel.tsx       # Configuration UI
│   ├── ConfigPanel.module.css
│   ├── OutputPanel.tsx       # Output display
│   └── OutputPanel.module.css
├── lib/                      # Utility functions
├── obfuscator/
│   ├── page.tsx              # /obfuscator page
│   └── page.module.css
├── globals.css               # Global styles
├── layout.tsx                # Root layout
└── page.tsx                  # Home page
```

### Environment Variables

Create a `.env.local` file for development:

```
# .env.local
NODE_ENV=development
```

### Migration from Static HTML

**Old Way (Static HTML):**
```html
<!-- public/demo.html -->
<textarea id="input"></textarea>
<textarea id="output"></textarea>
<button onclick="obfuscate()">Obfuscate</button>
```

**New Way (React):**
```tsx
// app/obfuscator/page.tsx
<CodeEditor value={input} onChange={setInput} />
<OutputPanel value={output} />
<ConfigPanel onObfuscate={handleObfuscate} />
```

### Performance Considerations

1. **Code Splitting**: Next.js automatically splits code per route
2. **Image Optimization**: Use `next/image` for optimized images
3. **API Caching**: API responses cached based on cache headers
4. **CSS Optimization**: CSS Modules prevent style conflicts
5. **Minification**: Automatic in production build

### Debugging

#### Development Mode
- Hot Module Replacement (HMR) enabled
- Detailed error messages
- Source maps included

#### Using React DevTools
```bash
# Install React DevTools browser extension
# Then use to inspect components and props
```

#### Logging
```tsx
console.log('Debug info:', value)
// Appears in terminal during `npm run dev`
```

### Next Steps

1. ✅ React framework integrated
2. ✅ Components created and styled
3. ✅ API routes implemented
4. ✅ Vercel configuration updated
5. **TODO**: Add syntax highlighting (Prism.js or highlight.js)
6. **TODO**: Add test suite for React components
7. **TODO**: Add dark mode toggle
8. **TODO**: Add code history/cache

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [CSS Modules](https://nextjs.org/docs/basic-features/stylesheet)
- [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Deployment](https://vercel.com/docs/frameworks/nextjs)

---

**Status**: ✅ React Framework Fully Integrated  
**Framework**: Next.js 14 + React 18  
**Styling**: CSS Modules  
**Deployment**: Vercel Ready
