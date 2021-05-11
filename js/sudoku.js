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

/** 端から順に数字をあてはめる **/
for (let r = 0; r < 9; r++) {
	for (let c = 0; c < 9; c++) {

		// チェック対象配列を作成
		var chkArray = [];
		// 縦
		data.rows.forEach((item, index)=> {
			if (index !== r) {
				chkArray.push(item.cols[c].disp);
			}
		});
		// 横
		data.rows[r].cols.forEach((item, index)=> {
			if (index !== c) {
				chkArray.push(item.disp);
			}
		});
		// ブロック
		let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
		let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2

		for (let gr = currGroupRow*3; gr < currGroupRow*3+3; gr++) {
			for (let gc = currGroupCol*3; gc < currGroupCol*3+3; gc++) {
				if (gr !== r && gc != c) {
					chkArray.push(data.rows[gr].cols[gc].disp);
				}
			}
		}

		// 1～9の候補を順に探す
		var kh = 1;
		while (chkArray.indexOf(kh) > -1) {
			// チェック対象配列内に同じ数字があったら次の数字
			kh++;
			// 候補がなくなった
			if (kh > 9) {
				console.log("r["+r+"]c["+c+"]で失敗");
				break;
			}
		}

		if (kh <= 9) {// 候補
			data.rows[r].cols[c].disp=kh;
		} else { // 候補がない
			data.rows[r].cols[c].disp="-";
		}

	} // for c
} // for r
var app = new Vue({
	el: '#tbl',
	data: data
})