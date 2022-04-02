import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import IGame from '../../interfaces/IGame';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Output() add: EventEmitter<IGame> = new EventEmitter();

  @Input() game: IGame = {
    id: 0,
    name: '',
    description: '',
    cost: 0,
    tag: ''
  }

  constructor(
    public router: Router) { }

  ngOnInit(): void {
  }

  addToLibrary(game: IGame) {
    this.add.emit(game);
  }
}
