var input = require('fs').readFileSync(0).toString().trim().split('\n');
var s = 0;
var [N, Q] = input[s++].split(' ').map(x => +x);
var log = Array.from({length:7}, _ => []);
var monthList = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (var i = 1; i < monthList.length; i++) monthList[i] += monthList[i-1];
for (var i = 0; i < N; i++) {
    var [year, month, day, hour, minute, second, num] = input[s++].trim().split(/[\s-:#]/).map(x => +x);
    var thisSec = getSec(year, month, day, hour, minute, second);
    for (var j = num; j > 0; j--) {
        log[j].push(thisSec);
    }
}
var ans = '';
for (var i = 0; i < Q; i++) {
    var [s_year, s_month, s_day, s_hour, s_minute, s_second, e_year, e_month, e_day, e_hour, e_minute, e_second, num] = input[s++].trim().split(/[\s-:#]/).map(x => +x);
    var startTime = getSec(s_year, s_month, s_day, s_hour, s_minute, s_second);
    var endTime = getSec(e_year, e_month, e_day, e_hour, e_minute, e_second);
    var cnt = binarySearch2(endTime, num)-binarySearch1(startTime, num)+1;
    if (cnt === -Infinity) {
        ans += '0\n';
    } else {
        ans += cnt+'\n';
    }
}
console.log(ans);


function getSec(year, month, day, hour, minute, second) {
    var res = 0;
    // 년
    year -= 2000;
    res += 31536000*year;
    // 윤년 보정
    res += (Math.floor(year/4)+(year%4 > 0 ? 1 : 0))*86400;
    // 달
    month -= 1;
    res += monthList[month]*86400;
    // 윤년 보정
    if (year%4 === 0 && month >= 2) res += 86400;
    // 일
    day -= 1;
    res += day*86400;
    // 시분초
    res += hour*3600+minute*60+second;
    return res;
}

function binarySearch1(sec, num) {
    var start = -1;
    var end = log[num].length-1;
    while (start+1 < end) {
        var mid = Math.floor((start+end)/2);
        var l = log[num][mid];
        var r = log[num][mid+1];
        if (l < sec && sec <= r) {
            return mid+1;
        } else {
            if (l >= sec) end = mid;
            if (sec > r) start = mid;
        }
    }
    if (sec <= log[num][end]) return 0;
    return Infinity;
}

function binarySearch2(sec, num) {
    var start = -1;
    var end = log[num].length-1;
    while (start+1 < end) {
        var mid = Math.floor((start+end)/2);
        var l = log[num][mid];
        var r = log[num][mid+1];
        if (l <= sec && sec < r) {
            return mid;
        } else {
            if (l > sec) end = mid;
            if (sec >= r) start = mid;
        }
    }
    if (log[num][end] <= sec) return end;
    return -Infinity;
}