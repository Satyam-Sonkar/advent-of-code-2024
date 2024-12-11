let fs = require('fs');

let input = fs.readFileSync(process.argv[2] ?? 'day9.input.txt', 'utf-8');


function decodeMap(diskMap) {
    let fileId = 0;
    let decoded = [];
    for (let i = 1; i <= diskMap.length; i++) {
        let space = diskMap[i - 1];
        if (i % 2 === 0) {
            while (space > 0) {
                decoded.push('.');
                space--;
            }
        } else {
            while (space > 0) {
                decoded.push(fileId);
                space--;
            }
            fileId++;
        }
    }

    return decoded;
}

function defragmentDisk (decodedMap) {
    let start = 0;
    let end = decodedMap.length - 1;

    while (start < end) {
        if (decodedMap[start] !== '.') {
            start++;
            continue;
        }
        if (decodedMap[end] === '.') {
            end--;
            continue;
        }

        decodedMap[start] = decodedMap[end];
        decodedMap[end] = '.';
        
        start++;
        end--;
    }

    return decodedMap;
}

function optimizedDefragment (decodedMap) {
    let spaceStore = [];

    for (let i = 0; i < decodedMap.length; i++) {
        if (decodedMap[i] === '.') {
            let start = i;
            while(decodedMap[start] === '.') {
                start++;
            }

            spaceStore.push({index: i, space: start - i});
            i = start;
        }
    }

    let fileId = decodedMap.at(-1);

    for (let i = decodedMap.length - 1; i >= 0 ; i--) {
        if (fileId === '.') continue;

        let start = i;
        while (decodedMap.at(start) === fileId) {
            start--;
        }
        
        let fileLength = i - start;

        let position = spaceStore.find(el => el.space >= fileLength);

        if (position !== undefined && position.index < i) {
            for (let x = i; x > start; x--) {
                decodedMap[position.index++] = decodedMap[x];
                decodedMap[x] = '.';

                position.space--;
            }
        }

        if (decodedMap.at(start) !== fileId) {
            while (decodedMap.at(start) === '.') {
                start--;
            }
            fileId = decodedMap.at(start);
            i = start + 1;
        }
    }

    return decodedMap;
} 

function checkSum (input) {
    let decodedMap = decodeMap(input);
    let defragmentedMap = optimizedDefragment(decodedMap);

     return defragmentedMap.reduce((acc, val, index) => {
        if (val === '.') {
            return acc;
        } else {
            return acc + (val * index);
        }
    }, 0);
}


console.log(checkSum(input));