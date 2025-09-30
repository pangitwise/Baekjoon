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
int hx[8] = {-2, -2, -1, -1, 1, 1, 2, 2};
int hy[8] = {-1, 1, -2, 2, -2, 2, -1, 1};

int bfs(vector<vector<vector<int>>>& a, queue<int>& q, int dep) {
    st K = a.size();
    st H = a[0].size();
    st W = a[0][0].size();

    st qs = q.size();
    if (qs == 0) return -1;

    for (st i = 0; i < qs; i++) {
        int loc = q.front();
        int k, r, c;
        k = floor(loc/(H*W));
        r = floor((loc%(H*W))/W);
        c = loc%W;
        if (r == H-1 && c == W-1) return dep;
        // 일반적인 움직임
        for (int j = 0; j < 4; j++) {
            int nk, nr, nc;
            nk = k; nr = r+dx[j]; nc = c+dy[j];
            if (0 <= nk && nk < K && 0 <= nr && nr < H && 0 <= nc && nc < W) {
                if (a[nk][nr][nc] == 0) {
                    a[nk][nr][nc] = 2;
                    int nloc = nk*H*W + nr*W + nc;
                    q.push(nloc);
                }
            }
        }
        // 말처럼 움직임
        if (k+1 <= K) {
            for (int j = 0; j < 8; j++) {
                int nk, nr, nc;
                nk = k+1; nr = r+hx[j]; nc = c+hy[j];
                if (0 <= nk && nk < K && 0 <= nr && nr < H && 0 <= nc && nc < W) {
                    if (a[nk][nr][nc] == 0) {
                        a[nk][nr][nc] = 2;
                        int nloc = nk*H*W + nr*W + nc;
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

    int K, W, H;
    cin >> K >> W >> H;

    queue<int> q;
    vector<vector<vector<int>>> grid(K+1, vector<vector<int>>(H, vector<int>(W)));

    for (int i = 0; i < H; i++) {
        for (int j = 0; j < W; j++) {
            int val;
            cin >> val;
            for (int k = 0; k < K+1; k++) {
                grid[k][i][j] = val;
            }
        }
    }

    q.push(0);

    int ans = bfs(grid, q, 0);

    cout << ans << endl;

    return 0;
}