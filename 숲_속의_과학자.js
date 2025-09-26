var input = require('fs').readFileSync(0).toString().trim().split('\n');
var [N, M] = input[0].split(' ').map(x => BigInt(x));
var p = input[1].split(' ').map(x => BigInt(x));
var ans = ''
var binary = Array(61);
for (var d = 0n; d <= 60n; d++) {
    if ((1n<<d) <= N && N < (1n<<(d+1n))) {
        var H = d+1n;
    }
    binary[Number(d)] = 1n<<d;
}
for (var i = 0; i < M; i++) {
    ans += find(H, N, 0n, N, p[i], 0n)+' ';
}
console.log(ans);


function find(limit, remain, l, r, x, sum) {
    if (remain <= limit) {
        var thisNode = l+1n;
    } else {
        var subTreeSize = binary[Number(limit)-1]-1n;
        if (subTreeSize+1n >= remain) {
            var thisNode = l+1n;
        } else {
            var thisNode = r-subTreeSize;
        }
    }
    sum++;
    if (x === sum) return thisNode;
    var left = thisNode-l-1n;
    var right = r-thisNode;
    if (left > 0n && x <= sum+left) return find(limit-1n, left, l, thisNode-1n, x, sum);
    if (x > sum+left) return find(limit-1n, right, thisNode, r, x, sum+left);
}
// E = ∑ (N+1)^H * x_i / (N+1)^i
// = (N+1)^H * ∑  x_i / (N+1)^i
// = (N+1)^H * (x_1/(N+1) + ... + x_N / (N+1)^N)
// = (N+1)^H * (x_1*(N+1)^(N-1) + x_2*(N+1)^(N-2) + ... + x_N)/(N+1)^N

// (x_i)/(N+1)^i < 1 이므로
// ∑  x_i / (N+1)^i < 1 < (N+1)^H이 성립한다.

// 1/(N+1)^i = (N+1)/(N+1)^i > N/(N+1)^(i+1)
// 따라서 1/(N+1)^i > N/(N+1)^(i+1)이다.

// 1/(N+1) < (x_1*(N+1)^(N-1) + x_2*(N+1)^(N-2) + ... + x_N)/(N+1)^N < 1이다.
// (N+1)^H * 1 = (N+1)^(H+1)*1/(N+1)이므로,
// H를 최소화하면서, 수열의 앞쪽에 작은 수를 배치해야 한다.

// 다음 과정을 재귀적으로 반복하여 수를 찾는다.
// 1. 다음 구간의 남은 수를 k라 하자. k를 이진수로 변환한다.
// 2. k의 이진 자릿수를 d라 하자. k&(2^(d-1)) = 0이라면, 해당 칸은 2^(d-1)이다.
// 3. 그렇지 않다면, 해당 칸은 (k&(2^d))+1이다.

// 1001  101
///  9
//   4
//  2   6
// 1 3  5 8
//       7 9

//   11 = 1101   6 = 110
//     6
//   3   
//  2 4
// 1   5

//    5    6 = 110  3 = 11
//      8
//     7  10
//    6  9  11

// 7
//   4
//  2  6
// 1 3 5 7

// 12 -> 5

//   11
//   4    6 = 110 100
//  2    8
// 1 3  6  10
//     5 7 9 11

//    5
//   2      9
//  1 3    7   11 
//     4  6 8 10 12

// 100
// 110010

// 7
//   4
//  2  6 
//1  3 5 7

// 8
//  1
//     5
//    3  
//   2 4

// 10

//   5
//  1   
//   3
//  2 4 

//   6
//  2
// 1  4
//   3 5


//   2
// 1    6
//     3  7
//      4
//       5