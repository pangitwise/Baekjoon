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

    int ans = 0;

    for (int i = 0; i < N; i++) {
        string str;
        cin >> str;

        vector<char> stack;

        for (char j : str) {
            stack.push_back(j);
            while (stack.size() > 1) {
                vector<char>::iterator iter;
                iter = --stack.end();
                char l1 = *iter--;
                char l2 = *iter;

                if (l1 == l2) {
                    stack.pop_back();
                    stack.pop_back();
                } else {
                    break;
                }
            }
        }

        ans += stack.size() ? 0 : 1;
    }

    cout << ans << endl;

    return 0;
}