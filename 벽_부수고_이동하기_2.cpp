#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
using ll = long long;
using st = size_t;

int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};

int bfs(vector<vector<vector<int>>>& a, queue<int>& q, int dep) {
    st K = a.size();
    st N = a[0].size();
    st M = a[0][0].size();

    st qs = q.size();
    if (qs == 0) return -1;

    for (st i = 0; i < qs; i++) {
        int loc = q.front();
        int k, r, c;
        k = floor(loc/(N*M));
        r = floor((loc%(N*M))/M);
        c = loc%M;
        if (r == N-1 && c == M-1) return dep+1;
        // 일반적인 움직임
        for (int j = 0; j < 4; j++) {
            int nk, nr, nc;
            nk = k; nr = r+dx[j]; nc = c+dy[j];
            if (0 <= nk && nk < K && 0 <= nr && nr < N && 0 <= nc && nc < M) {
                if (a[nk][nr][nc] == 0) {
                    a[nk][nr][nc] = 2;
                    int nloc = nk*N*M + nr*M + nc;
                    q.push(nloc);
                }
                if (k+1 < K) { // 벽 부수고 이동
                    if (a[k+1][nr][nc] == 1) {
                        a[k+1][nr][nc] = 2;
                        int nloc = (k+1)*N*M + nr*M + nc;
                        q.push(nloc);
                    }
                }   
            }
        }
        q.pop();
    }

    return bfs(a, q, dep+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M, K;
    cin >> N >> M >> K;

    queue<int> q;
    vector<vector<vector<int>>> grid(K+1, vector<vector<int>>(N, vector<int>(M)));

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            char val;
            cin >> val;
            int conv = val - '0';
            for (int k = 0; k < K+1; k++) {
                grid[k][i][j] = conv;
            }
        }
    }

    q.push(0);

    int ans = bfs(grid, q, 0);

    cout << ans << endl;

    return 0;
}