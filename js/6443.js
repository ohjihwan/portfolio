const fs = require('fs');
// const input = fs.readFileSync('/dev/stdin').toString().trim().split(/\r\n/);
const input = fs.readFileSync('js/input.txt').toString().trim().split(/\r\n/);

const n = parseInt(input[0]); 
const words = input.slice(1)

function anagramHomework(currentWord) {
    const chars = currentWord.split('');
    const results = new Set();
    const targetLength = currentWord.length;
    let currentAnagram = '';
    const used = new Array(targetLength).fill(false);

    function backtrack(){
        if (currentAnagram.length === targetLength) {
            results.add(currentAnagram);
            return
        }

        for (let i = 0; i < targetLength; i++) {
            if (used[i] || (i > 0 && chars[i] === chars[i - 1] && !used[i - 1])) {
                continue
            }
            
            used[i] = true;
            currentAnagram += chars[i];
            backtrack();
            currentAnagram = currentAnagram.slice(0, -1);
            used[i] = false;
        }
    }

    backtrack()
    return [...results].sort();
}

for (const word of words) {
    const anagrams = anagramHomework(word);
    anagrams.forEach(anagram => console.log(anagram));
}
