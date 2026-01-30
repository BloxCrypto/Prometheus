'use client'

import styles from './OutputPanel.module.css'

interface OutputPanelProps {
  value: string
  onCopy: () => void
  label?: string
  isLoading?: boolean
}

export default function OutputPanel({
  value,
  onCopy,
  label,
  isLoading = false,
}: OutputPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.label}>{label}</div>
        <button
          onClick={onCopy}
          disabled={!value || isLoading}
          className={styles.copyButton}
          title="Copy to clipboard"
        >
          {isLoading ? '⏳ Processing...' : '📋 Copy'}
        </button>
      </div>
      <textarea
        value={value}
        readOnly
        className={styles.textarea}
        placeholder="Obfuscated code will appear here..."
        spellCheck="false"
      />
      <div className={styles.stats}>
        <span>{value.length} characters</span>
        <span>{value.split('\n').length} lines</span>
        {value && <span className={styles.reduction}>
          ~{Math.round((1 - value.length / (document.querySelector('textarea:first-of-type')?.value.length || 1)) * 100)}% reduction
        </span>}
      </div>
    </div>
  )
}
