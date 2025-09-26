var input = require('fs').readFileSync(0).toString().trim().split('\n');
var N = +input[0];
var v = input[1].split(' ').map(x => BigInt(x));
var p = 10_0000_0007n;
console.log(calc(v, N).join('\n'));

function calc(v, N) {
    var ans = Array(N);
    ans[0] = 1n;
    var sum = 1n*v[0];
    var sorted = [[v[0], 0, 0]];
    var prefix = Array(N);
    prefix[0] = ans[0];
    for (var i = 1; i < N; i++) {
        var last = i;
        while (true) {
            var [thisValue, start, end] = sorted.at(-1);
            if (thisValue <= v[i]) {
                sorted.push([v[i], last, i]);
                break;
            } else {
                sorted.pop();
                last = start;
                sum -= (thisValue-v[i])*(prefix[end]-(prefix[last-1] || 0n));
                if (sorted.length === 0) {
                    sorted.push([v[i], last, i]);
                    break;    
                }
            }
        }
        sum = (sum%p+p)%p;
        ans[i] = sum;
        prefix[i] = prefix[i-1]+ans[i];
        sum += ans[i]*v[i];
    }
    return ans;
}


// 3 4 1 2

// 