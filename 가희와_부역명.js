var S = require('fs').readFileSync(0).toString().trim();
S = S.split(/[()]/);
console.log(S[0].trim());
if (S[1] !== undefined) {
    console.log(S[1].trim());
} else {
    console.log('-');
}
