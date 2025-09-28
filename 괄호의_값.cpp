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
    size_t rec = 1;
    
    bool chk = false;

    for (char c : str) {
        stack.push_back(c);
        vector<char>::iterator iter;
        iter = --stack.end();

        char v1 = *iter;

        if (v1 == 40) { 
            rec *= 2; chk = true; 
        }
        if (v1 == 91) {
            rec *= 3; chk = true;
        }

        if (v1 == 41 || v1 == 93) {
            if (stack.size() > 1) {
                char v2 = *--iter;
                if ((v1 == 41 && v2 == 40) || (v1 == 93 && v2 == 91)) {
                    if (chk) {
                        ans += rec;
                        chk = false;
                    }
                    stack.pop_back();
                    stack.pop_back();
                    v1 == 41 ? rec /= 2 : rec /= 3;
                }
            }
        }
    }

    if (stack.size() != 0) ans = 0;

    cout << ans << endl;

    return 0;
}