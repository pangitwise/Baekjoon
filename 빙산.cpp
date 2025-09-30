#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
using ll = long long;
using st = size_t;

int dx[6] = {-1, 1, 0, 0, 0, 0};
int dy[6] = {0, 0, -1, 1, 0, 0};
int dz[6] = {0, 0, 0, 0, -1, 1};

int dfs(vector<vector<int>>& a, vector<vector<bool>>& vst, int r, int c) {
    vst[r][c] = true;
    int res = 1;
    for (int i = 0; i < 4; i++) {
        int nr, nc;
        nr = r+dx[i]; nc = c+dy[i];
        if (0 <= nr && nr < a.size() && 0 <= nc && nc < a[0].size()) {
            if (a[nr][nc] > 0 && !vst[nr][nc]) {
                res += dfs(a, vst, nr, nc);
            }
        }
    }
    return res;
}

bool isDivided(vector<vector<int>>& a, vector<vector<bool>>& vst, queue<int>& q) {
    st N = a.size();
    st M = a[0].size();

    st qs = q.size();

    int floc = q.front();
    st fr, fc;
    fr = floor(floc/M);
    fc = floc%M;

    int cnt = dfs(a, vst, fr, fc);

    // 초기화
    for (st i = 0; i < N; i++) {
        for (st j = 0; j < M; j++) {
            vst[i][j] = false;
        }
    }

    return cnt == qs;
}

int bfs(vector<vector<int>>& a, vector<vector<int>>& dec, vector<vector<bool>>& vst, queue<int>& q, int dep) {
    st N = a.size();
    st M = a[0].size();

    st qs = q.size();
    if (qs == 0) return 0;
    if (!isDivided(a, vst, q)) return dep;

    queue<int> tmpq;

    // 빙산 녹이기
    for (st i = 0; i < qs; i++) {
        st loc = q.front();
        st r, c;
        r = floor(loc/M);
        c = loc%M;
        for (st j = 0; j < 4; j++) {
            st nr, nc;
            nr = r+dx[j]; nc = c+dy[j];
            if (0 <= nr && nr < N && 0 <= nc && nc < M) {
                if (a[nr][nc] == 0) {
                    dec[r][c]--;
                }
            }
        }
        a[r][c] = max(0, a[r][c]);
        q.pop();
        tmpq.push(loc);
    }

    for (st i = 0; i < qs; i++) {
        st loc = tmpq.front();
        st r, c;
        r = floor(loc/M);
        c = loc%M;
        a[r][c] += dec[r][c];
        dec[r][c] = 0;
        a[r][c] = max(0, a[r][c]);
        if (a[r][c] > 0) {
            q.push(loc);
        }
        tmpq.pop();
    }

    return bfs(a, dec, vst, q, dep+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    queue<int> q;
    vector<vector<int>> grid(N, vector<int>(M));
    vector<vector<int>> dec(N, vector<int>(M, 0));
    vector<vector<bool>> vst(N, vector<bool>(M, false));

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            int ice;
            cin >> ice;
            grid[i][j] = ice;
            if (ice > 0) {
                int loc = i*M+j;
                q.push(loc);
            }
        }
    }

    int res = bfs(grid, dec, vst, q, 0);

    cout << res << endl;

    return 0;
}