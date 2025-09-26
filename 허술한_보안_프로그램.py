import sys
input = sys.stdin.readline

key = [' ', 0, 2, 3, 1]


def interactive(p):
    tmp = [0]*N
    for i in range(1, N+1):
        tmp[i-1] = key[i]|p[i]
    return ' '.join(map(str, tmp))

N = int(input())

arr = [0]*(N+1);
arr[0] = '?'
for i in range(1, N+1):
    arr[i] = i-1

h1 = list(map(int, interactive(arr).split()))
for i in range(0, N):
    h1[i] ^= arr[i+1]
#print(' '.join(map(str, arr)))
sys.stdout.flush()

rev = [0]*(N+1)
rev[0] = '?'
numSet = set()
for i in range(N, 0, -1):
    s = i-1
    power = 0
    nxt = 0
    while ((1<<power) < N):
        if s&(1<<power) == 0:
           nxt += 1<<power
        power += 1
    while nxt not in numSet:
        nxt >>= 1
    rev[s] = nxt
    numSet.add(nxt)

h2 = list(map(int, interactive(rev).split()))
for i in range(0, N):
    h2[i] ^= rev[i+1]

p = [h1[i]|h2[i] for i in range(N)]


print('! '+' '.join(map(str, p)))
sys.stdout.flush()

#
# 0 1 2 3 4 5
#

#000
#001

#001
#000

#010
#101

#011
#100

#100
#011

#101
#010