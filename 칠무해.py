import sys
input = sys.stdin.readline

arr = [0]*1000001
N = int(input())
for i in range(N):
    score = int(float(input())*1000)
    arr[score] += 1
    
ans = []
cnt = 0
for i in range(1000001):
    while arr[i] and cnt < 7:
        tmp = str(i)
        l = len(tmp)
        if i >= 1000:
            ans.append(tmp[-l:-3]+'.'+tmp[-3::])
        else:
            ans.append('0.'+'0'*(3-l)+tmp)
        arr[i] -= 1
        cnt += 1
    if cnt == 7: break
print('\n'.join(ans))