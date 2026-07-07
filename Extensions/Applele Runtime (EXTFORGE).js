/*
   Created with ExtForge
   https://jwklong.github.io/extforge
*/
(async function(Scratch) {
    const variables = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    const ExtForge = {
        Broadcasts: new function() {
            this.raw_ = {};
            this.register = (name, blocks) => {
                this.raw_[name] = blocks;
            };
            this.execute = async (name) => {
                if (this.raw_[name]) {
                    await this.raw_[name]();
                };
            };
        },

        Variables: new function() {
            this.raw_ = {};
            this.set = (name, value) => {
                this.raw_[name] = value;
            };
            this.get = (name) => {
                return this.raw_[name] ?? null;
            }
        },

        Vector: class {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            static from(v) {
                if (v instanceof ExtForge.Vector) return v
                if (v instanceof Array) return new ExtForge.Vector(Number(v[0]), Number(v[1]))
                if (v instanceof Object) return new ExtForge.Vector(Number(v.x), Number(v.y))
                return new ExtForge.Vector()
            }

            add(v) {
                return new Vector(this.x + v.x, this.y + v.y);
            }

            set(x, y) {
                return new Vector(x ?? this.x, y ?? this.y)
            }
        },

        Utils: {
            setList: (list, index, value) => {
                [...list][index] = value;
                return list;
            },
            lists_foreach: {
                index: [0],
                value: [null],
                depth: 0
            },
            countString: (x, y) => {
                return y.length == 0 ? 0 : x.split(y).length - 1
            }
        }
    }

    class Extension {
        getInfo() {
            return {
                "id": "Runtime",
                "name": "Applele Runtine",
                "color1": "#817a76",
                "blocks": [{
                    "opcode": "block_79fd656dab40da8e",
                    "text": "start project",
                    "blockType": "command",
                    "arguments": {}
                }, {
                    "opcode": "block_0cc68d4006de6f7a",
                    "text": "stop project",
                    "blockType": "command",
                    "arguments": {}
                }, {
                    "opcode": "block_53a54ad32ecda47b",
                    "text": "Project Running?",
                    "blockType": "Boolean",
                    "arguments": {}
                }, {
                    "opcode": "block_02ab7b2ed5320d9b",
                    "text": "Project Timer",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_5358f11fe2129757",
                    "text": "TurboMode [3a0fcd09889b86eb]",
                    "blockType": "command",
                    "arguments": {
                        "3a0fcd09889b86eb": {
                            "type": "Boolean"
                        }
                    }
                }, {
                    "opcode": "block_76091947be274063",
                    "text": "TurboMode enabled?",
                    "blockType": "Boolean",
                    "arguments": {}
                }, {
                    "opcode": "block_0c5852eef61b4266",
                    "text": "Set Framerate to [2e29140393d7ed3e]",
                    "blockType": "command",
                    "arguments": {
                        "2e29140393d7ed3e": {
                            "type": "number",
                            "defaultValue": 30
                        }
                    }
                }, {
                    "opcode": "block_3cd4c7afab95c8cf",
                    "text": "FrameRate",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_a07da3573facc44f",
                    "text": "Last Key Pressed",
                    "blockType": "Boolean",
                    "arguments": {}
                }, {
                    "opcode": "block_05faae6c83ba7783",
                    "text": "Wait Until next frame",
                    "blockType": "command",
                    "arguments": {}
                }]
            }
        }
        async block_79fd656dab40da8e(args) {
            Scratch.vm.greenFlag();
        }
        async block_0cc68d4006de6f7a(args) {
            Scratch.vm.stopAll();
        }
        async block_53a54ad32ecda47b(args) {
            return ((Scratch.vm.runtime.threads.length > 0))
        }
        async block_02ab7b2ed5320d9b(args) {
            return (Scratch.vm.runtime.ioDevices.clock.projectTimer())
        }
        async block_5358f11fe2129757(args) {
            Scratch.vm.runtime.turboMode = args["3a0fcd09889b86eb"];
        }
        async block_76091947be274063(args) {
            return (Scratch.vm.runtime.turboMode)
        }
        async block_0c5852eef61b4266(args) {
            Scratch.vm.runtime.frameLoop.setFramerate(args["2e29140393d7ed3e"]);
        }
        async block_3cd4c7afab95c8cf(args) {
            return (Scratch.vm.runtime.frameLoop.framerate)
        }
        async block_a07da3573facc44f(args) {
            return (Scratch.vm.runtime.ioDevices.keyboard.getAllKeysPressed())
        }
        async block_05faae6c83ba7783(args) {
            await new Promise(temp_3fee657f9466b3046d621a61 => {
                requestAnimationFrame(() => {
                    temp_3fee657f9466b3046d621a61()
                })
            })
        }
    }

    let extension = new Extension();
    // code compiled from extforge

    Scratch.extensions.register(extension);
})(Scratch);