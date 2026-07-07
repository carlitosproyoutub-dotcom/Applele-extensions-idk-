(function(Scratch) {
  'use strict';
  const iconURI = "https://i.postimg.cc/mDK2PXYG/Untitled-07-07-2026-03-59-47.png";
  class Extension {
    constructor() {
      this.shops = {};
      this.inventory = new Map();
      this.moneyVariableName = '';
    }
    getShop(name) {
      if (!this.shops[name]) this.shops[name] = {};
      return this.shops[name];
    }
    getInventory(target) {
      if (!this.inventory.has(target)) this.inventory.set(target, {});
      return this.inventory.get(target);
    }
    getMoneyVariable(util) {
      if (!this.moneyVariableName) return null;
      return util.target.lookupVariableByNameAndType(this.moneyVariableName, '') || null;
    }
    getMoneyValue(util) {
      const v = this.getMoneyVariable(util);
      return v ? (Number(v.value) || 0) : 0;
    }
    changeMoney(util, delta) {
      const v = this.getMoneyVariable(util);
      if (!v) return false;
      v.value = (Number(v.value) || 0) + delta;
      return true;
    }
    getVariableMenuItems() {
      const vm = Scratch.vm;
      const names = new Set();
      const stage = vm.runtime.getTargetForStage();
      if (stage) {
        for (const id in stage.variables) {
          const varObj = stage.variables[id];
          if (varObj.type === '') names.add(varObj.name);
        }
      }
      vm.runtime.targets.forEach((t) => {
        if (t.isOriginal) {
          for (const id in t.variables) {
            const varObj = t.variables[id];
            if (varObj.type === '') names.add(varObj.name);
          }
        }
      });
      if (names.size === 0) names.add('money');
      return Array.from(names);
    }
    getInfo() {
      return {
        id: 'ilikeapples',
        name: 'Green Appleles Shop',
        color1: '#20c74c',
        color2: '#10a337',
        color3: '#ffffff',
        menuIconURI: iconURI,
        blockIconURI: iconURI,
        blocks: [
          {
            opcode: 'setMoney',
            text: 'set money to [VAR]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                menu: 'moneyVarMenu'
              }
            }
          },
          {
            opcode: 'currentMoney',
            text: 'current money',
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: 'createShop',
            text: 'create shop [SHOP]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'deleteShop',
            text: 'delete shop [SHOP]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'shopExists',
            text: 'shop [SHOP] exists?',
            blockType: Scratch.BlockType.BOOLEAN,
            arguments: {
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'allShops',
            text: 'all shops',
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: 'addItem',
            text: 'add item [ITEM] to shop [SHOP] for [PRICE]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' },
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' },
              PRICE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
            }
          },
          {
            opcode: 'removeItem',
            text: 'delete item [ITEM] from shop [SHOP]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' },
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'shopHasItem',
            text: 'shop [SHOP] has item [ITEM]?',
            blockType: Scratch.BlockType.BOOLEAN,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' },
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'itemPrice',
            text: 'price of [ITEM] in shop [SHOP]',
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' },
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'shopItems',
            text: 'items in shop [SHOP]',
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'canAfford',
            text: 'can afford [ITEM] from shop [SHOP]?',
            blockType: Scratch.BlockType.BOOLEAN,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' },
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'buyItem',
            text: 'buy [ITEM] from shop [SHOP]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' },
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'sellItem',
            text: 'sell [ITEM] to shop [SHOP]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' },
              SHOP: { type: Scratch.ArgumentType.STRING, defaultValue: 'Fruit Stand' }
            }
          },
          {
            opcode: 'itemsOwned',
            text: 'items owned',
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: 'ownsItem',
            text: 'owns [ITEM]?',
            blockType: Scratch.BlockType.BOOLEAN,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' }
            }
          },
          {
            opcode: 'quantityOwned',
            text: 'quantity owned of [ITEM]',
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Apple' }
            }
          }
        ],
        menus: {
          moneyVarMenu: {
            acceptReporters: true,
            items: 'getVariableMenuItems'
          }
        }
      };
    }
    setMoney(args) {
      this.moneyVariableName = String(args.VAR);
    }
    currentMoney(args, util) {
      return this.getMoneyValue(util);
    }
    createShop(args) {
      this.getShop(String(args.SHOP));
    }
    deleteShop(args) {
      delete this.shops[String(args.SHOP)];
    }
    shopExists(args) {
      return Object.prototype.hasOwnProperty.call(this.shops, String(args.SHOP));
    }
    allShops() {
      return Object.keys(this.shops);
    }
    addItem(args) {
      const shop = this.getShop(String(args.SHOP));
      shop[String(args.ITEM)] = Number(args.PRICE) || 0;
    }
    removeItem(args) {
      const shop = this.shops[String(args.SHOP)];
      if (shop) delete shop[String(args.ITEM)];
    }
    shopHasItem(args) {
      const shop = this.shops[String(args.SHOP)];
      return !!shop && Object.prototype.hasOwnProperty.call(shop, String(args.ITEM));
    }
    itemPrice(args) {
      const shop = this.shops[String(args.SHOP)];
      if (!shop || !(args.ITEM in shop)) return 0;
      return shop[String(args.ITEM)];
    }
    shopItems(args) {
      const shop = this.shops[String(args.SHOP)];
      return shop ? Object.keys(shop) : [];
    }
    canAfford(args, util) {
      const shop = this.shops[String(args.SHOP)];
      if (!shop || !(args.ITEM in shop)) return false;
      return this.getMoneyValue(util) >= shop[String(args.ITEM)];
    }
    buyItem(args, util) {
      const shopName = String(args.SHOP);
      const itemName = String(args.ITEM);
      const shop = this.shops[shopName];
      if (!shop || !(itemName in shop)) return;
      const price = shop[itemName];
      const money = this.getMoneyValue(util);
      if (money < price) return;
      if (!this.changeMoney(util, -price)) return;
      const inv = this.getInventory(util.target);
      inv[itemName] = (inv[itemName] || 0) + 1;
    }
    sellItem(args, util) {
      const shopName = String(args.SHOP);
      const itemName = String(args.ITEM);
      const inv = this.getInventory(util.target);
      if (!inv[itemName] || inv[itemName] <= 0) return;
      const shop = this.shops[shopName];
      const price = (shop && itemName in shop) ? shop[itemName] : 0;
      inv[itemName] -= 1;
      if (inv[itemName] <= 0) delete inv[itemName];
      this.changeMoney(util, price);
    }
    itemsOwned(args, util) {
      const inv = this.getInventory(util.target);
      return Object.keys(inv).filter((k) => inv[k] > 0);
    }
    ownsItem(args, util) {
      const inv = this.getInventory(util.target);
      return !!inv[String(args.ITEM)] && inv[String(args.ITEM)] > 0;
    }
    quantityOwned(args, util) {
      const inv = this.getInventory(util.target);
      return inv[String(args.ITEM)] || 0;
    }
  }
  Scratch.extensions.register(new Extension());
})(Scratch);