
let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

let player1='X';
let player2='O';
let currPlayer=player1;
let turns=0;
let h;
let w;

scores = {
    "X":1,
    "O":-1,
    "tie":0
}

function setup(){
    let canvas = createCanvas(400,400);
    canvas.parent("myContainer");
    h=height/3;
    w=width/3;
    background(150);
    textSize(100);
    textAlign(CENTER, CENTER);
}

function minimax(board,isMaximizingPlayer){
    result = evalPosition(board);

    if(result!=null) return scores[result];

    if(isMaximizingPlayer){
        let bestScore=-Infinity;

        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(board[i][j]==''){
                    board[i][j]='X';
                    let score = minimax(board,false);
                    board[i][j]='';
                    bestScore = max(bestScore,score);
                }
            }
        }
        return bestScore;
    }

    else{
        let bestScore=Infinity;

        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                if(board[i][j]==''){
                    board[i][j]='O';
                    let score = minimax(board,true);
                    board[i][j]='';
                    bestScore = min(bestScore,score);
                }
            }
        }
        return bestScore;
    }
}

function bestMove(){
    if(turns>=9) return;

    let bestVal=Infinity;
    let move=[-1,-1];

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(board[i][j]==''){
                board[i][j]='O';
                let val=minimax(board,true);
                board[i][j]='';
                
                if(val<bestVal){
                    bestVal=val;
                    move[0]=i;
                    move[1]=j;
                }
            }
        }
    }
    board[move[0]][move[1]] = 'O';
    turns++;
    currPlayer=player1;
}

function showWinner(winner){
    if(winner=="tie"){
        document.getElementById("result").innerHTML = "TIE";
    }
    else{
        document.getElementById("result").innerHTML = winner+" Wins";
    }
}


function evalPosition(board){
    let winner = null;
    //Horizontal
    for(let i=0; i<3; i++){
        if(board[i][0]==board[i][1] && board[i][1]==board[i][2] && board[i][0]!=''){
            return board[i][0];
        }
    }

    //Vertical
    for(let i=0; i<3; i++){
        if(board[0][i]==board[1][i] && board[1][i]==board[2][i] && board[0][i]!=''){
            return board[0][i];
        }
    }

    //Diagonal
    if(board[0][0]==board[1][1] && board[1][1]==board[2][2] && board[0][0]!=''){
        return board[0][0];
    }
    if(board[0][2]==board[1][1] && board[1][1]==board[2][0] && board[0][2]!=''){
        return board[1][1];
    }

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            if(board[i][j]==''){
                return winner;
            }
        }
    }

    return "tie";
}

function mousePressed(){
    if(mouseX>width || mouseY>height) return;

    let r = Math.floor(mouseY/h);
    let c = Math.floor(mouseX/w);
    if(currPlayer==player1){
        if(board[r][c]==''){
            board[r][c]='X';
            currPlayer=player2;
            turns++;
            window.setTimeout(myfunc,500);
        }
    }
}

function myfunc(){
    bestMove();
}

function draw(){
    //Vertical
    line(w,0,w,height);
    line(2*w,0,2*w,height);

    //Horizontal
    line(0,h,width,h);
    line(0,2*h,width,2*h);

    for(let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            text(board[i][j],w*(j+0.5),h*(i+0.5));
        }
    }

    let res = evalPosition(board);

    if(res=='X' || res=='O' || res=='tie'){
        noLoop();
        showWinner(res);
    }

}