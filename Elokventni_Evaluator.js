var input = require('fs').readFileSync(0).toString().trim();
var limit = 10**9;
var operList = ['+', '-', '*', '/', '='];
var numList = Array.from({length:10}, (v, k) => String(k));
var totalList = operList.concat(numList);
var ans = checkExpression(input, true);
console.log(ans);


function isValidNumber(num) {
    // 모두 숫자로 구성되어 있는지 확인
    for (var i = 0; i < num.length; i++) {
        if (!numList.includes(num[i])) return false;
    }
    // 빈 문자열이거나 선행하는 0이 있으면 거짓
    if (num.length === 0 || num[0] === '0') return false;
    // 10**9 초과 시 거짓
    if (BigInt(num) > limit) return false;
    return true;
}

function isRightExpression(num1, oper, num2, res) {
    switch (oper) {
        case '+':
            var tmp = num1+num2;
            break;
        case '-':
            var tmp = num1-num2;
            break;
        case '*':
            var tmp = num1*num2;
            break;
        case '/':
            if (num2 === 0n) return false;
            var tmp = num1/num2;
            var mod = num1%num2;
    }
    if (oper !== '/') {
        if (tmp === res) return true;
    } else {
        // 표현식에 나타나는 수는 정수이므로, 나눗셈의 경우 mod값 === 0 조건도 만족해야 함
        if (tmp === res && !mod) return true;
    }
    return false;
}

function changeLetter(tmp_S, idx1, idx2) {
    for (var i = 0; i < totalList.length; i++) {
        for (var j = 0; j < totalList.length; j++) {
            tmp_S[idx1] = totalList[i];
            tmp_S[idx2] = totalList[j];
            var tmp_exp = tmp_S.join('');
            var thisRes = checkExpression(tmp_exp, false);
            if (thisRes === 'Tocno') {
                return tmp_exp;
            }
        }
    }
    return false;
}

function checkExpression(input, isInitial) {
    // = 기준으로 나누기
    var S = input.split(/\=/);
    // S의 길이가 2이고, 우변이 수여야 함
    if (S.length === 2 && isValidNumber(S[1])) {
        S[1] = BigInt(S[1]);
        if (typeof(S[1]) === 'bigint' && S[1] !== 0n) {
            // 조건을 만족할 시 좌변을 연산자 기준으로 나눔
            var res = S[1];
            var leftSide = S[0];
            S[0] = S[0].split(/[\+\-\*\/]/);
            // 좌변의 길이가 2이고, 양쪽이 모두 수여야 함
            if (S[0].length === 2 && isValidNumber(S[0][0]) && isValidNumber(S[0][1])) {
                S[0][0] = BigInt(S[0][0]);
                S[0][1] = BigInt(S[0][1]);
                if (typeof(S[0][0]) === 'bigint' && typeof(S[0][1]) === 'bigint') {
                    // 연산자 파악하기
                    var firstNumLen = String(S[0][0]).length;
                    var oper = leftSide[firstNumLen];
                    var num1 = S[0][0];
                    var num2 = S[0][1];
                    // 올바른 표현식인지 확인
                    if (isRightExpression(num1, oper, num2, res)) {
                        return 'Tocno';
                    } else {
                        // 최초의 Input에 대해서만 수정 가능성 확인
                        if (isInitial) {
                            var izraz1 = input;
                            var izraz2 = isModdable(input);
                            if (izraz2) {
                                return `Netocno, umjesto ${izraz1} mogli ste ispisati ${izraz2}`;
                            } else {
                                return 'Potpuno netocno';
                            }
                        } else {
                            return 'Potpuno netocno';
                        }
                    }
                }
            }
        }
    }
    return 'Izraz nije ispravno formatiran';


    function isModdable(input) {
        var tmp_S = input.split('');
        for (var i = 0; i < input.length; i++) {
            letter1 = tmp_S[i];
            for (var j = i+1; j < input.length; j++) {
                letter2 = tmp_S[j];
                var thisRes = changeLetter(tmp_S, i, j)
                if (thisRes) {
                    return thisRes;
                }
                tmp_S[i] = letter1;
                tmp_S[j] = letter2;
            }
        }
        return false;
    }
}