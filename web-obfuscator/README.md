# Prometheus Web Obfuscator

A powerful JavaScript and HTML obfuscator written in JavaScript - the web version of the original Lua-based Prometheus obfuscator.

## Features

- **JavaScript Obfuscation**
  - Variable renaming
  - String encryption
  - Dead code injection
  - Code compaction

- **HTML Support**
  - Inline script obfuscation
  - CSS minification
  - HTML structure preservation

- **Multiple Presets**
  - `light` - Basic minification
  - `medium` - Variable renaming + minification
  - `high` - Full obfuscation with encryption

- **CLI and Programmatic API**
  - Easy command-line interface
  - Flexible API for integration

## Installation

### Prerequisites
- Node.js 12+

### Clone and Setup
```bash
cd web-obfuscator
npm install
```

## Usage

### Command Line

```bash
# Obfuscate a JavaScript file with medium preset
node src/cli.js --preset medium script.js

# Obfuscate HTML file
node src/cli.js -o output.html page.html

# Use high obfuscation
node src/cli.js --preset high --output obfuscated.js app.js
```

### Programmatic API

```javascript
const PrometheusWeb = require('./src/index');

// Create obfuscator instance
const prometheus = new PrometheusWeb();

// Set preset
prometheus.applyPreset('high');

// Obfuscate JavaScript
const jsCode = 'let secret = "password"; console.log(secret);';
const obfuscatedJS = prometheus.obfuscateJS(jsCode);

// Obfuscate HTML
const html = '<script>let x = 1;</script>';
const obfuscatedHTML = prometheus.obfuscateHTML(html);

// Obfuscate file
const result = prometheus.obfuscateFile('input.js');
```

## Configuration

### Presets

#### Light Preset
```javascript
{
  renameVariables: false,
  encryptStrings: false,
  injectDeadCode: false,
  compact: true,
  minifyHTML: false
}
```

#### Medium Preset (Default)
```javascript
{
  renameVariables: true,
  encryptStrings: false,
  injectDeadCode: false,
  compact: true,
  minifyHTML: true
}
```

#### High Preset
```javascript
{
  renameVariables: true,
  encryptStrings: true,
  injectDeadCode: true,
  compact: true,
  minifyHTML: true,
  obfuscateCSS: true
}
```

### Custom Configuration

```javascript
const prometheus = new PrometheusWeb({
  config: {
    renameVariables: true,
    encryptStrings: true,
    injectDeadCode: false,
    compact: true,
    minifyHTML: true
  }
});
```

## Obfuscation Steps

### 1. Variable Renaming
Converts readable variable names to obfuscated ones:
```javascript
// Original
let userName = "admin";
let password = "secret";

// Obfuscated
let _0x0000 = "admin";
let _0x0001 = "secret";
```

### 2. String Encryption
Encrypts string literals to hide sensitive information:
```javascript
// Original
let api_key = "sk-1234567890";

// Obfuscated
let _0x0000 = "\x73\x6b\x2d\x31\x32\x33\x34\x35\x36\x37\x38\x39\x30";
```

### 3. Dead Code Injection
Adds unreachable code to increase complexity:
```javascript
// Adds snippets like:
if(false) { var unused = 1; }
try { throw new Error(); } catch(e) {}
```

### 4. Code Compaction
Removes whitespace and comments to reduce size:
```javascript
// Original
function test() {
  // Comment
  return 42;
}

// Compacted
function test(){return 42;}
```

## Project Structure

```
web-obfuscator/
├── src/
│   ├── index.js              # Main entry point
│   ├── cli.js                # CLI interface
│   ├── tokenizer/
│   │   └── jsTokenizer.js    # JavaScript tokenizer
│   ├── obfuscator/
│   │   └── jsObfuscator.js   # JavaScript obfuscator
│   ├── processors/
│   │   └── htmlProcessor.js  # HTML processor
│   ├── steps/
│   │   ├── variableRenamer.js      # Variable renaming step
│   │   ├── stringEncryptor.js      # String encryption step
│   │   └── deadCodeInjector.js     # Dead code injection step
│   ├── config/
│   │   └── configManager.js        # Configuration management
│   └── utils/
│       ├── logger.js               # Logging utility
│       └── nameGenerator.js        # Name generation utility
├── test/
│   └── tests.js              # Test suite
├── package.json
└── README.md
```

## Running Tests

```bash
npm test
```

## Examples

### Example 1: Simple JavaScript Obfuscation

**Input:**
```javascript
function greet(name) {
  let message = "Hello, " + name;
  console.log(message);
}

greet("World");
```

**Output (with medium preset):**
```javascript
function _0x0000(_0x0001){let _0x0002="Hello, "+_0x0001;console.log(_0x0002);}
_0x0000("World");
```

### Example 2: HTML with Embedded Scripts

**Input:**
```html
<html>
  <head>
    <script>
      let apiKey = "secret-key-123";
      fetch('/api', { headers: { key: apiKey } });
    </script>
  </head>
</html>
```

**Output (with high preset):**
Embedded script is obfuscated, HTML structure is compressed.

## Security Notes

⚠️ **Important**: This obfuscator provides **obfuscation**, not encryption. It makes code harder to read and understand, but determined users can still reverse-engineer obfuscated code.

For truly sensitive information:
- Use HTTPS for API communications
- Keep authentication tokens on the server-side
- Use proper encryption for sensitive data
- Implement server-side validation

## Limitations

- Does not support ES6+ modules (import/export) yet
- Limited support for dynamic code generation
- May not handle all edge cases in complex codebases
- Variable renaming doesn't account for scope in all cases

## Future Enhancements

- [ ] ES6+ module support
- [ ] Advanced control flow flattening
- [ ] Proxy-based property hiding
- [ ] Advanced string encoding methods
- [ ] CSS class name obfuscation
- [ ] HTML attribute obfuscation
- [ ] Support for TypeScript
- [ ] Plugin system for custom transformations

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## Support

For issues and questions, please open an issue on the GitHub repository.
