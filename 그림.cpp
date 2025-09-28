#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <string>
#include <array>
#include <map>
using namespace std;
using ll = long long;

int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};


bool isValidCell(vector<vector<int>>& a, int nr, int nc) {
    size_t n = a.size();
    size_t m = a[0].size();
    if (0 <= nr && nr < n && 0 <= nc && nc < m) {
        return true;
    }
    return false;
}

int dfs(vector<vector<int>>& a, int r, int c) {
    a[r][c] = 2; // 방문 표시
    int res = 1;
    for (int i = 0; i < 4; i++) {
        int nr = r+dx[i];
        int nc = c+dy[i];
        if (isValidCell(a, nr, nc) && a[nr][nc] == 1) {
            res += dfs(a, nr, nc);
        }
    }
    return res;
}


int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m;
    cin >> n >> m;

    vector<vector<int>> paper(n, vector<int>(m));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> paper[i][j];
        }
    }

    int cnt = 0;
    int maxA = 0;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            int cell = paper[i][j];
            if (cell == 1) {
                cnt++;
                maxA = max(maxA, dfs(paper, i, j));
            }
        }
    }

    cout << cnt << endl << maxA << endl;

    return 0;
}