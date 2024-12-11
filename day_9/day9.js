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
    let spaceMapper = new Map();

    for (let i = 0; i < decodedMap.length; i++) { 
        if (decodedMap[i] === '.') {
            let start = i;
            while (decodedMap[start] === '.') {
                start++;
            }
            
            let space = start - i;

            if (spaceMapper.has(space)) {
                spaceMapper.get(space).push(i);
            } else {
                spaceMapper.set(space, [i]);
            }
            i = start;
        }
    }

    

    return decodedMap;
} 

function checkSum (input) {
    let decodedMap = decodeMap(input);
    let defragmentedMap = defragmentDisk(decodedMap);

     return defragmentedMap.reduce((acc, val, index) => {
        if (val === '.') {
            return acc;
        } else {
            return acc + (val * index);
        }
    }, 0);
}


console.log(checkSum(input));