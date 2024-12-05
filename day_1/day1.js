let fs = require('fs');

function findSum(list1, list2) {
    let sum = 0;
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);
    
    for (let i = 0; i < list1.length; i++) {
        sum += Math.abs(list1[i] - list2[i]);
    }
    
    return sum;
}

function similarityScore(list1, list2) {
    let countObj = {};

    list2.forEach(item => {
        if(countObj[item]) {
            countObj[item]++;
        } else {
            countObj[item] = 1;
        }
    })

    return list1.reduce((acc, item) => {
        if (countObj[item]) {
            acc += item * countObj[item];
        }
        return acc;
    }, 0);
}

let input = new Promise((resolve, reject) => {
    fs.readFile('day1.input.txt', 'utf8', function (err, data) {
        const arr1 = [];
        const arr2 = [];
        data.split('\r\n').forEach(item => {
            const splited = item.split('   ');
            arr1.push(splited[0]);
            arr2.push(splited[1]);
        })
        resolve({arr1, arr2});
    });
})

input.then((data) => {
    const {arr1, arr2} = data;
    console.log(similarityScore(arr1, arr2));
})