// String Encryptor Step
// Encrypts strings in the code to hide sensitive information

const { JavaScriptTokenizer, TokenType } = require('../tokenizer/jsTokenizer');

class StringEncryptor {
  constructor() {
    this.stringMap = new Map();
    this.encryptionKey = Math.random().toString(36).substring(2, 15);
  }

  process(code, options = {}) {
    const tokenizer = new JavaScriptTokenizer(code);
    const tokens = tokenizer.tokenize();

    let result = code;
    const stringReplacements = [];

    // Collect all string literals
    for (const token of tokens) {
      if (token.type === TokenType.STRING) {
        const encrypted = this.encryptString(token.value);
        stringReplacements.push({
          original: token.value,
          encrypted: encrypted
        });
      }
    }

    // Replace strings (from end to start to maintain positions)
    stringReplacements.forEach(replacement => {
      result = result.split(replacement.original).join(replacement.encrypted);
    });

    // Add decryption function at the beginning
    if (stringReplacements.length > 0) {
      const decryptor = this.generateDecryptor();
      result = decryptor + '\n' + result;
    }

    return result;
  }

  encryptString(str) {
    // Simple XOR encryption for demonstration
    const content = str.slice(1, -1); // Remove quotes
    const quote = str[0];
    
    let encrypted = '';
    for (let i = 0; i < content.length; i++) {
      const code = content.charCodeAt(i) ^ 42; // XOR with 42
      encrypted += '\\x' + code.toString(16).padStart(2, '0');
    }

    return quote + encrypted + quote;
  }

  generateDecryptor() {
    return `
(function() {
  const _decrypt = function(str) {
    let result = '';
    for (let i = 0; i < str.length; i += 2) {
      const hex = str.substr(i, 2);
      const code = parseInt(hex, 16) ^ 42;
      result += String.fromCharCode(code);
    }
    return result;
  };
  window._d = _decrypt;
})();
    `.trim();
  }
}

module.exports = StringEncryptor;
