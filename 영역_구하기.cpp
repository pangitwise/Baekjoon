#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <string>
#include <array>
#include <map>
using namespace std;
using ll = long long;

int dx[4] = { -1, 1, 0, 0 };
int dy[4] = { 0, 0, -1, 1 };


bool isValidCell(vector<vector<int>>& a, int nr, int nc) {
    size_t n = a.size();
    size_t m = a[0].size();
    if (0 <= nr && nr < n && 0 <= nc && nc < m) {
        return true;
    }
    return false;
}

void fillSquare(vector<vector<int>>& a, int lx, int ly, int rx, int ry) {
    rx--; ry--;
    for (int i = ly; i <= ry; i++) {
        for (int j = lx; j <= rx; j++) {
            a[i][j] = 1;
        }
    }
}

int dfs(vector<vector<int>>& a, int r, int c) {
    a[r][c] = 2; // 방문 표시
    int res = 1;
    for (int i = 0; i < 4; i++) {
        int nr = r + dx[i];
        int nc = c + dy[i];
        if (isValidCell(a, nr, nc) && a[nr][nc] == 0) {
            res += dfs(a, nr, nc);
        }
    }
    return res;
}


int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int M, N, K;
    cin >> M >> N >> K;

    vector<vector<int>> grid(M, vector<int>(N));

    for (int i = 0; i < K; i++) {
        int lx, ly, rx, ry;
        cin >> lx >> ly >> rx >> ry;
        fillSquare(grid, lx, ly, rx, ry);
    }

    vector<int> wide;

    for (int i = 0; i < M; i++) {
        for (int j = 0; j < N; j++) {
            if (grid[i][j] == 0) {
                int w = dfs(grid, i, j);
                wide.push_back(w);
            }
        }
    }

    sort(wide.begin(), wide.end());

    cout << wide.size() << endl;

    for (int c : wide) {
        cout << c << " ";
    }

    return 0;
}