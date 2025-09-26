const { unlink } = require('fs');

var input = require('fs').readFileSync(0).toString().trim().split('\n');
var Q = +input[0];
var list = [];
var size = [];
var urlMap = new Map();
var IPMap = new Map();
var dataMap = new Map();
var ans = '';
for (var i = 1; i < Q+1; i++) {
    var query = input[i].trim().split(' ');
    if (query[0] === 'URL') {
        var [, D, I] = query;
        URL(D, I);
    } else if (query[0] === 'IP') {
        var [, I, S] = query;
        IP(I, S);
    } else if (query[0] === 'REDIRECT') {
        var [, I1, I2] = query;
        REDIRECT(I1, I2);
    } else if (query[0] === 'HTTP') {
        var [, K] = query;
        ans += HTTP(K);
    }
}
console.log(ans);


function URL(D, I) {
    addIP(I);
    urlMap.set(D, I);
}

function IP(I, S) {
    addIP(I);
    var loc = find(IPMap.get(I));
    dataMap.set(loc, S);
}

function REDIRECT(I1, I2) {
    addIP(I1);
    addIP(I2);
    var loc1 = find(IPMap.get(I1));
    var keepData = undefined;
    if (dataMap.has(loc1)) keepData = dataMap.get(loc1);
    var loc2 = find(IPMap.get(I2));
    var tmpData = undefined;
    if (dataMap.has(loc2)) tmpData = dataMap.get(loc2);
    union(loc1, loc2);
    var newLoc = find(loc2);
    if (keepData !== undefined) {
        dataMap.set(newLoc, keepData);
    } else if (tmpData !== undefined) {
        dataMap.set(newLoc, tmpData);
    }
}

function addIP(I) {
    if (!IPMap.has(I)) {
        var idx = list.length;
        list.push(idx);
        size.push(1);
        IPMap.set(I, idx);
        IPMap.set(idx, I);
    }
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
    list[small] = big;
    size[big] += size[small];
    size[small] = null;
}

function HTTP(K) {
    if (isAlphabet(K[0])) {
        var D = K;
        return HTTP_D(D);
    } else {
        var I = K;
        return HTTP_I(I);
    }
}

function HTTP_D(D) {
    var _D = D.split('.');
    if (_D[0] !== 'www') {
        var wD = 'www.'+D;
    } 
    if (urlMap.has(D)) {
        var thisIP = urlMap.get(D);
        var res = HTTP_I(thisIP);
        if (res === 'HTTP 404 Not Found\n') {
            if (wD) {
                return HTTP_D(wD);
            } else {
                return res;
            }
        } else {
            return res;
        }
    } else {
        if (wD) {
            return HTTP_D(wD);
        } else {
            return 'HTTP 404 Not Found\n';
        }
    }
}

function HTTP_I(I) {
    var _IP = I.split('.').map(x => +x);
    if (!_IP.every(x => 0 <= x && x <= 255)) return 'HTTP 400 Bad Request\n'
    if (IPMap.has(I)) {
        var loc = IPMap.get(I);
        var thisData = dataMap.get(find(loc));
        if (thisData === undefined) {
            return 'HTTP 404 Not Found\n';
        } else {
            return 'HTTP 200 OK\nRequested Data : '+thisData+'\n';
        }
    } else {
        return 'HTTP 404 Not Found\n';
    }
}

function isAlphabet(S) {
    var num = S.charCodeAt();
    if ((65 <= num && num <= 90) || (97 <= num && num <= 122)) return true;
    return false;
}