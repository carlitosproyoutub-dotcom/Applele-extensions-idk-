class Extension {
  getInfo() {
    return {
      id: "applele",
    name: "Applele Utilities!",
    color1: "#c92014",
    color2: "#14c94e",
    color3: "#14c94e",
      // fun fact:i love apples
    blocks: [
      opcode: 'applele',
      text: 'applele',
      blockType: Scratch.BlockType.COMMAND
     ],
    };
  }
  applele() {
    alert("applele")
  }
}