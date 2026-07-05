(function(Scratch) {
  'use strict';
  class Extension {
    getInfo() {
      return {
        id: "applele",
        name: "Applele Blocks",
        color1: "#ff0000",
        color2: "#00ff00",
        color3: "#00ff00",
        blocks: [
          {
            opcode: 'apple',
            // fun fact:i love apples
            text: 'applele',
            blockType: Scratch.BlockType.COMMAND
          },
          {
            opcode: 'report',
            text: 'this sprite is applele?',
            blockType: Scratch.BlockType.BOOLEAN
          }
        ]
      };
    }
    apple() {
      Scratch.Cast.Say("applele");
      alert("applele");
    }
    report() {
      return true;
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);
