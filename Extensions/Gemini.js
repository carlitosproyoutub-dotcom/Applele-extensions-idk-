(function (Scratch) {
  'use strict';

  const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
  const blocksIcon = "https://i.postimg.cc/vZ5LqnfX/Untitled-07-10-2026-08-37-39.png"

  class Extension {
    constructor() {
      this.apiKey = '';
      this.model = 'gemini-2.5-flash';
      this.systemInstruction = '';
      this.history = []; 
      this.lastResponse = '';
      this.lastError = '';
    }

    getInfo() {
      return {
        id: 'aiisstinky',
        name: 'Applele Gemini',
        color1: '#616161',
        color2: '#2d2e2e',
        color3: '#5696fc',
        blocksIconURI: blocksIcon,
        docsURI: 'https://ai.google.dev',
        blocks: [
          {
            opcode: 'setApiKey',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set Gemini API key to [KEY]',
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'your-cool-api' }
            }
          },
          {
            opcode: 'setModel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set model to [MODEL]',
            arguments: {
              MODEL: {
                type: Scratch.ArgumentType.STRING,
                menu: 'models',
                defaultValue: 'gemini-flash-lite-latest'
              }
            }
          },
          {
            opcode: 'setSystemInstruction',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set AI personality/rules to [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'You are a friendly, helpful assistant. Keep replies short.'
              }
            }
          },
          {
            opcode: 'askAI',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ask AI [MESSAGE] and wait',
            arguments: {
              MESSAGE: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello!' }
            }
          },
          {
            opcode: 'lastResponseReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last AI response'
          },
          {
            opcode: 'hadError',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'last request had an error?'
          },
          {
            opcode: 'lastErrorReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last error message'
          },
          {
            opcode: 'startNewConversation',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start new conversation (clear memory)'
          }
        ],
        menus: {
          models: {
            acceptReporters: true,
            items: [
              'gemini-2.5-pro',
              'gemini-2.0-flash',
              'gemini-flash-lite-latest'
            ]
          }
        }
      };
    }

    setApiKey({ KEY }) {
      this.apiKey = Scratch.Cast.toString(KEY);
    }

    setModel({ MODEL }) {
      this.model = Scratch.Cast.toString(MODEL).trim();
    }

    setSystemInstruction({ TEXT }) {
      this.systemInstruction = Scratch.Cast.toString(TEXT);
    }

    lastResponseReporter() {
      return this.lastResponse;
    }

    lastErrorReporter() {
      return this.lastError;
    }

    hadError() {
      return this.lastError !== '';
    }

    startNewConversation() {
      this.history = [];
      this.lastResponse = '';
      this.lastError = '';
    }

    async askAI({ MESSAGE }) {
      const message = Scratch.Cast.toString(MESSAGE);

      if (!this.apiKey) {
        this.lastError = 'No API key set. Use "set Gemini API key" first.';
        return '';
      }
      if (!this.model) {
        this.lastError = 'No model set. Use "set model" first.';
        return '';
      }

      this.lastError = '';

      this.history.push({ role: 'user', parts: [{ text: message }] });

      const body = {
        contents: this.history
      };
      if (this.systemInstruction) {
        body.system_instruction = { parts: [{ text: this.systemInstruction }] };
      }

      try {
        const response = await fetch(`${API_BASE}/${this.model}:generateContent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': this.apiKey
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const text = await response.text();
          this.lastError = `HTTP ${response.status}: ${text}`;
          this.history.pop();
          return '';
        }

        const data = await response.json();
        const candidate = data && data.candidates && data.candidates[0];
        const reply =
          candidate &&
          candidate.content &&
          candidate.content.parts &&
          candidate.content.parts.map(p => p.text || '').join('');

        if (!reply) {
          // Hi if you are reading this uhhh idk....eat an apple - Dimix (Hey did you found last code easter egg?
          const reason = candidate && candidate.finishReason;
          this.lastError = reason ? `No response (finishReason: ${reason})` : 'Unexpected response format from Gemini API.';
          this.history.pop();
          return '';
        }

        this.history.push({ role: 'model', parts: [{ text: reply }] });
        this.lastResponse = reply;
        return reply;
      } catch (err) {
        this.lastError = `Request failed: ${err.message}`;
        this.history.pop();
        return '';
      }
    }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);