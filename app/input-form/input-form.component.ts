import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  @Input() type: string;
  // @Input() default: any;
  @Output() getInput = new EventEmitter();
  result: any;

  @Input() get default(): any {
    return this.result;
  }
  set default(r: any) {
    this.result = r;

  }
  constructor() { }

  ngOnInit() {
    // this.result =  this.default;
  }


  get_input(value: any) {
    this.getInput.emit(value);
    console.log(value);
  }

  getType(item) {
    return Object.prototype.toString.call(item);
  }

  getSubclass(item) {
    return item.subclass;
  }

  str2num(item) {
    return Number(item);
  }

}


