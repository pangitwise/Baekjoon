import sys
import random
input = sys.stdin.readline

def permutationGame(C, Q, loc1, loc2, sw1, sw2, dist1, dist2, dep):
    print('? '+' '.join(map(str, Q)))
    sys.stdout.flush()
    #nD = interactive(N, Q, P)
    nD = list(map(int, input().split()))
    nC = [0]*N
    for i in nD:
        nC[i] += 1
    if nC[0] == N:
        print('! '+' '.join(map(str, Q)))
        sys.stdout.flush()
        return True
    dec = []
    inc = []
    for i in range(N):
        if C[i] > nC[i]:
            for j in range(C[i]-nC[i]):
                dec.append(i)
        elif C[i] < nC[i]:
            for j in range(nC[i]-C[i]):
                inc.append(i)
    if len(dec) > 2:
        return False
    if len(dec) == 1:
        return getValidDecInc(Q, C, nC, dec, inc, loc1, loc2, sw1, sw2, dist1, dist2, dep)
    if len(dec) == 2:
        return confirmLocation(Q, dec, inc, loc1, loc2, sw1, sw2, dist1, dist2, nC, dep)
    
def getValidDecInc(Q, C, nC, dec, inc, loc1, loc2, sw1, sw2, dist1, dist2, dep):
    for i in range(N):
        if C[i] and C[i] == nC[i]:
            dec.append(i)
            inc.append(i)
            bol = confirmLocation(Q, dec, inc, loc1, loc2, sw1, sw2, dist1, dist2, nC, dep)
            if bol: return True
            dec.pop()
            inc.pop()
    return False

def confirmLocation(Q, dec, inc, loc1, loc2, sw1, sw2, dist1, dist2, nC, dep):
    a, b = dec
    c, d = inc
    if (abs(a-c) == dist1 or a+c == dist1) and (abs(b-d) == dist2 or b+d == dist2):
        nl1 = findLocation(a, c, loc1, sw1, dist1)
        nl2 = findLocation(b, d, loc2, sw2, dist2)
        if nl1 >= 0 and nl2 >= 0:
            bol = changeLocation(Q, sw1, sw2, nl1, nl2, c, d, nC, dep)
            if bol: return True
    if (abs(a-c) == dist2 or a+c == dist2) and (abs(b-d) == dist1 or b+d == dist1):
        nl1 = findLocation(b, d, loc1, sw1, dist1)
        nl2 = findLocation(a, c, loc2, sw2, dist2)            
        if nl1 >= 0 and nl2 >= 0:
            bol = changeLocation(Q, sw1, sw2, nl1, nl2, c, d, nC, dep)
            if bol: return True
    if (abs(a-d) == dist1 or a+d == dist1) and (abs(b-c) == dist2 or b+c == dist2):
        nl1 = findLocation(a, d, loc1, sw1, dist1)
        nl2 = findLocation(b, c, loc2, sw2, dist2)
        if nl1 >= 0 and nl2 >= 0:
            bol = changeLocation(Q, sw1, sw2, nl1, nl2, c, d, nC, dep)
            if bol: return True
    if (abs(a-d) == dist2 or a+d == dist2) and (abs(b-c) == dist1 or b+c == dist1):
        nl1 = findLocation(b, c, loc1, sw1, dist1)
        nl2 = findLocation(a, d, loc2, sw2, dist2)    
        if nl1 >= 0 and nl2 >= 0:
            bol = changeLocation(Q, sw1, sw2, nl1, nl2, c, d, nC, dep)
            if bol: return True
    return False

# ld, rd = 거리
# lv, rv = 위치
def findLocation(ld, rd, lv, rv, dist):
    if (abs(ld-rd) == dist):
        if (lv+ld == rv+rd and 0 <= lv+ld and lv+ld < N and not fixed[lv+ld]):
            return lv+ld
        elif (lv-ld == rv-rd and 0 <= lv-ld and lv-ld < N and not fixed[lv-ld]):
            return lv-ld
    else:
        if lv-ld == rv+rd and 0 <= lv-ld and lv-ld < N and not fixed[lv-ld]:
            return lv-ld
        elif lv+ld == rv-rd and 0 <= lv+ld and lv+ld < N and not fixed[lv+ld]:
            return lv+ld
    return -1
                
def changeLocation(Q, sw1, sw2, nl1, nl2, c, d, nC, dep):
    nQ = [Q[i] for i in range(len(Q))]
    tmp_nC = [nC[i] for i in range(len(nC))]
    fixed[nl1] = True
    fixed[nl2] = True
    if nl1 == sw2 and nl2 == sw1:
        nQ[sw1], nQ[nl1] = nQ[nl1], nQ[sw1]
        next_loc1, next_loc2, next_sw1, next_sw2, next_dist1, next_dist2 = findNoFixed2(nQ, fixed)
    elif nl1 == sw1 and nl2 == sw2:
        next_loc1, next_loc2, next_sw1, next_sw2, next_dist1, next_dist2 = findNoFixed2(nQ, fixed)
    elif nl1 == sw2:
        nQ[sw2], nQ[nl2] = nQ[nl2], nQ[sw2]
        nQ[sw1], nQ[nl1] = nQ[nl1], nQ[sw1]
        next_loc1, next_loc2, next_sw1, next_sw2, next_dist1, next_dist2 = findNoFixed1(nQ, fixed, nl2, sw1)
    elif nl2 == sw1:
        nQ[sw1], nQ[nl1] = nQ[nl1], nQ[sw1]
        nQ[sw2], nQ[nl2] = nQ[nl2], nQ[sw2]
        next_loc1, next_loc2, next_sw1, next_sw2, next_dist1, next_dist2 = findNoFixed1(nQ, fixed, nl1, sw2)
    elif nl1 == sw1:
        nQ[sw2], nQ[nl2] = nQ[nl2], nQ[sw2]
        next_loc1, next_loc2, next_sw1, next_sw2, next_dist1, next_dist2 = findNoFixed1(nQ, fixed, nl2, sw2)
    elif nl2 == sw2:
        nQ[sw1], nQ[nl1] = nQ[nl1], nQ[sw1]
        next_loc1, next_loc2, next_sw1, next_sw2, next_dist1, next_dist2 = findNoFixed1(nQ, fixed, nl1, sw1)
    else:
        nQ[sw1], nQ[nl1] = nQ[nl1], nQ[sw1]
        nQ[sw2], nQ[nl2] = nQ[nl2], nQ[sw2]
        next_loc1, next_loc2 = nl1, nl2
        next_sw1, next_sw2 = sw1, sw2
        next_dist1, next_dist2 = abs(next_loc1-next_sw1), abs(next_loc2-next_sw2)
    tmp_nC[c] -= 1
    tmp_nC[d] -= 1
    tmp_nC[0] += 2
    bol = permutationGame(tmp_nC, nQ, next_loc1, next_loc2, next_sw1, next_sw2, next_dist1, next_dist2, dep+1)
    if not bol:
        fixed[nl1] = False
        fixed[nl2] = False
    return bol

def findNoFixed1(Q, fixed, origin, recent):
    for i in range(N):
        if i == recent: continue
        if not fixed[i]:
           Q[i], Q[recent] = Q[recent], Q[i]
           break
    return [i, origin, recent, i, abs(i-recent), abs(origin-i)]

def findNoFixed2(Q, fixed):
    lastLoc = []
    for i in range(N):
        if not fixed[i]:
            lastLoc.append(i)
            if len(lastLoc) == 2: break
    if len(lastLoc) < 2: return [-1, -1, -1, -1, -1, -1]
    loc1, loc2 = lastLoc
    sw1, sw2 = loc2, loc1
    dist1 = abs(loc1-sw1)
    dist2 = abs(loc2-sw2)
    Q[sw1], Q[sw2] = Q[loc1], Q[loc2]
    return [loc1, loc2, sw1, sw2, dist1, dist2]

        
def interactive(N, Q, P):
    q = [None]*N
    p = [None]*N
    for i in range(N):
        q[Q[i]-1] = i
        p[P[i]-1] = i
    D = [None]*N
    for i in range(N):
        D[i] = abs(q[i]-p[i])
    sorted(D)
    return D
    
N = int(input())
#N = 400
sys.stdout.flush()

#P = [i+1 for i in range(N)]
#random.shuffle(P)
#print(P)

Q = [i+1 for i in range(N)]
random.shuffle(Q)
print('? '+' '.join(map(str, Q)))
sys.stdout.flush()
D = list(map(int, input().split()))
#D = interactive(N, Q, P)
C = [0]*N
for i in D:
    C[i] += 1

fixed = [False]*N

loc1, loc2, sw1, sw2, dist1, dist2 = findNoFixed2(Q, fixed)

permutationGame(C, Q, loc1, loc2, sw1, sw2, dist1, dist2, 0)