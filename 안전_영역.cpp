#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
using ll = long long;

int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};

int dfs(vector<vector<int>>& a, vector<vector<bool>>& vst, int N, int wh, int r, int c) {
    vst[r][c] = true;
    for (int i = 0; i < 4; i++) {
        int nr, nc;
        nr = r+dx[i];
        nc = c+dy[i];
        if (0 <= nr && nr < N && 0 <= nc && nc < N) {
            if (vst[nr][nc] == 0 && a[nr][nc] > wh) {
                dfs(a, vst, N, wh, nr, nc);
            }
        }
    }
    return 1;
}

int floodArea(vector<vector<int>>& a, vector<vector<bool>>& vst, int N, int wh) {
    int res = 0;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if (vst[i][j] == 0 && a[i][j] > wh) {
                res += dfs(a, vst, N, wh, i, j);
            }
        }
    }

    // 초기화
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            vst[i][j] = false;
        }
    }

    return res;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    vector<vector<int>> area(N, vector<int>(N));
    vector<vector<bool>> vst(N, vector<bool>(N));

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cin >> area[i][j];
        }
    }

    int ans = 0;

    for (int i = 0; i <= 100; i++) {
        int tmp = floodArea(area, vst, N, i);
        ans = max(ans, tmp);
    }

    cout << ans << endl;

    return 0;
}