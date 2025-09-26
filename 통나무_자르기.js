var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [L, K, C] = input[0].split(' ').map(x => +x);
var loc = input[1].split(' ').map(x => +x).sort((a,b) => a-b);
var len = [];
var cur = 0;
for (var i = 0; i < K; i++) {
    len.push(loc[i]-cur);
    cur += loc[i]-cur;
}
len.push(L-loc.at(-1));
console.log(...binarySearch());


function binarySearch() {
    var min = Infinity;
    var first = undefined;
    var start = 0;
    var end = L+1;
    while (start+1 < end) {
        var mid = Math.floor((start+end)/2);
        var tmp = cuttingLog1(mid);
        if (tmp) {
            min = Math.min(min, mid);
            first = Math.min(tmp, cuttingLog2(mid));
            end = mid;
        } else {
            start = mid;
        }
    }
    return [min, first];
}

function cuttingLog1(limit) {
    var cuttingCnt = 0;
    var cur = 0;
    var firstCutting = undefined;
    for (var i = 0; i < K+1; i++) {
        if (cur+len[i] <= limit) {
            cur += len[i];
        } else {
            if (cuttingCnt >= C) return false;
            cuttingCnt++
            if (!firstCutting) firstCutting = cur;
            cur = 0;
            if (cur+len[i] > limit) return false;
            cur += len[i];
        }
    }
    if (cuttingCnt < C) return loc[0];
    return firstCutting;
}

function cuttingLog2(limit) {
    var cuttingCnt = 0;
    var cur = 0;
    for (var i = K; i >= 0; i--) {
        if (cur+len[i] <= limit) {
            cur += len[i];
        } else {
            if (cuttingCnt >= C) return false;
            cuttingCnt++
            cur = 0;
            if (cur+len[i] > limit) return false;
            cur += len[i];
        }
    }
    if (cuttingCnt < C) return loc[0];
    return cur;
}