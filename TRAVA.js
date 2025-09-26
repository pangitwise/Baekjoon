var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, H, M] = input[s++].split(' ').map(x => +x);

class dequeue {
    constructor(K) {
        this.length = 0;
        this.K = K;
        this.left = Math.floor(K/2);
        this.right = Math.floor(K/2);
        this.arr = Array(K).fill(undefined);
    }
    unshift(x) {
        if (this.length !== 0) this.left -= 1;
        if (this.left < 0) this.left = this.K-1;
        this.arr[this.left] = x;
        this.length++;
    }
    push(x) {
        if (this.length !== 0) this.right += 1;
        if (this.right >= this.K) this.right = 0;
        this.arr[this.right] = x;
        this.length++;
    }
    shift() {
        if (this.length === 0) return undefined;
        var value = this.arr[this.left];
        this.arr[this.left] = undefined;
        this.left += 1;
        if (this.left >= this.K) this.left = 0;
        if (this.length === 1) this.right = this.left;
        this.length--;
        return value;
    }
    pop() {
        if (this.length === 0) return undefined;
        var value = this.arr[this.right];
        this.arr[this.right] = undefined;
        this.right -= 1;
        if (this.right < 0) this.right = this.K-1;
        if (this.length === 1) this.right = this.left;
        this.length--;
        return value;
    }
}

var leftInfo = new dequeue(M*2+1);
var rightInfo = new dequeue(M*2+1);
leftInfo.push([N, 0]);
var prefix = [0];
var N_cnt = 0;
var ans = '';
// [X, N_cnt]
var total = 0;
for (var i = 0; i < M; i++) {
    var [oper, X] = input[s++].trim().split(' ');
    if (oper !== 'Z') X = +X;
    if (oper === 'N') {
        oper_N(X);
        prefix.push(prefix.at(-1)+X);
        N_cnt++;
    } else if (oper === 'L') {
        oper_L(X);
    } else if (oper === 'D') {
        oper_D(X);
    } else if (oper === 'S') {
        oper_S(X);
    } else if (oper === 'Z') {
        ans += total+'\n';
    }
}
console.log(ans);


function oper_N(X) {
    if (leftInfo.length > 0) {
        var i = leftInfo.right;
        var [leftMost, idx] = leftInfo.arr[i];
        var cnt = 0;
        while (leftInfo.length > 0) {
            var i = leftInfo.right;
            var [_X, _idx] = leftInfo.arr[i];
            var height = prefix.at(-1)-prefix[_idx];
            if (height+X >= H) {
                var next_X = leftInfo.length > 1 ? leftInfo.arr[i-1][0] : 0;
                total += (_X-next_X)*Math.max(0, H-height);
                leftInfo.pop();
                cnt++;
            } else {
                var [_X, _idx] = leftInfo.arr[i];
                total += _X*X;
                break;
            }
        }
        if (cnt > 0) leftInfo.push([leftMost, idx]);
    }
    //
    if (rightInfo.length > 0) {
        var i = rightInfo.right;
        var [rightMost, idx] = rightInfo.arr[i];
        var cnt = 0;
        while (rightInfo.length > 0) {
            var i = rightInfo.right;
            var [_X, _idx] = rightInfo.arr[i];
            var height = prefix.at(-1)-prefix[_idx];
            if (height+X >= H) {
                var next_X = rightInfo.length > 1 ? rightInfo.arr[i-1][0] : 0;
                total += (_X-next_X)*Math.max(0, H-height);
                rightInfo.pop();
                cnt++;
            } else {
                var [_X, _idx] = rightInfo.arr[i];
                total += _X*X;
                break;
            }
            i--;
        }
        if (cnt > 0) rightInfo.push([rightMost, idx]);
    }
}

function oper_L(X) {
    X = +X;
    var last = 0;
    while (true) {
        var i = leftInfo.left;
        if (leftInfo.length === 0 || X < leftInfo.arr[i][0]) {
            if (leftInfo.length > 0) {
                var _idx = leftInfo.arr[i][1];
                var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
                total -= (X-last)*height;
            }
            leftInfo.unshift([X, N_cnt]);
            break;
        } else {
            [_X, _idx] = leftInfo.shift();
            var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
            total -= (_X-last)*height;
            last = _X;
        }
    }
    var base_right = N-X;
    while (rightInfo.length > 0) {
        var i = rightInfo.right;
        if (rightInfo.length === 0 || base_right >= rightInfo.arr[i][0]) {
            break;
        } else {
            var next_X = rightInfo.length > 1 ? rightInfo.arr[i-1][0] : 0;
            if (next_X >= base_right) {
                var [_X, _idx] = rightInfo.pop();
                var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
                total -= (_X-next_X)*height;
            } else {
                var _idx = rightInfo.arr[i][1];
                var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
                total -= (rightInfo.arr[i][0]-base_right)*height;
                rightInfo.arr[i][0] = base_right;
            }
        }
    }
}

function oper_D(X) {
    X = +X;
    var last = 0;
    while (true) {
        var i = rightInfo.left;
        if (rightInfo.length === 0 || X < rightInfo.arr[i][0]) {
            if (rightInfo.length > 0) {
                var _idx = rightInfo.arr[i][1];
                var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
                total -= (X-last)*height;
            }
            rightInfo.unshift([X, N_cnt]);
            break;
        } else {
            [_X, _idx] = rightInfo.shift();
            var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
            total -= (_X-last)*height;
            last = _X;
        }
    }
    var base_left = N-X;
    while (leftInfo.length > 0) {
        var i = leftInfo.right;
        if (leftInfo.length === 0 || base_left >= leftInfo.arr[i][0]) {
            break;
        } else {
            var next_X = leftInfo.length > 1 ? leftInfo.arr[i-1][0] : 0;
            if (next_X >= base_left) {
                var [_X, _idx] = leftInfo.pop();
                var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
                total -= (_X-next_X)*height;
            } else {
                var _idx = leftInfo.arr[i][1];
                var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
                total -= (leftInfo.arr[i][0]-base_left)*height;
                leftInfo.arr[i][0] = base_left;
            }
        }
    }
}

function oper_S(X) {
    var cnt1 = 0;
    if (leftInfo.length > 0) {
        var i = leftInfo.right;
        var [leftMost, idx1] = leftInfo.arr[i];
        while (leftInfo.length > 0) {
            var i = leftInfo.right;
            var [_X, _idx] = leftInfo.arr[i];
            var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
            if (height >= X) {
                var next_X = leftInfo.length > 1 ? leftInfo.arr[i-1][0] : 0;
                total -= (_X-next_X)*(height-X);
                leftInfo.pop();
                cnt1++;
            } else {
                break;
            }
        }
        if (cnt1 > 0) {
            leftInfo.push([leftMost, idx1]);
        }
    }
    //
    var cnt2 = 0;
    if (rightInfo.length > 0) {
        var i = rightInfo.right;
        var [rightMost, idx2] = rightInfo.arr[i];
        while (rightInfo.length > 0) {
            var i = rightInfo.right;
            var [_X, _idx] = rightInfo.arr[i];
            var height = Math.min(H, prefix.at(-1)-prefix[_idx]);
            if (height >= X) {
                var next_X = rightInfo.length > 1 ? rightInfo.arr[i-1][0] : 0;
                total -= (_X-next_X)*(height-X);
                rightInfo.pop();
                cnt2++;
            } else {
                break;
            }
            i--;
        }
        if (cnt2 > 0) {
            rightInfo.push([rightMost, idx2]);
        }
    }
    if (cnt1 > 0) prefix[idx1] = prefix.at(-1)-X;
    if (cnt2 > 0) prefix[idx2] = prefix.at(-1)-X;
}