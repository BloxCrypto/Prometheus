#!/bin/bash
# Quick start script for Prometheus Web Obfuscator

echo "Prometheus Web Obfuscator - Quick Start"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    exit 1
fi

echo "Node.js version: $(node --version)"
echo ""

# Create directories if they don't exist
mkdir -p src/tokenizer src/obfuscator src/processors src/steps src/config src/utils test examples

echo "✓ Project structure ready"
echo ""

# Display CLI help
echo "Usage Examples:"
echo ""
echo "1. Obfuscate a JavaScript file:"
echo "   node src/cli.js --preset high examples/example.js"
echo ""
echo "2. Obfuscate an HTML file:"
echo "   node src/cli.js --preset high -o output.html examples/example.html"
echo ""
echo "3. Run tests:"
echo "   node test/tests.js"
echo ""
echo "4. Use as a module in Node.js:"
echo "   const PrometheusWeb = require('./src/index');"
echo "   const prometheus = new PrometheusWeb();"
echo "   const obfuscated = prometheus.obfuscateJS('let x = 1;');"
echo ""
