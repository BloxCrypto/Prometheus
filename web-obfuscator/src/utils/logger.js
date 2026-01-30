// Logger
// Simple logging utility

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

class Logger {
  constructor(logLevel = 'info') {
    this.logLevel = logLevel;
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
      none: 4
    };
  }

  shouldLog(level) {
    return this.levels[level] >= this.levels[this.logLevel];
  }

  log(level, message) {
    if (!this.shouldLog(level)) return;

    const timestamp = new Date().toLocaleTimeString();
    const levelColors = {
      debug: colors.cyan,
      info: colors.green,
      warn: colors.yellow,
      error: colors.red
    };

    const color = levelColors[level] || colors.reset;
    console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}[${level.toUpperCase()}]${colors.reset} ${message}`);
  }

  debug(message) {
    this.log('debug', message);
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }
}

module.exports = Logger;
