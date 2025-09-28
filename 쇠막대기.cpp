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

    string str;
    vector<char> stack;

    cin >> str;

    size_t ans = 0;
    size_t cnt = 0;

    for (char c : str) {
        stack.push_back(c);
        vector<char>::iterator iter;
        iter = --stack.end();

        char v1 = *iter;

        if (v1 == 41) {
            if (stack.size() > 1 && *--iter == 40) {
                stack.pop_back();
                stack.pop_back();
                cnt += stack.size();
                ans += cnt;
                ans -= 1; // 레이저로 추가된 괄호 빼기
            }
            else {
                cnt--;
            }
            stack.clear();
        }
        else {
            ans++;
        }
    }

    cout << ans << endl;

    return 0;
}