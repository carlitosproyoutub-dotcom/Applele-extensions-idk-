(function (Scratch) {
  'use strict';

  const DEFAULT_RATINGS = {
    'Argentina': 2100,
    'France': 2090,
    'Spain': 2080,
    'England': 2060,
    'Brazil': 2050,
    'Portugal': 2040,
    'Belgium': 2010,
    'Netherlands': 2005,
    'Germany': 2000,
    'Morocco': 1970,
    'Switzerland': 1950,
    'Norway': 1940,
    'Colombia': 1930,
    'Croatia': 1925,
    'USA': 1900,
    'Mexico': 1890,
    'Japan': 1880,
    'Uruguay': 1875,
    'Senegal': 1860,
    'Egypt': 1830,
    'Canada': 1820,
    'Ecuador': 1810,
    'Australia': 1780,
    'Ghana': 1770,
    'Algeria': 1760,
    'South Korea': 1810,
    'Paraguay': 1790,
    'Cape Verde': 1700,
    'Ivory Coast': 1800,
    'Sweden': 1820,
    'Austria': 1830,
    'Qatar': 1650,
    'Bosnia and Herzegovina': 1720,
    'DR Congo': 1650,
    'South Africa': 1700,
    'Czechia': 1750,
  };

  const QUARTERFINALISTS = [
    'France', 'Morocco', 'Spain', 'Belgium',
    'Norway', 'England', 'Argentina', 'Switzerland'
  ];
  const blockIconURI = "https://i.postimg.cc/NFhHwmPK/Untitled-07-09-2026-06-31-22.png";

  class Extension {
    constructor() {
      this.ratings = Object.assign({}, DEFAULT_RATINGS);
    }

    getInfo() {
      return {
        id: 'insertverycoolidhere',
        name: 'Applele Soccer Predictions',
        blockIconURI: blockIconURI,
        color1: '#323332',
        color2: '#ffffff',
        color3: '#ffffff',
        blocks: [
          {
            opcode: 'predictWinner',
            blockType: Scratch.BlockType.REPORTER,
            text: 'predict winner: [TEAM1] vs [TEAM2]',
            arguments: {
              TEAM1: { type: Scratch.ArgumentType.STRING, defaultValue: 'Argentina' },
              TEAM2: { type: Scratch.ArgumentType.STRING, defaultValue: 'France' }
            }
          },
          {
            opcode: 'winProbability',
            blockType: Scratch.BlockType.REPORTER,
            text: 'win % of [TEAM1] over [TEAM2]',
            arguments: {
              TEAM1: { type: Scratch.ArgumentType.STRING, defaultValue: 'Argentina' },
              TEAM2: { type: Scratch.ArgumentType.STRING, defaultValue: 'France' }
            }
          },
          {
            opcode: 'predictScore',
            blockType: Scratch.BlockType.REPORTER,
            text: 'predict scoreline: [TEAM1] vs [TEAM2]',
            arguments: {
              TEAM1: { type: Scratch.ArgumentType.STRING, defaultValue: 'Argentina' },
              TEAM2: { type: Scratch.ArgumentType.STRING, defaultValue: 'France' }
            }
          },
          {
            opcode: 'setTeamRating',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [TEAM] strength rating to [RATING]',
            arguments: {
              TEAM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Argentina' },
              RATING: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2100 }
            }
          },
          {
            opcode: 'getTeamRating',
            blockType: Scratch.BlockType.REPORTER,
            text: '[TEAM] strength rating',
            arguments: {
              TEAM: { type: Scratch.ArgumentType.STRING, defaultValue: 'Argentina' }
            }
          },
          {
            opcode: 'getQuarterfinalists',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current quarterfinalists (July 9, 2026)'
          },
          {
            opcode: 'simulateBracket',
            blockType: Scratch.BlockType.REPORTER,
            text: 'simulate rest of bracket: [TEAMLIST]',
            arguments: {
              TEAMLIST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'France,Morocco,Spain,Belgium,Norway,England,Argentina,Switzerland'
              }
            }
          },
          {
            opcode: 'defaulteams',
            blockType: Scratch.BlockType.REPORTER,
            text: 'default teams (all the teams with scores)'
          }
        ]
      };
    }

    _getRating(team) {
      const key = (team || '').trim();
      if (this.ratings.hasOwnProperty(key)) return this.ratings[key];
      return 1850;
    }

    _expectedScore(ratingA, ratingB) {
      return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
    }

    _simulateOneMatch(team1, team2) {
      const r1 = this._getRating(team1);
      const r2 = this._getRating(team2);
      const p1 = this._expectedScore(r1, r2);
      const roll = Math.random();
      return roll < p1 ? team1 : team2;
    }

    predictWinner(args) {
      const team1 = args.TEAM1;
      const team2 = args.TEAM2;
      const winner = this._simulateOneMatch(team1, team2);
      const p1 = Math.round(this._expectedScore(this._getRating(team1), this._getRating(team2)) * 100);
      const confidence = winner === team1 ? p1 : 100 - p1;
      return `${winner} (${confidence}% model confidence)`;
    }

    winProbability(args) {
      const r1 = this._getRating(args.TEAM1);
      const r2 = this._getRating(args.TEAM2);
      const p1 = this._expectedScore(r1, r2) * 100;
      return Math.round(p1 * 10) / 10;
    }

    predictScore(args) {
      const r1 = this._getRating(args.TEAM1);
      const r2 = this._getRating(args.TEAM2);
      const p1 = this._expectedScore(r1, r2);

      // if you are reading this eat an apple and go outside -dimix. (duh who else :^)
      const baseGoals = 1.35;
      const lambda1 = baseGoals * (0.6 + p1);
      const lambda2 = baseGoals * (0.6 + (1 - p1));

      const goals1 = this._samplePoisson(lambda1);
      const goals2 = this._samplePoisson(lambda2);

      return `${args.TEAM1} ${goals1} - ${goals2} ${args.TEAM2}`;
    }

    _samplePoisson(lambda) {
      const L = Math.exp(-lambda);
      let k = 0;
      let p = 1;
      do {
        k++;
        p *= Math.random();
      } while (p > L);
      return Math.max(0, k - 1);
    }

    setTeamRating(args) {
      const team = (args.TEAM || '').trim();
      if (!team) return;
      this.ratings[team] = Number(args.RATING) || 1850;
    }

    getTeamRating(args) {
      return this._getRating(args.TEAM);
    }

    getQuarterfinalists() {
      return QUARTERFINALISTS.join(', ');
    }

    defaulteams() {
      return Object.entries(DEFAULT_RATINGS)
        .map(([team, rating]) => `${team}: ${rating}`)
        .join(', ');
    }

    simulateBracket(args) {
      let round = (args.TEAMLIST || '')
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      if (round.length < 2 || (round.length & (round.length - 1)) !== 0) {
        return 'Error: team list must have a power-of-2 number of teams (2, 4, 8, 16...)';
      }

      const log = [];
      let roundNum = 1;
      while (round.length > 1) {
        const nextRound = [];
        const roundResults = [];
        for (let i = 0; i < round.length; i += 2) {
          const winner = this._simulateOneMatch(round[i], round[i + 1]);
          roundResults.push(`${round[i]} vs ${round[i + 1]} -> ${winner}`);
          nextRound.push(winner);
        }
        log.push(`Round ${roundNum}: ` + roundResults.join(' | '));
        round = nextRound;
        roundNum++;
      }

      log.push(`CHAMPION: ${round[0]}`);
      return log.join('\n');
    }
  }

  Scratch.extensions.register(new Extension());
})(Scratch);