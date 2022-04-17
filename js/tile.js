export default class Tile {
    letter = '';
    status = '';

    constructor(position) {
        this.position = position;
    }

    static updateStatusesForRow(row, theWord) {
        theWord = theWord.split("");

        for (let tile of row) {
            if (theWord[tile.position] === tile.letter) {
                tile.status = 'correct';

                theWord[tile.position] = null;
            }
        }

        for (let tile of row.filter((tile) => !tile.status)) {
            if (theWord.includes(tile.letter)) {
                tile.status = 'present';

                theWord[theWord.indexOf(tile.letter)] = null;
            }
        }

        for (let tile of row.filter(tile => !tile.status)) {
                tile.status = 'absent';
        }
    }

    fill(key) {
        this.letter = key.toLowerCase();
    }

    empty() {
        this.letter = '';
    }
}
