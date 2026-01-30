# Prometheus Web Obfuscator - Vercel Deployment Ready

> Professional JavaScript and HTML Obfuscator - Now deployable on Vercel!

## 🌐 Web Interface

Open the interactive obfuscator at:
- **Web Demo**: `public/demo.html`
- **Documentation**: `public/index.html`

## 🚀 Quick Start

### Online (Vercel Deployment)
```bash
# The web interface is already set up for Vercel deployment
# Just push to GitHub and Vercel will auto-deploy
git push origin master
```

### Local Development
```bash
cd web-obfuscator
node src/cli.js --preset high yourfile.js
```

### Programmatic Usage
```javascript
const PrometheusWeb = require('./web-obfuscator/src/index');
const prometheus = new PrometheusWeb();
prometheus.applyPreset('high');
const obfuscated = prometheus.obfuscateJS('let x = 1;');
```

## 📁 Project Structure

```
/workspaces/Prometheus/
├── public/                           # Web interface (Vercel serves this)
│   ├── index.html                   # Main landing page
│   └── demo.html                    # Interactive obfuscator
│
├── api/                             # Serverless API endpoints
│   ├── obfuscate.js                # JavaScript obfuscation API
│   └── html.js                     # HTML obfuscation API
│
├── web-obfuscator/                 # Core obfuscation engine
│   ├── src/                        # Source code
│   ├── test/                       # Tests
│   ├── examples/                   # Example files
│   └── README.md                   # Full documentation
│
├── vercel.json                     # Vercel configuration
├── package.json                    # Root package config
└── .vercelignore                   # Files to ignore on Vercel
```

## 🎯 Features

- ✅ JavaScript obfuscation
- ✅ HTML support (embedded scripts)
- ✅ Variable renaming
- ✅ String encryption
- ✅ Dead code injection
- ✅ Multiple presets (Light/Medium/High)
- ✅ Web-based GUI
- ✅ API endpoints
- ✅ Vercel-ready deployment

## 📊 Presets

| Preset | Size Reduction | Security | Best For |
|--------|---|---|---|
| **Light** | 20-30% | ⭐☆☆ | Public code |
| **Medium** | 30-40% | ⭐⭐☆ | Commercial apps |
| **High** | 10-50%* | ⭐⭐⭐ | Sensitive code |

## 🔗 API Endpoints

### Obfuscate JavaScript
```bash
POST /api/obfuscate
Content-Type: application/json

{
  "code": "let x = 42; console.log(x);",
  "preset": "high",
  "options": {
    "renameVariables": true,
    "encryptStrings": true
  }
}
```

Response:
```json
{
  "success": true,
  "obfuscated": "let _0x0000=42;console._0x0001(_0x0000);",
  "stats": {
    "originalSize": 32,
    "obfuscatedSize": 42,
    "reduction": -31
  }
}
```

### Obfuscate HTML
```bash
POST /api/html
Content-Type: application/json

{
  "html": "<script>let x = 1;</script>",
  "preset": "medium"
}
```

## 🛠️ Development

### Run Locally
```bash
# Install dependencies
npm install

# Run Vercel dev server
npm run dev

# Access at http://localhost:3000
```

### Testing
```bash
cd web-obfuscator
npm test
```

## 📚 Documentation

- [Full Documentation](./web-obfuscator/README.md)
- [Getting Started Guide](./web-obfuscator/GETTING_STARTED.md)
- [Quick Reference](./web-obfuscator/QUICK_REFERENCE.md)
- [API Reference](./web-obfuscator/README.md#api)

## ⚠️ Security Notes

- This is an **obfuscator**, not an **encryptor**
- Makes code harder to read, not impossible to reverse
- Never store secrets in client-side code
- Use server-side validation and authentication

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import repository in Vercel
3. Vercel auto-deploys on push
4. Visit your deployed site

### Environment Variables
- No environment variables required by default
- Optional: Add custom API keys for server-side obfuscation

## 📈 Performance

- Small bundle size (~50KB total)
- Fast obfuscation (<50ms for typical code)
- Minimal API latency
- Optimized for serverless environments

## 🐛 Troubleshooting

### Vercel not detecting files
- Check `.vercelignore` configuration
- Ensure `public/` folder exists
- Verify `api/` folder structure

### API not working
- Check browser console for errors
- Verify request format matches examples
- Enable CORS headers (already done)

### Obfuscation not working locally
```bash
cd web-obfuscator
npm test
# All tests should pass
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

MIT License - See [LICENSE](./LICENSE) for details

## 🔗 Links

- [GitHub Repository](https://github.com/BloxCrypto/Prometheus)
- [Original Prometheus (Lua)](https://github.com/levno-710/Prometheus)
- [Discord Community](https://discord.gg/U8h4d4Rf64)

---

**Status**: ✅ Production Ready | **Deployed**: Vercel | **Last Updated**: January 30, 2026

🔒 Protect your code with Prometheus!
