import {
  Box,
  Cone,
  Cylinder,
  Ellipsoid,
  EllipticalTube,
  Hexagone,
  Shape,
  Sphere,
  Tessellated,
  TetMeshBox,
  TRPD,
  Value, VariableArr, Vec3,
  Wedge
} from './basic_class';

export class SourceSub {
  type: string;
  content: Source | VoxelizedSource;

  constructor(options: {
    type?: string,
    content?: Source | VoxelizedSource
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Source', 'VoxelizedSource']}; break;
      case 'content': switch (this.type) {
        case 'Source': return 'Source'; break;
        case 'VoxelizedSource': return 'VoxelizedSource'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Source': this.content = new Source(); break;
      case 'VoxelizedSource': this.content = new VoxelizedSource(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class Source {
  name: string;
  type: string;
  content: Gps | PencilBeam | TPSPencilBeam | FastY90;

  constructor(options: {
    name?: string,
    type?: string,
    content?: Gps | PencilBeam | TPSPencilBeam | FastY90
  } = {}) {
    this.name = options.name || '';
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Gps', 'PencilBeam', 'TPSPencilBeam', 'FastY90']}; break;
      case 'content': switch (this.type) {
        case 'Gps': return 'Gps'; break;
        case 'PencilBeam': return 'PencilBeam'; break;
        case 'TPSPencilBeam': return 'TPSPencilBeam'; break;
        case 'FastY90': return 'FastY90'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Gps': this.content = new Gps(); break;
      case 'PencilBeam': this.content = new PencilBeam(); break;
      case 'TPSPencilBeam': this.content = new TPSPencilBeam(); break;
      case 'FastY90': this.content = new FastY90(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class Gps {
  type: string;
  partical: ParticalSub;
  energytype: string;
  spectrum_file: string;
  monoenergy: Value;
  forced_unstable_flag: boolean;
  half_life: HalfLife;
  activity: Value;
  angtype: string;
  mintheta: Value;
  maxtheta: Value;
  minphi: Value;
  maxphi: Value;
  source_shape: SourceShape;
  placement: Vec3;
  attach: string;
  confine: string;
  forbid: string;
  dump: number;
  visualize: SourceVisualize;
  intensity: number;

  constructor(options: {
    type?: string,
    partical?: ParticalSub,
    energytype?: string,
    spectrum_file?: string,
    monoenergy?: Value,
    forced_unstable_flag?: boolean,
    half_life?: HalfLife,
    activity?: Value,
    angtype?: string,
    mintheta?: Value,
    maxtheta?: Value,
    minphi?: Value,
    maxphi?: Value,
    source_shape?: SourceShape,
    placement?: Vec3,
    attach?: string,
    confine?: string,
    forbid?: string,
    dump?: number,
    visualize?: SourceVisualize,
    intensity?: number
  } = {}) {
    this.type = options.type || '';
    this.partical = options.partical || new ParticalSub();
    this.energytype = options.energytype || '';
    this.spectrum_file = options.spectrum_file || '';
    this.monoenergy = options.monoenergy || new Value();
    this.forced_unstable_flag = options.forced_unstable_flag || false;
    this.half_life = options.half_life || new HalfLife();
    this.activity = options.activity || new Value();
    this.angtype = options.angtype || '';
    this.mintheta = options.mintheta || new Value();
    this.maxtheta = options.maxtheta || new Value();
    this.minphi = options.minphi || new Value();
    this.maxphi = options.maxphi || new Value();
    this.source_shape = options.source_shape || new SourceShape();
    this.placement = options.placement || new Vec3();
    this.attach = options.attach || '';
    this.confine = options.confine || '';
    this.forbid = options.forbid || '';
    this.dump = options.dump || null;
    this.visualize = options.visualize || new SourceVisualize();
    this.intensity = options.intensity || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return 'string'; break;
      case 'partical': return 'ParticalSub'; break;
      case 'energytype': return 'string'; break;
      case 'spectrum_file': return 'string'; break;
      case 'monoenergy': return 'Value'; break;
      case 'forced_unstable_flag': return 'boolean'; break;
      case 'half_life': return 'HalfLife'; break;
      case 'activity': return 'Value'; break;
      case 'angtype': return 'string'; break;
      case 'mintheta': return 'Value'; break;
      case 'maxtheta': return 'Value'; break;
      case 'minphi': return 'Value'; break;
      case 'maxphi': return 'Value'; break;
      case 'source_shape': return 'SourceShape'; break;
      case 'placement': return 'Vec3'; break;
      case 'attach': return 'string'; break;
      case 'confine': return 'string'; break;
      case 'forbid': return 'string'; break;
      case 'dump': return 'number'; break;
      case 'visualize': return 'SourceVisualize'; break;
      case 'intensity': return 'number'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class PencilBeam {
  particle_type: ParticalTypeSub;
  energy: Value;
  sigma_energy: Value;
  position: Vec3;
  sigma_x: Value;
  sigma_y: Value;
  sigma_theta: Value;
  sigma_phi: Value;
  ellipse_x_theta_emittance: Value;    // unit: mm * mrad
  ellipse_y_theta_emittance: Value;    // unit: mm * mrad
  ellipse_x_theta_rotation_norm: string;   // negative or positive
  ellipse_y_theta_rotation_norm: string;   // negative or positive
  rotation_axis: [number, number, number];
  rotation_angle: Value;
  test_flag: boolean;
  total_number_of_primaries: number;

  constructor(options: {
    particle_type?: ParticalTypeSub,
    energy?: Value,
    sigma_energy?: Value,
    position?: Vec3,
    sigma_x?: Value,
    sigma_y?: Value,
    sigma_theta?: Value,
    sigma_phi?: Value,
    ellipse_x_theta_emittance?: Value,
    ellipse_y_theta_emittance?: Value,
    ellipse_x_theta_rotation_norm?: string,
    ellipse_y_theta_rotation_norm?: string,
    rotation_axis?: [number, number, number],
    rotation_angle?: Value,
    test_flag?: boolean,
    total_number_of_primaries?: number
  } = {}) {
    this.particle_type = options.particle_type || new ParticalTypeSub();
    this.energy = options.energy || new Value();
    this.sigma_energy = options.sigma_energy || new Value();
    this.position = options.position || new Vec3();
    this.sigma_x = options.sigma_x || new Value();
    this.sigma_y = options.sigma_y || new Value();
    this.sigma_theta = options.sigma_theta || new Value();
    this.sigma_phi = options.sigma_phi || new Value();
    this.ellipse_x_theta_emittance = options.ellipse_x_theta_emittance || new Value();
    this.ellipse_y_theta_emittance = options.ellipse_y_theta_emittance || new Value();
    this.ellipse_x_theta_rotation_norm = options.ellipse_x_theta_rotation_norm || '';
    this.ellipse_y_theta_rotation_norm = options.ellipse_y_theta_rotation_norm || '';
    this.rotation_axis = options.rotation_axis || [null, null, null];
    this.rotation_angle = options.rotation_angle || new Value();
    this.test_flag = options.test_flag || false;
    this.total_number_of_primaries = options.total_number_of_primaries || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'particle_type': return 'ParticalTypeSub'; break;
      case 'energy': return 'Value'; break;
      case 'sigma_energy': return 'Value'; break;
      case 'position': return 'Vec3'; break;
      case 'sigma_x': return 'Value'; break;
      case 'sigma_y': return 'Value'; break;
      case 'sigma_theta': return 'Value'; break;
      case 'sigma_phi': return 'Value'; break;
      case 'ellipse_x_theta_emittance': return 'Value'; break;
      case 'ellipse_y_theta_emittance': return 'Value'; break;
      case 'ellipse_x_theta_rotation_norm': return 'string'; break;
      case 'ellipse_y_theta_rotation_norm': return 'string'; break;
      case 'rotation_axis': return ['number', 'number', 'number']; break;
      case 'rotation_angle': return 'Value'; break;
      case 'test_flag': return 'boolean'; break;
      case 'total_number_of_primaries': return 'number'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class TPSPencilBeam {
  particle_type: ParticalTypeSub;
  plan: string;
  allowed_field: AllowedField;
  spot_intensity_as_nbions: boolean;
  flat_generation_flag: boolean;
  sorted_spot_generation_flag: boolean;
  source_description_file: string;
  beam_convergence: BeamConvergenceSub;
  sigma_energy_in_MeV_flag: boolean;
  test_flag: boolean;
  total_number_of_primaries: number;

  constructor(options: {
    particle_type?: ParticalTypeSub,
    plan?: string,
    allowed_field?: AllowedField,
    spot_intensity_as_nbions?: boolean,
    flat_generation_flag?: boolean,
    sorted_spot_generation_flag?: boolean,
    source_description_file?: string,
    beam_convergence?: BeamConvergenceSub,
    sigma_energy_in_MeV_flag?: boolean,
    test_flag?: boolean,
    total_number_of_primaries?: number
  } = {}) {
    this.particle_type = options.particle_type || new ParticalTypeSub();
    this.plan = options.plan || '';
    this.allowed_field = options.allowed_field || new AllowedField();
    this.spot_intensity_as_nbions = options.spot_intensity_as_nbions || false;
    this.flat_generation_flag = options.flat_generation_flag || false;
    this.sorted_spot_generation_flag = options.sorted_spot_generation_flag || false;
    this.source_description_file = options.source_description_file || '';
    this.beam_convergence = options.beam_convergence || new BeamConvergenceSub();
    this.sigma_energy_in_MeV_flag = options.sigma_energy_in_MeV_flag || false;
    this.test_flag = options.test_flag || false;
    this.total_number_of_primaries = options.total_number_of_primaries || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'particle_type': return 'ParticalTypeSub'; break;
      case 'plan': return 'string'; break;
      case 'allowed_field': return 'AllowedField'; break;
      case 'spot_intensity_as_nbions': return 'boolean'; break;
      case 'flat_generation_flag': return 'boolean'; break;
      case 'sorted_spot_generation_flag': return 'boolean'; break;
      case 'source_description_file': return 'string'; break;
      case 'beam_convergence': return 'BeamConvergenceSub'; break;
      case 'sigma_energy_in_MeV_flag': return 'boolean'; break;
      case 'test_flag': return 'boolean'; break;
      case 'total_number_of_primaries': return 'number'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class FastY90 {
  min_brem_energy: Value;
  positron_probability: number;
  load_voxelized_phantom: string;
  voxelized_phantom_position: Vec3;

  constructor(options: {
    min_brem_energy?: Value,
    positron_probability?: number,
    load_voxelized_phantom?: string,
    voxelized_phantom_position?: Vec3
  } = {}) {
    this.min_brem_energy = options.min_brem_energy || new Value();
    this.positron_probability = options.positron_probability || null;
    this.load_voxelized_phantom = options.load_voxelized_phantom || '';
    this.voxelized_phantom_position = options.voxelized_phantom_position || new Vec3();
  }

  input_type(key: string) {
    switch (key) {
      case 'min_brem_energy': return 'Value'; break;
      case 'positron_probability': return 'number'; break;
      case 'load_voxelized_phantom': return 'string'; break;
      case 'voxelized_phantom_position': return 'Vec3'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class ParticalSub {
  type: string;
  content: string | Ion;     // Ion

  constructor(options: {
    type?: string,
    content?: string | Ion
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Ion', 'other partical']}; break;
      case 'content': switch (this.type) {
        case 'Ion': return 'Ion'; break;
        case 'other partical': return 'other partical'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Ion': this.content = new Ion(); break;
      case 'other partical': this.content = ''; break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}

export class ParticalTypeSub {
  type: string;
  content: string | Ion;     // Ion

  constructor(options: {
    type?: string,
    content?: string | Ion
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['GenericIon', 'other partical']}; break;
      case 'content': switch (this.type) {
        case 'GenericIon': return 'GenericIon'; break;
        case 'other partical': return 'other partical'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'GenericIon': this.content = new Ion(); break;
      case 'other partical': this.content = ''; break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}

export class Ion {
  z: number;
  a: number;
  q: number;
  e: number;

  constructor(options: {
    z?: number,
    a?: number,
    q?: number,
    e?: number
  } = {}) {
    this.z = options.z || null;
    this.a = options.a || null;
    this.q = options.q || null;
    this.e = options.e || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'z': return 'number'; break;
      case 'a': return 'number'; break;
      case 'q': return 'number'; break;
      case 'e': return 'number'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class HalfLife {
  use_default_half_life: boolean;
  forced_half_life: Value;

  constructor(options: {
    use_default_half_life?: boolean,
    forced_half_life?: Value
  } = {}) {
    this.use_default_half_life = options.use_default_half_life || false;
    this.forced_half_life = options.forced_half_life || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'use_default_half_life': return 'boolean'; break;
      case 'forced_half_life': return 'Value'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class SourceShape {
  type: string;
  content: undefined | VolumeOrSurface | Plane;

  constructor(options: {
    type?: string,
    content?: undefined | VolumeOrSurface | Plane
  } = {}) {
    this.type = options.type || 'Point';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Point', 'Beam', 'Volume', 'Surface', 'Plane']}; break;
      case 'content': switch (this.type) {
        case 'Point': return 'Point'; break;
        case 'Beam': return 'Beam'; break;
        case 'Volume': return 'Volume'; break;
        case 'Surface': return 'Surface'; break;
        case 'Plane': return 'Plane'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Point': this.content = undefined; break;
      case 'Beam': this.content = undefined; break;
      case 'Volume': this.content = new VolumeOrSurface(); break;
      case 'Surface': this.content = new VolumeOrSurface(); break;
      case 'Plane': this.content = new Plane(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}

export class VolumeOrSurface {
  type: string;
  content: SourceShpere | SourceEllipsoid | SourceCylinder | SourcePara;

  constructor(options: {
    type?: string,
    content?: SourceShpere | SourceEllipsoid | SourceCylinder | SourcePara
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Shpere', 'Ellipsoid', 'Cylinder', 'Para']}; break;
      case 'content': switch (this.type) {
        case 'Shpere': return 'Shpere'; break;
        case 'Ellipsoid': return 'Ellipsoid'; break;
        case 'Cylinder': return 'Cylinder'; break;
        case 'Para': return 'Para'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Shpere': this.content = new SourceShpere(); break;
      case 'Ellipsoid': this.content = new SourceEllipsoid(); break;
      case 'Cylinder': this.content = new SourceCylinder(); break;
      case 'Para': this.content = new SourcePara(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}

export class Plane {
  type: string;
  content: SourceCircle | SourceAnnulus | SourceEllipse | SourceSquare | SourceRectangle;

  constructor(options: {
    type?: string,
    content?: SourceCircle | SourceAnnulus | SourceEllipse | SourceSquare | SourceRectangle
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Circle', 'Annulus', 'Ellipse', 'Square', 'Rectangle']}; break;
      case 'content': switch (this.type) {
        case 'Circle': return 'Circle'; break;
        case 'Annulus': return 'Annulus'; break;
        case 'Ellipse': return 'Ellipse'; break;
        case 'Square': return 'Square'; break;
        case 'Rectangle': return 'Rectangle'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Circle': this.content = new SourceCircle(); break;
      case 'Annulus': this.content = new SourceAnnulus(); break;
      case 'Ellipse': this.content = new SourceEllipse(); break;
      case 'Square': this.content = new SourceSquare(); break;
      case 'Rectangle': this.content = new SourceRectangle(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class SourceShpere {
  radius: Value;

  constructor(options: {
    radius?: Value
  } = {}) {
    this.radius = options.radius || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'radius': return 'Value'; break;
    }
  }
}

export class SourceEllipsoid {
  half_lenghth: Vec3;

  constructor(options: {
    half_lenghth?: Vec3
  } = {}) {
    this.half_lenghth = options.half_lenghth || new Vec3();
  }

  input_type(key: string) {
    switch (key) {
      case 'half_lenghth': return 'Vec3'; break;
    }
  }
}

export class SourceCylinder {
  radius: Value;
  halfz: Value;

  constructor(options: {
    radius?: Value,
    halfz?: Value
  } = {}) {
    this.radius = options.radius || new Value();
    this.halfz = options.halfz || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'radius': return 'Value'; break;
      case 'halfz': return 'Value'; break;
    }
  }
}

export class SourcePara {
  half_lenghth: Vec3;
  alpha: Value;
  theta: Value;
  phi: Value;

  constructor(options: {
    half_lenghth?: Vec3,
    alpha?: Value,
    theta?: Value,
    phi?: Value
  } = {}) {
    this.half_lenghth = options.half_lenghth || new Vec3();
    this.alpha = options.alpha || new Value();
    this.theta = options.theta || new Value();
    this.phi = options.phi || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'half_lenghth': return 'Vec3'; break;
      case 'alpha': return 'Value'; break;
      case 'theta': return 'Value'; break;
      case 'phi': return 'Value'; break;
    }
  }
}

export class SourceCircle {
  radius: Value;

  constructor(options: {
    radius?: Value
  } = {}) {
    this.radius = options.radius || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'radius': return 'Value'; break;
    }
  }
}

export class SourceAnnulus {
  inner_radius: Value;
  outer_radius: Value;

  constructor(options: {
    inner_radius?: Value,
    outer_radius?: Value
  } = {}) {
    this.inner_radius = options.inner_radius || new Value();
    this.outer_radius = options.outer_radius || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'inner_radius': return 'Value'; break;
      case 'outer_radius': return 'Value'; break;
    }
  }
}

export class SourceEllipse {
  half_x: Value;
  half_y: Value;

  constructor(options: {
    half_x?: Value,
    half_y?: Value
  } = {}) {
    this.half_x = options.half_x || new Value();
    this.half_y = options.half_y || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'half_x': return 'Value'; break;
      case 'half_y': return 'Value'; break;
    }
  }
}

export class SourceSquare {
  half_x: Value;
  half_y: Value;

  constructor(options: {
    half_x?: Value,
    half_y?: Value
  } = {}) {
    this.half_x = options.half_x || new Value();
    this.half_y = options.half_y || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'half_x': return 'Value'; break;
      case 'half_y': return 'Value'; break;
    }
  }
}

export class SourceRectangle {
  half_x: Value;
  half_y: Value;

  constructor(options: {
    half_x?: Value,
    half_y?: Value
  } = {}) {
    this.half_x = options.half_x || new Value();
    this.half_y = options.half_y || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'half_x': return 'Value'; break;
      case 'half_y': return 'Value'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class SourceVisualize {
  count: number;
  color: string;
  size: number;

  constructor(options: {
    count?: number,
    color?: string,
    size?: number
  } = {}) {
    this.count = options.count || null;
    this.color = options.color || '';
    this.size = options.size || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'count': return 'number'; break;
      case 'color': return 'string'; break;
      case 'size': return 'number'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class AllowedField {
  set: string;
  id: VariableArr | LayerID | SpotID;

  constructor(options: {
    set?: string,
    id?: VariableArr | LayerID | SpotID
  } = {}) {
    this.set = options.set || 'undefined';
    this.id = options.id || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'set': return {type: this.set, subclass: ['AllowedFieldID', 'NotAllowedFieldID', 'LayerID', 'SpotID']}; break;
      case 'id': switch (this.set) {
        case 'AllowedFieldID': return 'AllowedFieldID'; break;
        case 'NotAllowedFieldID': return 'NotAllowedFieldID'; break;
        case 'LayerID': return 'LayerID'; break;
        case 'SpotID': return 'SpotID'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.set) {
      case 'AllowedFieldID': this.id = new VariableArr('number'); break;
      case 'NotAllowedFieldID': this.id = new VariableArr('number'); break;
      case 'LayerID': this.id = new LayerID(); break;
      case 'SpotID': this.id = new SpotID(); break;
      default: this.set = 'undefined'; this.id = undefined;
    }
  }
}

export class LayerID {
  field: number;
  layer: number;

  constructor(options: {
    field?: number,
    layer?: number,
  } = {}) {
    this.field = options.field || null;
    this.layer = options.layer || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'field': return 'number'; break;
      case 'layer': return 'number'; break;
    }
  }
}

export class SpotID {
  field: number;
  layer: number;
  spot: number;

  constructor(options: {
    field?: number,
    layer?: number,
    spot?: number,
  } = {}) {
    this.field = options.field || null;
    this.layer = options.layer || null;
    this.spot = options.spot || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'field': return 'number'; break;
      case 'layer': return 'number'; break;
      case 'spot': return 'number'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class BeamConvergenceSub {
  type: string;
  content: boolean | BeamConvergenceAxis;

  constructor(options: {
    type?: string,
    content?: boolean | BeamConvergenceAxis
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['system', 'axis']}; break;
      case 'content': switch (this.type) {
        case 'system': return 'system'; break;
        case 'axis': return 'axis'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'system': this.content = false; break;
      case 'axis': this.content = new BeamConvergenceAxis(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}

export class BeamConvergenceAxis {
  beam_convergence_x_theta: boolean;
  beam_convergence_y_phi: boolean;

  constructor(options: {
    beam_convergence_x_theta?: boolean,
    beam_convergence_y_phi?: boolean
  } = {}) {
    this.beam_convergence_x_theta = options.beam_convergence_x_theta || false;
    this.beam_convergence_y_phi = options.beam_convergence_y_phi || false;
  }

  input_type(key: string) {
    switch (key) {
      case 'beam_convergence_x_theta': return 'boolean'; break;
      case 'beam_convergence_y_phi': return 'boolean'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class VoxelizedSource {
  name: string;
  insert_reader: string;
  insert_translator: TranslatorSub;
  read_file: string;
  verbose: boolean;
  position: Vec3;
  dump: boolean;
  type: string;
  particle: string;
  energy_type: string;
  monoenergy: Value;
  angtype: string;
  mintheta: Value;
  maxtheta: Value;
  minphi: Value;
  maxphi: Value;
  confine: string;
  forced_unstable_flag: boolean;
  forced_half_life: Value;

  constructor(options: {
    name?: string,
    insert_reader?: string,
    insert_translator?: TranslatorSub,
    read_file?: string,
    verbose?: boolean,
    position?: Vec3,
    dump?: boolean,
    type?: string,
    particle?: string,
    energy_type?: string,
    monoenergy?: Value,
    angtype?: string,
    mintheta?: Value,
    maxtheta?: Value,
    minphi?: Value,
    maxphi?: Value,
    confine?: string,
    forced_unstable_flag?: boolean,
    forced_half_life?: Value
  } = {}) {
    this.name = options.name || '';
    this.insert_reader = options.insert_reader || '';
    this.insert_translator = options.insert_translator || new TranslatorSub();
    this.read_file = options.read_file || '';
    this.verbose = options.verbose || false;
    this.position = options.position || new Vec3();
    this.dump = options.dump || false;
    this.type = options.type || '';
    this.particle = options.particle || '';
    this.energy_type = options.energy_type || '';
    this.monoenergy = options.monoenergy || new Value();
    this.angtype = options.angtype || '';
    this.mintheta = options.mintheta || new Value();
    this.maxtheta = options.maxtheta || new Value();
    this.minphi = options.minphi || new Value();
    this.maxphi = options.maxphi || new Value();
    this.confine = options.confine || '';
    this.forced_unstable_flag = options.forced_unstable_flag || false;
    this.forced_half_life = options.forced_half_life || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'name': return 'string'; break;
      case 'insert_reader': return 'string'; break;
      case 'insert_translator': return 'TranslatorSub'; break;
      case 'read_file': return 'string'; break;
      case 'verbose': return 'boolean'; break;
      case 'position': return 'Vec3'; break;
      case 'dump': return 'boolean'; break;
      case 'type': return 'string'; break;
      case 'particle': return 'string'; break;
      case 'energy_type': return 'string'; break;
      case 'monoenergy': return 'Value'; break;
      case 'angtype': return 'string'; break;
      case 'mintheta': return 'Value'; break;
      case 'maxtheta': return 'Value'; break;
      case 'minphi': return 'Value'; break;
      case 'maxphi': return 'Value'; break;
      case 'confine': return 'string'; break;
      case 'forced_unstable_flag': return 'boolean'; break;
      case 'forced_half_life': return 'Value'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class Translator {
  insert: boolean;

  constructor(options: {
    insert?: boolean
  } = {}) {
    this.insert = options.insert || false;
  }
}

export class LinearTranslator extends Translator {
  scale: boolean;

  constructor(options: {
    insert?: boolean,
    scale?: boolean
  } = {}) {
    super({insert: options.insert});
    this.scale = options.scale || false;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'scale': return 'boolean'; break;
    }
  }
}

export class RangeTranslator extends Translator {
  read_table: string;
  describe: boolean;

  constructor(options: {
    insert?: boolean,
    read_table?: string,
    describe?: boolean
  } = {}) {
    super({insert: options.insert});
    this.read_table = options.read_table || '';
    this.describe = options.describe || false;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'read_table': return 'string'; break;
      case 'describe': return 'boolean'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////
export class TranslatorSub {
  type: string;
  content: Translator;

  constructor(options: {
    type?: string,
    content?: Translator
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['LinearTranslator', 'RangeTranslator',
          'Cylinder', 'Cone', 'Ellipsoid', 'EllipticalTube', 'Tessellated',
          'TetMeshBox', 'TRPD', 'Hexagone', 'Wedge']}; break;
      case 'content': switch (this.type) {
        case 'LinearTranslator': return 'LinearTranslator'; break;
        case 'RangeTranslator': return 'RangeTranslator'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'LinearTranslator': this.content = new LinearTranslator(); break;
      case 'RangeTranslator': this.content = new RangeTranslator(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
