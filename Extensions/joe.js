(function(Scratch) {
  'use strict';
  class Extension {
    getInfo() {
      return {
        id: "joe",
        name: "Joeify",
        blocks: [
          {
            opcode: 'joes',
            text: 'Joeify [TXT]',
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              TXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'I Like Apples'
              }
            }
          }
        ]
      };
    }
    joes(args) {
      const text = String(args.TXT);
      const replacementMap = {
        'a': 'j', 'b': 'j', 'c': 'j', 'd': 'j', 'e': 'j', 'f': 'j', 'g': 'j', 'h': 'j',
        'i': 'o', 'j': 'o', 'k': 'o', 'l': 'o', 'm': 'o', 'n': 'o', 'o': 'o', 'p': 'o',
        'q': 'e', 'r': 'e', 's': 'e', 't': 'e', 'u': 'e', 'v': 'e', 'w': 'e', 'x': 'e',
        'y': 'j', 'z': 'o',
      };
      const result = text.replace(/[a-zA-Z]/g, (matched) => {
        const lower = matched.toLowerCase();
        const replacement = replacementMap[lower];
        return matched === lower ? replacement : replacement.toUpperCase();
      });

      return result;
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);