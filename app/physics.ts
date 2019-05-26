import {
  Box,
  Cone,
  Cylinder,
  Ellipsoid,
  EllipticalTube, Hexagone,
  Shape,
  Sphere, Tessellated, TetMeshBox, TRPD,
  Value,
  VariableArr,
  Vec3,
  Volume,
  VoxelizedPhantom, Wedge
} from './basic_class';
import {CubicArrayRepeater, GenericRepeater, LinearRepeater, QuadrantRepeater, RingRepeater, SphereRepeater} from './act';

export class Physics {
  physics_list: string;
  cut_in_region: VariableArr;
  // cut_in_patient: CutInRegion;
  activate_step_limiter: string;
  process: VariableArr;
  mag_field: Vec3;

  constructor(options: {
    physics_list?: string,
    cut_in_region?: VariableArr, // CutInRegion,
    // cut_in_patient?: CutInRegion,
    activate_step_limiter?: string,
    process?: VariableArr,
    mag_field?: Vec3
  } = {}) {
    this.physics_list = options.physics_list || '';
    this.cut_in_region = options.cut_in_region || new VariableArr('C');
    // this.cut_in_patient = options.cut_in_patient || new CutInRegion();
    this.activate_step_limiter = options.activate_step_limiter || '';
    this.process = options.process || new VariableArr('Process');
    this.mag_field = options.mag_field || new Vec3();
  }

  input_type(key: string) {
    switch (key) {
      case 'physics_list': return 'string'; break;
      case 'cut_in_region': return 'VariableArr'; break;
      // case 'cut_in_patient': return 'CutInRegion'; break;
      case 'activate_step_limiter': return 'string'; break;
      case 'process': return 'VariableArr'; break;
      case 'mag_field': return 'Vec3'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////
export class CutInRegion {
  region: string;
  gamma: Value;
  electron: Value;
  positron: Value;
  proton: Value;
  max_step: Value;

  constructor(options: {
    region?: string,
    gamma?: Value,
    electron?: Value,
    positron?: Value,
    proton?: Value,
    max_step?: Value
  } = {}) {
    this.region = options.region || '';
    this.gamma = options.gamma || new Value();
    this.electron = options.electron || new Value();
    this.positron = options.positron || new Value();
    this.proton = options.proton || new Value();
    this.max_step = options.max_step || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'region': return 'string'; break;
      case 'gamma': return 'Value'; break;
      case 'electron': return 'Value'; break;
      case 'positron': return 'Value'; break;
      case 'proton': return 'Value'; break;
      case 'max_step': return 'Value'; break;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////
export class Process {
  add: boolean;
  process_name: string;
  particle: string;
  model: VariableArr; // Model;

  constructor(options: {
    add?: boolean,
    process_name?: string,
    particle?: string,
    model?: VariableArr
  } = {}) {
    this.add = options.add || true;
    this.process_name = options.process_name || '';
    this.particle = options.particle || '';
    this.model = options.model || new VariableArr('Model');
  }

  input_type(key: string) {
    switch (key) {
      case 'add': return 'boolean'; break;
      case 'process_name': return 'string'; break;
      case 'particle': return 'string'; break;
      case 'model': return 'VariableArr'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////
export class Model {
  set: boolean;
  model_name: string;
  particle: string;
  energy_range: boolean;
  e_max: SetE;
  e_min: SetE;

  constructor(options: {
    set?: boolean,
    model_name?: string,
    particle?: string,
    energy_range?: boolean,
    e_max?: SetE,
    e_min?: SetE
  } = {}) {
    this.set = options.set || true;
    this.model_name = options.model_name || '';
    this.particle = options.particle || '';
    this.energy_range = options.energy_range || false;
    this.e_max = options.e_max || new SetE();
    this.e_min = options.e_min || new SetE();
  }

  input_type(key: string) {
    switch (key) {
      case 'set': return 'boolean'; break;
      case 'model_name': return 'string'; break;
      case 'particle': return 'string'; break;
      case 'energy_range': return 'boolean'; break;
      case 'e_max': return 'SetE'; break;
      case 'e_min': return 'SetE'; break;
    }
  }
}
//////////////////////////////////////////////////////////////////////////////
export class SetE {
  value: Value;
  particle: string;
  option: string;

  constructor(options: {
    value?: Value,
    particle?: string,
    option?: string
  } = {}) {
    this.value = options.value || new Value();
    this.particle = options.particle || '';
    this.option = options.option || '';
  }

  input_type(key: string) {
    switch (key) {
      case 'value': return 'Value'; break;
      case 'particle': return 'string'; break;
      case 'option': return 'string'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////
export class Dataset {
  set: boolean;
  model_name: string;
  particle: string;
  target: VariableArr;

  constructor(options: {
    set?: boolean,
    model_name?: string,
    particle?: string,
    target?: VariableArr
  } = {}) {
    this.set = options.set || false;
    this.model_name = options.model_name || '';
    this.particle = options.particle || '';
    this.target = options.target || new VariableArr('SetDatasetObject');
  }

  input_type(key: string) {
    switch (key) {
      case 'set': return 'boolean'; break;
      case 'model_name': return 'string'; break;
      case 'particle': return 'string'; break;
      case 'target': return 'VariableArr'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////
export class SetDatasetObject {
  type: string;
  content: Process | Dataset;

  constructor(options: {
    type?: string,
    content?: Process | Dataset
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Process', 'Dataset']}; break;
      case 'content': switch (this.type) {
        case 'Process': return 'Process'; break;
        case 'Dataset': return 'Dataset'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case'Process': this.type = 'Process'; this.content = new Process(); break;
      case'Dataset': this.type = 'Dataset'; this.content = new Dataset(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////
export class Distribution {
  constructor() {}
}

export class Flat extends Distribution {
  min: Value;
  max: Value;
  amplitude: Value;

  constructor(options: {
    min?: Value,
    max?: Value,
    amplitude?: Value
  } = {}) {
    super();
    this.min = options.min || new Value();
    this.max = options.max || new Value();
    this.amplitude = options.amplitude || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'min': return 'Value'; break;
      case 'max': return 'Value'; break;
      case 'amplitude': return 'Value'; break;
    }
  }
}

export class Gaussian extends Distribution {
  mean: Value;
  sigma: Value;
  amplitude: Value;

  constructor(options: {
    mean?: Value,
    sigma?: Value,
    amplitude?: Value
  } = {}) {
    super();
    this.mean = options.mean || new Value();
    this.sigma = options.sigma || new Value();
    this.amplitude = options.amplitude || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'mean': return 'Value'; break;
      case 'sigma': return 'Value'; break;
      case 'amplitude': return 'Value'; break;
    }
  }
}

export class Exponential extends Distribution {
  lambda: number;
  amplitude: Value;

  constructor(options: {
    lambda?: number,
    amplitude?: Value
  } = {}) {
    super();
    this.lambda = options.lambda || null;
    this.amplitude = options.amplitude || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'lambda': return 'number'; break;
      case 'amplitude': return 'Value'; break;
    }
  }
}

export class Manual extends Distribution {
  unit_x: string;
  unit_y: string;
  insert_point: [number, number];
  add_point: number;
  auto_x_start: number;

  constructor(options: {
    unit_x?: string,
    unit_y?: string,
    insert_point?: [number, number],
    add_point?: number,
    auto_x_start?: number
  } = {}) {
    super();
    this.unit_x = options.unit_x || '';
    this.unit_y = options.unit_y || '';
    this.insert_point = options.insert_point || [null, null];
    this.add_point = options.add_point || null;
    this.auto_x_start = options.auto_x_start || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'unit_x': return 'string'; break;
      case 'unit_y': return 'string'; break;
      case 'insert_point': return ['number', 'number']; break;
      case 'add_point': return 'number'; break;
      case 'auto_x_start': return 'number'; break;
    }
  }
}

export class File extends Distribution {
  unit_x: string;
  unit_y: string;
  auto_x: boolean;
  auto_x_start: Value;
  file_name: string;
  column_x: number;
  column_y: number;

  constructor(options: {
    unit_x?: string,
    unit_y?: string,
    auto_x?: boolean,
    auto_x_start?: Value,
    file_name?: string,
    column_x?: number,
    column_y?: number
  } = {}) {
    super();
    this.unit_x = options.unit_x || '';
    this.unit_y = options.unit_y || '';
    this.auto_x = options.auto_x || false;
    this.auto_x_start = options.auto_x_start || new Value();
    this.file_name = options.file_name || '';
    this.column_x = options.column_x || null;
    this.column_y = options.column_y || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'unit_x': return 'string'; break;
      case 'unit_y': return 'string'; break;
      case 'auto_x': return 'boolean'; break;
      case 'auto_x_start': return 'Value'; break;
      case 'file_name': return 'string'; break;
      case 'column_x': return 'number'; break;
      case 'column_y': return 'number'; break;
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////
export class DistributionSub {
  type: string;
  content: Distribution;

  constructor(optiond: {
    type?: string,
    content?: Distribution
  } = {}) {
    this.type = optiond.type || 'undefined';
    this.content = optiond.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Flat', 'Gaussian',
          'Exponential', 'Manual', 'File', 'undefined']}; break;
      case 'content': switch (this.type) {
        case 'Flat': return 'Flat'; break;
        case 'Gaussian': return 'Gaussian'; break;
        case 'Exponential': return 'Exponential'; break;
        case 'Manual': return 'Manual'; break;
        case 'File': return 'File'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Flat': this.content = new Flat(); break;
      case 'Gaussian': this.content = new Gaussian(); break;
      case 'Exponential': this.content = new Exponential(); break;
      case 'Manual': this.content = new Manual(); break;
      case 'File': this.content = new File(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////
export class Digitizer {
  adder: Adder;
  readout: Readout;
  blurring: Blurring;
  calibration: Calibration;
  crosstalk: Crosstalk;
  thresholder: Thresholder;
  upholder: Upholder;
  window: VariableArr;
  sigmoidal_thresholder: SigmoidalThresholder;
  time_resolution: TimeResolution;
  noise: Noise;
  local_efficiency: LocalEfficiency;
  buffer: Buffer;
  pileup: Pileup;
  deadtime: DeadTime;
  coincidences: Coincidences;
  coincidence_sorter: VariableArr;
  coincidence_chain: VariableArr;

  constructor(options: {
    adder?: Adder,
    readout?: Readout,
    blurring?: Blurring,
    calibration?: Calibration,
    crosstalk?: Crosstalk,
    thresholder?: Thresholder,
    upholder?: Upholder,
    window?: VariableArr,
    sigmoidal_thresholder?: SigmoidalThresholder,
    time_resolution?: TimeResolution,
    noise?: Noise,
    local_efficiency?: LocalEfficiency,
    buffer?: Buffer,
    pileup?: Pileup,
    deadtime?: DeadTime,
    coincidences?: Coincidences,
    coincidence_sorter?: VariableArr,
    coincidence_chain?: VariableArr
  } = {}) {
    this.adder = options.adder || new Adder();
    this.readout = options.readout || new Readout();
    this.blurring = options.blurring || new Blurring();
    this.calibration = options.calibration || new Calibration();
    this.crosstalk = options.crosstalk || new Crosstalk();
    this.thresholder = options.thresholder || new Thresholder();
    this.upholder = options.upholder || new Upholder();
    this.window = options.window || new VariableArr('Window');
    this.sigmoidal_thresholder = options.sigmoidal_thresholder || new SigmoidalThresholder();
    this.time_resolution = options.time_resolution || new TimeResolution();
    this.noise = options.noise || new Noise();
    this.local_efficiency = options.local_efficiency || new LocalEfficiency();
    this.buffer = options.buffer || new Buffer();
    this.pileup = options.pileup || new Pileup();
    this.deadtime = options.deadtime || new DeadTime();
    this.coincidences = options.coincidences || new Coincidences();
    this.coincidence_sorter = options.coincidence_sorter || new VariableArr('CoincidenceSorter');
    this.coincidence_chain = options.coincidence_chain || new VariableArr('CoincidenceChain');
  }

  input_type(key: string) {
    switch (key) {
      case 'adder': return 'Adder'; break;
      case 'readout': return 'Readout'; break;
      case 'blurring': return 'Blurring'; break;
      case 'calibration': return 'Calibration'; break;
      case 'crosstalk': return 'Crosstalk'; break;
      case 'thresholder': return 'Thresholder'; break;
      case 'upholder': return 'Upholder'; break;
      case 'window': return 'VariableArr'; break;
      case 'sigmoidal_thresholder': return 'SigmoidalThresholder'; break;
      case 'time_resolution': return 'TimeResolution'; break;
      case 'noise': return 'Noise'; break;
      case 'local_efficiency': return 'LocalEfficiency'; break;
      case 'buffer': return 'Buffer'; break;
      case 'pileup': return 'Pileup'; break;
      case 'deadtime': return 'DeadTime'; break;
      case 'coincidences': return 'Coincidences'; break;
      case 'coincidence_sorter': return 'VariableArr'; break;
      case 'coincidence_chain': return 'VariableArr'; break;
    }
  }
}
//////////////////////////////////////////////////////////////////////////////////////////
export class Adder {
  readonly insert: boolean;
  adder_compton: boolean;

  constructor(options: {
    insert?: boolean,
    adder_compton?: boolean
  } = {}) {
    this.insert = options.insert || true;
    this.adder_compton = options.adder_compton || false;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'adder_compton': return 'boolean'; break;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
export class Readout {
  readonly  insert: boolean;
  policy: string;
  depth: number;

  constructor(options: {
    insert?: boolean,
    policy?: string,
    depth?: number
  } = {}) {
    this.insert = options.insert || true;
    this.policy = options.policy || '';
    this.depth = options.depth || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'policy': return 'string'; break;
      case 'depth': return 'number'; break;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
export class Blurring {
  insert: boolean;
  resolution: number;
  energy_of_reference: Value;
  law: BlurringLawSub;
  crystal_blurring: CrystalBlurring;
  local_blurring: VariableArr;
  transfer_efficiency: VariableArr;
  light_yield: VariableArr;
  intrinsic_resolution_blurring: VariableArr;
  quantum_efficiency: VariableArr;
  spblurring: Spblurring;

  constructor(options: {
    insert?: boolean,
    resolution?: number,
    energy_of_reference?: Value,
    law?: BlurringLawSub,
    crystal_blurring?: CrystalBlurring,
    local_blurring?: VariableArr,
    transfer_efficiency?: VariableArr,
    light_yield?: VariableArr,
    intrinsic_resolution_blurring?: VariableArr,
    quantum_efficiency?: VariableArr,
    spblurring?: Spblurring
  } = {}) {
    this.insert = options.insert || false;
    this.resolution = options.resolution || null;
    this.energy_of_reference = options.energy_of_reference || new Value();
    this.law = options.law || new BlurringLawSub();
    this.crystal_blurring = options.crystal_blurring || new CrystalBlurring();
    this.local_blurring = options.local_blurring || new VariableArr('LocalBlurring');
    this.transfer_efficiency = options.transfer_efficiency || new VariableArr('TransferEfficiency');
    this.light_yield = options.light_yield || new VariableArr('LightYield');
    this.intrinsic_resolution_blurring = options.intrinsic_resolution_blurring || new VariableArr('IntrinsicResolutionBlurring');
    this.quantum_efficiency = options.quantum_efficiency || new VariableArr('QuantumEfficiency');
    this.spblurring = options.spblurring || new Spblurring();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert':
        return 'boolean';
        break;
      case 'resolution':
        return 'number';
        break;
      case 'energy_of_reference':
        return 'Value';
        break;
      case 'law':
        return 'BlurringLawSub';
        break;
      case 'crystal_blurring':
        return 'CrystalBlurring';
        break;
      case 'local_blurring':
        return 'VariableArr';
        break;
      case 'transfer_efficiency':
        return 'VariableArr';
        break;
      case 'light_yield':
        return 'VariableArr';
        break;
      case 'intrinsic_resolution_blurring':
        return 'VariableArr';
        break;
      case 'quantum_efficiency':
        return 'VariableArr';
        break;
      case 'spblurring':
        return 'Spblurring';
        break;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////
export class BlurringLaw {
  constructor() {}
}

export class InverseSquareLaw extends BlurringLaw {
  resolution: number;
  energy_of_reference: Value;

  constructor(options: {
    resolution?: number,
    energy_of_reference?: Value
  } = {}) {
    super();
    this.resolution = options.resolution || null;
    this.energy_of_reference = options.energy_of_reference || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'resolution': return 'number'; break;
      case 'energy_of_reference': return 'Value'; break;
    }
  }
}

export class LinearLaw extends BlurringLaw {
  resolution: number;
  energy_of_reference: Value;
  slope: Value;

  constructor(options: {
    resolution?: number,
    energy_of_reference?: Value,
    slope?: Value
  } = {}) {
    super();
    this.resolution = options.resolution || null;
    this.energy_of_reference = options.energy_of_reference || new Value();
    this.slope = options.slope || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'resolution': return 'number'; break;
      case 'energy_of_reference': return 'Value'; break;
      case 'slope': return 'Value'; break;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
export class BlurringLawSub {
  type: string;
  content: BlurringLaw;

  constructor(options: {
    type?: string,
    content?: BlurringLaw
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['InverseSquareLaw', 'LinearLaw']}; break;
      case 'content': switch (this.type) {
        case 'InverseSquareLaw': return 'InverseSquareLaw'; break;
        case 'LinearLaw': return 'LinearLaw'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'InverseSquareLaw': this.content = new InverseSquareLaw(); break;
      case 'LinearLaw': this.content = new LinearLaw(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
export class CrystalBlurring {
  insert: boolean;
  crystal_resolution_min: number;
  crystal_resolution_max: number;
  crystal_qe: number;
  crystal_energy_of_reference: Value;

  constructor(options: {
    insert?: boolean,
    crystal_resolution_min?: number,
    crystal_resolution_max?: number,
    crystal_qe?: number,
    crystal_energy_of_reference?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.crystal_resolution_min = options.crystal_resolution_min || null;
    this.crystal_resolution_max = options.crystal_resolution_max || null;
    this.crystal_qe = options.crystal_qe || null;
    this.crystal_energy_of_reference = options.crystal_energy_of_reference || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'crystal_resolution_min': return 'number'; break;
      case 'crystal_resolution_max': return 'number'; break;
      case 'crystal_qe': return 'number'; break;
      case 'crystal_energy_of_reference': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////
export class LocalBlurring {
  insert: boolean;
  volume: string;
  resolution: number;
  energy_of_reference: Value;

  constructor(options: {
    insert?: boolean,
    volume?: string,
    resolution?: number,
    energy_of_reference?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.volume = options.volume || '';
    this.resolution = options.resolution || null;
    this.energy_of_reference = options.energy_of_reference || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'volume': return 'string'; break;
      case 'resolution': return 'number'; break;
      case 'energy_of_reference': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class TransferEfficiency {
  insert: boolean;
  volume: string;
  tecoef: number;

  constructor(options: {
    insert?: boolean,
    volume?: string,
    tecoef?: number
  } = {}) {
    this.insert = options.insert || false;
    this.volume = options.volume || '';
    this.tecoef = options.tecoef || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'volume': return 'string'; break;
      case 'tecoef': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
export class LightYield {
  insert: boolean;
  volume: string;
  light_output: number;

  constructor(options: {
    insert?: boolean,
    volume?: string,
    light_output?: number
  } = {}) {
    this.insert = options.insert || false;
    this.volume = options.volume || '';
    this.light_output = options.light_output || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'volume': return 'string'; break;
      case 'light_output': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class IntrinsicResolutionBlurring {
  insert: boolean;
  volume: string;
  intrinsic_resolution: number;
  energy_of_reference: Value;

  constructor(options: {
    insert?: boolean,
    volume?: string,
    intrinsic_resolution?: number,
    energy_of_reference?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.volume = options.volume || '';
    this.intrinsic_resolution = options.intrinsic_resolution || null;
    this.energy_of_reference = options.energy_of_reference || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'volume': return 'string'; break;
      case 'intrinsic_resolution': return 'number'; break;
      case 'energy_of_reference': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class QuantumEfficiency {
  insert: boolean;
  volume: string;
  unique_qe: UniqueQeSub;       // number | string[]

  constructor(options: {
    insert?: boolean,
    volume?: string,
    unique_qe?: UniqueQeSub
  } = {}) {
    this.insert = options.insert || false;
    this.volume = options.volume || '';
    this.unique_qe = options.unique_qe || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'volume': return 'string'; break;
      case 'unique_qe': return {type: 'undefined', subclass: ['number', 'string']}; break;
    }
  }
}

export class UniqueQeSub {
  type: string;
  content: number | VariableArr;

  constructor(options: {
    type?: string,
    content?: number | VariableArr
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['number', 'string[]']}; break;
      case 'content': switch (this.type) {
        case 'number': return 'number'; break;
        case 'string[]': return 'VariableArr'; break;
        default: return 'undefined';
      } break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'number': this.content = null; break;
      case 'string[]': this.content = new VariableArr('string'); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Spblurring {
  insert: boolean;
  spresolution: Value;
  verbose: number;

  constructor(options: {
    insert?: boolean,
    spresolution?: Value,
    verbose?: number
  } = {}) {
    this.insert = options.insert || false;
    this.spresolution = options.spresolution || new Value();
    this.verbose = options.verbose || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'spresolution': return 'Value'; break;
      case 'verbose': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Calibration {
  insert: boolean;
  value: number;

  constructor(options: {
    insert?: boolean,
    value?: number
  } = {}) {
    this.insert = options.insert || false;
    this.value = options.value || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'value': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Crosstalk {
  insert: boolean;
  crosstalk_volume: string;
  edges_fraction: number;
  corners_fraction: number;

  constructor(options: {
    insert?: boolean,
    crosstalk_volume?: string,
    edges_fraction?: number,
    corners_fraction?: number
  } = {}) {
    this.insert = options.insert || false;
    this.crosstalk_volume = options.crosstalk_volume || '';
    this.edges_fraction = options.edges_fraction || null;
    this.corners_fraction = options.corners_fraction || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'crosstalk_volume': return 'string'; break;
      case 'edges_fraction': return 'number'; break;
      case 'corners_fraction': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Thresholder {
  insert: boolean;
  value: Value;

  constructor(options: {
    insert?: boolean,
    value?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.value = options.value || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'value': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Upholder {
  insert: boolean;
  value: Value;

  constructor(options: {
    insert?: boolean,
    value?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.value = options.value || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'value': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Window {
  insert: boolean;
  input_name: string;
  thresholder: Thresholder;
  uphold: Upholder;

  constructor(options: {
    insert?: boolean,
    input_name?: string,
    thresholder?: Thresholder,
    uphold?: Upholder
  } = {}) {
    this.insert = options.insert || false;
    this.input_name = options.input_name || '';
    this.thresholder = options.thresholder || new Thresholder();
    this.uphold = options.uphold || new Upholder();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'input_name': return 'string'; break;
      case 'thresholder': return 'Thresholder'; break;
      case 'uphold': return 'Upholder'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class SigmoidalThresholder {
  insert: boolean;
  threshold: Value;
  threshold_alpha: number;
  threshold_percent: number;

  constructor(options: {
    insert?: boolean,
    threshold?: Value,
    threshold_alpha?: number,
    threshold_percent?: number
  } = {}) {
    this.insert = options.insert || false;
    this.threshold = options.threshold || new Value();
    this.threshold_alpha = options.threshold_alpha || null;
    this.threshold_percent = options.threshold_percent || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'threshold': return 'Value'; break;
      case 'threshold_alpha': return 'number'; break;
      case 'threshold_percent': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class TimeResolution {
  insert: boolean;
  value: Value;

  constructor(options: {
    insert?: boolean,
    value?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.value = options.value || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'value': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Noise {
  insert: boolean;
  deltaT_distribution: DistributionSub;
  energy_distribution: DistributionSub;

  constructor(options: {
    insert?: boolean,
    deltaT_distribution?: DistributionSub,
    energy_distribution?: DistributionSub
  } = {}) {
    this.insert = options.insert || false;
    this.deltaT_distribution = options.deltaT_distribution || new DistributionSub();
    this.energy_distribution = options.energy_distribution || new DistributionSub();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'deltaT_distribution': return 'DistributionSub'; break;
      case 'energy_distribution': return 'DistributionSub'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class LocalEfficiency {
  insert: boolean;
  level1: DistributionSub;
  level2: DistributionSub;

  constructor(options: {
    insert?: boolean,
    level1?: DistributionSub,
    level2?: DistributionSub
  } = {}) {
    this.insert = options.insert || false;
    this.level1 = options.level1 || new DistributionSub();
    this.level2 = options.level2 || new DistributionSub();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'level1': return 'DistributionSub'; break;
      case 'level2': return 'DistributionSub'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Buffer {
  insert: boolean;
  buffer_size: Value;
  read_frequency: Value;
  mode: number;

  constructor(options: {
    insert?: boolean,
    buffer_size?: Value,
    read_frequency?: Value,
    mode?: number
  } = {}) {
    this.insert = options.insert || false;
    this.buffer_size = options.buffer_size || new Value();
    this.read_frequency = options.read_frequency || new Value();
    this.mode = options.mode || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'buffer_size': return 'Value'; break;
      case 'read_frequency': return 'Value'; break;
      case 'mode': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Pileup {
  insert: boolean;
  depth: number;
  value: Value;

  constructor(options: {
    insert?: boolean,
    depth?: number,
    value?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.depth = options.depth || null;
    this.value = options.value || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'depth': return 'number'; break;
      case 'value': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class DeadTime {
  insert: boolean;
  value: Value;
  mode: string;
  dt_volume: string;
  buffer_size: Value;
  buffer_mode: number;

  constructor(options: {
    insert?: boolean,
    value?: Value,
    mode?: string,
    dt_volume?: string,
    buffer_size?: Value,
    buffer_mode?: number
  } = {}) {
    this.insert = options.insert || false;
    this.value = options.value || new Value();
    this.mode = options.mode || '';
    this.dt_volume = options.dt_volume || '';
    this.buffer_size = options.buffer_size || new Value();
    this.buffer_mode = options.buffer_mode || null;
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'value': return 'Value'; break;
      case 'mode': return 'string'; break;
      case 'dt_volume': return 'string'; break;
      case 'buffer_size': return 'Value'; break;
      case 'buffer_mode': return 'number'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class Coincidences {
  window: Value;
  min_sector_difference: number;
  offset: Value;
  depth: number;
  all_pulse_open_coinc_gate: boolean;
  multiple_policy: string;

  constructor(options: {
    window?: Value,
    min_sector_difference?: number,
    offset?: Value,
    depth?: number,
    all_pulse_open_coinc_gate?: boolean,
    multiple_policy?: string
  } = {}) {
    this.window = options.window || new Value();
    this.min_sector_difference = options.min_sector_difference || null;
    this.offset = options.offset || new Value();
    this.depth = options.depth || null;
    this.all_pulse_open_coinc_gate = options.all_pulse_open_coinc_gate || false;
    this.multiple_policy = options.multiple_policy || 'keepIfAllAreGoods';
  }

  input_type(key: string) {
    switch (key) {
      case 'window': return 'Value'; break;
      case 'min_sector_difference': return 'number'; break;
      case 'offset': return 'Value'; break;
      case 'depth': return 'number'; break;
      case 'all_pulse_open_coinc_gate': return 'boolean'; break;
      case 'multiple_policy': return 'string'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class CoincidenceSorter {
  insert: boolean;
  name: string;
  input_name: string;
  window: Value;
  offset: Value;

  constructor(options: {
    insert?: boolean,
    name?: string,
    input_name?: string,
    window?: Value,
    offset?: Value
  } = {}) {
    this.insert = options.insert || false;
    this.name = options.name || '';
    this.input_name = options.input_name || '';
    this.window = options.window || new Value();
    this.offset = options.offset || new Value();
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'name': return 'string'; break;
      case 'input_name': return 'string'; break;
      case 'window': return 'Value'; break;
      case 'offset': return 'Value'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class CoincidenceChain {
  insert: boolean;
  name: string;
  input_name: VariableArr;
  source: VariableArr;
  use_priority: boolean;
  deadtime_allevent: boolean;
  module: VariableArr;

  constructor(options: {
    insert?: boolean,
    name?: string,
    input_name?: VariableArr,
    source?: VariableArr,
    use_priority?: boolean,
    deadtime_allevent?: boolean,
    module?: VariableArr
  } = {}) {
    this.insert = options.insert || false;
    this.name = options.name || '';
    this.input_name = options.input_name || new VariableArr('string');
    this.source = options.source || new VariableArr('string');
    this.use_priority = options.use_priority || false;
    this.deadtime_allevent = options.deadtime_allevent || false;
    this.module = options.module || new VariableArr('ModuleSub');
  }

  input_type(key: string) {
    switch (key) {
      case 'insert': return 'boolean'; break;
      case 'name': return 'string'; break;
      case 'input_name': return 'VariableArr'; break;
      case 'source': return 'VariableArr'; break;
      case 'use_priority': return 'boolean'; break;
      case 'deadtime_allevent': return 'boolean'; break;
      case 'module': return 'VariableArr'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////
export class ModuleSub {
  type: string;
  content: Adder | Readout | Blurring | Calibration | Crosstalk | Thresholder | Upholder | Window
    | SigmoidalThresholder | TimeResolution | Noise | LocalEfficiency | Buffer | Pileup | DeadTime | string;

  constructor(options: {
    type?: string;
    content?: Adder | Readout | Blurring | Calibration | Crosstalk | Thresholder | Upholder | Window
      | SigmoidalThresholder | TimeResolution | Noise | LocalEfficiency | Buffer | Pileup | DeadTime | string;
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type':
        return {
          type: this.type, subclass: ['Adder', 'Readout', 'Blurring', 'Calibration',
            'Crosstalk', 'Thresholder', 'Upholder', 'Window', 'SigmoidalThresholder', 'TimeResolution',
            'Noise', 'LocalEfficiency', 'Buffer', 'Pileup', 'DeadTime', 'string']
        };
        break;
      case 'content':
        switch (this.type) {
          case 'Adder':
            return 'Adder';
            break;
          case 'Readout':
            return 'Readout';
            break;
          case 'Blurring':
            return 'Blurring';
            break;
          case 'Calibration':
            return 'Calibration';
            break;
          case 'Crosstalk':
            return 'Crosstalk';
            break;
          case 'Thresholder':
            return 'Thresholder';
            break;
          case 'Upholder':
            return 'Upholder';
            break;
          case 'Window':
            return 'Window';
            break;
          case 'SigmoidalThresholder':
            return 'SigmoidalThresholder';
            break;
          case 'TimeResolution':
            return 'TimeResolution';
            break;
          case 'Noise':
            return 'Noise';
            break;
          case 'LocalEfficiency':
            return 'LocalEfficiency';
            break;
          case 'Buffer':
            return 'Buffer';
            break;
          case 'Pileup':
            return 'Pileup';
            break;
          case 'DeadTime':
            return 'DeadTime';
            break;
          case 'string':
            return 'string';
            break;
          default:
            return 'undefined';
        }
        break;
    }
  }
}

