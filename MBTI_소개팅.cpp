#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
#include <string>
using namespace std;
using ll = long long;
using st = size_t;

int backTracking(vector<string>& m, vector<string>& f, int idx, int n, int vst, int score) {
    if (idx == n) {
        return score;
    }

    int MAX = 0;

    for (int i = 0; i < n; i++) {
        if (vst & (1<<i)) continue;
        int ns = 0;
        for (int j = 0; j < 4; j++) {
            if (m[idx][j] != f[i][j]) ns++;
        }
        MAX = max(backTracking(m, f, idx+1, n, vst|(1<<i), score+ns), MAX);
    }

    return MAX;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    vector<string> m_mbti(N);
    vector<string> f_mbti(N);
    for (int i = 0; i < N; i++) {
        cin >> m_mbti[i];
    }
    for (int i = 0; i < N; i++) {
        cin >> f_mbti[i];
    }

    cout << backTracking(m_mbti, f_mbti, 0, N, 0, 0) << endl;

    return 0;
}