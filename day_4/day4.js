let fs = require('fs');

function checkRight(index, subList) {
    if ((index + 3 < subList.length) && subList[index] === 'X' && subList[index + 1] === 'M' && subList[index + 2] === 'A' && subList[index + 3] === 'S') {
        return true;
    }

    return false;
}

function checkLeft(index, subList) {
    if ((index - 3 >= 0) && subList[index] === 'X' && subList[index - 1] === 'M' && subList[index - 2] === 'A' && subList[index - 3] === 'S') {
        return true;
    }

    return false;
}

function checkTop (row, column, list) {
    if ((row - 3 >= 0) && list[row][column] === 'X' && list[row - 1][column] === 'M' && list[row - 2][column] === 'A' && list[row - 3][column] === 'S') {
        return true;
    }

    return false;
}

function checkBottom(row, column, list) {
    if ((row + 3 < list.length) && list[row][column] === 'X' && list[row + 1][column] === 'M' && list[row + 2][column] === 'A' && list[row + 3][column] === 'S') {
        return true;
    }

    return false;
}

function checkAllDiagonals(row, column, list) {
    let matches = 0;
    if (list[row][column] === 'X' && list[row - 1]?.[column + 1] === 'M' && list[row - 2]?.[column + 2] === 'A' && list[row - 3]?.[column + 3] === 'S') {
        matches++;
    }
    if (list[row][column] === 'X' && list[row - 1]?.[column - 1] === 'M' && list[row - 2]?.[column - 2] === 'A' && list[row - 3]?.[column - 3] === 'S') {
        matches++;
    }
    if (list[row][column] === 'X' && list[row + 1]?.[column + 1] === 'M' && list[row + 2]?.[column + 2] === 'A' && list[row + 3]?.[column + 3] === 'S') {
        matches++;
    }
    if (list[row][column] === 'X' && list[row + 1]?.[column - 1] === 'M' && list[row + 2]?.[column - 2] === 'A' && list[row + 3]?.[column - 3] === 'S') {
        matches++;
    }

    return matches;
}

function findXMAS(list) {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            if (list[i][j] === 'X') {
              if (checkRight(j, list[i])) {
                count++;
              }
              if (checkLeft(j, list[i])) {
                count++;
              }
              if (checkTop(i, j, list)) {
                count++;
              }
              if (checkBottom(i, j, list)) {
                count++;
              }

              count += checkAllDiagonals(i, j, list);
            }
        }
    }

    return count;
}

function findMAS(list) {
    let count = 0;
    for (let i = 1; i < list.length; i++) {
        for (let j = 0; j < list[i].length; j++) {
            if (list[i][j] === 'A' && list[i - 1]?.[j + 1] === 'S' && list[i - 1]?.[j - 1] === 'M' && list[i + 1]?.[j - 1] === 'M' && list[i + 1]?.[j + 1] === 'S') {
                count++;
            }
            if (list[i][j] === 'A' && list[i - 1]?.[j + 1] === 'S' && list[i - 1]?.[j - 1] === 'S' && list[i + 1]?.[j - 1] === 'M' && list[i + 1]?.[j + 1] === 'M') {
                count++;
            }
            if (list[i][j] === 'A' && list[i - 1]?.[j + 1] === 'M' && list[i - 1]?.[j - 1] === 'M' && list[i + 1]?.[j - 1] === 'S' && list[i + 1]?.[j + 1] === 'S') {
                count++;
            }
            if (list[i][j] === 'A' && list[i - 1]?.[j + 1] === 'M' && list[i - 1]?.[j - 1] === 'S' && list[i + 1]?.[j - 1] === 'S' && list[i + 1]?.[j + 1] === 'M') {
                count++;
            }
        }
    }

    return count;
}

let input = new Promise((resolve, reject) => {
    fs.readFile('day4.input.txt', 'utf8', function (err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data.split('\r\n').map(item => item.split('')));
        }
    })
})

input
.then(data => console.log(findMAS(data)))
.catch(err => console.log(err));