#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
#include <utility>
using namespace std;
using ll = long long;
using st = size_t;

int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};

void dfs(vector<vector<int>>& a, vector<vector<int>>& vst, queue<pair<int, int>>& q, int r, int c, int num) {
    int N = a.size();
    a[r][c] = num;
    vst[r][c] = -1;
    
    int loc = r*N + c;
    pair <int, int> arr = {num, loc};
    q.push(arr);

    for (int i = 0; i < 4; i++) {
        int nx = r + dx[i];
        int ny = c + dy[i];

        if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
        if (a[nx][ny] != 1 || vst[nx][ny] == -1) continue;

        dfs(a, vst, q, nx, ny, num);
    }
}

int bfs(vector<vector<int>>& a, vector<vector<int>>& vst, queue<pair<int, int>>& q, int dep) {
    st N = a.size();

    st qsize = q.size();

    int res = 10000000;

    for (st i = 0; i < qsize; i++) {
        auto [num, loc] = q.front();
        q.pop();
        int r = loc / N;
        int c = loc % N;

        for (int j = 0; j < 4; j++) {
            int nx = r + dx[j];
            int ny = c + dy[j];
            if (0 <= nx && nx < N && 0 <= ny && ny < N) {
                if (a[nx][ny] == 0 && vst[nx][ny] == 0) {
                    vst[nx][ny] = -num; // 임시 표시
                    int nloc = nx*N + ny;
                    q.push({num, nloc});
                } else if (a[nx][ny] == 0 && vst[nx][ny] != 0 && vst[nx][ny] != num && vst[nx][ny] != -num) {
                    if (vst[nx][ny] < 0) {
                        res = min(res, dep*2+1);
                    } else {
                        res = min(res, dep*2);
                    }
                }
            }
        }
    }
    if (res != 10000000) return res;

    qsize = q.size();

    for (st i = 0; i < qsize; i++) {
        auto [num, loc] = q.front();
        q.pop();
        int r = loc / N;
        int c = loc % N;
        vst[r][c] *= -1;
        q.push({num, loc});
    }

    return bfs(a, vst, q, dep+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    queue<pair<int, int>> q;
    vector<vector<int>> grid(N, vector<int>(N));
    vector<vector<int>> vst(N, vector<int>(N));

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cin >> grid[i][j];
        }
    }

    int cnt = 1;
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if (grid[i][j] == 1 && vst[i][j] == 0) {
                dfs(grid, vst, q, i, j, cnt);
                cnt++;
            }
        }
    }

    int ans = bfs(grid, vst, q, 0);

    cout << ans << endl;

    return 0;
}