let fs = require('fs');

let input = fs.readFileSync(process.argv[2] ?? 'day6.js', 'utf-8').split('\r\n').map(str => str.split(''));


function distinctPositions(map) {
    let uniqueSteps = 0;
    let directions = {
        '^': [-1, 0],
        '>': [0, 1],
        'v': [1, 0],
        '<': [0, -1]
    }

    let currentPos = (() => {
        for (let y = 0; y < map.length; y++) {
            let x = map[y].indexOf('^');
            if (x > 0) {
                return [y, x];
            }
        }
    })();

    let iterate = ([h, v], guard) => {
        let hLength = map.length;
        let vLength = map[0].length;

        let [hNext, vNext] = (() => {
            return [h + directions[map[h][v]][0], v + directions[map[h][v]][1]]
        })();

        if (hNext < 0 || vNext < 0 || hNext >= hLength || vNext >= vLength) {
            uniqueSteps++;
            return;
        }

        if (map[hNext][vNext] === '#') {
            switch (guard) {
                case '^': 
                    map[h][v] = '>';
                    break;
                case '>': 
                    map[h][v] = 'v';
                    break;
                case 'v': 
                    map[h][v] = '<';
                    break;
                case '<': 
                    map[h][v] = '^';
                    break;
                default:
                    break;
            }

            [hNext, vNext] = [h, v];
        } else if (map[hNext][vNext] === '.') {
            uniqueSteps++;
            map[hNext][vNext] = map[h][v];
            map[h][v] = 'X';
        } else {
            map[hNext][vNext] = map[h][v];
            map[h][v] = 'X';
        }

        iterate([hNext, vNext], map[hNext][vNext]);
    }

    iterate(currentPos, map[currentPos[0]][currentPos[1]]);

    return uniqueSteps;
}

console.log(distinctPositions(input));