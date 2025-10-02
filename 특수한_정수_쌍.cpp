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

    int T;
    cin >> T;

    int arr[10002] = {false,};

    double root = sqrt(10002);
    for (int i = 2; i <= root; i++) {
        if (arr[i]) continue;
        for (int j = i*i; j <= 10002; j += i) {
            arr[j] = true;
        }
    }

    for (int t = 0; t < T; t++) {
        int N;
        cin >> N;

        if (!arr[N+1]) {
            cout << 1 << endl << 1 << " " << N+1 << endl;
        } else {
            cout << 0 << endl;
        }
            
    }

    return 0;
}