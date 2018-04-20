import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const conditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colums
  [0, 4, 8], [2, 4, 6]             // diagonal 
];

@Component({
  selector: 'page-computer',
  templateUrl: 'computer.html'
})
export class CompuerPage {
  squares = Array(9).fill(null);
  player = 'X';
  winner = null;

  constructor(public navCtrl: NavController) {

  }

  get gameStatusMessage(){
    if(this.checkDraw() && !this.winner)
      return 'it is a draw!';
    return this.winner? `${this.winner} has won!` : 
    `${this.player}'s turn`;
  }

  handleMove(position) {
    if(this.squares[position])
      return;
    if(!this.winner && !this.squares[position] ){
      this.squares[position] = this.player;
      if(this.winnigMove()) {
        this.winner = this.player;
        return;
      }
      if(this.checkDraw())
        return;
      this.player = this.player === 'X' ? 'O' : 'X';
    }
    this.makeOMove();
  }

  checkDraw() {
    for(let i = 0; i < this.squares.length; i++)
      if(!this.squares[i])
        return false;
    return true;
  }

  // makeOMove() {
  //   if(this.player === 'O'){
  //     let doRand = true;
  //     while(doRand){
  //       let randNum = Math.floor((Math.random() * 8 ));
  //       console.log("random number = " + randNum);
  //       if(this.squares[randNum])
  //         continue;
  //       this.squares[randNum] = 'O';
  //       if(this.winnigMove()) {
  //         this.winner = this.player;
  //       }
  //       doRand = false;
  //       this.player = this.player === 'X' ? 'O' : 'X';
  //     }
  //   }
  // }

  makeOMove() {
    if(this.player === 'O'){
      let condition = this.optionToWin('O');
      if(condition){
        console.log('option to win for O');
      }
      else
        condition = this.optionToWin('X');
      console.log(condition);
      if(condition){
        console.log('condition');
        console.log(this.findEmpryCeillInCondition(condition));
        this.squares[this.findEmpryCeillInCondition(condition)] = 'O';
        if(this.winnigMove()) {
          this.winner = this.player;
        }
      }
      else{
        console.log('else');
        let doRand = true;
        while(doRand){
          let randNum = Math.floor((Math.random() * 8 ));
          console.log("random number = " + randNum);
          if(this.squares[randNum])
            continue;
          this.squares[randNum] = 'O';
          if(this.winnigMove()) {
            this.winner = this.player;
          }
          doRand = false;
        }
      }
    }
    this.player = this.player === 'X' ? 'O' : 'X';
  }

  findEmpryCeillInCondition(condition) {
    if(!this.squares[condition[0]])
      return condition[0];
    if(!this.squares[condition[1]])
      return condition[1];
    return condition[2];
  }

  optionToWin(type) {
    for( let condition of conditions) {
      if((this.squares[condition[0]] === type && this.squares[condition[0]] && this.squares[condition[1]] && this.squares[condition[0]] === this.squares[condition[1]] && !this.squares[condition[2]]) ||
      (this.squares[condition[0]] === type && this.squares[condition[0]] && this.squares[condition[2]] && this.squares[condition[0]] === this.squares[condition[2]] && !this.squares[condition[1]]) ||
      (this.squares[condition[1]] === type && this.squares[condition[1]] && this.squares[condition[2]] && this.squares[condition[1]] === this.squares[condition[2]] && !this.squares[condition[0]])) {
        return condition;
      }
    }
    return null;
  }

  winnigMove() {
    for (let condition of conditions) {
      if ( this.squares[condition[0]]
          && this.squares[condition[0]] === this.squares[condition[1]]
          && this.squares[condition[1]] === this.squares[condition[2]]) {
            return true;
      }
    }
    return false;
  }

  restartGame() {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
  }

}