import { Component, AfterContentInit, Renderer2, ElementRef } from '@angular/core';
import {VariableArr, Volume} from './basic_class';
import {CTscanner} from './geometry';
import { fromEvent } from 'rxjs';
import {geometry_14m, repeater_14m, placement_14m} from './1.4m';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {
  title = 'project0513';
  a = geometry_14m;
  b = placement_14m;
  c = repeater_14m;
  geometry: any;
  placement: any;
  repeater: any;
  readonly downWithButton$ = fromEvent<MouseEvent>(
    this.ef.nativeElement,
    'mousedown',
  );
  // .subscribe(e => console.log(e), console.error);
  constructor(private render: Renderer2, private ef: ElementRef) {

  }
  ngAfterContentInit() {
  }
}
