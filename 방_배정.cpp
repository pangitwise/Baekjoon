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

    array<array<double, 7>, 2> stud = {};
    
    int N;
    double K;
    cin >> N >> K;

    for (int i = 0; i < N; i++) {
        int S, Y;
        cin >> S >> Y;
        stud[S][Y]++;
    }

    int ans = 0;

    for (int i = 0; i < 2; i++) {
        for (int j = 1; j <= 6; j++) {
            double q = ceil(stud[i][j] / K);
            ans += static_cast<int>(q);
        }
    }

    cout << ans << endl;

    return 0;
}