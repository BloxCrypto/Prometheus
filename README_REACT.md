# Prometheus Web Obfuscator - React Edition

A modern React-based web interface for the Prometheus JavaScript and HTML obfuscator, built with Next.js and deployed on Vercel.

## 🎯 Features

### React Components
- **CodeEditor**: Syntax-highlighted code input with line/character counting
- **OutputPanel**: Display obfuscated code with copy-to-clipboard functionality
- **ConfigPanel**: Configuration options for presets and code type selection
- **Responsive Design**: Optimized for desktop and mobile devices

### Obfuscation Capabilities
- ✅ JavaScript obfuscation
- ✅ HTML with embedded scripts
- ✅ Variable renaming
- ✅ String encryption
- ✅ Dead code injection
- ✅ Multiple presets (Light/Medium/High)

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Project Structure

```
/
├── app/
│   ├── api/                      # Next.js API routes
│   │   ├── obfuscate/route.ts    # JavaScript obfuscation endpoint
│   │   └── html/route.ts         # HTML obfuscation endpoint
│   ├── components/               # React components
│   │   ├── CodeEditor.tsx        # Code input editor
│   │   ├── OutputPanel.tsx       # Obfuscated output display
│   │   ├── ConfigPanel.tsx       # Configuration UI
│   │   └── *.module.css          # Component styles
│   ├── obfuscator/
│   │   ├── page.tsx              # Obfuscator tool page
│   │   └── page.module.css       # Obfuscator page styles
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home/landing page
│   ├── globals.css               # Global styles
│   └── lib/                      # Utility functions
├── web-obfuscator/               # Core obfuscation engine
├── public/                       # Static files (if using)
├── vercel.json                   # Vercel configuration
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 📦 Technology Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Styling**: CSS Modules
- **Language**: TypeScript
- **Deployment**: Vercel
- **Obfuscation Engine**: Custom Prometheus engine

## 🎨 Components

### CodeEditor
Input component for JavaScript or HTML code with real-time character/line counting.

```tsx
<CodeEditor
  value={code}
  onChange={setCode}
  label="Input Code"
  placeholder="Paste your code here..."
/>
```

### OutputPanel
Display obfuscated code with copy button and statistics.

```tsx
<OutputPanel
  value={obfuscatedCode}
  onCopy={handleCopy}
  label="Obfuscated Code"
  isLoading={isProcessing}
/>
```

### ConfigPanel
Configuration selector with preset options and action buttons.

```tsx
<ConfigPanel
  preset={preset}
  inputType={inputType}
  onPresetChange={setPreset}
  onInputTypeChange={setInputType}
  onObfuscate={handleObfuscate}
  onClear={handleClear}
  isLoading={isLoading}
/>
```

## 🔌 API Endpoints

### POST /api/obfuscate
Obfuscate JavaScript code.

**Request:**
```json
{
  "code": "const x = 5; console.log(x);",
  "preset": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "obfuscated": "const a = 5; console.log(a);",
  "originalSize": 30,
  "obfuscatedSize": 25,
  "reduction": 17
}
```

### POST /api/html
Obfuscate HTML with embedded scripts.

**Request:**
```json
{
  "code": "<script>const x = 5;</script>",
  "preset": "high"
}
```

**Response:**
```json
{
  "success": true,
  "obfuscated": "<script>const a=5</script>",
  "originalSize": 28,
  "obfuscatedSize": 22,
  "reduction": 21
}
```

## 🎯 Obfuscation Presets

| Preset | Size Reduction | Security | Use Case |
|--------|----------------|----------|----------|
| Light | 20-30% | ⭐☆☆ | Public code, open source |
| Medium | 30-40% | ⭐⭐☆ | Commercial applications |
| High | 10-50% | ⭐⭐⭐ | Sensitive code, proprietary |

## 🚢 Deployment

### Vercel Deployment

The project is configured for automatic Vercel deployment:

```bash
# Push to GitHub and Vercel will deploy automatically
git push origin main
```

**Configuration:**
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

See `vercel.json` for detailed configuration.

## 📱 Responsive Design

The interface is fully responsive:
- **Desktop**: 3-column layout (input, output, config)
- **Tablet**: 2-column layout (input/output stacked, config sidebar)
- **Mobile**: Single column layout

## 🔒 Security Notes

- Obfuscation is performed server-side via API
- No code is logged or stored
- Each request is independent
- Consider rate limiting in production

## 🛠️ Development

### Add a New Component

1. Create `app/components/NewComponent.tsx`
2. Create `app/components/NewComponent.module.css` for styles
3. Import and use in page components

### Modify Styles

- Global styles: `app/globals.css`
- Component styles: `app/components/*.module.css`
- Page styles: `app/*/page.module.css`

## 📄 License

MIT - See LICENSE file

## 👨‍💻 Authors

**BloxCrypto** - Prometheus Obfuscator

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Deployed On**: Vercel
