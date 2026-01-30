import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>🔒 Prometheus Web Obfuscator</h1>
          <p>Professional JavaScript and HTML Obfuscation Tool</p>
        </div>

        <div className={styles.content}>
          {/* Getting Started Section */}
          <section className={styles.section}>
            <h2>🚀 Quick Access</h2>
            <div className={styles.grid}>
              <div className={styles.card}>
                <h3>🌐 Web Obfuscator</h3>
                <p>Interactive browser-based tool for real-time obfuscation with visual feedback.</p>
                <Link href="/obfuscator" className={styles.cardLink}>
                  Open Obfuscator →
                </Link>
              </div>

              <div className={styles.card}>
                <h3>📖 Documentation</h3>
                <p>Complete guide with all features, configuration options, and usage examples.</p>
                <a href="https://github.com/BloxCrypto/Prometheus" className={styles.cardLink}>
                  View GitHub →
                </a>
              </div>

              <div className={styles.card}>
                <h3>⚡ Quick Start</h3>
                <p>Get started in minutes with step-by-step instructions and examples.</p>
                <a href="https://github.com/BloxCrypto/Prometheus/blob/master/web-obfuscator/GETTING_STARTED.md" className={styles.cardLink}>
                  Read Guide →
                </a>
              </div>

              <div className={styles.card}>
                <h3>💻 CLI Tool</h3>
                <p>Command-line interface for batch obfuscation and integration.</p>
                <a href="https://github.com/BloxCrypto/Prometheus/blob/master/web-obfuscator/QUICK_REFERENCE.md" className={styles.cardLink}>
                  CLI Reference →
                </a>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className={styles.section}>
            <h2>✨ Key Features</h2>
            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>JavaScript obfuscation</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>HTML support (embedded scripts)</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>Variable renaming</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>String encryption</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>Dead code injection</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>Multiple presets (Light/Medium/High)</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>CLI interface</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>✓</span>
                <span className={styles.featureText}>Programmatic API</span>
              </div>
            </div>
          </section>

          {/* Presets Section */}
          <section className={styles.section}>
            <h2>🎯 Obfuscation Presets</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Preset</th>
                  <th>Size Reduction</th>
                  <th>Security</th>
                  <th>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Light</strong></td>
                  <td>20-30%</td>
                  <td>⭐☆☆</td>
                  <td>Public code</td>
                </tr>
                <tr>
                  <td><strong>Medium</strong></td>
                  <td>30-40%</td>
                  <td>⭐⭐☆</td>
                  <td>Commercial apps</td>
                </tr>
                <tr>
                  <td><strong>High</strong></td>
                  <td>10-50%*</td>
                  <td>⭐⭐⭐</td>
                  <td>Sensitive code</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <div className={styles.footer}>
          <h3>Prometheus Web Obfuscator</h3>
          <p>Transform your JavaScript and HTML code into obfuscated forms to protect against reverse engineering.</p>
          <p style={{ marginTop: '20px' }}>
            © 2025 BloxCrypto. All rights reserved. | 
            <Link href="/" style={{ marginLeft: '8px' }}>Home</Link> | 
            <a href="https://github.com/BloxCrypto/Prometheus" style={{ marginLeft: '8px' }}>GitHub</a>
          </p>
        </div>
      </div>
    </main>
  )
}
