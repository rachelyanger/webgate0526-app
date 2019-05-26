export class dVolume{
  name:string;
  shape: dBox;////
  appearance: dAppearance;
  translation?: dPlacementTranslation[];
  rotation?: dPlacementRotation[];
  repeat?: dCubicArrayRepeater[];////
  constructor(){
    this.name = '.';
    this.shape = new dBox();
    this.appearance = new dAppearance();
    this.translation = [new dPlacementTranslation()];
    this.rotation = [new dPlacementRotation()];
    this.repeat = [new dCubicArrayRepeater()];
  }
}

export class dBox {
  size: [number, number, number];
  constructor(){this.size = [0,0,0];}
}
export class dAppearance {
  color: string;
  visible: boolean;
  line_width: number;
  force_wireframe: boolean;
  constructor(){
    this.color = 'white';
    this.visible = false;
    this.line_width = 1;
    this.force_wireframe = false;
  }
}
export class dPlacementTranslation {
  value: [number,number, number];
  constructor(){
    this.value = [0,0,0];
  }
}

export class dPlacementRotation {
  axis: [number,number,number];
  angle: number;
  constructor(){
    this.axis = [0,0,1];
    this.angle = 0;
  }
}
export class dCubicArrayRepeater {
  repeat_number: [number,number,number];
  repeat_vector: [number,number,number];
  constructor(){
    this.repeat_number = [1,1,1];
    this.repeat_vector = [0,0,0];
  }
}