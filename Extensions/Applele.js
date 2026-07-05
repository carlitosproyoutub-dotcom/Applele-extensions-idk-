(function(Scratch) {
  'use strict';
  class Extension {
    getInfo() {
      return {
        id: "applele",
        name: "Applele Blocks",
        blocks: [
          {
            opcode: 'apple',
            // fun fact:i love apples
            text: 'applele',
            blockType: Scratch.BlockType.COMMAND
          }
        ]
      };
    }

    apple() {
      alert("applele");
    }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);