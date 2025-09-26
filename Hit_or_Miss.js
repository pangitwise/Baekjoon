var input = require('fs').readFileSync(0).toString().trim().split('\n');
var n = +input[0];
var ans = '';
for (var i = 1; i < n+1; i++) {
    ans += 'Case '+i+': ';
    var [players, ...deck] = input[i].split(' ').map(x => +x);
    var state = Array.from({length:players}, (v, k) => k === 0 ? deck : []);
    var last_card = Array(players);
    var cur_count = Array(players).fill(1);
    var cnt = 0;
    while (state.reduce((pre, cur) => pre+cur.length, 0) > 0 && cnt < 10000) {
        for (var j = 0; j < players; j++) {
            if (state[j].length === 0) continue;
            var pass = state[j].shift();
            if (cur_count[j] === pass) {
                if (j < players-1) {
                    state[j+1].push(pass)
                }
                last_card[j] = pass;
            } else {
                state[j].push(pass);
            }
            cur_count[j]++;
            if (cur_count[j] > 13) cur_count[j] = 1;
        }
        cnt++;
    }
    if (state.reduce((pre, cur) => pre+cur.length, 0) > 0) {
        ans += 'unwinnable\n';
    } else {
        ans += last_card.join(' ')+'\n';
    }
}
console.log(ans);
