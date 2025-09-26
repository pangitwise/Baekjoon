var input = require('fs').readFileSync(0).toString().trim().split('\n');
var T = +input[0];
var ans = '';
for (var c = 1; c < T+1; c++) {
    var [PA, PB] = input[c].split(' ').map(x => +x);
    var score = Array.from({length:5}, _ => Array(5).fill(0));
    score[0][0] = 1;
    var winrate_A1 = getGameWinningProb(PA, PB, 'A');
    var winrate_A2 = getGameWinningProb(PA, PB, 'B')
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var winrate_A = (i+j)%2 === 0 ? winrate_A1 : winrate_A2;
            score[i+1][j] += score[i][j]*winrate_A;
            score[i][j+1] += score[i][j]*(1-winrate_A);
        }
    }
    var victoryrate_A = 0;
    for (var i = 0; i < 4; i++) {
        victoryrate_A += score[4][i];
    }
    ans += victoryrate_A+'\n';
}
console.log(ans);


// 10-10 이후 듀스 돌입 시
// A가 2번 연속 이길 확률을 k,
// A와 B가 1번씩 번갈아 이길 확률을 p라고 하자...

// 이때 A가 해당 게임을 이길 확률 P는는
// P = k+kp+kp^2+kp^3...
// = ∑(n= 1 to ∞) k*p^n
// = k/(1-p)


function getGameWinningProb(PA, PB, firstServer) {
    var table = Array.from({length:12}, _ => Array(12).fill(0));
    table[0][0] = 1;
    for (var i = 0; i < 11; i++) {
        for (var j = 0; j < 11; j++) {
            if (i === 10 && j === 10) break;
            if (Math.floor((i+j)/2)%2 === 0) {
                table[i+1][j] += firstServer === 'A' ? table[i][j]*PA : table[i][j]*(1-PB);
                table[i][j+1] += firstServer === 'A' ? table[i][j]*(1-PA) : table[i][j]*PB;
            } else {
                table[i+1][j] += firstServer === 'A' ? table[i][j]*(1-PB) : table[i][j]*PA;
                table[i][j+1] += firstServer === 'A' ? table[i][j]*PB : table[i][j]*(1-PA);
            }
        }
    }
    var winrate_A = 0;
    for (var i = 0; i < 10; i++) {
        winrate_A += table[11][i];
    }
    // 10-10 듀스에서의 A의 승리 확률 더하기
    var deuceProb = PA*PB+(1-PB)*(1-PA);
    if (deuceProb !== 1) winrate_A += table[10][10]*PA*(1-PB)/(1-deuceProb);
    return winrate_A;
}