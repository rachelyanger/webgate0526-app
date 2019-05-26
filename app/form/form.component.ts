import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  // @Input() default: object | undefined;
  @Output() getInput = new EventEmitter();
  result: object | undefined;

  // result: any;

  @Input() get default(): object | undefined {
    return this.result;
  }
  set default(r: object | undefined) {
    this.result = r;
  }

  constructor() {}

  ngOnInit() {}

  update(key: any, e: any, i: number) {
    this.default[key].value[i] = e;
    this.get_input(this.result);
  }
  get_input(value: object) {
    this.getInput.emit(value);
  }

  getKeys(item) {
    return Object.keys(item);
  }

  getType(item) {
    return Object.prototype.toString.call(item);
  }

  getSubclass(item) {
    return item.subclass;
  }

  add(key: any) {
    this.default[key].add();
    this.get_input(this.result);
  }
  delete(key: any, i: any) {
    this.default[key].delete(i);
    this.get_input(this.result);
  }
  test(e: any) {
    console.log(e);
  }
}
