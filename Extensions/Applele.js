(function(Scratch) {
  'use strict';
  const blocksIcon = "https://cdn.phototourl.com/free/2026-07-05-db18e682-8ef5-4827-aee3-0030f7b5dad0.png"
  class Extension {
    getInfo() {
      return {
        id: "applele",
        name: "Applele Blocks",
        color1: "#ff0000",
        color2: "#00ff00",
        color3: "#00ff00",
        menuIconURI: blocksIcon,
        blockIconURI: blocksIcon,
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
      alert("Applele")
    
    }
    report() {
      return true;
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);
