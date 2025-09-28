#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <queue>
using namespace std;
using ll = long long;

int bfs(vector<int>& bd, queue<int>& q, int F, int G, int U, int D, int dep) {
    size_t len = q.size();

    if (len == 0) return -1;

    for (size_t i = 0; i < len; i++) {
        int loc = q.front();
        if (loc == G) return dep;
        int nxt_u, nxt_d;
        nxt_u = loc+U;
        nxt_d = loc-D;
        if (nxt_u <= F && bd[nxt_u] == 0) {
            bd[nxt_u] = dep+1;
            q.push(nxt_u);
        }
        if (nxt_d > 0 && bd[nxt_d] == 0) {
            bd[nxt_d] = dep+1;
            q.push(nxt_d);
        }

        q.pop();
    }

    return bfs(bd, q, F, G, U, D, dep+1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int F, S, G, U, D;
    cin >> F >> S >> G >> U >> D;

    vector<int> bd(F+1);

    queue<int> Q;
    Q.push(S);

    int ans = bfs(bd, Q, F, G, U, D, 0);

    if (ans >= 0) {
        cout << ans << endl;
    } else {
        cout << "use the stairs" << endl;
    }

    return 0;
}