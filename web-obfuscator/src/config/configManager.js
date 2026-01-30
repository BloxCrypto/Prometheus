// Configuration Manager
// Manages obfuscation presets and configurations

class ConfigManager {
  constructor(customConfig = {}) {
    this.presets = {
      light: {
        renameVariables: false,
        encryptStrings: false,
        injectDeadCode: false,
        compact: true,
        minifyHTML: false
      },
      medium: {
        renameVariables: true,
        encryptStrings: false,
        injectDeadCode: false,
        compact: true,
        minifyHTML: true
      },
      high: {
        renameVariables: true,
        encryptStrings: true,
        injectDeadCode: true,
        compact: true,
        minifyHTML: true,
        obfuscateCSS: true
      }
    };

    this.options = customConfig || this.presets.medium;
  }

  /**
   * Apply a preset
   * @param {string} presetName - Name of the preset
   */
  applyPreset(presetName) {
    if (this.presets[presetName]) {
      this.options = { ...this.presets[presetName] };
      return true;
    }
    return false;
  }

  /**
   * Get all available presets
   * @returns {object} - Available presets
   */
  getPresets() {
    return Object.keys(this.presets);
  }

  /**
   * Get a specific preset
   * @param {string} presetName - Name of the preset
   * @returns {object} - Preset options
   */
  getPreset(presetName) {
    return this.presets[presetName];
  }

  /**
   * Update options
   * @param {object} newOptions - New options to merge
   */
  updateOptions(newOptions) {
    this.options = { ...this.options, ...newOptions };
  }

  /**
   * Get current options
   * @returns {object} - Current options
   */
  getOptions() {
    return this.options;
  }
}

module.exports = ConfigManager;
