// Test Suite for Prometheus Web Obfuscator

const PrometheusWeb = require('../src/index');
const fs = require('fs');
const path = require('path');

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
};

const tests = {
  testSimpleVariableRenaming: () => {
    const prometheus = new PrometheusWeb();
    const code = `
      let myVariable = 42;
      console.log(myVariable);
    `;
    
    const obfuscated = prometheus.obfuscateJS(code, {
      renameVariables: true,
      encryptStrings: false,
      injectDeadCode: false
    });

    assert(
      obfuscated.includes('0x0000') || obfuscated.includes('_0x'),
      'Should contain obfuscated variable names'
    );
    assert(
      !obfuscated.includes('myVariable'),
      'Should not contain original variable name'
    );
    console.log('✓ testSimpleVariableRenaming passed');
  },

  testStringEncryption: () => {
    const prometheus = new PrometheusWeb();
    const code = `let msg = "Hello World";`;
    
    const obfuscated = prometheus.obfuscateJS(code, {
      renameVariables: false,
      encryptStrings: true,
      injectDeadCode: false
    });

    assert(
      !obfuscated.includes('Hello World'),
      'Should not contain original string'
    );
    assert(
      obfuscated.includes('\\x'),
      'Should contain encrypted string'
    );
    console.log('✓ testStringEncryption passed');
  },

  testCompaction: () => {
    const prometheus = new PrometheusWeb();
    const code = `
      function test() {
        // This is a comment
        let x = 1;
        return x;
      }
    `;
    
    const obfuscated = prometheus.obfuscateJS(code, {
      compact: true,
      renameVariables: false,
      encryptStrings: false
    });

    assert(
      obfuscated.split('\n').length < code.split('\n').length,
      'Should reduce line count'
    );
    assert(
      !obfuscated.includes('//'),
      'Should remove comments'
    );
    console.log('✓ testCompaction passed');
  },

  testHtmlProcessing: () => {
    const prometheus = new PrometheusWeb();
    const html = `
      <html>
        <head>
          <script>
            let secret = "password123";
            console.log(secret);
          </script>
        </head>
        <body>
          <h1>Test</h1>
        </body>
      </html>
    `;
    
    const obfuscated = prometheus.obfuscateHTML(html, {
      renameVariables: true,
      encryptStrings: true
    });

    assert(
      obfuscated.includes('<html>'),
      'Should preserve HTML structure'
    );
    assert(
      !obfuscated.includes('password123'),
      'Should encrypt strings in HTML'
    );
    console.log('✓ testHtmlProcessing passed');
  },

  testPresets: () => {
    const prometheus = new PrometheusWeb();
    const presets = prometheus.getPresets();

    assert(
      presets.includes('light'),
      'Should have light preset'
    );
    assert(
      presets.includes('medium'),
      'Should have medium preset'
    );
    assert(
      presets.includes('high'),
      'Should have high preset'
    );
    console.log('✓ testPresets passed');
  },

  testFileObfuscation: () => {
    const prometheus = new PrometheusWeb();
    const testDir = path.join(__dirname, 'test-files');
    
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }

    // Create test file
    const testFile = path.join(testDir, 'test.js');
    const testCode = 'let variable = 123; console.log(variable);';
    fs.writeFileSync(testFile, testCode);

    try {
      const obfuscated = prometheus.obfuscateFile(testFile);
      assert(
        obfuscated.length > 0,
        'Should return obfuscated code'
      );
      console.log('✓ testFileObfuscation passed');
    } finally {
      // Cleanup
      if (fs.existsSync(testFile)) {
        fs.unlinkSync(testFile);
      }
    }
  }
};

// Run all tests
function runTests() {
  console.log('Running Prometheus Web Obfuscator Tests...\n');

  let passed = 0;
  let failed = 0;

  for (const [testName, testFn] of Object.entries(tests)) {
    try {
      testFn();
      passed++;
    } catch (error) {
      console.error(`✗ ${testName} failed: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Tests completed: ${passed} passed, ${failed} failed`);
  console.log(`${'='.repeat(50)}`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
