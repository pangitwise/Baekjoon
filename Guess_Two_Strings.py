import sys
import random
input = sys.stdin.readline

def interactive(s, t):
    p = random.randint(0, 1)
    if p: tmp = s
    else: tmp = t
    arr = [False]*100
    cnt = 0
    while cnt < 15:
        q = random.randint(0, 99)
        if not arr[q]:
            arr[q] = True
            cnt += 1
    r = ''
    for i in range(100):
        if not arr[i]:
            r += tmp[i]
        else:
            if tmp[i] == '0':
                r += '1'
            else:
                r += '0'
    return [r, p]
    
def guessString(string, arr):
    res = ''
    for i in range(100):
        zero = 0
        one = 0
        for j in range(len(arr)):
            if string[arr[j]][i] == '0':
               zero += 1
            else:
                one += 1
        if zero > one:
            res += '0'
        else:
            res += '1'
    return res

def matchPair(this, other, visited, string):
    for a in this:
        for i in range(Q):
            if visited[i]: continue
            cnt = 0
            for j in range(N):
                if string[a][j] != string[i][j]:
                    cnt += 1
            if cnt > K*2:
                other.append(i)
                visited[i] = True

def getSTArray(base, string):
    visited = [False]*100
    visited[base] = True
    sa = [base]
    ta = []
    matchPair(sa, ta, visited, string)
    matchPair(ta, sa, visited, string)
    matchPair(sa, ta, visited, string)
    matchPair(ta, sa, visited, string)
    return [sa, ta]
        

def compare(a, b):
    for i in range(len(a)):
        if a[i] != b[i]:
            print(i)
            return False
    return True

#s = '1111010110111000101011110111111110111010101101011101101010000111000000000110001000010111101010111011'
#t = '0000010110111000101011110111111110111010101101011101101010000111000000000110001000010111101010111011'


N, K, Q = map(int, input().split())
#N, K, Q = 100, 15, 100

arr = []
#real = []
for i in range(Q):
    print('?')
    sys.stdout.flush()
    r = input()
    #[r, p] = interactive(s, t)
    arr.append(r)
    #real.append(p)


# 두 문자열을 비교했을 때, 오류가 2K를 초과한다면 서로 다른 문자열에서 유래
sa, ta = [], []
for i in range(Q):
    [tmpS, tmpT] = getSTArray(i, arr)
    if len(tmpS) > len(sa) and len(tmpT) > len(ta):
        sa, ta = tmpS, tmpT
    if len(tmpS) > len(ta) and len(tmpT) > len(sa):
        sa, ta = tmpS, tmpT

if len(sa) == 0 and len(ta) == 0:
    sa = [i for i in range(Q)]
    ta = [i for i in range(Q)]

#error1 = []
#error2 = []
#for i in range(len(sa)):
#    if real[sa[i]] != real[0]:
#        error1.append(sa[i])
#for i in range(len(ta)):
#    if real[ta[i]] != real[ta[0]]:
#        error2.append(ta[i])

#print(error1)
#print(error2)


ans1 = guessString(arr, sa)
ans2 = guessString(arr, ta)

#if real[0] == 1:
#    print(compare(ans1, s))
#    print(compare(ans2, t))
#else:
#    print(compare(ans1, t))
#    print(compare(ans2, s))

for i in range(N):
    if ans1[i] != ans2[i]:
        if ans2[i] == '0':
            ans1, ans2 = ans2, ans1
        break

print('! '+ans1+' '+ans2)
sys.stdout.flush()