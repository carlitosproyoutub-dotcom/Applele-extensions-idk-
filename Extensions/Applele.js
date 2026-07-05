class applele {
  getInfo() {
    return {
      id: 'applele',
      name: 'Applele Utilities!',
      blocks: [
        {
          opcode: 'appol',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Applele!'
        }
      ]
    };
  }

  appol() {
    return 'i love apples!';
  }
}

Scratch.extensions.register(new Applele-Utilities());
