import { RepeatService } from './services/repeat.service';

 export class Geometry {
    world: Volume;              
    scanner: System;
    phantom: any;
  }
 export class System {
    base:Volume;
    level1: Volume;
    level2: Volume;
    level3: Volume;
    level4: Volume[];
    level5: Volume[];
    constructor(){
      this.base = new Volume();
      this.level1 = new Volume();
      this.level2 = new Volume();
      this.level3 = new Volume();
      this.level4 = undefined;
      this.level5 = undefined;
    }
  }
////////////////////////////
 export class Volume {
    name:string; 
    shape: any;////
    appearance: Appearance;
    translation?: PlacementTranslation[];
    rotation?: PlacementRotation[];
    repeat?: any;////
    constructor(){
      this.name = '';
      this.shape = undefined;
      this.appearance = new Appearance();
      this.translation = [new PlacementTranslation()];
      this.rotation = [new PlacementRotation()];
      this.repeat = [null];
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  
  export class Shape {}
  
  export class Box extends Shape {
    size: [number, number, number];
    constructor(){super();this.size = [null,null,null];}
  }
  
  export class Sphere extends Shape {
    rmin: number;
    rmax: number;
    phi_start: number;
    delta_phi: number;
    theta_start: number;
    delta_theta: number;
    constructor(){
      super();
      this.rmin = null;
      this.rmax = null;
      this.phi_start = 0;
      this.delta_phi = Math.PI*2;
      this.theta_start = 0;
      this.delta_theta = Math.PI*2;
    }
  }
  
  export class Cylinder extends Shape {
    rmin: number;
    rmax: number;
    height: number;
    phi_start: number;
    delta_phi: number;
    constructor() {
      super();
      this.rmin = null;
      this.rmax = null;
      this.height = null;
      this.phi_start = 0;
      this.delta_phi = Math.PI*2;
    }
  }
  
  export class Cone extends Shape {
    rmin1: number;
    rmax1: number;
    rmin2: number;
    rmax2: number;
    height: number;
    phi_start: number;
    delta_phi: number;
    constructor() {
      super();
      this.rmin1 = null;
      this.rmax1 = null;
      this.rmin2 = null;
      this.rmax2 = null;
      this.height = null;
      this.phi_start = 0;
      this.delta_phi = Math.PI*2;
    }
  }
  
  export class Ellipsoid extends Shape {
    size: [number,number,number];
    z_bottom_cut: number;
    z_top_cut: number;
    constructor() {
      super();
      this.size = [null,null,null];
      this.z_bottom_cut = -100;
      this.z_top_cut = 100;
    }
  }
  
  export class EllipticalTube extends Shape {
    long: number;
    short: number;
    height: number;
    constructor() {
      super();
      this.long = null;
      this.short = null;
      this.height = null;
    }
  }
  
  export class Tessellated extends Shape {
    path_to_vertices_file: string;
    constructor() {
      super();
      this.path_to_vertices_file = '';
    }
  }
  
  export class TetMeshBox extends Shape {
    path_to_ele_file: string;
    unit_of_length: string;
    path_to_attribute_map: string;
    constructor() {
      super();
      this.path_to_ele_file = '';
      this.unit_of_length = '';
      this.path_to_attribute_map = '';
    }
  }
  
  export class TRPD extends Shape {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    z: number;
    box_size: [number,number,number];
    box_pos: [number,number,number];
    constructor() {
      super();
      this.x1 = null;
      this.y1 = null;
      this.x2 = null;
      this.y2 = null;
      this.z = null;
      this.box_size = [null,null,null];
      this.box_pos = [0,0,0];
    }
  }
  
  export class Hexagone extends Shape {
    radius: number;
    height: number;
    constructor() {
      super();
      this.radius = null;
      this.height = null;
    }
  }
  
  export class Wedge extends Shape {
    narrower_xlength: number;
    size: [number,number,number];
    constructor() {
      super();
      this.narrower_xlength = null;
      this.size = [null,null,null];
    }
  }

 
  /////////////////////////////////////////////////////////////////////////////////
 
  export class PlacementTranslation {
    value: [number, number, number];
    constructor(){this.value = [0,0,0]}
  }
  
  export class PlacementRotation {
    axis: [number, number, number];
    angle: number;
    constructor(){this.axis = [0,0,1];this.angle = 0;}
  }
  
  /////////////////////////////////////////////////////////////////////////////////
  export class Appearance {
    color: string;
    visible: boolean;
    daughters_invisible: boolean;
    line_style: string;
    line_width: number;
    force_solid: boolean;
    force_wireframe: boolean;
    constructor(){
      this.color = 'white';
      this.visible = true;
      this.daughters_invisible = true;
      this.line_style = '.';
      this.line_width = 1;
      this.force_solid = false;
      this.force_wireframe = true;
    }
  }
  /////////////////////////////////////////////////////////////////////////////////
  export class Repeater {}

  export class LinearRepeater {
    repeat_number: number;
    repeat_vector: [number,number,number];
    auto_center: boolean;
    constructor(){
      this.repeat_number = null;
      this.repeat_vector = [null,null,null];
      this.auto_center = true;
    }
  }
  export class RingRepeater {
    repeat_number: number;
    point1: [number,number,number];
    point2: [number,number,number];
    first_angle:  number;
    angular_span: number;
    modulo_number: number;
    z_shift: [number, number, number, number, number, number, number,number];
    auto_rotation: boolean;
    constructor(){
      this.repeat_number = null;
      this.point1 = [0,0,1];
      this.point2 = [0,0,0];
      this.first_angle = 0;
      this.angular_span = Math.PI*2;
      this.modulo_number = 1;
      this.z_shift = [0,0,0,0,0,0,0,0];
      this.auto_rotation = true;
    }
  }
  
  export class CubicArrayRepeater {
    repeat_number: [number, number, number];
    repeat_vector: [number, number, number];
    constructor(){
      this.repeat_number = [null,null,null];
      this.repeat_vector = [null,null,null];
    }
  }
  
  export class QuadrantRepeater {
    line_number: number;
    orientation: number;
    copy_spacing: number;
    max_range: number;
    constructor(){
      this.line_number = null;
      this.orientation = null;
      this.copy_spacing = null;
      this.max_range = null;
    }
  }
  
  export class SphereRepeater {
    radius: number;
    repeat_number_with_theta: number;
    repeat_number_with_phi: number;
    theta_angle: number;
    phi_angle: number;
    constructor(){
      this.radius = null;
      this.repeat_number_with_theta = null;
      this.repeat_number_with_phi = null;
      this.theta_angle = null;
      this.phi_angle = null;
    }
  }
  
  export class GenericRepeater {
    placements_filename: string;
    relative_translation: boolean;
    constructor(){
      this.placements_filename = '';
      this.relative_translation = false;///////////这里还需要确认一下
    }
  }
  
  //////////////////////////////////////////
  export class VoxelizedPhantom {
    name: string;
    insert: string;
    image: string;
    material_database: string;
    range_to_material_file: string;
    hu_to_material_file: string;
    attach: string;
    skip_equal_materials: boolean;
    material_table: string;
    density_table: string;
    density_tolerance: number;
    output_material_database_filename: string;
    output_hu_material_filename: string;
    fictitious_energy: number;
    gamma_discard_energy: number;
    translation?: PlacementTranslation[];
    rotation?: PlacementRotation[];
    repeat?:Array<any>;
    constructor(){
      this.name = '';
      this.insert = '';
      this.image = '';
      this.material_database = '';
      this.range_to_material_file = '';
      this.hu_to_material_file = '';
      this.attach = '';
      this.skip_equal_materials = false;
      this.material_table = '';
      this.density_table = '';
      this.density_tolerance = null;
      this.output_material_database_filename = '';
      this.output_hu_material_filename = '';
      this.fictitious_energy = null;
      this.gamma_discard_energy = null;
      this.translation = [new PlacementTranslation()];
      this.rotation = [new PlacementRotation()];
      this.repeat = [undefined];
    }
  }