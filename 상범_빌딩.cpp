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

int bfs(vector<vector<vector<char>>>& a, queue<int>& q, int dep) {
    st L = a.size();
    st R = a[0].size();
    st C = a[0][0].size();

    st wd = R*C;

    st qs = q.size();
    if (qs == 0) return 0;

    for (int i = 0; i < qs; i++) {
        st loc = q.front();
        st l, r, c;
        l = floor(loc/wd);
        r = floor((loc-l*wd)/C);
        c = loc%C;
        for (int j = 0; j < 6; j++) {
            st nl, nr, nc;
            nl = l+dx[j]; nr = r+dy[j]; nc = c+dz[j];
            if (0 <= nl && nl < L && 0 <= nr && nr < R && 0 <= nc && nc < C) {
                char ncell = a[nl][nr][nc];
                if (ncell == 'E') return dep+1;
                if (ncell == '.') {
                    a[nl][nr][nc] = '!';
                    int nloc = nl*wd+nr*C+nc;
                    q.push(nloc);
                }
            }
        }
        q.pop();
    }

    return bfs(a, q, dep+1);
}

bool escape() {
    int L, R, C;
    cin >> L >> R >> C;
    if (L == 0) return false;

    vector<vector<vector<char>>> bd(L, vector<vector<char>>(R, vector<char>(C)));

    int wd = R*C;
    queue<int> q;

    for (int i = 0; i < L; i++) {
        for (int j = 0; j < R; j++) {
            for (int k = 0; k < C; k++) {
                char info;
                cin >> info;
                bd[i][j][k] = info;
                if (info == 'S') {
                    int loc = i*wd+j*C+k;
                    q.push(loc);
                }
            }
        }
    }

    int ans = bfs(bd, q, 0);

    if (ans) {
        cout << "Escaped in " << ans << " minute(s)." << endl;
    } else {
        cout << "Trapped!" << endl;
    }

    return true;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    while (escape());

    return 0;
}