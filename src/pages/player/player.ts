import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

const conditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // colums
  [0, 4, 8], [2, 4, 6]             // diagonal 
];

@Component({
  selector: 'page-player',
  templateUrl: 'player.html'
})

export class PlayerPage {

  squares = Array(9).fill(null);
  player = 'X';
  winner = null;
  playerXScore = 0;
  playerOScore = 0;

  constructor(public navCtrl: NavController) {

  }

  get gameStatusMessage(){
    if(this.checkDraw() && !this.winner)
      return 'it is a draw!'; 
    return this.winner? `${this.winner} has won!` : 
    `${this.player}'s turn`;
  }

  checkDraw() {
    for(let i = 0; i < this.squares.length; i++)
      if(!this.squares[i])
        return false;
    return true;
  }

  handleMove(position) {
    if(!this.winner && !this.squares[position] ){
      this.squares[position] = this.player;
      if(this.winnigMove()) {
        this.winner = this.player;
        if(this.winner === 'X')
          this.playerXScore++;
        else
          this.playerOScore++;
      }
      this.player = this.player === 'X' ? 'O' : 'X';
    }
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

  restartMatch() {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
    this.playerXScore = 0;
    this.playerOScore = 0;
  }

}