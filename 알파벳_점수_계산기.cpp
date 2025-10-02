#include<iostream>
#include<cmath>
#include<algorithm>
#include<vector>
#include<queue>
using namespace std;
using ll = long long;
using st = size_t;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int ans = 0;

    string s;
    cin >> s;

    char last = 'z';
    int rec = 0;

    for (char c : s) {
        if (c-last > 0) {
            rec++;
        } else {
            rec = 1;            
        }
        last = c;
        ans += rec;
    }

    cout << ans << endl;

    return 0;
}