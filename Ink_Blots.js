var input = require('fs').readFileSync(0).toString().trim().split(/\s+/).map(x => +x);
var s = 0;
var ans = '';
while (true) {
    var n = +input[s++];
    if (n === 0) break;
    var blot = [];
    for (var i = 0; i < n; i++) {
        blot.push([input[s++], input[s++], input[s++]]);
    }
    var intersectionList = Array.from({length:n}, _ => Array(n).fill(undefined));
    var intersectionNumber = Array.from({length:n}, _ => Array(n).fill(undefined));
    var lines = [];
    var num = 0;
    for (var i = 0; i < n; i++) {
        var [x1, y1, r1] = blot[i];
        for (var j = i+1; j < n; j++) {
            var [x2, y2, r2] = blot[j];
            if (isIntersectedTwoCircle(x1, y1, r1, x2, y2, r2)) {
                var [a, b] = getLineariseEquationOfIntersectionOfTwoCircle(x1, y1, r1, x2, y2, r2);
                var intersect_P = getIntersectionofCircleAndStraightLine(x1, y1, r1, a, b);
                if (intersect_P) {
                    var [p1, q1, p2, q2] = intersect_P;
                    if (!isValidIntersection(p1, q1, p2, q2, i, j)) intersect_P = undefined;
                }
                intersectionList[i][j] = intersect_P;
                intersectionList[j][i] = intersect_P;
                if (intersect_P) {
                    lines.push([...intersect_P, i, j]);
                    intersectionNumber[i][j] = num;
                    intersectionNumber[j][i] = num;
                    num++;
                }
            }
        }
    }
    var list = Array.from({length:lines.length}, (v, k) => k);
    var sized = Array(lines.length).fill(1);
    for (var i = 0; i < lines.length; i++) {
        var [x1, y1, x2, y2, A, B] = lines[i];
        for (var j = 0; j < n; j++) {
            if (intersectionList[A][j]) {
                var [x3, y3, x4, y4] = intersectionList[A][j];
                if (lineIntersectionCheck(x1, y1, x2, y2, x3, y3, x4, y4)) {
                    union(i, intersectionNumber[A][j]);
                }
            }
            if (intersectionList[B][j]) {
                var [x3, y3, x4, y4] = intersectionList[B][j];
                if (lineIntersectionCheck(x1, y1, x2, y2, x3, y3, x4, y4)) {
                    union(i, intersectionNumber[B][j]);
                }
            }
        }
    }
    var segmentSet = Array.from({length:n}, _ => new Set());
    for (var i = 0; i < lines.length; i++) {
        var root = find(i);
        var [A, B] = [lines[i][4], lines[i][5]];
        segmentSet[A].add(root);
        segmentSet[B].add(root);
    }
    var graph = Array.from({length:lines.length}, _ => []);
    var cnt = 1;
    for (var i = 0; i < segmentSet.length; i++) {
        // 사이클이 한 원 내에서만 형성되는 경우를 배제
        var thisSize = segmentSet[i].size;
        if (thisSize >= 3) cnt -= thisSize*(thisSize-1)/2-(thisSize-1);
        segmentSet[i] = [...segmentSet[i]];
        for (var j = 0; j < segmentSet[i].length; j++) {
            var num1 = segmentSet[i][j];
            for (var k = j+1; k < segmentSet[i].length; k++) {
                var num2 =segmentSet[i][k];
                graph[num1].push(num2);
                graph[num2].push(num1);
            }
        }
    }
    var visited = Array(lines.length).fill(false);
    var edgeSet = new Set();
    for (var i = 0; i < lines.length; i++) {
        if (!visited[i]) dfs(i);
    }
    ans += cnt+'\n';
}
console.log(ans);


// 두 원이 서로 교차하는지 판정
function isIntersectedTwoCircle(x1, y1, r1, x2, y2, r2) {
    var dist = getDistance(x1, y1, x2, y2)
    if (dist === r1 || dist === r2) return true;
    if (dist > r1+r2) return false;
    if (r1 <= r2) {
        if (dist+r1 < r2) return false;
    } else {
        if (dist+r2 < r1) return false;
    }
    return true;
}

// 두 원의 교점의 직선의 방정식 구하기
// (x^2+y^2+Ax+By+C)-(x^2+y^2+A'x+B'y+C') = 0
// ((A-A')x+(B-B')y+(C-C') = 0
// 반환값 : [기울기, y절편]
function getLineariseEquationOfIntersectionOfTwoCircle(x1, y1, r1, x2, y2, r2) {
    var co_x = -x1*2+x2*2;
    var co_y = -y1*2+y2*2;
    var C = (x1**2+y1**2-r1**2)-(x2**2+y2**2-r2**2);
    if (co_y === 0) {
        return [Infinity, -C/co_x];
    } else {
        return [-co_x/co_y, -C/co_y];
    }
}

// 원과 직선의 교점 구하기
// y = ax+b;
// (x-k)^2+(ax+(b-t))^2 = r^2

// x = p;
// (p-k)^2+(y-t)^2 = r^2
function getIntersectionofCircleAndStraightLine(x, y, r, a, b) {
    if (a === Infinity && b === Infinity) return false;
    if (a !== Infinity) {
        var co_x2 = a**2+1;
        var co_x = -x*2+(b-y)*a*2
        var C = x**2+(b-y)**2-r**2;
    } else {
        var co_x2 = 1;
        var co_x = -y*2;
        var C = (b-x)**2+y**2-r**2;
    }
    var res = quadraticFormula(co_x2, co_x, C);
    if (res) {
        var [v1, v2] = res;
        if (a === Infinity) {
            return [b, v1, b, v2];
        } else {
            if (v1 === v2) return false;
            return [v1, a*v1+b, v2, a*v2+b];
        }
    } else {
        return false;
    }
}

function quadraticFormula(a, b, c) {
    var v1 = ((-b+Math.sqrt(b**2-4*a*c))/(a*2));
    var v2 = ((-b-Math.sqrt(b**2-4*a*c))/(a*2));
    if (isNaN(v1) || isNaN(v2)) return false;
    return [v1, v2];
}

function isValidIntersection(p1, q1, p2, q2, exc1, exc2) {
    for (var i = 0; i < blot.length; i++) {
        if (i === exc1 || i === exc2) continue;
        var [x, y, r] = blot[i];
        if (isPointInCircle(p1, q1, x, y, r) && isPointInCircle(p2, q2, x, y, r)) return false;
    }
    return true;
}

function isPointInCircle(p, q, x, y, r) {
    var v = Math.sqrt((p-x)**2+(q-y)**2);
    if (v <= r) return true;
    return false;
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x1-x2)**2+(y1-y2)**2);
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
        if (sized[root_a] >= sized[root_b]) {
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
    sized[big] += sized[small];
    sized[small] = -1;
}

function lineIntersectionCheck(x1, y1, x2, y2, x3, y3, x4, y4) {
    var k1 = ccw(x1, y1, x2, y2, x3, y3)
    var k2 = ccw(x1, y1, x2, y2, x4, y4)
    var k3 = ccw(x3, y3, x4, y4, x1, y1)
    var k4 = ccw(x3, y3, x4, y4, x2, y2)
    // 한 점에서 교차함
    if (k1*k2 === -1 && k3*k4 === -1) {
        return 2
    } else 
    // 한 선분 위에 다른 선분의 끝이 있음
    if (k1*k2*k3*k4 === 0 && (k1*k2 === -1 || k3*k4 === -1)) {
        return 1
    }
    // 두 선분의 끝이 서로 만남
    if (k1*k2 === 0 && k3*k4 === 0 && k1+k2 !== 0) {
        return 1
    } else 
    // 만나지 않음
    if (k1*k2 === 1 || k3*k4 === 1) {
        return 0
    } else 
    // 일직선일 때
    if (k1*k2 === 0 && k3*k4 === 0 && k1+k2+k3+k4 === 0) {
        if (isStraigthLineIntersected(x1, y1, x2, y2, x3, y3) ||
        isStraigthLineIntersected(x1, y1, x2, y2, x4, y4) ||
        isStraigthLineIntersected(x3, y3, x4, y4, x1, y1) ||
        isStraigthLineIntersected(x3, y3, x4, y4, x2, y2)) {
            if (straigtlineNode(x1, y1, x2, y2, x3, y3, x4, y4)) {
                return 1
            } else {
                return 3
            }
        } else {
            return 0
        }
    }
}

function ccw(x1, y1, x2, y2, x3, y3) {
    var d = x1*y2+x2*y3+x3*y1-x2*y1-x3*y2-x1*y3;
    if (d < 0n) return -1;
    if (d === 0n) return 0;
    if (d > 0n) return 1;
}

function straigtlineNode(x1, y1, x2, y2, x3, y3, x4, y4) {
    if (x1 === x3 && y1 === y3 && (x2-x1)*(x4-x1) <= 0 && (y2-y1)*(y4-y1) <= 0) {
        return true
    } else if (x1 === x4 && y1 === y4 && (x2-x1)*(x3-x1) <= 0 && (y2-y1)*(y3-y1) <= 0) {
        return true
    } else if (x2 === x3 && y2 === y3 && (x1-x2)*(x4-x2) <= 0 && (y1-y2)*(y4-y2) <= 0) {
        return true
    } else if (x2 === x4 && y2 === y4 && (x1-x2)*(x3-x2) <= 0 && (y1-y2)*(y3-y2) <= 0) {
        return true
    } else {
        return false
    }
}

function isStraigthLineIntersected(x1, y1, x2, y2, x3, y3) {
    var min_x = x1 < x2 ? x1 : x2;
    var max_x = x1 > x2 ? x1 : x2;
    var min_y = y1 < y2 ? y1 : y2;
    var max_y = y1 > y2 ? y1 : y2;
    if (((min_x <= x3 && x3 <= max_x && min_y <= y3 && y3 <= max_y))) {
        return true;
    } else {
        return false;
    }
}

function dfs(x) {
    visited[x] = true;
    for (var i of graph[x]) {
        var edge = [i, x].sort((a,b) => a-b).join(' ');
        if (!edgeSet.has(edge)) {
            if (!visited[i]) {
                edgeSet.add(edge);
                dfs(i);
            } else {
                edgeSet.add(edge);
                cnt++;
            }
        }
    }
}




// 태그:
// 기하학 조합론 분리집합 선분교차판정 그래프이론 그래프탐색 깊이우선탐색 많은조건분기

// naive 풀이:
// 1. 두 원의 교점을 잇는 선분을 모두 구한다. O(N^2)
// 2. 불필요한 선분은 뺀다. 교점을 잇는 선분이 다른 원에 포함되는 경우. O(N^3)
// 3. 선분끼리 교차 판정을 한 다음, 서로 겹치는 선분은 합쳐서 관리한다.
// 이때 선분 교차 판정은 해당 원이 가지는 다른 선분과 비교하는 것만으로 충분하다. 최대 O(N^3)
// [두 원 A_i, A_j의 교점을 잇는 선분은, 원 A_i와 A_j의 다른 선분과 비교하는 것으로 충분하며, 각 선분당 최대 200번만 비교하면 된다]
// 4. 이제 선분 집합을 하나씩 보면서 사이클의 생성 개수를 센다. O(N^2)
// 사이클의 생성 개수는 다음과 같이 판정한다.
// 사이클을 이루는 선분 집합의 집합을 C라고 하자.
// C의 원소 중 k개와 간선이 연결된다면, 사이클의 생성 개수는 k-1개이다.
// 이때 한 원 내에서만 형성되는 사이클은 제외해야 한다.

//