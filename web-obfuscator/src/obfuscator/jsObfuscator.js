// JavaScript Obfuscator
// Main obfuscation engine for JavaScript code

const { JavaScriptTokenizer } = require('../tokenizer/jsTokenizer');
const NameGenerator = require('../utils/nameGenerator');
const StringEncryptor = require('../steps/stringEncryptor');
const VariableRenamer = require('../steps/variableRenamer');
const DeadCodeInjector = require('../steps/deadCodeInjector');

class JavaScriptObfuscator {
  constructor(config) {
    this.config = config;
    this.nameGenerator = new NameGenerator();
    this.stringEncryptor = new StringEncryptor();
    this.variableRenamer = new VariableRenamer(this.nameGenerator);
    this.deadCodeInjector = new DeadCodeInjector();
  }

  obfuscate(code, options = {}) {
    const steps = [];
    
    // Apply obfuscation steps based on options
    if (options.renameVariables !== false) {
      steps.push(this.variableRenamer);
    }

    if (options.encryptStrings !== false) {
      steps.push(this.stringEncryptor);
    }

    if (options.injectDeadCode !== false) {
      steps.push(this.deadCodeInjector);
    }

    if (options.compact !== false) {
      code = this.compactCode(code);
    }

    // Apply each step
    for (const step of steps) {
      code = step.process(code, options);
    }

    return code;
  }

  compactCode(code) {
    // Remove unnecessary whitespace and comments
    return code
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('//'))
      .join('\n')
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .replace(/\s*([{}();:,])\s*/g, '$1'); // Remove spaces around punctuation
  }
}

module.exports = JavaScriptObfuscator;
