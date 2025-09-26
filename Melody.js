const { read } = require('fs');
const { isNull } = require('util');

var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, S, G] = input[s++].split(' ').map(x => +x);
var note = [];
for (var i = 0; i < N; i++) {
    note.push(input[s++].trim());
}
var graph = Array.from({length:N}, (v, k) => []);
for (var i = 0; i < N; i++) {
    for (var j = i+1; j < N; j++) {
        var diff = 0;
        for (var k = 0; k < S; k++) {
            if (note[i][k] !== note[j][k]) diff++;
        }
        if (diff <= G) {
            graph[i].push(j);
            graph[j].push(i);
        }
    }
}

var min_value = Array.from({length:N}, _ => Array(N).fill(Infinity));
var trace = Array.from({length:N}, _ => Array.from({length:N}, __ => []));
for (var i = 0; i < N; i++) {
    min_value[i][i] = 1;
    trace[i][i] = [i];
}
for (var i = 0; i < N; i++) {
    for (var j of graph[i]) {
        min_value[i][j] = 1;
        trace[i][j] = [i];
    }
}
floid_warshall(min_value, trace);

var L = +input[s++];
var tune = input[s++].split(' ').map(x => +x -1);
var last = Array.from({length:N}, _ => [-1]);
var dp = Array.from({length:L}, _ => [Infinity, undefined, undefined]);
for (var i = 0; i < L; i++) {
    var thisNote = tune[i];
    for (var j = 0; j < N; j++) {
        var d = min_value[j][thisNote];
        if (d === Infinity) continue;
        var [remain, lastValidLoc] = binarySearch(last[j], d);
        if (remain === -Infinity) continue;
        var lastError = lastValidLoc === -1 ? 0 : dp[lastValidLoc][0];
        if (d <= remain && remain+lastError-1 < dp[i][0]) {
            dp[i][0] = remain+lastError-1;
            dp[i][1] = j;
            dp[i][2] = lastValidLoc;
        }
    }
    last[thisNote].push(i);
}

var start = L-1;
var minError = dp[L-1][0];
var perform = [];
for (var i = L-2; i >= 0; i--) {
    var thisError = dp[i][0]+(L-1-i);
    if (thisError < minError) {
        minError = thisError;
        start = i;
    }
}
for (var i = L-1; i > start; i--) {
    perform.push(tune[start]);
}
for (var i = start; i >= 0;) {
    perform.push(tune[i]);
    var lastNote = dp[i][1];
    var section = trace[lastNote][tune[i]];
    var dist = i-dp[i][2];
    var j = section.length-1;
    while (dist > 1) {
        if (j > 0) {
            perform.push(section[j]);
            j--;
        } else {
            perform.push(section[j]);
        }
        dist--;
    }
    i = dp[i][2];
}
perform.reverse();
perform = perform.map(x => x+1);
console.log(minError);
console.log(perform.join(' '));


function floid_warshall(min_value, trace) {
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            for (var k = 0; k < N; k++) {
                var d = min_value[j][i]+min_value[i][k];
                if (d < min_value[j][k]) {
                    min_value[j][k] = d;
                    trace[j][k] = trace[j][i].concat(trace[i][k]);
                }
            }
        }
    }
}

function binarySearch(arr, d) {
    var start = -1;
    var end = arr.length-1;
    while (start+1 < end) {
        var mid = (start+end)>>1;
        var l = i-arr[mid];
        var r = i-arr[mid+1];
        if (r < d && d <= l) {
            return [l, arr[mid]];
        } else {
            if (r >= d) start = mid;
            if (d > l) end = mid;
        }
    }
    var mid = end;
    if (d <= i-arr[mid]) {
        return [i-arr[mid], arr[mid]];
    } else {
        return [-Infinity, undefined];
    }
}
// 각 정점에서 플로이드-와샬을 돌린 후, 거리를 알아낸 다음, 역추적으로 경로 기록
// k번 note를 마지막으로 쳤을 때의 위치를 기록한 다음, O(SL) DP + 역추적으로 해결
// 이때 그 위치는 k번 note를 마지막으로 쳤을 때 현재 note에 도달할 수 있는 위치여야 한다.
