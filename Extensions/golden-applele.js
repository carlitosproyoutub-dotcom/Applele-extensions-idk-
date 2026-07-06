(function(Scratch) {
  'use strict';
  const blocksIcon = "https://i.postimg.cc/tTZRVXnj/Untitled-07-05-2026-11-18-50.png";
  class Extension { 
    constructor() {
      this.moneyValue = 0;
      this.bankValue = 0;
      this.shop = [];
      this.owned = [];
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
            disableMonitor: true,
            blockShape: Scratch.BlockShape.SQUARE
          },
          {
            opcode: 'additem',
            text: 'add item with name [NAMIT] and price [PRICE] to shop',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NAMIT: {
                type: Scratch.ArgumentType.STRING
              },
              PRICE: {
                type: Scratch.ArgumentType.NUMBER
              }
            }
          },
          {
            opcode: 'buyItem',
            text: 'Buy item [ITEMNAME]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
             ITEMNAME: {
              type: Scratch.ArgumentType.STRING,
           }
          }
         },
        {
          opcode: 'own',
          text: 'owned items',
          blockType: Scratch.BlockType.REPORTER,
          disableMonitor: true,
          blockShape: Scratch.BlockShape.SQUARE
        },
        {
          opcode: 'clearshop',
          text: 'clear shop',
          blockType: Scratch.BlockType.COMMAND
        },
        {
          opcode: 'clearowned',
          text: 'clear owned',
          blockType: Scratch.BlockType.COMMAND
        },
        {
          opcode: 'sellItem',
          text: 'Sell item [SELLIN]',
          blockType: Scratch.BlockType.COMMAND,
          arguments: {
            SELLIN: {
              type: Scratch.ArgumentType.STRING,
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
      return JSON.stringify(this.shop);
    }
    additem(args) {
      this.shop.push({
        name: args.NAMIT,
        price: Number(args.PRICE)
      });
    }
    buyItem(args) {
     const item = this.shop.find(i => i.name === args.ITEMNAME);
     if (!item) return; 
     if (item.price <= this.moneyValue) {
      this.moneyValue -= item.price;
      this.owned.push(item);
    }
   }
     own() {
      return JSON.stringify(this.owned);
    }
    clearshop() {
      this.shop = [];
    }
    clearowned() {
      this.owned = [];
    }
    sellItem(args) {
      const index = this.owned.findIndex(i => i.name === args.SELLIN);
      if (index === -1) return; 
      const item = this.owned[index];
      this.owned.splice(index, 1); 
      this.moneyValue += item.price;
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);