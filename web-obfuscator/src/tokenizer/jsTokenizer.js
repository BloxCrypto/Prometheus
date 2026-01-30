// JavaScript Tokenizer
// Breaks JavaScript code into tokens

const TokenType = {
  // Literals
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  IDENTIFIER: 'IDENTIFIER',
  REGEX: 'REGEX',
  TEMPLATE: 'TEMPLATE',
  
  // Keywords
  KEYWORD: 'KEYWORD',
  
  // Operators
  OPERATOR: 'OPERATOR',
  PUNCTUATION: 'PUNCTUATION',
  
  // Special
  WHITESPACE: 'WHITESPACE',
  COMMENT: 'COMMENT',
  EOF: 'EOF'
};

const KEYWORDS = new Set([
  'abstract', 'arguments', 'await', 'boolean', 'break', 'byte', 'case', 'catch',
  'char', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
  'double', 'else', 'enum', 'eval', 'export', 'extends', 'false', 'final',
  'finally', 'float', 'for', 'function', 'goto', 'if', 'implements', 'import',
  'in', 'instanceof', 'int', 'interface', 'let', 'long', 'native', 'new', 'null',
  'package', 'private', 'protected', 'public', 'return', 'short', 'static',
  'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 'transient',
  'true', 'try', 'typeof', 'var', 'void', 'volatile', 'while', 'with', 'yield'
]);

class Token {
  constructor(type, value, line, column) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
  }
}

class JavaScriptTokenizer {
  constructor(code) {
    this.code = code;
    this.pos = 0;
    this.line = 1;
    this.column = 1;
    this.tokens = [];
  }

  isDigit(char) {
    return /[0-9]/.test(char);
  }

  isAlpha(char) {
    return /[a-zA-Z_$]/.test(char);
  }

  isAlphaNumeric(char) {
    return /[a-zA-Z0-9_$]/.test(char);
  }

  isWhitespace(char) {
    return /[\s]/.test(char);
  }

  peek(offset = 0) {
    return this.code[this.pos + offset] || '';
  }

  advance(count = 1) {
    for (let i = 0; i < count; i++) {
      if (this.code[this.pos] === '\n') {
        this.line++;
        this.column = 1;
      } else {
        this.column++;
      }
      this.pos++;
    }
  }

  skipWhitespace() {
    while (this.isWhitespace(this.peek())) {
      this.advance();
    }
  }

  readString(quote) {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';
    this.advance(); // Skip opening quote

    while (this.pos < this.code.length && this.peek() !== quote) {
      if (this.peek() === '\\') {
        value += this.peek();
        this.advance();
        value += this.peek();
        this.advance();
      } else {
        value += this.peek();
        this.advance();
      }
    }

    if (this.peek() === quote) {
      this.advance(); // Skip closing quote
    }

    return new Token(TokenType.STRING, quote + value + quote, startLine, startCol);
  }

  readNumber() {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';

    while (this.isDigit(this.peek()) || this.peek() === '.') {
      value += this.peek();
      this.advance();
    }

    if (this.peek().toLowerCase() === 'e') {
      value += this.peek();
      this.advance();
      if (this.peek() === '+' || this.peek() === '-') {
        value += this.peek();
        this.advance();
      }
      while (this.isDigit(this.peek())) {
        value += this.peek();
        this.advance();
      }
    }

    return new Token(TokenType.NUMBER, value, startLine, startCol);
  }

  readIdentifier() {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';

    while (this.isAlphaNumeric(this.peek())) {
      value += this.peek();
      this.advance();
    }

    const type = KEYWORDS.has(value) ? TokenType.KEYWORD : TokenType.IDENTIFIER;
    return new Token(type, value, startLine, startCol);
  }

  readLineComment() {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';

    while (this.peek() !== '\n' && this.pos < this.code.length) {
      value += this.peek();
      this.advance();
    }

    return new Token(TokenType.COMMENT, value, startLine, startCol);
  }

  readBlockComment() {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';
    this.advance(2); // Skip /*

    while (this.pos < this.code.length - 1) {
      if (this.peek() === '*' && this.peek(1) === '/') {
        value += '*/';
        this.advance(2);
        break;
      }
      value += this.peek();
      this.advance();
    }

    return new Token(TokenType.COMMENT, '/*' + value, startLine, startCol);
  }

  readRegex() {
    const startLine = this.line;
    const startCol = this.column;
    let value = '';
    this.advance(); // Skip /

    while (this.peek() !== '/' && this.pos < this.code.length) {
      if (this.peek() === '\\') {
        value += this.peek();
        this.advance();
        value += this.peek();
        this.advance();
      } else if (this.peek() === '[') {
        value += this.peek();
        this.advance();
        while (this.peek() !== ']' && this.pos < this.code.length) {
          if (this.peek() === '\\') {
            value += this.peek();
            this.advance();
          }
          value += this.peek();
          this.advance();
        }
        value += this.peek();
        this.advance();
      } else {
        value += this.peek();
        this.advance();
      }
    }

    if (this.peek() === '/') {
      this.advance();
      while (this.isAlpha(this.peek())) {
        this.advance();
      }
    }

    return new Token(TokenType.REGEX, '/' + value + '/', startLine, startCol);
  }

  tokenize() {
    while (this.pos < this.code.length) {
      this.skipWhitespace();

      if (this.pos >= this.code.length) break;

      const char = this.peek();
      const nextChar = this.peek(1);
      const line = this.line;
      const col = this.column;

      // Comments
      if (char === '/' && nextChar === '/') {
        this.tokens.push(this.readLineComment());
        continue;
      }

      if (char === '/' && nextChar === '*') {
        this.tokens.push(this.readBlockComment());
        continue;
      }

      // Strings
      if (char === '"' || char === "'" || char === '`') {
        if (char === '`') {
          // Template literal - simplified handling
          this.tokens.push(this.readString(char));
        } else {
          this.tokens.push(this.readString(char));
        }
        continue;
      }

      // Numbers
      if (this.isDigit(char)) {
        this.tokens.push(this.readNumber());
        continue;
      }

      // Identifiers and keywords
      if (this.isAlpha(char)) {
        this.tokens.push(this.readIdentifier());
        continue;
      }

      // Operators and punctuation
      const twoCharOps = ['==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '**', '=>', '...', '?.'];
      const threeCharOps = ['===', '!==', '**=', '>>>', '>>>'];

      let matched = false;

      for (const op of threeCharOps) {
        if (char + nextChar + this.peek(2) === op) {
          this.tokens.push(new Token(TokenType.OPERATOR, op, line, col));
          this.advance(3);
          matched = true;
          break;
        }
      }

      if (!matched) {
        for (const op of twoCharOps) {
          if (char + nextChar === op) {
            this.tokens.push(new Token(TokenType.OPERATOR, op, line, col));
            this.advance(2);
            matched = true;
            break;
          }
        }
      }

      if (!matched) {
        if ('{}[]().,;:?'.includes(char)) {
          this.tokens.push(new Token(TokenType.PUNCTUATION, char, line, col));
          this.advance();
        } else if ('+-*/%&|^~=<>!'.includes(char)) {
          this.tokens.push(new Token(TokenType.OPERATOR, char, line, col));
          this.advance();
        } else {
          this.advance();
        }
      }
    }

    this.tokens.push(new Token(TokenType.EOF, '', this.line, this.column));
    return this.tokens;
  }
}

module.exports = { JavaScriptTokenizer, TokenType };
