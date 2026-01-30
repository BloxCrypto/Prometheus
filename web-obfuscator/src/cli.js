#!/usr/bin/env node

// CLI Interface
// Command-line interface for Prometheus Web Obfuscator

const fs = require('fs');
const path = require('path');
const PrometheusWeb = require('./index');
const Logger = require('./utils/logger');

const logger = new Logger('info');

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    input: null,
    output: null,
    preset: 'medium',
    config: null
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--preset' || arg === '-p') {
      options.preset = args[++i];
    } else if (arg === '--output' || arg === '-o') {
      options.output = args[++i];
    } else if (arg === '--config' || arg === '-c') {
      options.config = args[++i];
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else if (!arg.startsWith('-')) {
      options.input = arg;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
Prometheus Web Obfuscator - Convert JavaScript and HTML to obfuscated code

Usage: prometheus-web [options] <input-file>

Options:
  -p, --preset <name>       Obfuscation preset: light, medium, high (default: medium)
  -o, --output <file>       Output file (default: same as input with .obf extension)
  -c, --config <file>       Configuration file
  -h, --help                Show this help message

Examples:
  prometheus-web --preset high script.js
  prometheus-web -o output.js -p medium input.js
  prometheus-web page.html

Available Presets:
  light  - Basic minification only
  medium - Variable renaming + minification
  high   - Full obfuscation (renaming, encryption, dead code injection)
  `);
}

async function main() {
  const options = parseArgs();

  if (!options.input) {
    console.error('Error: No input file specified');
    printHelp();
    process.exit(1);
  }

  if (!fs.existsSync(options.input)) {
    console.error(`Error: File not found: ${options.input}`);
    process.exit(1);
  }

  try {
    logger.info(`Starting obfuscation of ${options.input}...`);

    const prometheus = new PrometheusWeb({
      logLevel: 'info'
    });

    // Apply preset
    prometheus.applyPreset(options.preset);
    logger.info(`Using preset: ${options.preset}`);

    // Obfuscate
    const obfuscated = prometheus.obfuscateFile(options.input);

    // Determine output file
    let outputFile = options.output;
    if (!outputFile) {
      const ext = path.extname(options.input);
      const base = path.basename(options.input, ext);
      outputFile = path.join(
        path.dirname(options.input),
        base + '.obf' + ext
      );
    }

    // Write output
    fs.writeFileSync(outputFile, obfuscated, 'utf-8');
    logger.info(`Obfuscation completed! Output written to: ${outputFile}`);

    // Print stats
    const inputSize = fs.statSync(options.input).size;
    const outputSize = fs.statSync(outputFile).size;
    const reduction = ((1 - outputSize / inputSize) * 100).toFixed(2);
    
    console.log(`\nStats:`);
    console.log(`  Input:  ${inputSize} bytes`);
    console.log(`  Output: ${outputSize} bytes`);
    console.log(`  Reduction: ${reduction}%`);

  } catch (error) {
    logger.error(`Obfuscation failed: ${error.message}`);
    process.exit(1);
  }
}

main();
