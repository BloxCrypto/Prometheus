// HTML Processor
// Processes HTML files and obfuscates embedded scripts and styles

class HtmlProcessor {
  constructor(config) {
    this.config = config;
  }

  process(html, options = {}) {
    const JavaScriptObfuscator = require('../obfuscator/jsObfuscator');
    const jsObfuscator = new JavaScriptObfuscator(this.config);

    // Process inline scripts
    html = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, (match, code) => {
      if (code.trim()) {
        const obfuscated = jsObfuscator.obfuscate(code, options);
        return `<script>${obfuscated}</script>`;
      }
      return match;
    });

    // Process inline styles (basic obfuscation)
    if (options.obfuscateCSS !== false) {
      html = html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (match, code) => {
        const obfuscated = this.obfuscateCSS(code);
        return `<style>${obfuscated}</style>`;
      });
    }

    // Optionally minify HTML structure
    if (options.minifyHTML !== false) {
      html = this.minifyHTML(html);
    }

    return html;
  }

  obfuscateCSS(css) {
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Collapse whitespace
    css = css.replace(/\s+/g, ' ');
    
    // Remove spaces around special characters
    css = css.replace(/\s*([{}:;,])\s*/g, '$1');
    
    return css.trim();
  }

  minifyHTML(html) {
    // Remove comments
    html = html.replace(/<!--[\s\S]*?-->/g, '');
    
    // Remove newlines and extra spaces (but preserve single spaces within tags)
    html = html.replace(/>\s+</g, '><');
    html = html.replace(/\s+/g, ' ');
    
    return html.trim();
  }
}

module.exports = HtmlProcessor;
