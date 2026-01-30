# Getting Started with Prometheus Web Obfuscator

## Quick Start

### 1. Installation

```bash
cd web-obfuscator
npm install
```

### 2. Basic Usage

#### Command Line

```bash
# Obfuscate with medium preset (default)
node src/cli.js script.js

# Obfuscate with high preset
node src/cli.js --preset high script.js

# Specify output file
node src/cli.js -o output.js script.js

# Obfuscate HTML
node src/cli.js page.html -o page.obf.html
```

#### As a Node.js Module

```javascript
const PrometheusWeb = require('./src/index');

const prometheus = new PrometheusWeb();

// Obfuscate JavaScript
const code = 'let x = 42; console.log(x);';
const obfuscated = prometheus.obfuscateJS(code);
console.log(obfuscated);

// Obfuscate HTML
const html = '<script>let y = 1;</script>';
const obfuscatedHTML = prometheus.obfuscateHTML(html);
```

## Understanding Obfuscation Presets

### Light Preset
- **Best for**: Public code, open-source projects
- **Features**: Minification only
- **File size reduction**: 20-30%
- **Performance impact**: Negligible
- **Reversibility**: Very easy to reverse-engineer

```javascript
prometheus.applyPreset('light');
// Results in compact but readable code
```

### Medium Preset (Default)
- **Best for**: Commercial applications
- **Features**: Variable renaming + minification
- **File size reduction**: 30-40%
- **Performance impact**: Negligible
- **Reversibility**: Moderate difficulty to reverse-engineer

```javascript
prometheus.applyPreset('medium');
// Variables renamed to _0x0000, _0x0001, etc.
```

### High Preset
- **Best for**: Sensitive commercial code
- **Features**: Variable renaming + string encryption + dead code injection
- **File size reduction**: Variable (may increase slightly due to encryption overhead)
- **Performance impact**: Minimal
- **Reversibility**: Significant difficulty to reverse-engineer

```javascript
prometheus.applyPreset('high');
// Full obfuscation applied
```

## Configuration Options

### Available Options

```javascript
const options = {
  // Rename variables, functions, and class names
  renameVariables: true,
  
  // Encrypt string literals
  encryptStrings: true,
  
  // Inject unreachable code
  injectDeadCode: true,
  
  // Remove whitespace and comments
  compact: true,
  
  // Minify HTML structure
  minifyHTML: true,
  
  // Obfuscate CSS selectors
  obfuscateCSS: true
};

const prometheus = new PrometheusWeb({ config: options });
```

### Custom Configurations

```javascript
const prometheus = new PrometheusWeb();

// Apply custom options
prometheus.config.updateOptions({
  renameVariables: true,
  encryptStrings: false,  // Keep this off for debugging
  injectDeadCode: false,
  compact: true
});

const obfuscated = prometheus.obfuscateJS(code);
```

## Examples

### Example 1: Basic Variable Renaming

**Input:**
```javascript
function calculateDiscount(price, discountPercent) {
  const discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
}

const totalPrice = 100;
const discount = 20;
const finalPrice = calculateDiscount(totalPrice, discount);
console.log(finalPrice);
```

**Output (Medium Preset):**
```javascript
function _0x0000(_0x0001,_0x0002){const _0x0003=_0x0001*(_0x0002/100);return _0x0001-_0x0003;}const _0x0004=100;const _0x0005=20;const _0x0006=_0x0000(_0x0004,_0x0005);console.log(_0x0006);
```

### Example 2: String Encryption

**Input:**
```javascript
const apiKey = "sk_live_1234567890";
const secret = "my_secret_password";

fetch('/api/authenticate', {
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'X-Secret': secret
  }
});
```

**Output (High Preset with Encryption):**
```javascript
const _0x0000="\x73\x6b\x5f\x6c\x69\x76\x65\x5f\x31\x32\x33\x34\x35\x36\x37\x38\x39\x30";
const _0x0001="\x6d\x79\x5f\x73\x65\x63\x72\x65\x74\x5f\x70\x61\x73\x73\x77\x6f\x72\x64";
_0x0002("\x2f\x61\x70\x69\x2f\x61\x75\x74\x68\x65\x6e\x74\x69\x63\x61\x74\x65",{_0x0003:{"\x41\x75\x74\x68\x6f\x72\x69\x7a\x61\x74\x69\x6f\x6e":`_0x0004 ${_0x0000}`,"\x58\x2d\x53\x65\x63\x72\x65\x74":_0x0001}});
```

### Example 3: HTML Obfuscation

**Input:**
```html
<html>
  <head>
    <title>My Web App</title>
    <script>
      function submitForm(data) {
        const apiEndpoint = "/api/submit";
        fetch(apiEndpoint, {
          method: 'POST',
          body: JSON.stringify(data)
        });
      }
    </script>
  </head>
  <body>
    <h1>Welcome</h1>
  </body>
</html>
```

**Output (Medium Preset):**
```html
<html><head><title>My Web App</title><script>function _0x0000(_0x0001){const _0x0002="/api/submit";_0x0003(_0x0002,{_0x0004:'POST',_0x0005:JSON._0x0006(_0x0001)});}</script></head><body><h1>Welcome</h1></body></html>
```

## Advanced Usage

### Using the Demo Interface

A web-based GUI is provided in `demo.html`:

```bash
# Open demo.html in your browser
# It provides real-time obfuscation with visual feedback
```

### Integration with Build Tools

#### Webpack Integration

```javascript
// webpack.config.js
const PrometheusWeb = require('prometheus-web');

module.exports = {
  mode: 'production',
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.compilation.tap('PrometheusPlugin', (compilation) => {
          // Obfuscate before minification
          const prometheus = new PrometheusWeb();
          prometheus.applyPreset('high');
          // Apply obfuscation to assets
        });
      }
    }
  ]
};
```

#### Gulp Integration

```javascript
// gulpfile.js
const gulp = require('gulp');
const PrometheusWeb = require('prometheus-web');

gulp.task('obfuscate', () => {
  return gulp.src('src/**/*.js')
    .pipe(through2.obj(function(file, enc, cb) {
      if (file.isBuffer()) {
        const prometheus = new PrometheusWeb();
        file.contents = Buffer.from(
          prometheus.obfuscateJS(file.contents.toString())
        );
      }
      cb(null, file);
    }))
    .pipe(gulp.dest('dist'));
});
```

## Best Practices

### 1. Test After Obfuscation
Always run your test suite after obfuscation to ensure functionality:

```bash
npm test
obfuscate-command script.js -o obfuscated.js
npm test -- --file obfuscated.js
```

### 2. Version Control
Keep source code in version control before obfuscation:

```bash
# Store original
git add src/script.js

# Obfuscate separately
node src/cli.js src/script.js -o dist/script.obf.js
```

### 3. Gradual Deployment
Don't obfuscate all code at once. Start with sensitive parts:

```javascript
// Obfuscate sensitive modules
prometheus.obfuscateFile('src/auth.js');
prometheus.obfuscateFile('src/payment.js');

// Keep debugging code
prometheus.obfuscateFile('src/debug.js', { compact: false });
```

### 4. Reserve Global APIs
Be careful with built-in APIs when renaming:

```javascript
// These will NOT be renamed (protected)
console.log()
document.querySelector()
Math.random()
JSON.stringify()

// Only user-defined variables are renamed
let myVar = 1; // ✓ Will be renamed
function myFunc() {} // ✓ Will be renamed
```

### 5. Monitor File Size
Keep track of file size impact:

```bash
# Original size
ls -lh src/script.js

# After obfuscation
ls -lh dist/script.obf.js

# Comparison
echo "Reduction: $(( (original - obfuscated) * 100 / original ))%"
```

## Troubleshooting

### Issue: Obfuscated code doesn't work

**Solution**: 
1. Ensure you're not obfuscating built-in APIs
2. Test with `light` preset first
3. Gradually increase obfuscation level
4. Check for dynamic code evaluation (eval, Function constructor)

### Issue: File size increased

**Solution**:
- This can happen with string encryption
- Enable compact mode: `compact: true`
- Use `light` or `medium` preset

### Issue: Certain variables not obfuscated

**Solution**:
- Check if they're reserved names
- Some identifiers are protected (DOM APIs, etc.)
- Try with a custom configuration

## Performance Considerations

| Preset | Speed | File Size | Security |
|--------|-------|-----------|----------|
| Light  | ⚡⚡⚡ | -20-30%   | ⭐☆☆   |
| Medium | ⚡⚡  | -30-40%   | ⭐⭐☆  |
| High   | ⚡    | -10-50%*  | ⭐⭐⭐ |

*Depends on string content and dead code injection

## Security Notes

⚠️ **Important**: This tool provides **obfuscation**, not encryption. It makes code harder to read, but determined users can still reverse-engineer obfuscated code.

### Recommended Security Practices

1. **Use HTTPS** for all API communications
2. **Keep secrets on server** - Never hardcode API keys in client code
3. **Use server-side validation** - Don't rely on client-side checks
4. **Implement proper authentication** - Use secure tokens/sessions
5. **Monitor for abuse** - Track unusual API usage patterns

### Example Secure Implementation

```javascript
// ✗ INSECURE - API key in client
const apiKey = "sk_live_secret";
fetch('/api/data', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});

// ✓ SECURE - Token from server session
const token = window.SESSION_TOKEN; // Set by server
fetch('/api/data', {
  credentials: 'include',
  headers: { 'Authorization': `Bearer ${token}` }
});
```

## Next Steps

- Explore the [API Documentation](./API.md)
- Check out [Advanced Configuration](./ADVANCED.md)
- Review [Example Projects](./examples/)
- Read [Security Guidelines](./SECURITY.md)

## Getting Help

- 📖 Check the [README](./README.md)
- 🐛 Report issues on GitHub
- 💬 Join our community Discord
- 📧 Contact support

Happy obfuscating! 🔒
