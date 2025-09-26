var input = require('fs').readFileSync(0).toString().trim().split('\n');
var t = +input[0];
var ans = '';
for (var i = 1; i < t+1; i++) {
    var [n, m] = input[i].split(' ').map(x => +x);
    m = BigInt(m);
    var res = 0n;
    for (var j = n; j >= 0; j--) {
        backTracking(Array(n), 0, j);
        if (res > 0n) break;
    }
    ans += res+'\n';
}
console.log(ans);

function backTracking(arr, dep, limit) {
    if (n-dep < limit) return;
    if (dep === n) {
        var multiple = seven_segment(arr);
        if (multiple > res) res = multiple;
        return
    }
    if (limit) {
        arr[dep] = true;
        backTracking(arr, dep+1, limit-1);
    }
    arr[dep] = false;
    backTracking(arr, dep+1, limit);
}

function seven_segment(arr) {
    var digit = 0n;
    var v = 0n;
    var notEleven = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
            v += 11n*10n**digit;
            digit += 2n;
        } else {
            notEleven.push(10n**digit)
            digit += 1n;
        }
    }
    var _v = v%m;
    var goal = _v === 0n ? 0n : m-_v;
    var mid = Math.floor(notEleven.length/2);
    var front = notEleven.slice(0, mid);
    var back = notEleven.slice(mid);
    var f_map = new Map();
    var b_map = new Map();
    bruteForce(f_map, front, 0, 0n);
    bruteForce(b_map, back, 0, 0n);
    var max = 0n;
    for (var i of f_map.keys()) {
        var pair = (m+goal-i)%m;
        if (b_map.has(pair)) {
            var multiple = f_map.get(i)+b_map.get(pair);
            max = multiple > max ? multiple : max;
        }
    }
    if ((max+v)%m === 0n) {
        return max+v;
    } else {
        return 0n;
    }
}

function bruteForce(map, arr, dep, v) {
    if (dep === arr.length) {
        var mod = v%m;
        if (!map.has(mod)) {
            map.set(mod, v);
        } else {
            if (v > map.get(mod)) {
                map.set(mod, v);
            }
        }
        return;
    }
    for (var i = 0n; i < 10n; i++) {
        bruteForce(map, arr, dep+1, v+arr[dep]*i);
    }
}
// 중간에서 만나기 기법을 활용...
// O(2^(n+1)*10^(n/2)*t)의 시간 복잡도