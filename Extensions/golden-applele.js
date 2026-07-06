(function(Scratch) {
  'use strict';
  const blocksIcon = "https://i.postimg.cc/tTZRVXnj/Untitled-07-05-2026-11-18-50.png";
  class Extension {
    constructor() {
      this.moneyValue = 0;
      this.bankValue = 0;
      this.shop = [];
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
            opcode: 'withd',
            text: 'withdraw [WITHS] money from bank to balance',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              WITHS: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            text: 'Gaining Money :^',
            // why would anyone even need this? idk man 😭 im still adding it tho
            // what the fuck why am i talking to myself
            blockType: Scratch.BlockType.LABEL
          },
          {
            opcode: 'work',
            text: 'work',
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: 'crime',
            text: 'crime',
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            text: 'Shop Utilities',
            blockType: Scratch.BlockType.LABEL
          },
          {
            opcode: 'shopit',
            text: 'shop items',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true
            Scratch.BlockShape.SQUARE
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
    withd(args) {
      if (this.bankValue > Number(args.WITHS) - 1) {
        this.bankValue -= Number(args.WITHS);
        this.moneyValue += Number(args.WITHS);
      }
    }
    work() {
      this.moneyValue += Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    }
    crime() {
      this.moneyValue += Math.floor(Math.random() * 2001) - 1000;
    }
    shopit() {
      return this.shop
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);