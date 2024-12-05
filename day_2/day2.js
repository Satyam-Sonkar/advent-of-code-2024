let fs = require('fs');

function isReportSafe(list) {
    let elmCount = 0;
    for (let i = 0; i < list.length - 1; i++) {
        if (list[i] < list[i + 1]) {
            elmCount++;
        } else {
            elmCount--;
        }
    }

    if (Math.abs(elmCount) === list.length - 1) {
        for (let i = 0; i < list.length - 1; i++) {
            let diff = Math.abs(list[i] - list[i + 1]);

            if (!(diff >= 1 && diff <= 3)) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}

function countSafeReports(list) {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        if (isReportSafe(list[i])) {
            count++;
        }
    }
    return count;
}

function countAfterDamperRemoval(list) {
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        if (isReportSafe(list[i])) {
            count++;
        } else {
            for (let j = 0; j < list[i].length; j++) {
                let newList = [...list[i]];
                newList.splice(j, 1);
                if (isReportSafe(newList)) {
                    count++;
                    break;
                }
            }
        }
    }
    return count;
}

let input = new Promise((resolve, reject) => {
    fs.readFile('day2.input.txt', 'utf8', function(err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data.split('\r\n').map(item => item.split(' ').map(item => +item)));
        }
    });
});

input
.then(list => console.log(countAfterDamperRemoval(list)))
.catch(err => {
    console.log(err);
})