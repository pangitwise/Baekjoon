var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var vertex = Array(n).fill(undefined);
var edgeMap = new Map();
for (var i = 0; i < n; i++) {
    var message = input[i+1].trim().split(/:\s|\s/);
    var visited = new Set();
    var user = message[0];
    for (var j = 1; j < message.length; j++) {
        if (edgeMap.has(message[j]) && user !== message[j] && !visited.has(message[j])) {
            visited.add(message[j]);
            edgeMap.get(message[j]).push(i);
        }
    }
    if (!edgeMap.has(user)) edgeMap.set(user, []);
    vertex[i] = user;
}


var dp = Array(n).fill(1);
var trace = Array(n).fill(undefined);
var maxMap = new Map();
for (var i of edgeMap.keys()) maxMap.set(i, 0);
for (var i = 0; i < n; i++) {
    var user = vertex[i];
    var lastMax = maxMap.get(user);
    if (dp[i] > lastMax) {
        var arr = edgeMap.get(user);
        var start = binarySearch(arr, i);
        for (var j = start; j < arr.length; j++) {
            var next = arr[j];
            if (dp[i]+1 > dp[next]) {
                dp[next] = dp[i]+1;
                trace[next] = i;
            }
        }
    }
    maxMap.set(user, Math.max(maxMap.get(user), dp[i]));
}

var max = 0;
var idx = undefined;
for (var i = 0; i < n; i++) {
    if (dp[i] > max) {
        max = dp[i];
        idx = i;
    }
}
var seq = [];
tracing(idx);

console.log(max);
console.log(seq.join(' '));


function tracing(i) {
    if (trace[i] !== undefined) tracing(trace[i]);
    return seq.push(i+1);
}

function binarySearch(arr, idx) {
    var start = -1;
    var end = arr.length;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var l = arr[mid];
        var r = arr[mid+1] || Infinity;
        if (l < idx && idx <= r) {
            return mid+1;
        } else {
            if (l >= idx) end = mid;
            if (idx > r) start = mid;
        }
    }
    if (start === -1) {
        return 0;
    } else {
        return arr.length;
    }
}