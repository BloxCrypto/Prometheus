// Dead Code Injector Step
// Injects dead/unreachable code to further obfuscate the code

class DeadCodeInjector {
  constructor() {
    this.deadCodeSnippets = [
      'if(false){var x=1;}',
      'try{throw new Error();}catch(e){}',
      'function dummy(){}',
      'var unused=Math.random();',
      'var _=function(){return;};',
      'if(0){console.log("never");}',
    ];
  }

  process(code, options = {}) {
    if (!options.injectDeadCode) return code;

    // Insert dead code snippets at random locations
    const lines = code.split('\n');
    const resultLines = [];

    for (let i = 0; i < lines.length; i++) {
      resultLines.push(lines[i]);

      // Randomly inject dead code (25% chance per line)
      if (Math.random() < 0.25 && i < lines.length - 1) {
        const snippet = this.deadCodeSnippets[
          Math.floor(Math.random() * this.deadCodeSnippets.length)
        ];
        resultLines.push(snippet);
      }
    }

    return resultLines.join('\n');
  }
}

module.exports = DeadCodeInjector;
