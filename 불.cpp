#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
using ll = long long;

int dx[4] = { -1, 1, 0, 0 };
int dy[4] = { 0, 0, -1, 1 };


bool isValidCell(vector<vector<char>>& a, int nr, int nc) {
    size_t n = a.size();
    size_t m = a[0].size();
    if (0 <= nr && nr < n && 0 <= nc && nc < m) {
        return true;
    }
    return false;
}

int bfs(vector<vector<char>>& a, queue<int>& qj, queue<int>& qf, int dep) {
    size_t sf = qf.size();
    size_t sj = qj.size();
    size_t R = a.size();
    size_t C = a[0].size();

    sj = qj.size();
    if (sj == 0) return 0;

    for (size_t i = 0; i < sf; i++) {
        int loc = qf.front();
        int r, c;
        r = floor(loc / C);
        c = loc % C;

        for (int j = 0; j < 4; j++) {
            int nr = r + dx[j];
            int nc = c + dy[j];
            if (isValidCell(a, nr, nc)) {
                char ncell = a[nr][nc];
                if (ncell == 'J' || ncell == '.') {
                    a[nr][nc] = 'F';
                    int nloc = nr * C + nc;
                    qf.push(nloc);
                }
            }
        }
        qf.pop();
    }

    for (size_t i = 0; i < sj; i++) {
        int loc = qj.front();
        int r, c;
        r = floor(loc / C);
        c = loc % C;

        if (r == 0 || r == R - 1 || c == 0 || c == C - 1) {
            return dep + 1;
        }

        for (int j = 0; j < 4; j++) {
            int nr = r + dx[j];
            int nc = c + dy[j];
            if (isValidCell(a, nr, nc)) {
                char ncell = a[nr][nc];
                if (ncell == '.') {
                    a[nr][nc] = 'J';
                    int nloc = nr * C + nc;
                    qj.push(nloc);
                }
            }
        }
        qj.pop();
    }

    return bfs(a, qj, qf, dep + 1);
}


int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int R, C;
    cin >> R >> C;

    vector<vector<char>> maze(R, vector<char>(C));

    queue<int> qj;
    queue<int> qf;

    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++) {
            char chr;
            cin >> chr;
            int loc = i * C + j;
            if (chr == 'J') qj.push(loc);
            if (chr == 'F') qf.push(loc);
            maze[i][j] = chr;
        }
    }

    int ans = bfs(maze, qj, qf, 0);

    if (ans) {
        cout << ans << endl;
    }
    else {
        cout << "IMPOSSIBLE" << endl;
    }

    return 0;
}
