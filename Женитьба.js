var input = require('fs').readFileSync(0).toString().trim().split('\n');

Array.prototype.Hpush = function(min_value, loc, ...x) {
    var element = [...x];
    while (element.length !== 0) {
        this.push(element.pop());
        var d = this.length-1;
        loc[this[d]] = d;
        var s = Math.floor(d/2)
        while (min_value[this[d]] < min_value[this[s]]) {
            this[d] += this[s];
            this[s] -= this[d];
            this[d] += this[s];
            this[s] *= -1;
            loc[this[d]] = d;
            loc[this[s]] = s;
            var d = s;
            var s = Math.floor(d/2);
            if (d === 1) {
                break;
            }
        }
    }
}
 
Array.prototype.Hshift = function(min_value, loc) {
    if (this.length === 1) {
       return undefined;
    } else {
        if (this.length !== 2) {
          var min = this.splice(1, 1, this.pop());
          loc[this[0]] = 0;
        } else {
          var min = this.pop();
          return min;
        }
        var s = 1;
        var d1 = s*2;
        var d2 = s*2+1;
        while (min_value[this[s]] > min_value[this[d1]] || min_value[this[s]] > min_value[this[d2]]) {
            if (min_value[this[d2]] === undefined) {
                var d = d1;
            } else {
                if (min_value[this[d1]] < min_value[this[d2]]) {
                    var d = d1;
                } else {
                    var d = d2;
                }
            }
            this[s] += this[d];
            this[d] -= this[s];
            this[s] += this[d];
            this[d] *= -1;
            loc[this[d]] = d;
            loc[this[s]] = s;
            var s = d;
            var d1 = s*2;
            var d2 = s*2+1;
            if (min_value[this[d1]] === undefined && min_value[this[d2]] === undefined) {
                break;
            }
        }
        return min[0];
    }
}
 
Array.prototype.Hupdate = function(min_value, loc, x) {
    var d = loc[x];
    if (d === -1) {
       this.push(x);
       var d = this.length-1;
    }
   var s = Math.floor(d/2)
   while (min_value[this[d]] < min_value[this[s]]) {
       this[d] += this[s];
       this[s] -= this[d];
       this[d] += this[s];
       this[s] *= -1;
       loc[this[d]] = d;
       loc[this[s]] = s;
       var d = s;
       var s = Math.floor(d/2);
       if (d === 1) {
           break;
       }
   }
}

var n = +input[0];
var boys = [];
var girls = [];
var info_b = Array(n+1);
var info_g = Array(n+1);
var b = input[1].split(' ').map(x => +x);
var g = input[2].split(' ').map(x => +x);
for (var i = 0; i < n; i++) {
    boys.push([b[i], i+1]);
    girls.push([g[i], i+1]);
    info_b[i+1] = b[i];
    info_g[i+1] = g[i];
}
// 정렬
boys.sort((a,b) => a[0]-b[0]);
girls.sort((a,b) => a[0]-b[0]);
var ord_girl = Array(n+2);
for (var i = 0; i < n; i++) {
    var [_, g_idx] = girls[i];
    ord_girl[g_idx] = i;
}
ord_girl[0] = -Infinity;
ord_girl[n+1] = Infinity;
var dist_le = Array(n+1).fill(Infinity);
var dist_ri = Array(n+1).fill(Infinity);
dist_le[0] = -Infinity;
dist_ri[0] = -Infinity;
var ptn_le = Array(n+1);
var ptn_ri = Array(n+1);
// 분리 집항으로 경로 단축
var list_ds = Array.from({length:n+1}, (v, k) => k);
var size = Array(n+1).fill(1);
var linked_g = Array(n+1);
for (var i = 0; i < n; i++) {
    var [_, g_idx] = girls[i];
    var le = i >= 1 ? girls[i-1][1] : 0;
    var ri = i < n-1 ? girls[i+1][1] : n+1;
    linked_g[g_idx] = [le, ri];
}
// 스위핑으로 왼쪽/오른쪽 방향의 가장 가까운 짝 찾기
var pairList = Array.from({length:n+1}, _ => []);
sweeping(boys, girls, dist_ri, pairList, ptn_ri, 'r');
sweeping(boys, girls, dist_le, pairList, ptn_le, 'l');
// 최소 힙 + 분리 집합
var heap_ri = [0];
var heap_le = [0];
var loc_ri = Array(n+1);
var loc_le = Array(n+1);
for (var i = 1; i <= n; i++) {
    heap_ri.Hpush(dist_ri, loc_ri, i);
    heap_le.Hpush(dist_le, loc_le, i);
}
var ans = '';
var matched_b = Array(n+1).fill(false);
var matched_g = Array(n+1).fill(false);
var list = [];
var cnt = 0;
var rec = 0;
while (heap_le.length > 1 && heap_ri.length > 1) {
    var min_ri = dist_ri[heap_ri[1]];
    var min_le = dist_le[heap_le[1]];
    var dir = undefined;
    if (min_ri <= min_le) {
        var b_idx = heap_ri.Hshift(dist_ri, loc_ri);
        var g_idx = ptn_ri[b_idx];
        dir = 'r';
    } else {
        var b_idx = heap_le.Hshift(dist_le, loc_le);
        var g_idx = ptn_le[b_idx];
        dir = 'l';
    }
    if (isValidPair(b_idx, g_idx)) { 
        matched_b[b_idx] = true;
        matched_g[g_idx] = true;
        var root = find(g_idx);
        var [le_g, ri_g] = linked_g[root];
        if (le_g >= 1 && matched_g[le_g]) union(root, le_g);
        if (ri_g <= n && matched_g[ri_g]) union(root, ri_g);
        ans += `${b_idx} ${g_idx}\n`;
        list.push([b_idx, g_idx]);
        rec++;
    } else if (!matched_b[b_idx]) {
        // 정보 갱신
        cnt++;
        dir === 'r' ? updateInfo(heap_ri, dist_ri, loc_ri, ptn_ri, b_idx, 'r') : updateInfo(heap_le, dist_le, loc_le, ptn_le, b_idx, 'l');
    }
}
console.log(ans.trim());


function sweeping(boys, girls, dist_arr, pairList, ptn, dir) {
    if (dir === 'l') {boys.reverse(); girls.reverse();}
    for (var [i, j] = [0, 0]; i < n && j < n;) {
        var [b_loc, b_idx] = boys[i];
        var [g_loc, g_idx] = girls[j];
        if (check(g_loc, b_loc, dir)) {
            j++;
        } else {
            var dist = Math.abs(b_loc-g_loc);
            dist_arr[b_idx] = dist;
            ptn[b_idx] = g_idx;
            pairList[g_idx].push(b_idx);
            i++;
            var next_g_loc = j < n-1 ? girls[j+1][0] : Infinity;
            if (g_loc === next_g_loc) j++;
        }
    }
    if (dir === 'l') {boys.reverse(); girls.reverse();}
}

function check(a, b, dir) {
    if (dir === 'r') {
        return a < b ? true : false;
    } else {
        return a <= b ? false : true
    }
}

function isValidPair(b_idx, g_idx) {
    if (!matched_b[b_idx] && !matched_g[g_idx]) return true;
    return false;
}

function updateInfo(heap, dist, loc, ptn, b_idx, dir) {
    var num = dir === 'r' ? 1 : 0;
    var tmp_g = ptn[b_idx];
    var root_g = find(tmp_g);
    ptn[b_idx] = linked_g[root_g][num];
    tmp_g = ptn[b_idx];
    var tmp_d = 0 < tmp_g && tmp_g <= n ? Math.abs(info_b[b_idx]-info_g[tmp_g]) : Infinity;
    dist[b_idx] = tmp_d;
    0 < tmp_g && tmp_g <= n ? heap.Hpush(dist, loc, b_idx) : 0;
}

function find(x) {
    if (x === list_ds[x]) {
        return x;
    } else {
        list_ds[x] = find(list_ds[x]);
        return list_ds[x];
    }
}

function union(a, b) {
    var root_a = find(a);
    var root_b = find(b);
    if (root_a !== root_b) {
        if (size[root_a] >= size[root_b]) {
            harmony(root_a, root_b);
        } else {
            harmony(root_b, root_a);
        }
        return true;
    }
    return false;
}

function harmony(big, small) {
    list_ds[small] = big;
    size[big] += size[small];
    var big_le = linked_g[big][0];
    var small_le = linked_g[small][0];
    linked_g[big][0] = ord_girl[big_le] <= ord_girl[small_le] ? big_le : small_le;
    var big_ri = linked_g[big][1];
    var small_ri = linked_g[small][1];
    linked_g[big][1] = ord_girl[big_ri] >= ord_girl[small_ri] ? big_ri : small_ri;
}