/**
 * sudoku.js
 */
'use strict';

// 表示
let disp=['','','','','','','','','',
	'','','','','','','','','',
	'','','','','','','','','',
	'','','','','','','','','',
	'','','','','','','','','',
	'','','','','','','','','',
	'','','','','','','','','',
	'','','','','','','','','',
	'','','','','','','','','',
];

//完成形
let ans=['-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
	'-','-','-','-','-','-','-','-','-',
];

// マウスオーバー時のスタイルの適用
let isOnmouse=[false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
	false,false,false,false,false,false,false,false,false,
];
// 同一番号時のスタイルの適用
let isSamenumber = isOnmouse.slice();
// 同一ブロック時のスタイルの適用
let isRelatedblock = isOnmouse.slice();
;
let isFocused = isOnmouse.slice();

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
	for (let i=0; i<9; i++) {
		if (i !== r) {
			chkArray.push(ans[i*9+c]);
		}
	}
	// 横
	for (let i = 0; i<9; i++) {
		if (i !== c) {
			chkArray.push(ans[r*9+i]);
		}
	}

	// ブロック
	let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
	let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2

	for (let gr = currGroupRow*3; gr < currGroupRow*3+3; gr++) {
		for (let gc = currGroupCol*3; gc < currGroupCol*3+3; gc++) {
			if (gr !== r && gc != c) {
				chkArray.push(ans[gr*9+gc]);
			}
		}
	}

	// 1～9の候補を探す
	let khArray = [1,2,3,4,5,6,7,8,9];
	khArray.sort(() => Math.random() - 0.5);// ランダムな配列にする

	let khArrayIdx = 0;
	do {
		if (khArrayIdx++ >= 9) {
			// 候補がなくなった
			break;
		}
	// チェック対象配列内、自分自身、履歴に同じ数字があったら次の数字
	} while (chkArray.indexOf(khArray[khArrayIdx]) > -1 ||
			ans[odIdx] == khArray[khArrayIdx] ||
			historyArray[odIdx].indexOf(khArray[khArrayIdx]) > -1)

	if (khArrayIdx < 9) {// 候補がある場合は表示と履歴記録をして次のセルに進む
		ans[odIdx]=khArray[khArrayIdx];
		historyArray[odIdx].push(khArray[khArrayIdx]);
		od++;
	} else { // 候補がない場合は自分自身の表示と履歴をリセットして前のセルをやり直す
		ans[odIdx]="-";
		historyArray[odIdx] = [];
		od--;
	}
	return od;
};


//完成診断
let checkSudoku = function(testee) {
	let warp  = [0,0,0,0,0,0,0,0,0]; // 縦
	let weft = [0,0,0,0,0,0,0,0,0]; // 横
	let grup = [0,0,0,0,0,0,0,0,0]; // グループ
	for (let r = 0; r < 9; r++) {
		// ブロックのための添え字
		let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
		for (let c = 0; c < 9; c++) {
			warp[r] += parseInt(testee[r*9+c]);
			weft[c] += parseInt(testee[r*9+c]);

			// ブロックのための添え字
			let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2
			let grup_pt = currGroupRow*3 + currGroupCol;
			grup[grup_pt] += parseInt(testee[r*9+c]);
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
//問題に穴を空ける
let digSudoku = function() {
	console.log("IN digSudoku");

	// 一旦全部表示
	ans.forEach( (e, i )  => Vue.set(disp, i, e));

	// 埋める順番の表を再利用
	order.sort(() => Math.random() - 0.5);// ランダムな配列にする

	for (let cnt=1; cnt<82; cnt++) {

		let idx = order.indexOf(cnt);
		let r = Math.floor(idx/9);
		let c = idx%9;

		console.log("r="+r+" c="+c+" idx="+idx);

		// 穴の候補チェック
		let currBoard = disp.slice();
		currBoard[idx] = ''; // 空欄
		if (chkDig(r, c, currBoard) >= 0 ) {
			currBoard.forEach( (e, i )  => Vue.set(disp, i, e));
		}
		console.log("disp=");
		console.log(disp);

	}

}
// 穴の候補チェック
let chkDig = function(r, c, currBoard) {
	// 穴に入る候補を挙げる
	let khArray = [1,2,3,4,5,6,7,8,9];

	// 縦
	for (let i=0; i<9; i++) {
		if (i !== r && currBoard[i*9+c] !== '.') {
			// 縦列に候補配列と同一値がある場合、候補配列から除外
			if (khArray.indexOf(currBoard[i*9+c]) > -1) {
				khArray = khArray.filter(kh => kh !== currBoard[i*9+c]);
			}
		}
	}

	// 横
	for (let i = 0; i<9; i++) {
		if (i !== c && currBoard[r*9+i] !== '.') {
			// 横列に候補配列と同一値がある場合、候補配列から除外
			if (khArray.indexOf(currBoard[r*9+i]) > -1) {
				khArray = khArray.filter(kh => kh !== currBoard[r*9+i]);
			}
		}
	}

	// ブロック
	let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
	let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2

	for (let gr = currGroupRow*3; gr < currGroupRow*3+3; gr++) {
		for (let gc = currGroupCol*3; gc < currGroupCol*3+3; gc++) {
			if (gr !== r && gc != c  && currBoard[gr*9+gc] !== '.') {
				khArray = khArray.filter(kh => kh !== currBoard[gr*9+gc]);
			}
		}
	}
	console.log("khArray=");
	console.log(khArray);

	// 候補が1つしかない場合はこの穴は正しいと判断
	if (khArray.length == 1) {
		console.log("=== OK");
		return 0;
	} else {
		console.log("=== NG");
		return -1;
	}
}
// ////////////////////////////////////////////
let board = new Vue({
	el: '#sudoku',
	data:{disp : disp,
		ans: ans,
		onmouse: isOnmouse,
		samenumber: isSamenumber,
		relatedblock: isRelatedblock,
		focused: isFocused,
	},
	computed: function () {
		console.log('IN computed');
	},
	created: function () {
		console.log('IN created');

		// 問題の完成形を作成
		let od = 1;
		while (od >0 && od <= 81) {
			od = makeSudoku(od);
		}
        // チェック
		checkSudoku(this.ans);
		// 問題に穴を空ける
		digSudoku();

		console.log('OUT created');
		return this.disp;
    },
	methods: {
		mouseover: function (r, c) {
			let idx = r*9+c;

			// this.onmouse[idx] = true;
			Vue.set(this.onmouse, idx, true);

			if (this.disp[idx] == '-' || this.disp[idx] == '') {
				// 表示がない場合は変更しない
				return;
			}

			// グループの添え字
			let currGroupRow = Math.floor(r/3); // 1～3行目は0、4～6行目は1、7～9行目は2
			let currGroupCol = Math.floor(c/3); // 1～3列目は0、4～6列目は1、7～9列目は2

			for (let cr = 0; cr < 9; cr++) {
				for (let cc = 0; cc < 9; cc++) {
					let gidx = cr*9+cc;

					// グループの添え字
					let chkGroupRow = Math.floor(cr/3); // 1～3行目は0、4～6行目は1、7～9行目は2
					let chkGroupCol = Math.floor(cc/3); // 1～3列目は0、4～6列目は1、7～9列目は2

					if (currGroupRow == chkGroupRow && currGroupCol == chkGroupCol) {
						// 同じグループ
						// this.relatedblock[gidx] = true;
						Vue.set(this.relatedblock, gidx, true);
					}

					if (r == cr || c == cc) {
						// 縦または横が同じ
						// this.relatedblock[gidx] = true;
						Vue.set(this.relatedblock, gidx, true);
					}

					if (this.disp[idx] == this.disp[gidx]) {
						// 中身の数字が同じ
						// this.samenumber[gidx] = true;
						Vue.set(this.samenumber, gidx, true);
					}
				}
			}

		},
		mouseleave: function (r, c) {
			this.onmouse.forEach( (e, i )      => Vue.set(this.onmouse, i, false));
			this.relatedblock.forEach( (e, i ) => Vue.set(this.relatedblock, i, false));
			this.samenumber.forEach( (e, i )   => Vue.set(this.samenumber, i, false));

		},
		clickedBoard: function(r, c) {
			let idx = r*9+c;

			// 同一セルをクリックした場合
			if (this.focused[idx] == true) {
				// 全部オフにして終了
				this.focused.forEach( (e, i ) => Vue.set(this.focused, i, false));
			} else {
				// 全部オフにしたあとクリックしたセルをオン
				this.focused.forEach( (e, i ) => Vue.set(this.focused, i, false));
				Vue.set(this.focused, idx, true);
			}
		},
		clickedNumber: function(idx) {
			let ptIdx = this.focused.indexOf(true);
			console.log(ptIdx);
			if (ptIdx > -1) {
				Vue.set(this.disp, ptIdx, idx);
			}
		}
	}
})