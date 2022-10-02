import Tile from "./tile.js";
import {words, answers} from './words.js';

export default {
        guessesAllowed: 5,
        len: 3,
        theWord: answers[3][Math.floor(Math.random() * answers[3].length)].toLowerCase(),
        currentRowIndex: 0,
        state: 'active',
        errors: false,
        message: '',
 
        letters: [
            'QWERTYUIOP'.split(''),
            'ASDFGHJKL'.split(''),
            ['Backspace', ...'ZXCVBNM'.split(''), 'Enter'],
        ],

        get currentGuess() {
            return this.currentRow.map((tile) => tile.letter).join('');
        },

        get currentRow() {
            return this.board[this.currentRowIndex];
        },

        get remainingGuesses() {
            return this.guessesAllowed - this.currentRowIndex - 1
        },

        get currentLen() {
            return this.len
        },

        harder() {
            this.guessesAllowed--
            this.init()
        },

        easier() {
            this.guessesAllowed++
            this.init()
        },

        longer() {
            this.len++
            this.init()
        },

        shorter() {
            this.len--
            this.init()
        },

        init() {
            this.theWord = answers[this.len][Math.floor(Math.random() * answers[this.len].length)].toLowerCase()
            this.currentRowIndex = 0
            this.state = 'active'
            this.errors = false
            this.message = ''
            this.board = Array.from({ length: this.guessesAllowed }, () => {
                return Array.from({ length: this.theWord.length }, (item, index) => new Tile(index))
            });
        },

        matchingTileForKey(key) {
            return this.board
                .flat()
                .filter((tile) => tile.status)
                .sort((t1, t2) => t2.status === 'correct')
                .find((tile) => tile.letter === key.toLowerCase());
        },

        onKeyPress(key) {
            this.message = '';
            this.errors = false;

            if (/^[A-z]$/.test(key)) {
                this.fillTile(key);
            } else if (key === 'Backspace') {
                this.emptyTile();
            } else if (key === 'Enter') {
                this.submitGuess();
            }
        },

        fillTile(key) {
            for (let tile of this.currentRow) {
                if (!tile.letter) {

                    tile.fill(key);

                    break;
                }
            }
        },

        emptyTile() {
            for (let tile of [...this.currentRow].reverse()) {
                if (tile.letter) {
                    tile.empty();

                    break;
                }
            }
        },

        submitGuess() {
            if (this.currentGuess.length < this.theWord.length) {
                return;
            }

            if (!words[this.len].includes(this.currentGuess.toUpperCase())) {
                this.errors = true;
                this.message = "Invalid word...";

                return;
            }

            Tile.updateStatusesForRow(this.currentRow, this.theWord);

            if (this.currentGuess === this.theWord) {
                this.state = "complete";
                this.message = "You Win!";

                confetti();
            } else if (this.remainingGuesses === 0) {
                this.state = "complete";
                this.message = `Game Over. You Lose. (${this.theWord})`;
            } else {
                this.currentRowIndex++;
            }
        },
    };
