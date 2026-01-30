// API endpoint for HTML obfuscation
// Deploy this as a Vercel serverless function

const PrometheusWeb = require('../../web-obfuscator/src/index.js');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { html, preset = 'medium', options = {} } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML is required' });
    }

    const prometheus = new PrometheusWeb();
    
    if (preset) {
      prometheus.applyPreset(preset);
    }
    
    if (Object.keys(options).length > 0) {
      prometheus.config.updateOptions(options);
    }

    const obfuscated = prometheus.obfuscateHTML(html);
    
    res.status(200).json({
      success: true,
      obfuscated,
      stats: {
        originalSize: html.length,
        obfuscatedSize: obfuscated.length,
        reduction: Math.round(((html.length - obfuscated.length) / html.length) * 100)
      }
    });
  } catch (error) {
    console.error('HTML obfuscation error:', error);
    res.status(500).json({
      error: 'HTML obfuscation failed',
      message: error.message
    });
  }
};
