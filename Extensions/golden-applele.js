(function(Scratch) {
  'use strict';
  const blocksIcon = "https://i.postimg.cc/tTZRVXnj/Untitled-07-05-2026-11-18-50.png";
  class Extension {
    constructor() {
      this.moneyValue = 0;
    }
    getInfo() {
      return {
        id: "mrcrabs",
        name: "Golden Applele Economy",
        menuIconURI: blocksIcon,
        blockIconURI: blocksIcon,
        color1: "#08cf08",
        color2: "#339e0d",
        color3: "#fff705",
        blocks: [
          {
            opcode: 'add',
            text: 'add [MON] money',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              MON: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'money',
            text: 'Money',
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: 'sets',
            text: 'Set [NUNB]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NUNB: {
                type: Scratch.ArgumentType.NUMBER
             },
             {
               opcode: 'cenr',
              text: 'add [CENT] cents',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                CENT: {
                type: Scratch.ArgumentType.NUMBER
                }
              }
             }
            
            }
          }
        ]
      };
    }
    add(args) {
      this.moneyValue += Number(args.MON);
    }
    money() {
      return this.moneyValue;
    }
    sets(args) {
      this.moneyValue = Number(args.NUNB);
    }
    cenr(args) {
      this.moneyValue += Number(args.MON) / 10;
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);