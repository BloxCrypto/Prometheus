'use client'

import { useState, useCallback } from 'react'
import CodeEditor from '@/app/components/CodeEditor'
import ConfigPanel from '@/app/components/ConfigPanel'
import OutputPanel from '@/app/components/OutputPanel'
import styles from './page.module.css'

interface ObfuscatorState {
  input: string
  output: string
  preset: 'light' | 'medium' | 'high'
  inputType: 'javascript' | 'html'
  isLoading: boolean
  error: string | null
}

export default function ObfuscatorPage() {
  const [state, setState] = useState<ObfuscatorState>({
    input: '',
    output: '',
    preset: 'medium',
    inputType: 'javascript',
    isLoading: false,
    error: null,
  })

  const handleObfuscate = useCallback(async () => {
    if (!state.input.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter some code to obfuscate' }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const endpoint = state.inputType === 'javascript' ? '/api/obfuscate' : '/api/html'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: state.input,
          preset: state.preset,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      setState(prev => ({
        ...prev,
        output: data.obfuscated,
        isLoading: false,
      }))
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Unknown error occurred',
        isLoading: false,
      }))
    }
  }, [state.input, state.preset, state.inputType])

  const handleCopyOutput = useCallback(async () => {
    if (state.output) {
      try {
        await navigator.clipboard.writeText(state.output)
        // Show toast notification (you can add this later)
      } catch (err) {
        setState(prev => ({ ...prev, error: 'Failed to copy to clipboard' }))
      }
    }
  }, [state.output])

  const handleClearAll = useCallback(() => {
    setState({
      input: '',
      output: '',
      preset: 'medium',
      inputType: 'javascript',
      isLoading: false,
      error: null,
    })
  }, [])

  const handlePresetChange = useCallback((preset: 'light' | 'medium' | 'high') => {
    setState(prev => ({ ...prev, preset }))
  }, [])

  const handleInputTypeChange = useCallback((inputType: 'javascript' | 'html') => {
    setState(prev => ({ ...prev, inputType }))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>🔧 Code Obfuscator</h1>
        <p>Transform your code with advanced obfuscation techniques</p>
      </div>

      <div className={styles.content}>
        <div className={styles.workspace}>
          <div className={styles.panel}>
            <CodeEditor
              value={state.input}
              onChange={(value) => setState(prev => ({ ...prev, input: value }))}
              placeholder="Paste your JavaScript or HTML code here..."
              label="Input Code"
            />
          </div>

          <div className={styles.panel}>
            <OutputPanel
              value={state.output}
              onCopy={handleCopyOutput}
              label="Obfuscated Code"
              isLoading={state.isLoading}
            />
          </div>
        </div>

        <div className={styles.sidebar}>
          <ConfigPanel
            preset={state.preset}
            inputType={state.inputType}
            onPresetChange={handlePresetChange}
            onInputTypeChange={handleInputTypeChange}
            onObfuscate={handleObfuscate}
            onClear={handleClearAll}
            isLoading={state.isLoading}
          />

          {state.error && (
            <div className={styles.error}>
              <strong>Error:</strong> {state.error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
