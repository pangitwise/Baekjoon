var N = +require('fs').readFileSync(0).toString().trim();
console.log(parseInt(Number(N).toString(2).split('').reverse().join(''), 2));