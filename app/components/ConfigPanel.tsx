'use client'

import styles from './ConfigPanel.module.css'

interface ConfigPanelProps {
  preset: 'light' | 'medium' | 'high'
  inputType: 'javascript' | 'html'
  onPresetChange: (preset: 'light' | 'medium' | 'high') => void
  onInputTypeChange: (inputType: 'javascript' | 'html') => void
  onObfuscate: () => void
  onClear: () => void
  isLoading?: boolean
}

export default function ConfigPanel({
  preset,
  inputType,
  onPresetChange,
  onInputTypeChange,
  onObfuscate,
  onClear,
  isLoading = false,
}: ConfigPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <h3>⚙️ Configuration</h3>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Code Type</label>
        <div className={styles.buttonGroup}>
          <button
            onClick={() => onInputTypeChange('javascript')}
            className={`${styles.button} ${inputType === 'javascript' ? styles.active : ''}`}
          >
            JavaScript
          </button>
          <button
            onClick={() => onInputTypeChange('html')}
            className={`${styles.button} ${inputType === 'html' ? styles.active : ''}`}
          >
            HTML
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Obfuscation Level</label>
        <div className={styles.presets}>
          {['light', 'medium', 'high'].map((p) => (
            <div key={p} className={styles.preset}>
              <input
                type="radio"
                id={`preset-${p}`}
                name="preset"
                value={p}
                checked={preset === p}
                onChange={() => onPresetChange(p as 'light' | 'medium' | 'high')}
              />
              <label htmlFor={`preset-${p}`} className={styles.presetLabel}>
                <div className={styles.presetName}>{p.charAt(0).toUpperCase() + p.slice(1)}</div>
                <div className={styles.presetDesc}>
                  {p === 'light' && '20-30%'}
                  {p === 'medium' && '30-40%'}
                  {p === 'high' && '10-50%'}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.presetInfo}>
          {preset === 'light' && (
            <>
              <h4>Light Preset</h4>
              <p>Minimal obfuscation with 20-30% code reduction. Best for public code.</p>
            </>
          )}
          {preset === 'medium' && (
            <>
              <h4>Medium Preset</h4>
              <p>Balanced obfuscation with 30-40% reduction. Ideal for commercial applications.</p>
            </>
          )}
          {preset === 'high' && (
            <>
              <h4>High Preset</h4>
              <p>Aggressive obfuscation with string encryption. Best for sensitive code (10-50% reduction).</p>
            </>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <button
          onClick={onObfuscate}
          disabled={isLoading}
          className={styles.primaryButton}
        >
          {isLoading ? '⏳ Processing...' : '🔒 Obfuscate'}
        </button>
        <button
          onClick={onClear}
          disabled={isLoading}
          className={styles.secondaryButton}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
