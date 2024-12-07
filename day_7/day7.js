let fs = require('fs');

const inputObj = new Map;

fs.readFileSync(process.argv[2] ?? 'day7.input.txt', 'utf-8')
.split('\r\n')
.map(item => item.split(':'))
.forEach(([a, b], i) => inputObj.set(`${a}&${i}`, b.trim().split(' ').map(el => +el)));


function validOperands(curValue, index, answer) {
    index++;

    if (index === inputObj.get(answer).length) {
        if (curValue === parseInt(answer)) {
            return true;
        }
        return false;
    }

    if (validOperands(curValue + inputObj.get(answer)[index], index, answer)) return true;
    if (validOperands(curValue * inputObj.get(answer)[index], index, answer)) return true;
    // if (validOperands(parseInt(curValue.toString() + inputObj.get(answer)[index]), index, answer)) return true; // Uncomment for Part 2

    return false;
}


let totalCalibrationResult = (input) => {
    let sum = 0;

    for (let [answer] of input) {
        if (validOperands(inputObj.get(answer)[0], 0, answer)) {
            sum += parseInt(answer);
        }
    }

    return sum;
}

console.log(totalCalibrationResult(inputObj));