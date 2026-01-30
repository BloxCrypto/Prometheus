// Variable Renamer Step
// Renames variables, functions, and properties to make code harder to read

const { JavaScriptTokenizer, TokenType } = require('../tokenizer/jsTokenizer');

class VariableRenamer {
  constructor(nameGenerator) {
    this.nameGenerator = nameGenerator;
    this.varMap = new Map();
    this.reservedNames = new Set([
      'window', 'document', 'console', 'Math', 'Array', 'Object', 'String',
      'Number', 'Boolean', 'Function', 'RegExp', 'Date', 'Error', 'JSON',
      'Promise', 'Symbol', 'Map', 'Set', 'WeakMap', 'WeakSet', 'Proxy',
      'Reflect', 'eval', 'isNaN', 'isFinite', 'parseInt', 'parseFloat'
    ]);
  }

  process(code, options = {}) {
    const tokenizer = new JavaScriptTokenizer(code);
    const tokens = tokenizer.tokenize();

    // First pass: collect all identifiers
    const identifiers = new Set();
    for (const token of tokens) {
      if (token.type === TokenType.IDENTIFIER) {
        identifiers.add(token.value);
      }
    }

    // Generate renamed variables
    for (const identifier of identifiers) {
      if (!this.reservedNames.has(identifier)) {
        this.varMap.set(identifier, this.nameGenerator.generate());
      }
    }

    // Second pass: rename in code
    let result = code;
    for (const [original, renamed] of this.varMap) {
      // Use word boundaries to avoid partial replacements
      const regex = new RegExp(`\\b${this.escapeRegex(original)}\\b`, 'g');
      result = result.replace(regex, renamed);
    }

    return result;
  }

  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

module.exports = VariableRenamer;
