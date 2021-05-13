/**
 * sudoku.js
 */
'use strict';
var data = {
		rows: [
			{cols: [
				{ disp: 'a' },
				{ disp: 'a' },
				{ disp: 'a' },
				{ disp: 'b' },
				{ disp: 'b' },
				{ disp: 'b' },
				{ disp: 'c' },
				{ disp: 'c' },
				{ disp: 'c' }
			]},
			{cols: [
				{ disp: 'a' },
				{ disp: 'a' },
				{ disp: 'a' },
				{ disp: 'b' },
				{ disp: 'b' },
				{ disp: 'b' },
				{ disp: 'c' },
				{ disp: 'c' },
				{ disp: 'c' }
			]},
			{cols: [
				{ disp: 'a' },
				{ disp: 'a' },
				{ disp: 'a' },
				{ disp: 'b' },
				{ disp: 'b' },
				{ disp: 'b' },
				{ disp: 'c' },
				{ disp: 'c' },
				{ disp: 'c' }
			]},
			{cols: [
				{ disp: 'd' },
				{ disp: 'd' },
				{ disp: 'd' },
				{ disp: 'e' },
				{ disp: 'e' },
				{ disp: 'e' },
				{ disp: 'f' },
				{ disp: 'f' },
				{ disp: 'f' }
			]},
			{cols: [
				{ disp: 'd' },
				{ disp: 'd' },
				{ disp: 'd' },
				{ disp: 'e' },
				{ disp: 'e' },
				{ disp: 'e' },
				{ disp: 'f' },
				{ disp: 'f' },
				{ disp: 'f' }
			]},
			{cols: [
				{ disp: 'd' },
				{ disp: 'd' },
				{ disp: 'd' },
				{ disp: 'e' },
				{ disp: 'e' },
				{ disp: 'e' },
				{ disp: 'f' },
				{ disp: 'f' },
				{ disp: 'f' }
			]},
			{cols: [
				{ disp: 'g' },
				{ disp: 'g' },
				{ disp: 'g' },
				{ disp: 'h' },
				{ disp: 'h' },
				{ disp: 'h' },
				{ disp: 'i' },
				{ disp: 'i' },
				{ disp: 'i' }
			]},
			{cols: [
				{ disp: 'g' },
				{ disp: 'g' },
				{ disp: 'g' },
				{ disp: 'h' },
				{ disp: 'h' },
				{ disp: 'h' },
				{ disp: 'i' },
				{ disp: 'i' },
				{ disp: 'i' }
			]},
			{cols: [
				{ disp: 'g' },
				{ disp: 'g' },
				{ disp: 'g' },
				{ disp: 'h' },
				{ disp: 'h' },
				{ disp: 'h' },
				{ disp: 'i' },
				{ disp: 'i' },
				{ disp: 'i' }
			]}
		]
	};

// 1: 中央ブロックを生成
for (let n=1; n<=9; n++) {
	while(true) {
		let pt = Math.floor(Math.random()*9); // 0～8のrandom
		let r = Math.floor(pt/3)+3; // 3<=r<=5
		let c = Math.floor(pt%3)+3; // 3<=c<=5
		// console.log("n="+n+" pt="+pt+" r="+r+" c="+c);
		if (data.rows[r].cols[c].disp == "e") {
			// まだnが入っていない場合だけnを入れてwhileを抜ける
			data.rows[r].cols[c].disp = n;
			break;
		}
	}
}

// 2: 右ブロックを生成
// 3: 左ブロックを生成
// 3～5列目の　3行目、4行目、5行目を 6～8列目の　4行目、5行目、3行目にコピーするパターンを0、
// 3～5列目の　3行目、4行目、5行目を 6～8列目の　5行目、3行目、4行目にコピーするパターンを1 とする

if (Math.floor(Math.random()*2) == 0) { // 0か1のrandom
	data.rows[4].cols[6].disp = data.rows[3].cols[3].disp;
	data.rows[4].cols[7].disp = data.rows[3].cols[4].disp;
	data.rows[4].cols[8].disp = data.rows[3].cols[5].disp;

	data.rows[5].cols[6].disp = data.rows[4].cols[3].disp;
	data.rows[5].cols[7].disp = data.rows[4].cols[4].disp;
	data.rows[5].cols[8].disp = data.rows[4].cols[5].disp;

	data.rows[3].cols[6].disp = data.rows[5].cols[3].disp;
	data.rows[3].cols[7].disp = data.rows[5].cols[4].disp;
	data.rows[3].cols[8].disp = data.rows[5].cols[5].disp;

	data.rows[5].cols[0].disp = data.rows[3].cols[3].disp;
	data.rows[5].cols[1].disp = data.rows[3].cols[4].disp;
	data.rows[5].cols[2].disp = data.rows[3].cols[5].disp;

	data.rows[3].cols[0].disp = data.rows[4].cols[3].disp;
	data.rows[3].cols[1].disp = data.rows[4].cols[4].disp;
	data.rows[3].cols[2].disp = data.rows[4].cols[5].disp;

	data.rows[4].cols[0].disp = data.rows[5].cols[3].disp;
	data.rows[4].cols[1].disp = data.rows[5].cols[4].disp;
	data.rows[4].cols[2].disp = data.rows[5].cols[5].disp;

} else {
	data.rows[5].cols[6].disp = data.rows[3].cols[3].disp;
	data.rows[5].cols[7].disp = data.rows[3].cols[4].disp;
	data.rows[5].cols[8].disp = data.rows[3].cols[5].disp;

	data.rows[3].cols[6].disp = data.rows[4].cols[3].disp;
	data.rows[3].cols[7].disp = data.rows[4].cols[4].disp;
	data.rows[3].cols[8].disp = data.rows[4].cols[5].disp;

	data.rows[4].cols[6].disp = data.rows[5].cols[3].disp;
	data.rows[4].cols[7].disp = data.rows[5].cols[4].disp;
	data.rows[4].cols[8].disp = data.rows[5].cols[5].disp;

	data.rows[4].cols[0].disp = data.rows[3].cols[3].disp;
	data.rows[4].cols[1].disp = data.rows[3].cols[4].disp;
	data.rows[4].cols[2].disp = data.rows[3].cols[5].disp;

	data.rows[5].cols[0].disp = data.rows[4].cols[3].disp;
	data.rows[5].cols[1].disp = data.rows[4].cols[4].disp;
	data.rows[5].cols[2].disp = data.rows[4].cols[5].disp;

	data.rows[3].cols[0].disp = data.rows[5].cols[3].disp;
	data.rows[3].cols[1].disp = data.rows[5].cols[4].disp;
	data.rows[3].cols[2].disp = data.rows[5].cols[5].disp;
}

// 4: 上ブロックを生成
// 5: 下ブロックを生成

//3～5行目の　3列目、4列目、5列目を 0～2行目の　4列目、5列目、3列目にコピーするパターンを0、
//3～5行目の　3列目、4列目、5列目を 6～8行目の　5列目、3列目、4列目にコピーするパターンを1 とする

if (Math.floor(Math.random()*2) == 0) {// 0か1のrandom
	data.rows[0].cols[4].disp = data.rows[3].cols[3].disp;
	data.rows[0].cols[5].disp = data.rows[3].cols[4].disp;
	data.rows[0].cols[3].disp = data.rows[3].cols[5].disp;

	data.rows[1].cols[4].disp = data.rows[4].cols[3].disp;
	data.rows[1].cols[5].disp = data.rows[4].cols[4].disp;
	data.rows[1].cols[3].disp = data.rows[4].cols[5].disp;

	data.rows[2].cols[4].disp = data.rows[5].cols[3].disp;
	data.rows[2].cols[5].disp = data.rows[5].cols[4].disp;
	data.rows[2].cols[3].disp = data.rows[5].cols[5].disp;

	data.rows[6].cols[5].disp = data.rows[3].cols[3].disp;
	data.rows[6].cols[3].disp = data.rows[3].cols[4].disp;
	data.rows[6].cols[4].disp = data.rows[3].cols[5].disp;

	data.rows[7].cols[5].disp = data.rows[4].cols[3].disp;
	data.rows[7].cols[3].disp = data.rows[4].cols[4].disp;
	data.rows[7].cols[4].disp = data.rows[4].cols[5].disp;

	data.rows[8].cols[5].disp = data.rows[5].cols[3].disp;
	data.rows[8].cols[3].disp = data.rows[5].cols[4].disp;
	data.rows[8].cols[4].disp = data.rows[5].cols[5].disp;
} else {
	data.rows[0].cols[5].disp = data.rows[3].cols[3].disp;
	data.rows[0].cols[3].disp = data.rows[3].cols[4].disp;
	data.rows[0].cols[4].disp = data.rows[3].cols[5].disp;

	data.rows[1].cols[5].disp = data.rows[4].cols[3].disp;
	data.rows[1].cols[3].disp = data.rows[4].cols[4].disp;
	data.rows[1].cols[4].disp = data.rows[4].cols[5].disp;

	data.rows[2].cols[5].disp = data.rows[5].cols[3].disp;
	data.rows[2].cols[3].disp = data.rows[5].cols[4].disp;
	data.rows[2].cols[4].disp = data.rows[5].cols[5].disp;

	data.rows[6].cols[4].disp = data.rows[3].cols[3].disp;
	data.rows[6].cols[5].disp = data.rows[3].cols[4].disp;
	data.rows[6].cols[3].disp = data.rows[3].cols[5].disp;

	data.rows[7].cols[4].disp = data.rows[4].cols[3].disp;
	data.rows[7].cols[5].disp = data.rows[4].cols[4].disp;
	data.rows[7].cols[3].disp = data.rows[4].cols[5].disp;

	data.rows[8].cols[4].disp = data.rows[5].cols[3].disp;
	data.rows[8].cols[5].disp = data.rows[5].cols[4].disp;
	data.rows[8].cols[3].disp = data.rows[5].cols[5].disp;
}


// 6: 右上ブロックを生成
// 7: 左上ブロックを生成
//3～5列目の　0行目、1行目、2行目を 6～8列目の　1行目、2行目、0行目にコピーするパターンを0、
//3～5列目の　0行目、1行目、2行目を 6～8列目の　2行目、0行目、1行目にコピーするパターンを1 とする

if (Math.floor(Math.random()*2) == 0) { // 0か1のrandom
	data.rows[1].cols[6].disp = data.rows[0].cols[3].disp;
	data.rows[1].cols[7].disp = data.rows[0].cols[4].disp;
	data.rows[1].cols[8].disp = data.rows[0].cols[5].disp;

	data.rows[2].cols[6].disp = data.rows[1].cols[3].disp;
	data.rows[2].cols[7].disp = data.rows[1].cols[4].disp;
	data.rows[2].cols[8].disp = data.rows[1].cols[5].disp;

	data.rows[0].cols[6].disp = data.rows[2].cols[3].disp;
	data.rows[0].cols[7].disp = data.rows[2].cols[4].disp;
	data.rows[0].cols[8].disp = data.rows[2].cols[5].disp;

	data.rows[2].cols[0].disp = data.rows[0].cols[3].disp;
	data.rows[2].cols[1].disp = data.rows[0].cols[4].disp;
	data.rows[2].cols[2].disp = data.rows[0].cols[5].disp;

	data.rows[0].cols[0].disp = data.rows[1].cols[3].disp;
	data.rows[0].cols[1].disp = data.rows[1].cols[4].disp;
	data.rows[0].cols[2].disp = data.rows[1].cols[5].disp;

	data.rows[1].cols[0].disp = data.rows[2].cols[3].disp;
	data.rows[1].cols[1].disp = data.rows[2].cols[4].disp;
	data.rows[1].cols[2].disp = data.rows[2].cols[5].disp;

} else {
	data.rows[2].cols[6].disp = data.rows[0].cols[3].disp;
	data.rows[2].cols[7].disp = data.rows[0].cols[4].disp;
	data.rows[2].cols[8].disp = data.rows[0].cols[5].disp;

	data.rows[0].cols[6].disp = data.rows[1].cols[3].disp;
	data.rows[0].cols[7].disp = data.rows[1].cols[4].disp;
	data.rows[0].cols[8].disp = data.rows[1].cols[5].disp;

	data.rows[1].cols[6].disp = data.rows[2].cols[3].disp;
	data.rows[1].cols[7].disp = data.rows[2].cols[4].disp;
	data.rows[1].cols[8].disp = data.rows[2].cols[5].disp;

	data.rows[1].cols[0].disp = data.rows[0].cols[3].disp;
	data.rows[1].cols[1].disp = data.rows[0].cols[4].disp;
	data.rows[1].cols[2].disp = data.rows[0].cols[5].disp;

	data.rows[2].cols[0].disp = data.rows[1].cols[3].disp;
	data.rows[2].cols[1].disp = data.rows[1].cols[4].disp;
	data.rows[2].cols[2].disp = data.rows[1].cols[5].disp;

	data.rows[0].cols[0].disp = data.rows[2].cols[3].disp;
	data.rows[0].cols[1].disp = data.rows[2].cols[4].disp;
	data.rows[0].cols[2].disp = data.rows[2].cols[5].disp;
}


// 8: 右上ブロックを生成
// 9: 左上ブロックを生成
// 3～5列目の　6行目、7行目、8行目を 6～8列目の　7行目、8行目、6行目にコピーするパターンを0、
// 3～5列目の　6行目、7行目、8行目を 6～8列目の　8行目、6行目、7行目にコピーするパターンを1 とする

if (Math.floor(Math.random()*2) == 0) { // 0か1のrandom
	data.rows[7].cols[6].disp = data.rows[6].cols[3].disp;
	data.rows[7].cols[7].disp = data.rows[6].cols[4].disp;
	data.rows[7].cols[8].disp = data.rows[6].cols[5].disp;

	data.rows[8].cols[6].disp = data.rows[7].cols[3].disp;
	data.rows[8].cols[7].disp = data.rows[7].cols[4].disp;
	data.rows[8].cols[8].disp = data.rows[7].cols[5].disp;

	data.rows[6].cols[6].disp = data.rows[8].cols[3].disp;
	data.rows[6].cols[7].disp = data.rows[8].cols[4].disp;
	data.rows[6].cols[8].disp = data.rows[8].cols[5].disp;

	data.rows[8].cols[0].disp = data.rows[6].cols[3].disp;
	data.rows[8].cols[1].disp = data.rows[6].cols[4].disp;
	data.rows[8].cols[2].disp = data.rows[6].cols[5].disp;

	data.rows[6].cols[0].disp = data.rows[7].cols[3].disp;
	data.rows[6].cols[1].disp = data.rows[7].cols[4].disp;
	data.rows[6].cols[2].disp = data.rows[7].cols[5].disp;

	data.rows[7].cols[0].disp = data.rows[8].cols[3].disp;
	data.rows[7].cols[1].disp = data.rows[8].cols[4].disp;
	data.rows[7].cols[2].disp = data.rows[8].cols[5].disp;

} else {
	data.rows[8].cols[6].disp = data.rows[6].cols[3].disp;
	data.rows[8].cols[7].disp = data.rows[6].cols[4].disp;
	data.rows[8].cols[8].disp = data.rows[6].cols[5].disp;

	data.rows[6].cols[6].disp = data.rows[7].cols[3].disp;
	data.rows[6].cols[7].disp = data.rows[7].cols[4].disp;
	data.rows[6].cols[8].disp = data.rows[7].cols[5].disp;

	data.rows[7].cols[6].disp = data.rows[8].cols[3].disp;
	data.rows[7].cols[7].disp = data.rows[8].cols[4].disp;
	data.rows[7].cols[8].disp = data.rows[8].cols[5].disp;

	data.rows[7].cols[0].disp = data.rows[6].cols[3].disp;
	data.rows[7].cols[1].disp = data.rows[6].cols[4].disp;
	data.rows[7].cols[2].disp = data.rows[6].cols[5].disp;

	data.rows[8].cols[0].disp = data.rows[7].cols[3].disp;
	data.rows[8].cols[1].disp = data.rows[7].cols[4].disp;
	data.rows[8].cols[2].disp = data.rows[7].cols[5].disp;

	data.rows[6].cols[0].disp = data.rows[8].cols[3].disp;
	data.rows[6].cols[1].disp = data.rows[8].cols[4].disp;
	data.rows[6].cols[2].disp = data.rows[8].cols[5].disp;
}

for (let n=0; n<7; n+=3) {
	// シャッフル：0～2行目/3～5行目/6～8行目でx行目とy行目を交換
	var x = Math.floor(Math.random()*3+n); // 1周目：0～2のrandom 2周目：3～5のrandom 3周目：6～8のrandom
	var y = Math.floor(Math.random()*3+n); // 1周目：0～2のrandom 2周目：3～5のrandom 3周目：6～8のrandom

	console.log("x="+x+" y="+y);
	var tempX = [];
	if (x !== y) {
		tempX[0] = data.rows[x].cols[0].disp;
		tempX[1] = data.rows[x].cols[1].disp;
		tempX[2] = data.rows[x].cols[2].disp;
		tempX[3] = data.rows[x].cols[3].disp;
		tempX[4] = data.rows[x].cols[4].disp;
		tempX[5] = data.rows[x].cols[5].disp;
		tempX[6] = data.rows[x].cols[6].disp;
		tempX[7] = data.rows[x].cols[7].disp;
		tempX[8] = data.rows[x].cols[8].disp;

		data.rows[x].cols[0].disp = data.rows[y].cols[0].disp;
		data.rows[x].cols[1].disp = data.rows[y].cols[1].disp;
		data.rows[x].cols[2].disp = data.rows[y].cols[2].disp;
		data.rows[x].cols[3].disp = data.rows[y].cols[3].disp;
		data.rows[x].cols[4].disp = data.rows[y].cols[4].disp;
		data.rows[x].cols[5].disp = data.rows[y].cols[5].disp;
		data.rows[x].cols[6].disp = data.rows[y].cols[6].disp;
		data.rows[x].cols[7].disp = data.rows[y].cols[7].disp;
		data.rows[x].cols[8].disp = data.rows[y].cols[8].disp;

		data.rows[y].cols[0].disp = tempX[0];
		data.rows[y].cols[1].disp = tempX[1];
		data.rows[y].cols[2].disp = tempX[2];
		data.rows[y].cols[3].disp = tempX[3];
		data.rows[y].cols[4].disp = tempX[4];
		data.rows[y].cols[5].disp = tempX[5];
		data.rows[y].cols[6].disp = tempX[6];
		data.rows[y].cols[7].disp = tempX[7];
		data.rows[y].cols[8].disp = tempX[8];
	}

}

for (let n=0; n<7; n+=3) {
	// シャッフル：0～2列目/3～5列目/6～8列目でx列目とy列目を交換
	var x = Math.floor(Math.random()*3+n); // 1周目：0～2のrandom 2周目：3～5のrandom 3周目：6～8のrandom
	var y = Math.floor(Math.random()*3+n); // 1周目：0～2のrandom 2周目：3～5のrandom 3周目：6～8のrandom

	console.log("x="+x+" y="+y);
	var tempX = [];
	if (x !== y) {
		tempX[0] = data.rows[0].cols[x].disp;
		tempX[1] = data.rows[1].cols[x].disp;
		tempX[2] = data.rows[2].cols[x].disp;
		tempX[3] = data.rows[3].cols[x].disp;
		tempX[4] = data.rows[4].cols[x].disp;
		tempX[5] = data.rows[5].cols[x].disp;
		tempX[6] = data.rows[6].cols[x].disp;
		tempX[7] = data.rows[7].cols[x].disp;
		tempX[8] = data.rows[8].cols[x].disp;

		data.rows[0].cols[x].disp = data.rows[0].cols[y].disp;
		data.rows[1].cols[x].disp = data.rows[1].cols[y].disp;
		data.rows[2].cols[x].disp = data.rows[2].cols[y].disp;
		data.rows[3].cols[x].disp = data.rows[3].cols[y].disp;
		data.rows[4].cols[x].disp = data.rows[4].cols[y].disp;
		data.rows[5].cols[x].disp = data.rows[5].cols[y].disp;
		data.rows[6].cols[x].disp = data.rows[6].cols[y].disp;
		data.rows[7].cols[x].disp = data.rows[7].cols[y].disp;
		data.rows[8].cols[x].disp = data.rows[8].cols[y].disp;

		data.rows[0].cols[y].disp = tempX[0];
		data.rows[1].cols[y].disp = tempX[1];
		data.rows[2].cols[y].disp = tempX[2];
		data.rows[3].cols[y].disp = tempX[3];
		data.rows[4].cols[y].disp = tempX[4];
		data.rows[5].cols[y].disp = tempX[5];
		data.rows[6].cols[y].disp = tempX[6];
		data.rows[7].cols[y].disp = tempX[7];
		data.rows[8].cols[y].disp = tempX[8];
	}

}


// 完成診断
var warp  = [0,0,0,0,0,0,0,0,0]; // 縦
var weft = [0,0,0,0,0,0,0,0,0]; // 横
var grup = [0,0,0,0,0,0,0,0,0]; // グループ
for (let r = 0; r < 9; r++) {
	// ブロックのための添え字
	let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
	for (let c = 0; c < 9; c++) {
		warp[r] += parseInt(data.rows[r].cols[c].disp);
		weft[c] += parseInt(data.rows[r].cols[c].disp);

		// ブロックのための添え字
		let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2
		let grup_pt = currGroupRow*3 + currGroupCol;
		grup[grup_pt] += parseInt(data.rows[r].cols[c].disp);
	}
}
// それぞれの数値を全部足すと45になることを確認
if (warp.toString() == [45,45,45,45,45,45,45,45,45].toString() &&
		weft.toString() == [45,45,45,45,45,45,45,45,45].toString() &&
		grup.toString() == [45,45,45,45,45,45,45,45,45].toString() ) {
	console.log("OK!!");
} else {
	console.log("NG!!!");
}

var app = new Vue({
	el: '#tbl',
	data: data
})