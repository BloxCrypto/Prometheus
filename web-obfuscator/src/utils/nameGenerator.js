// Name Generator
// Generates obfuscated variable names

class NameGenerator {
  constructor() {
    this.counter = 0;
    this.strategies = {
      minified: this.generateMinified.bind(this),
      mangled: this.generateMangled.bind(this),
      unicode: this.generateUnicode.bind(this)
    };
    this.strategy = 'mangled';
  }

  /**
   * Generate an obfuscated name
   * @returns {string} - Generated name
   */
  generate() {
    return this.strategies[this.strategy]();
  }

  /**
   * Generate minified names (short)
   * @returns {string}
   */
  generateMinified() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
    let result = '';
    let num = this.counter++;

    do {
      result = chars[num % chars.length] + result;
      num = Math.floor(num / chars.length) - 1;
    } while (num >= 0);

    return result;
  }

  /**
   * Generate mangled names (similar to minifiers like UglifyJS)
   * @returns {string}
   */
  generateMangled() {
    const prefix = '_0x';
    const hex = (this.counter++).toString(16);
    return prefix + hex.padStart(4, '0');
  }

  /**
   * Generate unicode-based obfuscated names
   * @returns {string}
   */
  generateUnicode() {
    const chars = [];
    let num = this.counter++;

    while (num >= 0) {
      chars.push(String.fromCharCode(0x100 + (num % 256)));
      num = Math.floor(num / 256) - 1;
    }

    return '_' + chars.reverse().join('');
  }

  /**
   * Set generation strategy
   * @param {string} strategy - Strategy name
   */
  setStrategy(strategy) {
    if (this.strategies[strategy]) {
      this.strategy = strategy;
    }
  }

  /**
   * Reset counter
   */
  reset() {
    this.counter = 0;
  }
}

module.exports = NameGenerator;
