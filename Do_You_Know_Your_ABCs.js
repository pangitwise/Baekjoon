var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var T = +input[s++];
var ans = '';
var list = [];
backTracking([], 0);

for (var i = 0; i < T; i++) {
    var N = +input[s++];
    var x = input[s++].split(' ').map(x => +x);
    var set = new Set()
    for (var j = 0; j < list.length; j++) {
        var triple = isPossibleTriples(list[j], x);
        if (triple) set.add(triple);
    }
    ans += set.size+'\n';
}
console.log(ans);


function backTracking(arr, dep) {
    if (arr.length === 7) {
        list.push(arr.flat());
        return;
    }
    for (var i = 0; i < 7; i++) {
        if (!arr.includes(i)) {
            arr.push(i);
            backTracking(arr, dep+1);
            arr.pop();
        }
    }
}

function isPossibleTriples(order, x) {
    var [A, B, C, A_B, B_C, C_A, A_B_C] = [x[order[0]], x[order[1]], x[order[2]], x[order[3]], x[order[4]], x[order[5]], x[order[6]]];
    for (var i = 0; i < 5; i++) {
        if (A_B && B) {
            var _A = A_B-B;
            if (!A) A = _A;
            if (A !== _A) return false;
        }
        if (A_B && A) {
            var _B = A_B-A;
            if (!B) B = _B;
            if (B !== _B) return false;
        }
        if (B_C && B) {
            var _C = B_C-B;
            if (!C) C = _C;
            if (C !== _C) return false;
        }
        if (B_C && C) {
            var _B = B_C-C;
            if (!B) B = _B;
            if (B !== _B) return false;
        }
        if (C_A && A) {
            var _C = C_A-A;
            if (!C) C = _C;
            if (C !== _C) return false;
        }
        if (C_A && C) {
            var _A = C_A-C;
            if (!A) A = _A;
            if (A !== _A) return false;  
        }
        if (A_B_C && A_B) {
            var _C = A_B_C-A_B;
            if (!C) C = _C;
            if (C !== _C) return false;
        }
        if (A_B_C && B_C) {
            var _A = A_B_C-B_C;
            if (!A) A = _A;
            if (A !== _A) return false;
        }
        if (A_B_C && C_A) {
            var _B = A_B_C-C_A;
            if (!B) B = _B;
            if (B !== _B) return false;
        }
        if (A && B && A_B) {
            if (A+B !== A_B) return false;
        }
        if (A && C && C_A) {
            if (A+C !== C_A) return false;
        }
        if (B && C && B_C) {
            if (B+C !== B_C) return false;
        }
        if (A_B && C && A_B_C) {
            if (A_B+C !== A_B_C) return false;
        }
        if (B_C && A && A_B_C) {
            if (B_C+A !== A_B_C) return false;
        }
        if (C_A && B && A_B_C) {
            if (C_A+B !== A_B_C) return false;
        }
        if (A && B && C && A_B_C) {
            if (A+B+C !== A_B_C) return false;
        }
    }
    if (A < 1 || B < 1 || C < 1) return false;
    return [A, B, C].sort((a,b) => a-b).join(' ');
}