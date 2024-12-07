let fs = require('fs');

let input = fs.readFileSync(process.argv[2] ?? 'day5.input.txt', 'utf8');

let [pageOrder, printOrder] = input.split('\r\n\r\n');

pageOrder = pageOrder.split('\r\n').map(item => item.split('|').map(el => +el));
printOrder = printOrder.split('\r\n').map(item => item.split(',').map(el => +el));

const pageMapper = new Map();

for (let [first, second] of pageOrder) {
    if (pageMapper.has(first)) {
        pageMapper.get(first).add(second);
    } else {
        pageMapper.set(first, new Set([second]));
    }
}

// ----------------------------------------------------------------------------------------//
// Uncomment for part one

// let result = 0;

// for (let i = 0; i < printOrder.length; i++) {
//     let isOrdered = true;
//     for (let j = 0; j < printOrder[i].length; j++) {
//         let k = j + 1;
//         while (k < printOrder[i].length) {
//             if (pageMapper.get(printOrder[i][k])?.has(printOrder[i][j])) {
//                 isOrdered = false;
//                 break;
//             }
//             k++;
//         }
//         if (!isOrdered) {
//             break;
//         }
//         if (j === printOrder[i].length - 1) {
//             result += printOrder[i][Math.floor(printOrder[i].length / 2)];
//         }
//     }
// }

// ----------------------------------------------------------------------------------------//

let result = 0;

function unorderedMid(list) {
    for (let x = 0; x < list.length; x++) {
        for (let y = x + 1; y < list.length; y++) {
            if (pageMapper.get(list[y])?.has(list[x])) {
                let a = list[y];
                list[y] = list[x];
                list[x] = a;

                y = x;
            }
        }
    }
    return list[Math.floor(list.length / 2)]
}

for (let i = 0; i < printOrder.length; i++) {
    let isOrdered = true;
    for (let j = 0; j < printOrder[i].length; j++) {
        let k = j + 1;
        while (k < printOrder[i].length) {
            if (pageMapper.get(printOrder[i][k])?.has(printOrder[i][j])) {
                isOrdered = false;
                break;
            }
            k++;
        }
        if (!isOrdered) {
            break;
        }
    }
    if (!isOrdered) {
        result += unorderedMid(printOrder[i]);
    }
}

console.log(result);
