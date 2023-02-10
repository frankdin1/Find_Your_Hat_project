const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';



class Field{
    constructor(arr, currentPos = [0,0]){
        this._arr = arr;
        this._currentPos = currentPos;
    }
    // CurrentPos(){
    //     let currentPos = [];
    //     for(let i = 0; i < this._arr.length; i++){
    //         for(let j = 0; j < this._arr[i].length;j++){
    //             if(this._arr[i][j] === '*'){
    //                 currentPos.push(i);
    //                 currentPos.push(j); 
    //             }
                
    //          }
    //     }
    //     return currentPos;
    // }

    print(input){
        let fieldHeight = this._arr.length;
        let fieldWidth = this._arr[0].length;
        for (let i = 0; i < this._arr.length; i++){
            let line = '';
            for(let j = 0; j < this._arr[i].length; j++){
                line += this._arr[i][j]
            }
        }

        let i = 0;
        let j = 0;
        if (input === "d" || input === 'D' ){
            i = this._currentPos[0] += 1;
            j = this._currentPos[1];
            if(i < fieldHeight && this._arr[i][j] != '0' && this._arr[i][j] != '^'){
                this._arr[i][j] = '*';
            }
            else if(i === fieldHeight){
                console.log("Out of bounds")
                process.exit();
            }
            else if(this._arr[i][j] === '0'){
                console.log("You fell into a hole.");
                process.exit();
            }
            else if(this._arr[i][j] === '^'){
                console.log("Hooray! You found your hat!!");
                process.exit();
            }
        }

        else if (input === "u" || input === 'U'){
            i = this._currentPos[0] -= 1;
            j = this._currentPos[1];
            if(i >= 0 && this._arr[i][j] != '0' && this._arr[i][j] != '^'){
                this._arr[i][j] = '*';
            }
            else if(i < 0){
                console.log("Out of bounds")
                process.exit();
            }
            else if(this._arr[i][j] === '0'){
                console.log("You fell into a hole.");
                process.exit();
            }
            else if(this._arr[i][j] === '^'){
                console.log("Hooray! You found your hat!!");
                process.exit();
            }
        }
        else if (input === "l" || input === 'L'){
            i = this._currentPos[0] ;
            j = this._currentPos[1] -= 1;
            if(j > 0 && this._arr[i][j] != '0' && this._arr[i][j] != '^'){
                this._arr[i][j] = '*';
            }
            else if(i < 0){
                console.log("Out of bounds")
                process.exit();
            }
            else if(this._arr[i][j] === '0'){
                console.log("You fell into a hole.");
                process.exit();
            }
            else if(this._arr[i][j] === '^'){
                console.log("Hooray! You found your hat!!");
                process.exit();
            }
        }
        else if (input === "r" || input === 'R'){
            i = this._currentPos[0];
            j = this._currentPos[1] += 1;
            if(j < fieldWidth && this._arr[i][j] != '0' && this._arr[i][j] != '^'){
                this._arr[i][j] = '*';
            }
            else if(this._arr[i][j] === '0'){
                console.log("You fell into a hole.");
                process.exit();
            }
            else if(this._arr[i][j] === '^'){
                console.log("Hooray! You found your hat!!");
                process.exit();
            }
            else{
                console.log("Out of bounds")
                process.exit();
            }
        }

        for (let i = 0; i < this._arr.length; i++){
            let line = '';
            for(let j = 0; j < this._arr[i].length; j++){
                line += this._arr[i][j]
            }
            console.log(line)
        }
    }
}

const myField = new Field([
    ['*','░','0','0','░','0'],

    ['░','0','░','0','░','0'],

    ['░','^','░','0','0','░'],
]);

process.stdout.write('Which way? ');
process.stdin.on('data', (userIn) =>{
    let direction = userIn.toString().trim();
    myField.print(direction)
});




