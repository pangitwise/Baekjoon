var input = require('fs').readFileSync(0).toString().trim().split('').map(x => +x);
var list = [];
for (var i = 0; i < input.length; i++) {
    if (input[i] === 1) list.push(i);
}
console.log(bfs(list));


function bfs(list) {
    var queue = list;
    var dep = 0;
    while (queue.length > 0) {
        var tmp = [];
        for (var i of queue) {
            if (i-1 >= 0 && !input[i-1]) {
                tmp.push(i-1);
                input[i-1] = 1;
            }
            if (i+1 < input.length && !input[i+1]) {
                tmp.push(i+1);
                input[i+1] = 1;
            }
        }
        queue = tmp;
        dep++;
    }
    return dep-1;
}