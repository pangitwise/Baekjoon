// 3 2 4 1 5
// 4 3 5 2 6 1
// 4 3 5 2 6 1 7
#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
using ll = long long;
using st = size_t;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    double srt = (double)(N+1)/2;
    int i = srt;
    int j = 1;
    if (N%2 == 1) {
        for (; j <= N; j%2 == 1 ? i = i-j : i = i+j, j++) {
            cout << i << " ";
        }
    } else {
        for (; j <= N; j%2 == 1 ? i = i+j : i = i-j, j++) {
            cout << i << " ";
        }
    }
    return 0;
}