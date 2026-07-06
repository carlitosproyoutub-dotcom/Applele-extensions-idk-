  (function(Scratch) {
  'use strict';
  const blocksIcon = "https://i.postimg.cc/tTZRVXnj/Untitled-07-05-2026-11-18-50.png";
  class Extension {
    constructor() {
      this.moneyValue = 0;
      this.bankValue = 0;
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
            text: 'Balance',
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: 'sets',
            text: 'Set [NUNB]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NUNB: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
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
          },
          {
            text: 'BANK blocks:',
            blockType: Scratch.BlockType.LABEL
          },
          {
            opcode: 'banki',
            text: 'Bank Money Deposited',
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: 'dep',
            text: 'deposit [DEPS] money to bank',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              DEPS: {
                type: Scratch.ArgumentType.NUMBER
                }
              }
          },
          {
            opcode: 'with',
            text: 'withdraw [WITHS] money from bank to balance',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              WITHS: {
                type: Scratch.ArgumentType.NUMBER
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
      this.moneyValue += Number(args.CENT) / 100;
    }
    banki() {
      return this.bankValue;
    }
    dep(args) {
      if (this.moneyValue > Number(args.DEPS) - 1) {
        this.moneyValue -= Number(args.DEPS);
        this.bankValue += Number(args.DEPS);
        }
    }
    with(args) {
      this.bankValue -= Number(args.WITHS);
      this.moneyValue += Number(args.WITHS);
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);