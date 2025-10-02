#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
#include <map>
using namespace std;
using ll = long long;
using st = size_t;

int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};

int bfs(vector<vector<int>>& a, vector<vector<int>>& vst, map<int, vector<int>>& mp, queue<int>& q, int dep) {
    st N = a.size();

    st qs = q.size();
    if (qs == 0) return 0;

    queue<int> temp_q;

    int cnt = 0;

    for (st i = 0; i < qs; i++) {
        int loc = q.front();
        int r, c;
        r = floor(loc/N);
        c = loc%N;

        // 불 켜기
        for (int j = 0; j < mp[loc].size(); j++) {
            int light = mp[loc][j];
            int lr = floor(light/N);
            int lc = light%N;
            if (a[lr][lc] == 0) {
                a[lr][lc] = 1;
                temp_q.push(light);
                cnt++;
            }
        }

        // 이동하기
        for (int j = 0; j < 4; j++) {
            int nr, nc;
            nr = r+dx[j]; nc = c+dy[j];
            if (0 <= nr && nr < N && 0 <= nc && nc < N) {
                if (a[nr][nc] == 1 && vst[nr][nc] == 0) {
                    vst[nr][nc] = 1;
                    int nloc = nr*N + nc;
                    q.push(nloc);
                }   
            }
        }

        q.pop();
    }

    // 불이 켜진 곳 중 방문 가능한 곳 탐색
    st qs2 = temp_q.size();
    for (st i = 0; i < qs2; i++) {
        int loc = temp_q.front();
        int r, c;
        r = floor(loc/N);
        c = loc%N;
        // 이미 방문한 곳이면 패스
        if (vst[r][c] == 1) {
            temp_q.pop();
            continue;
        }
        for (int j = 0; j < 4; j++) {
            int nr, nc;
            nr = r+dx[j]; nc = c+dy[j];
            if (0 <= nr && nr < N && 0 <= nc && nc < N) {
                if (a[nr][nc] == 1 && vst[nr][nc] == 1) {
                    vst[r][c] = 1;
                    int nloc = r*N + c;
                    q.push(nloc);
                    break;
                }
            }
        }
        temp_q.pop();
    }

    return cnt+bfs(a, vst, mp, q, dep+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M;
    cin >> N >> M;

    vector<vector<int>> grid(N, vector<int>(N));
    vector<vector<int>> vst(N, vector<int>(N, 0));
    map<int, vector<int>> mp;
    queue<int> q;

    for (int i = 0; i < M; i++) {
        int x, y, a, b;
        cin >> x >> y >> a >> b;
        x--; y--; a--; b--;
        int switch_num = x*N + y;
        int light_num = a*N + b;
        mp[switch_num].push_back(light_num);
    }

    q.push(0);
    vst[0][0] = 1;
    grid[0][0] = 1;

    int ans = 1+bfs(grid, vst, mp, q, 0);

    cout << ans << '\n';

    return 0;
}