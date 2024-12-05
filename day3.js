let fs = require('fs');

function findValidFunc (instruction) {
    let result = 0;
    let pattern = 'mul(';
    let dont = "don't()";
    let d0 = 'do()';

    for (let i = 0; i < instruction.length; ) {
        let matchIndex = instruction.indexOf(pattern, i);
        let matchDont = instruction.indexOf(dont, i);
        let matchD0 = instruction.indexOf(d0, i);

        if (matchDont > 0 && matchD0 === -1) {
            return result;
        }

        if (matchDont !== -1 && matchDont < matchIndex) {
            i = matchD0;
            continue;
        }

        if (matchIndex === -1) {
            return result;
        } else {
            let firstOperand = '';
            let secondOperand = '';

            let start = matchIndex + 4;
           
            while (true) {
                if (firstOperand.length === 3) {
                    break;
                }
                if (instruction.charCodeAt(start) >= 48 && instruction.charCodeAt(start) <= 57) {
                    firstOperand += instruction.at(start);
                    start++;
                } else {
                    break;
                }
            }

            if (firstOperand === '') {
                i = start;
                continue;
            }

            if (instruction.charCodeAt(start) === 44) {
                start++;
            } else {
                i = start;
                continue;
            }

            while (true) {
                if (secondOperand.length === 3) {
                    break;
                }
                if (instruction.charCodeAt(start) >= 48 && instruction.charCodeAt(start) <= 57) {
                    secondOperand += instruction.at(start);
                    start++;
                } else {
                    break;
                }
            }

            if (secondOperand === '') {
                i = start;
                continue;
            }

            if (instruction.charCodeAt(start) === 41) {
                result += firstOperand * secondOperand;
                i = ++start;
            } else {
                i = start;
                continue;
            }
        }
    }
    return result;
}

let input = new Promise((resolve, reject) => {
    fs.readFile('day3.input.txt', 'utf8', function(err, data) {
        if (err) {
            reject(err);
        } else {
            resolve(data);
        }
    })
})

input
.then(data => console.log(findValidFunc(data)))
.catch(err => console.log(err));