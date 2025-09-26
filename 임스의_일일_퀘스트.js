var L = +require('fs').readFileSync(0).toString().trim();
var arcaneRiver = Array(6).fill(0);
var grandis = Array(7).fill(0);
var cell1 = [
[200, 210, 220],
[210, 220, 225],
[220, 225, 230],
[225, 230, 235],
[230, 235, 245],
[235, 245, 250]
];
for (var i = 0; i < 6; i++) {
    if (L >= cell1[i][0]) arcaneRiver[i] = 500;
    if (L >= cell1[i][1]) arcaneRiver[i] = 300;
    if (L >= cell1[i][2]) arcaneRiver[i] = 100;
}
for (var i = 0; i < 7; i++) {
    if (L >= 260+i*5) grandis[i] = 500;
    if (L >= 265+i*5) grandis[i] = 300;
    if (L >= 270+i*5) grandis[i] = 100;
}
var ans = `${arcaneRiver.join(' ')}\n${grandis.join(' ')}`;
console.log(ans);