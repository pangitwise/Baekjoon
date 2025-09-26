var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var n = +input[s++];
var tickets = Array(n);
for (var i = 0; i < n; i++) {
    var [w, q] = input[s++].split(' ').map(x => +x);
    tickets[i] = [w, q, i+1, i];
}
var list_w = Array(n);
var rec_w = 0;
for (var i = 0; i < n; i++) {
    var [w, p, idx] = tickets[i];
    rec_w += w;
    list_w[i] = rec_w;
}

tickets.sort(function(a,b) {
    var [aw, ap, a_idx, a_loc] = a;
    var [bw, bp, b_idx, b_loc] = b;
    var sum_w = list_w[a_loc];
    var keep = sum_w*(10000-ap)+(sum_w+bw)*ap;
    var change = (sum_w-aw+bw)*(10000-bp)+(sum_w+bw)*bp;
    if (keep === change) {
        if (a_idx < b_idx) {
            return -1;
        } else {
            a[3] = b_loc;
            b[3] = a_loc;
            list_w[a_loc] = sum_w-aw+bw;
            return 1;
        }
    } else if (keep < change) {
        a[3] = b_loc;
        b[3] = a_loc;
        list_w[a_loc] = sum_w-aw+bw;
        return 1;
    } else {
        return -1;
    }
});

var ans = '';
for (var i = 0; i < n; i++) {
    ans += tickets[i][2]+' ';
}
console.log(ans);
// a b c d
// = a(1-p1) + (a+b)*p1*(1-p2) + (a+b+c)*p1*p2*(1-p3) + (a+b+c+d)*p1*p2*p3

// b a c d
// b(1-p2) + (a+b)*p2*(1-p1) + (a+b+c)p1*p2(1-p3)

// a c b d
// = a(1-p1) + (a+c)*p1*(1-p3) + (a+b+c)*p1*p3*(1-p2)

//  ap1-ap1p2 + bp1 - bp1p2 + (a+b+c)p1p2 - (a+b+c)p1p2p3
// ap1 - ap1p3 + cp1 - cp1p2 + (a+b+c)p1p3 - (a+b+c)p1p2p3

// = 

// 10000t*ap
// 10000t*bp