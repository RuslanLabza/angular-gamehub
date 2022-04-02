import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import ICheckbox from 'src/app/shared/interfaces/ICheckbox';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  checkboxForm = new FormGroup({
    indie: new FormControl(true),
    action: new FormControl(true),
    adventure: new FormControl(true)
  });

  costForm = new FormGroup({
    costSlider: new FormControl(1000)
  });

  @Output() check: EventEmitter<ICheckbox> = new EventEmitter();
  @Output() range: EventEmitter<Number> = new EventEmitter();

  constructor() { }

  togleTag(changes: ICheckbox) {
    this.check.emit(changes);
  }

  filterPrice(changes: number) {
    this.range.emit(changes);
  }
}
