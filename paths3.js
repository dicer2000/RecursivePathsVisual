//
// Lava Lamp Simulator V1.1
// 
//--------------------------------------------
// Start Window Setup
var cvs = document.getElementById('cvs');
var ctx = cvs.getContext("2d");
var cvsW;
var cvsH;
var simTick = false;

function assessWindow() {
    // Make it visually fill the positioned parent
    cvs.style.width ='100%';
    cvs.style.height='100%';
    // ...then set the internal size to match
    cvs.width  = cvs.offsetWidth;
    cvs.height = cvs.offsetHeight;
    cvsW = cvs.width;
    cvsH = cvs.height;
}
assessWindow();
window.addEventListener("resize", assessWindow);

// End Window Setup
//--------------------------------------------

// Simulation Constants
var ROW_MAX = 4;
var COL_MAX = 4;
var FREE_SPACE = 80;

var board = [COL_MAX];

function startSim() {

    // Setup Board
    for (var i = 0; i < ROW_MAX; i++) {
        board[i] = [];
        for(var j = 0; j < COL_MAX; j++)
           if(Math.floor(Math.random() * 100) < FREE_SPACE)
               board[i][j] = ' ';
           else
               board[i][j] = 'X';
    }
    console.log(board);
}


function drawBoard() {
    ctx.beginPath();
    ctx.font = "70px Arial";

    // Draw Vertical Lines
    for(var i = 0; i < cvsW; i += Math.floor(cvsW/COL_MAX))
    {
        ctx.moveTo(i,0);
        ctx.lineTo(i,cvsH);
        ctx.stroke();
    }
    // Draw Horizontal Lines
    for(var i = 0; i < cvsH; i += Math.floor(cvsH/ROW_MAX))
    {
        ctx.moveTo(0,i);
        ctx.lineTo(cvsW,i);
        ctx.stroke();
    }
    // Draw Bad Guys
    for (var row = 0; row < ROW_MAX; row++)
        for(var col = 0; col < COL_MAX; col++)
            if(board[row][col] == "X")
                ctx.fillText("👻", col*Math.floor(cvsW/COL_MAX) + (Math.floor(cvsW/COL_MAX)/2)-30, 
                    row*Math.floor(cvsH/ROW_MAX) + (Math.floor(cvsH/COL_MAX))/2 + 30);
    // Old Unicode: \uD83D\uDE00  👻
}


function CountPaths(row, col) {
	
	var paths = 0;
    ctx.beginPath();

	// check to see if we have reach the final destination
	if (row == ROW_MAX-1 && col == COL_MAX-1)
		return 1;

	// check to see if we can move down
    if (row < ROW_MAX-1 && board[row + 1][col] == ' ')
    {
        var newPathCount = CountPaths(row + 1, col);
        if(newPathCount > 0)
        {
            makeLine(row, col, row + 1, col);
            paths += newPathCount;
        }
    }

	// check to see if we can move to the right
    if (col < COL_MAX-1 && board[row][col + 1] == " ")
    {
        makeLine(row, col, row, col + 1);
		paths += CountPaths(row, col + 1);
    }

	// this should be the number of paths to the destination from the current position
	return paths;

} // CountPaths



function makeLine(rowStart, colStart, rowEnd, colEnd) {
    ctx.beginPath();
    ctx.strokeStyle="red";
    ctx.lineWidth = 5;

    // Put into Screen Coordinates and Draw it
    ctx.moveTo(colStart*Math.floor(cvsW/COL_MAX)+Math.floor(cvsW/COL_MAX/2), rowStart*Math.floor(cvsH/ROW_MAX)+Math.floor(cvsH/ROW_MAX)/2);
    ctx.lineTo(colEnd*Math.floor(cvsW/COL_MAX)+Math.floor(cvsW/COL_MAX/2), rowEnd*Math.floor(cvsH/ROW_MAX)+Math.floor(cvsH/ROW_MAX)/2);
    ctx.stroke();
}

startSim();
drawBoard();
var totalPaths = CountPaths(0, 0) + " Paths";;

// Print final paths
ctx.beginPath();
ctx.font = "70px Arial";
ctx.fillText(totalPaths, 20, 80);