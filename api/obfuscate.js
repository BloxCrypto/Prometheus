// API endpoint for JavaScript obfuscation
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
    const { code, preset = 'medium', options = {} } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const prometheus = new PrometheusWeb();
    
    if (preset) {
      prometheus.applyPreset(preset);
    }
    
    if (Object.keys(options).length > 0) {
      prometheus.config.updateOptions(options);
    }

    const obfuscated = prometheus.obfuscateJS(code);
    
    res.status(200).json({
      success: true,
      obfuscated,
      stats: {
        originalSize: code.length,
        obfuscatedSize: obfuscated.length,
        reduction: Math.round(((code.length - obfuscated.length) / code.length) * 100)
      }
    });
  } catch (error) {
    console.error('Obfuscation error:', error);
    res.status(500).json({
      error: 'Obfuscation failed',
      message: error.message
    });
  }
};
