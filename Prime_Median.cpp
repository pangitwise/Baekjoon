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

    int N;
    cin >> N;

    vector<int> arr(1000001, 1);
    arr[0] = 0;
    vector<int> prime;

    double root = sqrt(1000001);
    for (int i = 2; i <= root; i++) {
        if (!arr[i]) continue;
        prime.push_back(i);
        for (int j = i*i; j <= 1000000; j += i) {
            arr[j] = 0;
        }
    }

    for (int i = (int)root+1; i <= 1000000; i++) {
        if (arr[i]) prime.push_back(i);
    }

    st ps = prime.size();

    for (int i = 1; i <= 1000000; i++) {
        arr[i] += arr[i-1];
    }

    for (int i = 0; i < N; i++) {
        int a, b;
        cin >> a >> b;
        int p = arr[b] + arr[a-1];
        if (p%2 == 0) {
            cout << -1 << '\n';
        } else {
            cout << prime[p/2-1] << '\n';
        }
    }

    return 0;
}