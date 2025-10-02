#include<iostream>
#include<cmath>
#include<algorithm>
#include<vector>
#include<queue>
using namespace std;
using ll = long long;
using st = size_t;

int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};

int bfs(vector<vector<int>>& a, vector<vector<int>>& vst, queue<int>& q, int dep) {
    st N = a.size();
    st M = a[0].size();

    st qs = q.size();
    if (qs == 0) return 0;

    for (st i = 0; i < qs; i++) {
        int loc = q.front();
        int r, c;
        r = floor(loc/M);
        c = loc%M;
        for (int j = 0; j < 4; j++) {
            int nr, nc;
            nr = r+dx[j]; nc = c+dy[j];
            if (0 <= nr && nr < N && 0 <= nc && nc < M) {
                if (a[nr][nc] == 0 && vst[nr][nc] == 0) {
                    vst[nr][nc] = 1;
                    int nloc = nr*M + nc;
                    q.push(nloc);
                }   
            }
        }
        q.pop();
    }

    return qs+bfs(a, vst, q, dep+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    vector<vector<int>> grid(N, vector<int>(M));
    vector<vector<int>> vst(N, vector<int>(M, 0));
    queue<int> q;

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            char c;
            cin >> c;
            int num = c - '0';
            grid[i][j] = num;
        }
    }

    // 왼쪽변, 오른쪽변
    for (int i = 0; i < N; i++) {
        int nloc_l;
        int nloc_r;
        if (grid[i][0] == 0 && vst[i][0] == 0) {
            vst[i][0] = 1;
            nloc_l = i*M + 0;
            q.push(nloc_l);
            bfs(grid, vst, q, 0);
        }
        if (grid[i][M-1] == 0 && vst[i][M-1] == 0) {
            vst[i][M-1] = 1;
            nloc_r = i*M + (M-1);
            q.push(nloc_r);
            bfs(grid, vst, q, 0);
        }
    }

    // 위쪽변, 아래쪽변
    for (int j = 0; j < M; j++) {
        int nloc_u;
        int nloc_d;
        if (grid[0][j] == 0 && vst[0][j] == 0) {
            vst[0][j] = 1;
            nloc_u = 0*M + j;
            q.push(nloc_u);
            bfs(grid, vst, q, 0);
        }
        if (grid[N-1][j] == 0 && vst[N-1][j] == 0) {
            vst[N-1][j] = 1;
            nloc_d = (N-1)*M + j;
            q.push(nloc_d);
            bfs(grid, vst, q, 0);
        }
    }

    // 0중 방문되지 못한 곳 1 처리
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            if (grid[i][j] == 0 && vst[i][j] == 0) {
                grid[i][j] = 1;
            }
        }
    }

    // 누적합
    for (int i= 0; i < N; i++) {
        for (int j = 0; j < M; j++) {
            if (i-1 >= 0) grid[i][j] += grid[i-1][j];
            if (j-1 >= 0) grid[i][j] += grid[i][j-1];
            if (i-1 >= 0 && j-1 >= 0) grid[i][j] -= grid[i-1][j-1];
        }
    }

    int Q;
    cin >> Q;

    for (int q = 0; q < Q; q++) {
        int r1, c1, r2, c2;
        cin >> r1 >> c1 >> r2 >> c2;
        r1--; c1--; r2--; c2--;
        int ans = grid[r2][c2];
        if (r1-1 >= 0) ans -= grid[r1-1][c2];
        if (c1-1 >= 0) ans -= grid[r2][c1-1];
        if (r1-1 >= 0 && c1-1 >= 0) ans += grid[r1-1][c1-1];
        if (ans == 0) {
            cout << "Yes" << '\n';
        } else {
            cout << "No " << ans << '\n';
        }
    }

    return 0;
}