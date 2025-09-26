var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var t = +input[s++];
var ans = [];

var list = Array.from({length:300000}, (v, k) => k);
var size = Array.from({length:300000}, _ => 1);
var xy_coord = new Map();
var yz_coord = new Map();
var xz_coord = new Map();
var tunnel = new Map();

for (var c = 0; c < t; c++) {
    var n = +input[s++];
    for (var i = 0; i < n; i++) {
        list[i] = i;
        size[i] = 1;
    }
    xy_coord.clear();
    yz_coord.clear();
    xz_coord.clear();
    tunnel.clear();
    for (var i = 0; i < n; i++) {
        var [x, y, z] = input[s++].split(' ').map(x => +x);
        tunnelCoord(xy_coord, x+' '+y, i);
        tunnelCoord(yz_coord, y+' '+z, i);
        tunnelCoord(xz_coord, x+' '+z, i);
        tunnel.set(x+' '+y+' '+z, i);
    }
    for (var j of tunnel.keys()) {
        var [x, y, z] = j.split(' ').map(x => +x);
        var idx = tunnel.get(j);
        disjointAdjacentTunnel(x, y, z, idx);
    }
    var q = +input[s++];
    for (var i = 0; i < q; i++) {
        var [x1, y1, z1, x2, y2, z2] = input[s++].split(' ').map(x => +x);
        var startTunnel = find(getTunnelIdx(x1, y1, z1));
        var endTunnel = find(getTunnelIdx(x2, y2, z2));
        var res = startTunnel === endTunnel ? 'YES' : 'NO';
        if (startTunnel === undefined) res = 'NO';
        ans.push(res);
    }
}
console.log(ans.join('\n'));


function tunnelCoord(coord, key, idx) {
    if (!coord.has(key)) coord.set(key, []);
    coord.get(key).push(idx);
}

function disjointAdjacentTunnel(x, y, z, idx) {
    if (x === -1) {
        adjacetType(x, y, z, yz_coord, idx);
        adjacetType(x, y, -1, yz_coord, idx);
        adjacetType(x, -1, z, yz_coord, idx);
    } else if (y === -1) {
        adjacetType(y, x, z, xz_coord, idx);
        adjacetType(x, x, -1, xz_coord, idx);
        adjacetType(x, -1, z, xz_coord, idx);
    } else if (z === -1) {
        adjacetType(z, x, y, xy_coord, idx);
        adjacetType(x, x, -1, xy_coord, idx);
        adjacetType(x, -1, y, xy_coord, idx);
    }
}

function adjacetType(p, q, r, coord, idx) {
    var a1 = q+' '+r;
    var a2 = (q+1)+' '+r;
    var a3 = (q-1)+' '+r;
    var a4 = q+' '+(r-1);
    var a5 = q+' '+(r+1);
    var a = [a1, a2, a3, a4, a5];
    for (var i = 0; i < a.length; i++) {
        if (coord.has(a[i])) {
            for (var j of coord.get(a[i])) {
                union(idx, j);;
            }
            coord.set(a[i], [idx]);
        }
    }
}

function getTunnelIdx(x, y, z) {
    var t1 = -1+' '+y+' '+z;
    if (tunnel.has(t1)) return tunnel.get(t1);
    var t2 = x+' '+(-1)+' '+z;
    if (tunnel.has(t2)) return tunnel.get(t2);
    var t3 = x+' '+y+' '+(-1);
    if (tunnel.has(t3)) return tunnel.get(t3);
}

function find(x) {
    if (x === list[x]) {
        return x;
    } else {
        list[x] = find(list[x]);
        return list[x];
    }
}

function union(a, b) {
    var root_a = find(a);
    var root_b = find(b);
    if (root_a !== root_b) {
        if (size[root_a] <= size[root_b]) {
            harmony(root_b, root_a);
        } else {
            harmony(root_a, root_b);
        }
        return true;
    }
    return false;
}

function harmony(big, small) {
    size[big] += size[small];
    size[small] = 0;
    list[small] = list[big];
}