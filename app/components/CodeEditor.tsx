'use client'

import styles from './CodeEditor.module.css'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  readOnly?: boolean
}

export default function CodeEditor({
  value,
  onChange,
  placeholder,
  label,
  readOnly = false,
}: CodeEditorProps) {
  return (
    <div className={styles.editor}>
      {label && <div className={styles.label}>{label}</div>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        className={styles.textarea}
        spellCheck="false"
      />
      <div className={styles.stats}>
        <span>{value.length} characters</span>
        <span>{value.split('\n').length} lines</span>
      </div>
    </div>
  )
}
