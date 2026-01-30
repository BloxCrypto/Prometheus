// Prometheus Web Obfuscator - Main Entry Point
// Converts JavaScript and HTML into obfuscated forms

const JavaScriptObfuscator = require('./obfuscator/jsObfuscator');
const HtmlProcessor = require('./processors/htmlProcessor');
const ConfigManager = require('./config/configManager');
const Logger = require('./utils/logger');

class PrometheusWeb {
  constructor(options = {}) {
    this.options = options;
    this.logger = new Logger(options.logLevel || 'info');
    this.config = new ConfigManager(options.config || {});
    this.jsObfuscator = new JavaScriptObfuscator(this.config);
    this.htmlProcessor = new HtmlProcessor(this.config);
  }

  /**
   * Obfuscate JavaScript code
   * @param {string} code - JavaScript source code
   * @param {object} options - Obfuscation options
   * @returns {string} - Obfuscated code
   */
  obfuscateJS(code, options = {}) {
    this.logger.info('Starting JavaScript obfuscation...');
    const mergedOptions = { ...this.config.options, ...options };
    const obfuscated = this.jsObfuscator.obfuscate(code, mergedOptions);
    this.logger.info('JavaScript obfuscation completed');
    return obfuscated;
  }

  /**
   * Obfuscate HTML (including embedded scripts)
   * @param {string} html - HTML source code
   * @param {object} options - Obfuscation options
   * @returns {string} - Obfuscated HTML
   */
  obfuscateHTML(html, options = {}) {
    this.logger.info('Starting HTML obfuscation...');
    const mergedOptions = { ...this.config.options, ...options };
    const obfuscated = this.htmlProcessor.process(html, mergedOptions);
    this.logger.info('HTML obfuscation completed');
    return obfuscated;
  }

  /**
   * Obfuscate a file
   * @param {string} filePath - Path to file
   * @param {object} options - Obfuscation options
   * @returns {string} - Obfuscated code
   */
  obfuscateFile(filePath, options = {}) {
    const fs = require('fs');
    const path = require('path');
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const code = fs.readFileSync(filePath, 'utf-8');
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.html' || ext === '.htm') {
      return this.obfuscateHTML(code, options);
    } else if (ext === '.js') {
      return this.obfuscateJS(code, options);
    } else {
      throw new Error(`Unsupported file type: ${ext}`);
    }
  }

  /**
   * Get list of available presets
   * @returns {object} - Available presets
   */
  getPresets() {
    return this.config.getPresets();
  }

  /**
   * Apply a preset
   * @param {string} presetName - Name of preset
   */
  applyPreset(presetName) {
    this.config.applyPreset(presetName);
  }
}

module.exports = PrometheusWeb;
