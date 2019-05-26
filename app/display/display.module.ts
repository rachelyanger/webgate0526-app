import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanvasComponent } from './canvas/canvas.component';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [  CanvasComponent, TestComponent],
  exports:[CanvasComponent,TestComponent],
  imports: [
    CommonModule
  ]
})
export class DisplayModule { }
