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

    int M[11];
    for (int i = 0; i < 11; i++) {
        cin >> M[i];
    }
    
    int N;
    cin >> N;

    int ans = 0;
    for (int i = 0; i < N; i++) {
        int B, S;
        double L;
        cin >> B >> L >> S;

        if (L >= 2.0 && S >= 17) {
            ans += M[B];
        }
    }

    cout << ans << endl;

    return 0;
}