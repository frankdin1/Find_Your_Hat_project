const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field{
    constructor(arr = [], currentPos = [0,0], gameOn = true){
        this._arr = arr;
        this._currentPos = currentPos;
        this._gameOn = gameOn;
    }

    pickSymbol(){
        return Math.floor(Math.random()*2)
    }
    endPoint(h, w){
        let i = 0
        let j = 0
        while(i === 0 && j === 0){
            i = Math.floor(Math.random()*h)
            j = Math.floor(Math.random()*w)
            this._arr[i][j] = '^'
        }
    }
    generateField(){
        let symbolArr = ['O', '░']
        this._width = prompt('Enter field width: ')
        this._height = prompt('Enter field height: ')
        for (let i = 0; i < this._height; i++){
            this._arr[i] = []
            for (let j = 0; j < this._width; j++){
              let k = this.pickSymbol(); 
              while(k === 2){
                k = this.pickSymbol();
              }
              this._arr[i][j] = symbolArr[k]
            }  
        }
        this._arr[0][0] = '*'
        this.endPoint(this._height, this._width)
    }

    printField(){
        for (let i = 0; i < this._arr.length; i++){
                let line = '';
                for(let j = 0; j < this._arr[i].length; j++){
                    line += this._arr[i][j]
                }
            console.log(line)
        }    
    }

    moveAndReset(i, j){
        this._arr[i][j] = '*';
        console.clear()
        this.printField()
        this._direction = ('Which way? ');
    }

    hatOrHole(symbol){
        if(symbol === 'O'){
            console.log("You fell into a hole.");
            process.exit();
        }
        else if(symbol === '^'){
            console.log("Hooray! You found your hat!!");
            process.exit();
        }
    }

    outOfBounds(position){
        if (position < 0 || position === this._fieldHeight || position === this._fieldWidth){
            console.log("Out of bounds")
            process.exit();
        }  
    }

    startGame(){
        while(this._gameOn){
            this._direction = prompt('Which way?: ')
            this._fieldHeight = this._arr.length;
            this._fieldWidth = this._arr[0].length;
            let i = this._currentPos[0];
            let j = this._currentPos[1];
            if ( this._direction === "d" || this._direction === 'D' ){
                i = this._currentPos[0] += 1;
                j = this._currentPos[1];
                this.outOfBounds(i)
                if(i < this._fieldHeight && this._arr[i][j] != 'O' && this._arr[i][j] != '^'){
                    this.moveAndReset(i, j)
                }
                else this.hatOrHole(this._arr[i][j])
            }
            if (this._direction === "u" || this._direction === 'U'){
                i = this._currentPos[0] -= 1;
                j = this._currentPos[1];
                this.outOfBounds(i)
                if(i >= 0 && this._arr[i][j] != 'O' && this._arr[i][j] != '^'){
                    this.moveAndReset(i, j)
                }
                else this.hatOrHole(this._arr[i][j])  
                
            }

            if (this._direction === "l" || this._direction === 'L'){
                i = this._currentPos[0]
                j = this._currentPos[1] -= 1;
                this.outOfBounds(j)
                if(j > 0 && this._arr[i][j] != 'O' && this._arr[i][j] != '^'){
                    this.moveAndReset(i, j)
                }
                else this.hatOrHole(this._arr[i][j])   
                
            }

            if (this._direction === "r" || this._direction === 'R'){
                i = this._currentPos[0];
                j = this._currentPos[1] += 1;
                this.outOfBounds(j) 
                if(j < this._fieldWidth && this._arr[i][j] != 'O' && this._arr[i][j] != '^'){
                    this.moveAndReset(i, j)
                }
                else this.hatOrHole(this._arr[i][j])  
            }
        }
    }

    play(){
        this.generateField()
        this.printField()
        this.startGame()
    }
    
}
const myField = new Field()
myField.play()




