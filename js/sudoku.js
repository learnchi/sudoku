/**
 * sudoku.js
 */
'use strict';
var table = {
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

/** 埋める順番を決める **/
let order=[81,74,78,18,11,15,54,47,51,
	77,73,75,14,10,12,50,46,48,
	80,76,79,17,13,16,53,49,52,
	45,38,42,9,2,6,27,20,24,
	41,37,39,5,1,3,23,19,21,
	44,40,43,8,4,7,26,22,25,
	72,65,69,36,29,33,63,56,60,
	68,64,66,32,28,30,59,55,57,
	71,67,70,35,31,34,62,58,61
];

//// 順番をバラバラに
//order.sort(() => Math.random() - 0.5);
//console.log(order);

// 候補を一時保管
let historyArray = [[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[],
		[],[],[],[],[],[],[],[],[]];

let makeSudoku = function(data, od) {
	let odIdx = order.indexOf(od);

	var r = Math.floor(odIdx/9);
	var c = odIdx%9;

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
	while (chkArray.indexOf(kh) > -1 ||
			data.rows[r].cols[c].disp == kh ||
			historyArray[odIdx].indexOf(kh) > -1) {
		// チェック対象配列内、自分自身、履歴に同じ数字があったら次の数字
		kh++;
		// 候補がなくなった
		if (kh > 9) {
			break;
		}
	}

	if (kh <= 9) {// 候補
		data.rows[r].cols[c].disp=kh;
		historyArray[odIdx].push(kh);
		od++;
	} else { // 候補がない
		data.rows[r].cols[c].disp="-";
		historyArray[odIdx] = [];
		od--;
	}
	return od;
};


//完成診断
let checkSudoku = function(data) {
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
		console.log("check is OK!!");
	} else {
		console.log("check is NG!!!");
	}
}


var app = new Vue({
	el: '#tbl',
	data: {table: table},
	created: function(){
		console.log("created");
		let od = 1;
		while (od > 0 && od <= 81) {
			od = makeSudoku(this.table, od);
		}
		checkSudoku(this.table);
	},
	update: function(){
		console.log("update");
	},
})