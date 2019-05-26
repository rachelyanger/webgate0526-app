import {VariableArr, Volume, VoxelizedPhantom} from './basic_class';

export class Geometry {
  world: Volume;              // shape 为 box
  scanner: SystemSub;
  phantom: PhantomSub;

  constructor(options: {
    world?: Volume,
    scanner?: SystemSub,
    phantom?: PhantomSub
  } = {}) {
    this.world = options.world || new Volume({name: 'world'});
    this.scanner = options.scanner || new SystemSub();
    this.phantom = options.phantom || new PhantomSub();
  }

  input_type(key: string) {
    switch (key) {
      case 'world': return 'Volume'; break;
      case 'scanner': return 'SystemSub'; break;
      case 'phantom': return 'PhantomSub'; break;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////
export class SystemSub {
  type: string;
  content: System;

  constructor(options: {
    type?: string,
    content?: System
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Scanner', 'CTscanner',
          'CylindricalPET', 'CPET', 'ECAT', 'ECATAccel', 'OPET', 'SPECThead']}; break;
      case 'content': return this.type; break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Scanner': this.content = new Scanner(); break;
      case 'CTscanner': this.content = new CTscanner(); break;
      case 'CylindricalPET': this.content = new CylindricalPET(); break;
      case 'CPET': this.content = new CPET(); break;
      case 'ECAT': this.content = new ECAT(); break;
      case 'ECATAccel': this.content = new ECATAccel(); break;
      case 'OPET': this.content = new OPET(); break;
      case 'SPECThead': this.content = new SPECThead(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////
export class PhantomSub {
  type: string;
  content: Volume | VoxelizedPhantom;

  constructor(options: {
    type?: string,
    content?: Volume | VoxelizedPhantom
  } = {}) {
    this.type = options.type || 'undefined';
    this.content = options.content || undefined;
  }

  input_type(key: string) {
    switch (key) {
      case 'type': return {type: this.type, subclass: ['Volume', 'VoxelizedPhantom']}; break;
      case 'content': return this.type; break;
    }
  }

  choose_subclass() {
    switch (this.type) {
      case 'Volume': this.content = new Volume(); break;
      case 'VoxelizedPhantom': this.content = new VoxelizedPhantom(); break;
      default: this.type = 'undefined'; this.content = undefined;
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////
export class System {
  base: Volume;

  constructor(options: {
    base?: Volume
  } = {}) {
    this.base = options.base || new Volume();
  }
}

export class Scanner extends System {
  level1: Volume;
  level2: Volume;
  level3: Volume;
  level4: Volume;
  level5: Volume;

  constructor(options: {
    base?: Volume,
    level1?: Volume,
    level2?: Volume,
    level3?: Volume,
    level4?: Volume,
    level5?: Volume
  } = {}) {
    super({base: options.base});
    this.level1 = options.level1 || new Volume();
    this.level2 = options.level2 || new Volume();
    this.level3 = options.level3 || new Volume();
    this.level4 = options.level4 || new Volume();
    this.level5 = options.level5 || new Volume();
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'level1': return 'Volume'; break;
      case 'level2': return 'Volume'; break;
      case 'level3': return 'Volume'; break;
      case 'level4': return 'Volume'; break;
      case 'level5': return 'Volume'; break;
    }
  }
}

export class CTscanner extends System {
  module: Volume;
  cluster: VariableArr;         // max3
  pixel: VariableArr;           // max3

  constructor(options: {
    base?: Volume,
    module?: Volume,
    cluster?: VariableArr,
    pixel?: VariableArr
  } = {}) {
    super({base: options.base});
    this.module = options.module || new Volume();
    this.cluster = options.cluster || new VariableArr('Volume');
    this.pixel = options.pixel || new VariableArr('number');
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'module': return 'Volume'; break;
      case 'cluster': return 'VariableArr'; break;
      case 'pixel': return 'VariableArr'; break;
    }
  }
}

export class CylindricalPET extends System {
  rsector: Volume;
  module: Volume;
  submodule: Volume;
  crystal: Volume;
  layer: VariableArr;           // max4

  constructor(options: {
    base?: Volume,
    rsector?: Volume,
    module?: Volume,
    submodule?: Volume,
    crystal?: Volume,
    layer?: VariableArr
  } = {}) {
    super({base: options.base});
    this.rsector = options.rsector || new Volume();
    this.module = options.module || new Volume();
    this.submodule = options.submodule || new Volume();
    this.crystal = options.crystal || new Volume();
    this.layer = options.layer || new VariableArr('Volume');
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'rsector': return 'Volume'; break;
      case 'module': return 'Volume'; break;
      case 'submodule': return 'Volume'; break;
      case 'crystal': return 'Volume'; break;
      case 'layer': return 'VariableArr'; break;
    }
  }
}

export class CPET extends System {
  sector: Volume;
  cassette: Volume;
  module: Volume;
  crystal: Volume;
  layer: VariableArr;          // max4

  constructor(options: {
    base?: Volume,
    sector?: Volume,
    cassette?: Volume,
    module?: Volume,
    crystal?: Volume,
    layer?: VariableArr
  } = {}) {
    super({base: options.base});
    this.sector = options.sector || new Volume();
    this.cassette = options.cassette || new Volume();
    this.module = options.module || new Volume();
    this.crystal = options.crystal || new Volume();
    this.layer = options.layer || new VariableArr('Volume');
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'sector': return 'Volume'; break;
      case 'cassette': return 'Volume'; break;
      case 'module': return 'Volume'; break;
      case 'crystal': return 'Volume'; break;
      case 'layer': return 'VariableArr'; break;
    }
  }
}

export class ECAT extends System {
  block: Volume;
  crystal: Volume;

  constructor(options: {
    base?: Volume,
    block?: Volume,
    crystal?: Volume
  } = {}) {
    super({base: options.base});
    this.block = options.block || new Volume();
    this.crystal = options.crystal || new Volume();
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'block': return 'Volume'; break;
      case 'crystal': return 'Volume'; break;
    }
  }
}

export class ECATAccel extends System {
  block: Volume;
  crystal: Volume;

  constructor(options: {
    base?: Volume,
    block?: Volume,
    crystal?: Volume
  } = {}) {
    super({base: options.base});
    this.block = options.block || new Volume();
    this.crystal = options.crystal || new Volume();
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'block': return 'Volume'; break;
      case 'crystal': return 'Volume'; break;
    }
  }
}

export class OPET extends System {
  rsector: Volume;
  module: Volume;
  submodule: Volume;
  crystal: Volume;
  layer: VariableArr;            // max8

  constructor(options: {
    base?: Volume,
    rsector?: Volume,
    module?: Volume,
    submodule?: Volume,
    crystal?: Volume,
    layer?: VariableArr
  } = {}) {
    super({base: options.base});
    this.rsector = options.rsector || new Volume();
    this.module = options.module || new Volume();
    this.submodule = options.submodule || new Volume();
    this.crystal = options.crystal || new Volume();
    this.layer = options.layer || new VariableArr('Volume');
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'rsector': return 'Volume'; break;
      case 'module': return 'Volume'; break;
      case 'submodule': return 'Volume'; break;
      case 'crystal': return 'Volume'; break;
      case 'layer': return 'VariableArr'; break;
    }
  }
}

export class SPECThead extends System {
  crystal: Volume;
  pixel: Volume;

  constructor(options: {
    base?: Volume,
    crystal?: Volume,
    pixel?: Volume
  } = {}) {
    super({base: options.base});
    this.crystal = options.crystal || new Volume();
    this.pixel = options.pixel || new Volume();
  }

  input_type(key: string) {
    switch (key) {
      case 'base': return 'Volume'; break;
      case 'crystal': return 'Volume'; break;
      case 'pixel': return 'Volume'; break;
    }
  }
}
