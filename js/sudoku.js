/**
 * sudoku.js
 */
'use strict';

//tableを初期化
let initializeData = () => {
	// 初期化したブロック
	let blankBlock = { disp: '-', onmouse: false, samenumber: false, relatedblock: false};

	let colsArr = [];
	for (let i = 0; i < 9; i++) {
		colsArr.push(JSON.parse(JSON.stringify(blankBlock)));
	}

	let rowsArr = [];
	for (let j = 0; j < 9; j++) {
		rowsArr.push({cols: JSON.parse(JSON.stringify(colsArr))});
	}
	let rows = {rows: rowsArr};
	return rows;
};
let data = initializeData();

// 埋める順番を決める
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

let makeSudoku = function(od) {

	let odIdx = order.indexOf(od);

	let r = Math.floor(odIdx/9);
	let c = odIdx%9;

	// チェック対象配列を作成
	let chkArray = [];
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

	// 1～9の候補を探す
	let khArray = [1,2,3,4,5,6,7,8,9];
	khArray.sort(() => Math.random() - 0.5);
	let khArrayIdx = 0;
	do {
		if (khArrayIdx++ >= 9) {
			// 候補がなくなった
			break;
		}
	// チェック対象配列内、自分自身、履歴に同じ数字があったら次の数字
	} while (chkArray.indexOf(khArray[khArrayIdx]) > -1 ||
			data.rows[r].cols[c].disp == khArray[khArrayIdx] ||
			historyArray[odIdx].indexOf(khArray[khArrayIdx]) > -1)

	if (khArrayIdx < 9) {// 候補がある場合は表示と履歴記録をして次のセルに進む
		data.rows[r].cols[c].disp=khArray[khArrayIdx];
		historyArray[odIdx].push(khArray[khArrayIdx]);
		od++;
	} else { // 候補がない場合は自分自身の表示と履歴をリセットして前のセルをやり直す
		data.rows[r].cols[c].disp="-";
		historyArray[odIdx] = [];
		od--;
	}
	return od;
};


//完成診断
let checkSudoku = function() {
	let warp  = [0,0,0,0,0,0,0,0,0]; // 縦
	let weft = [0,0,0,0,0,0,0,0,0]; // 横
	let grup = [0,0,0,0,0,0,0,0,0]; // グループ
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

let app = new Vue({
	el: '#tbl',
	data:{table : data
	},
	created: function(){
		console.log("created");

		// 問題の完成形を作成
		let od = 1;
		let id = setInterval(function () {
			od = makeSudoku(od);
			if (od < 1 || od > 81) {
	            // タイマー停止
	            clearInterval(id);
	            // チェック
	    		checkSudoku();
			}
		}, 1);

	},
	update: function(){
		console.log("update");
	},
	methods: {
		mouseover: function (r, c) {
			this.table.rows[r].cols[c].onmouse = true;

			// グループの添え字
			let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
			let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2

			for (let cr = 0; cr < 9; cr++) {
				for (let cc = 0; cc < 9; cc++) {

					// グループの添え字
					let chkGroupRow = Math.floor(cr/3); // 1～3行目は0、4～6行目は1、7～9行目は2
					let chkGroupCol = Math.floor(cc/3); // 1～3列目は0、4～6列目は1、7～9列目は2

					if (currGroupRow == chkGroupRow && currGroupCol == chkGroupCol) {
						// 同じグループ
						this.table.rows[cr].cols[cc].relatedblock = true;
					}

					if (r == cr || c == cc) {
						// 縦または横が同じ
						this.table.rows[cr].cols[cc].relatedblock = true;
					}

					if (this.table.rows[r].cols[c].disp == this.table.rows[cr].cols[cc].disp) {
						// 中身の数字が同じ
						this.table.rows[cr].cols[cc].samenumber = true;
					}
				}
			}

		},
		mouseleave: function (r, c) {
			this.table.rows[r].cols[c].onmouse = false;

			// グループの添え字
			let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
			let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2

			for (let cr = 0; cr < 9; cr++) {
				for (let cc = 0; cc < 9; cc++) {

					// グループの添え字
					let chkGroupRow = Math.floor(cr/3); // 1～3行目は0、4～6行目は1、7～9行目は2
					let chkGroupCol = Math.floor(cc/3); // 1～3列目は0、4～6列目は1、7～9列目は2

					if (currGroupRow == chkGroupRow && currGroupCol == chkGroupCol) {
						// 同じグループ
						this.table.rows[cr].cols[cc].relatedblock = false;
					}

					if (r == cr || c == cc) {
						// 縦または横が同じ
						this.table.rows[cr].cols[cc].relatedblock = false;
					}

					if (this.table.rows[r].cols[c].disp == this.table.rows[cr].cols[cc].disp) {
						// 中身の数字が同じ
						this.table.rows[cr].cols[cc].samenumber = false;
					}
				}
			}
		}
	}
})