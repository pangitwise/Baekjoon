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

int bfs(vector<vector<int>>& a, queue<int>& q, int dep, int lim) {
    if (dep == lim) return 0;

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
                if (a[nr][nc] == 0) {
                    a[nr][nc] = a[r][c];
                    int nloc = nr*M + nc;
                    q.push(nloc);
                }   
            }
        }
        q.pop();
    }

    return qs+bfs(a, q, dep+1, lim);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M, P;
    cin >> N >> M >> P;

    vector<int> S(P+1);

    for (int i = 1; i <= P; i++) {
        cin >> S[i];
    }

    vector<vector<int>> board(N, vector<int>(M));
    vector<queue<int>> castle(P+1);
    vector<int> cnt(P+1);

    // 입력 및 초기화
    for (int i = 0; i < N; i++) {
        string s; cin >> s;
        for (int j = 0; j < M; j++) {
            if (s[j] == '.') board[i][j] = 0;
            else if (s[j] == '#') board[i][j] = -1;
            else {
                int p = s[j]-'0';
                board[i][j] = p;
                castle[p].push(i*M+j);
            }
        }
    }

    // 게임 진행 - 지역 할당
    while (true) {
        int total = 0;
        for (int i = 1; i <= P; i++) {
            int res = bfs(board, castle[i], 0, S[i]);
            cnt[i] += res;
            total += res;
        }
        if (total == 0) break;
    }

    for (int i = 1; i <= P; i++) {
        cout << cnt[i] << ' ';
    }
    cout << endl;

    return 0;
}