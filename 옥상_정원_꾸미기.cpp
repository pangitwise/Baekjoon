#include <iostream>
#include <cmath>
#include <algorithm>
#include <vector>
#include <string>
#include <array>
#include <map>
using namespace std;
using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N;
    cin >> N;

    vector<ll> h(N);

    for (int i = 0; i < N; i++) {
        cin >> h[i];
    }

    vector<ll> stack;
    vector<ll> idx;

    ll ans = 0;

    for (int i = 0; i < N; i++) {
        ll rec = h[i];
        while (stack.size() > 0) {
            ll last = stack.back();
            if (rec >= last) {
                stack.pop_back();
                ll loc = idx.back();
                ans += i-loc-1;
                idx.pop_back();
            } else {
                break;
            }
        }
        stack.push_back(rec);
        idx.push_back(i);
    }

    for (ll c : idx) {
        ans += N-c-1;
    }

    cout << ans << endl;

    return 0;
}