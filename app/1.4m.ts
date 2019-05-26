import {CylindricalPET, Geometry, PhantomSub, SystemSub} from './geometry';
import {Appearance, Box, Cylinder, ShapeSub, Value, VariableArr, Vec3, Volume} from './basic_class';
import {
  CubicArrayRepeater,
  LinearRepeater,
  Placement,
  PlacementObject,
  PlacementTranslation,
  Repeater,
  RepeatObject,
  RingRepeater
} from './act';
import {
  Adder,
  Blurring, CoincidenceChain,
  Coincidences, CoincidenceSorter,
  CutInRegion,
  DeadTime,
  Digitizer,
  Model,
  Physics,
  Process,
  Readout,
  Thresholder,
  Upholder
} from './physics';
import {Gps, ParticalSub, Source, SourceCylinder, SourceShape, SourceSub, VolumeOrSurface} from './source';
import {DataOutput, Root} from './data_output';
import {Acquisition, EngineSeedSub, MaterialDatabase, TimeSliceSub} from './acquisition&others';

export const geometry_14m = new Geometry({
  world: new Volume({
    shape: new ShapeSub({
      type: 'Box',
      content: new Box({
        size: new Vec3({
          value: [400, 400, 400],
          unit: 'cm'
        })
      })
    })
  }),
  scanner: new SystemSub({
    type: 'CylindricalPET',
    content: new CylindricalPET({
      base: new Volume({
        name: 'cylindricalPET',
        shape: new ShapeSub({
          type: 'Cylinder',
          content: new Cylinder({
            rmax: new Value({
              num: 45,
              unit: 'cm'
            }),
            rmin: new Value({
              num: 40,
              unit: 'cm'
            }),
            height: new Value({
              num: 144,
              unit: 'cm'
            })
          })
        }),
        material: 'Air',
        appearance: new Appearance({
          color: 'white',
          force_wireframe: true
        })
      }),
      rsector: new Volume({
        name: 'head',
        shape: new ShapeSub({
          type: 'Box',
          content: new Box({
            size: new Vec3({
              value: [2, 12, 24],
              unit: 'cm'
            })
          })
        }),
        material: 'Air',
        attach: 'rsector',
        appearance: new Appearance({
          visible: false
        })
      }),
      module: new Volume({
        name: 'block',
        shape: new ShapeSub({
          type: 'Box',
          content: new Box({
            size: new Vec3({
              value: [20, 19.4, 19.4],
              unit: 'mm'
            })
          })
        }),
        material: 'BaSO4',
        attach: 'module',
        appearance: new Appearance({
          visible: false
        })
      }),
      crystal: new Volume({
        name: 'crystal',
        shape: new ShapeSub({
          type: 'Box',
          content: new Box({
            size: new Vec3({
              value: [20, 3, 3],
              unit: 'mm'
            })
          })
        }),
        material: 'LYSO',
        attach: 'crystal',
        attach_crystal: 'attachCrystalSD',
        appearance: new Appearance({
          visible: false
        })
      })
    })
  }),
  phantom: new PhantomSub({
    type: 'Volume',
    content: new Volume({
      name: 'phantom',
      shape: new ShapeSub({
        type: 'Cylinder',
        content: new Cylinder({
          rmax: new Value({num: 9.55, unit: 'mm'}),
          rmin: new Value({num: 8.3, unit: 'mm'}),
          height: new Value({num: 70, unit: 'cm'})
        })
      }),
      material: 'Water',
      attach: 'attachPhantomSD',
      appearance: new Appearance({
        color: 'red',
        force_solid: true,
        force_wireframe: false
      })
    })
  })
});

export const placement_14m = new Placement({
  placement_translation: new VariableArr('PlacementTranslation',
    [
      new PlacementTranslation({
        value: new Vec3({value: [0.0, 0.0, 0.0], unit: 'cm'}),
        target: new VariableArr('PlacementObject', [
          new PlacementObject({type: 'string', content: 'cylindricalPET'}),
          new PlacementObject({type: 'string', content: 'block'}),
          new PlacementObject({type: 'string', content: 'crystal'}),
          new PlacementObject({type: 'string', content: 'phantom'})
        ])
      }),
      new PlacementTranslation({
        value: new Vec3({value: [41, 0.0, 0.0], unit: 'cm'}),
        target: new VariableArr('PlacementObject', [
          new PlacementObject({type: 'string', content: 'head'})
        ])
      })
    ])
});

export const repeater_14m = new Repeater({
  linear_repeater: new VariableArr('LinearRepeater', [
    new LinearRepeater({
      repeat_number: 6,
      repeat_vector: new Vec3({value: [0, 0, 24], unit: 'cm'}),
      target: new VariableArr('RepeatObject', [
        new RepeatObject({type: 'RingRepeater',
          content: new RingRepeater({
            repeat_number: 20,
            target: new VariableArr('RepeatObject', [
              new RepeatObject({type: 'string', content: 'head'})
            ])
          })})
      ])
    })
  ]),
  cubic_array_repeater: new VariableArr('CubicArrayRepeater', [
    new CubicArrayRepeater({
      repeat_number: [1, 6, 6],
      repeat_vector: new Vec3({value: [0.0, 3.2, 3.2], unit: 'mm'}),
      target: new VariableArr('RepeatObject', [
        new RepeatObject({type: 'string', content: 'crystal'})
      ])
    }),
    new CubicArrayRepeater({
      repeat_number: [1, 6, 12],
      repeat_vector: new Vec3({value: [0, 2, 2], unit: 'cm'}),
      target: new VariableArr('RepeatObject', [
        new RepeatObject({type: 'string', content: 'block'})
      ])
    })
  ])
});


export const physics_14m = new Physics({
  cut_in_region: new VariableArr('CutInRegion', [
    new CutInRegion({
      region: 'crystal',
      gamma: new Value({num: 1.0, unit: 'cm'}),
      electron: new Value({num: 1.0, unit: 'cm'}),
      positron: new Value({num: 1.0, unit: 'cm'})
    }),
    new CutInRegion({
      region: 'phantom',
      gamma: new Value({num: 0.1, unit: 'mm'}),
      electron: new Value({num: 0.1, unit: 'mm'}),
      positron: new Value({num: 0.1, unit: 'mm'}),
      max_step: new Value({num: 0.01, unit: 'mm'})
    })
  ]),
  process: new VariableArr('Process', [
    new Process({
      process_name: 'PhotoElectric',
      model: new VariableArr('Model', [
        new Model({
          model_name: 'StandardModel'
        })
      ])
    }),
    new Process({
      process_name: 'Compton',
      model: new VariableArr('Model', [
        new Model({
          model_name: 'StandardModel'
        })
      ])
    }),
    new Process({
      process_name: 'RayleighScattering',
      model: new VariableArr('Model', [
        new Model({
          model_name: 'PenelopeModel'
        })
      ])
    }),
    new Process({
      process_name: 'ElectronIonisation',
      model: new VariableArr('Model', [
        new Model({
          model_name: 'StandardModel',
          particle: 'e+'
        }),
        new Model({
          model_name: 'StandardModel',
          particle: 'e-'
        })
      ])
    }),
    new Process({
      process_name: 'Bremsstrahlung',
      model: new VariableArr('Model', [
        new Model({
          model_name: 'StandardModel'
        })
      ])
    }),
    new Process({
      process_name: 'PositronAnnihilation'
    }),
    new Process({
      process_name: 'MultipleScattering',
      particle: 'e+'
    }),
    new Process({
      process_name: 'MultipleScattering',
      particle: 'e-'
    })
  ])
});

export const digitizer_14m = new Digitizer({
  adder: new Adder(),
  readout: new Readout({depth: 1}),
  blurring: new Blurring({
    insert: true,
    resolution: 0.13,
    energy_of_reference: new Value({num: 511, unit: 'keV'})
  }),
  thresholder: new Thresholder({
    insert: true,
    value: new Value({num: 435, unit: 'keV'})
  }),
  upholder: new Upholder({
    insert: true,
    value: new Value({num: 650, unit: 'keV'})
  }),
  deadtime: new DeadTime({
    insert: true,
    value: new Value({num: 1000, unit: 'ns'}),
    mode: 'paralysable',
    dt_volume: 'block'
  }),
  coincidences: new Coincidences({
    window: new Value({num: 10, unit: 'ns'}),
    offset: new Value({num: 0, unit: 'ns'}),
  }),
  coincidence_sorter: new VariableArr('CoincidenceSorter', [
    new CoincidenceSorter({
      insert: true,
      name: 'delay',
      window: new Value({num: 10, unit: 'ns'}),
      offset: new Value({num: 500, unit: 'ns'})
    })
  ]),
  coincidence_chain: new VariableArr('CoincidenceChain', [
    new CoincidenceChain({
      insert: true,
      name: 'finalCoinc',
      input_name: new VariableArr('string', ['delay', 'Coincidences']),
      use_priority: true
    })
  ])
});

export const source_14m = new SourceSub({
  type: 'Source',
  content: new Source({
    name: 'voxel_brain',
    type: 'Gps',
    content: new Gps({
      activity: new Value({num: 3700000, unit: 'becquerel'}),
      type: 'backtoback',
      partical: new ParticalSub({type: 'other partical', content: 'gamma'}),
      energytype: 'Mono',
      monoenergy: new Value({num: 0.511, unit: 'MeV'}),
      source_shape: new SourceShape({
        type: 'Volume',
        content: new VolumeOrSurface({
          type: 'Cylinder',
          content: new SourceCylinder({
            radius: new Value({num: 8.3, unit: 'mm'}),
            halfz: new Value({num: 35, unit: 'cm'})
          })
        })
      }),
      placement: new Vec3({value: [0, 0, 0], unit: 'cm'}),
      confine: 'NULL',
      angtype: 'iso',
      dump: 1
    })
  })
});

export const data_output_14m = new DataOutput({
  root: new Root({
    enable: true,
    file_name: 'd16.6',
    root_hit_flag: false,
    root_singles_flag: false,
    root_coincidences_flag: true
  }),
  execute: 'Verbose.mac'
});

export const material_database_14m = new MaterialDatabase({path: '../../../../GateMaterials.db'});

export const acquisition_14m = new Acquisition({
  engine_name: 'JamesRandom',
  engine_seed: new EngineSeedSub({
    type: 'string',
    content: 'auto'
  }),
  verbose: 1,
  time_slice: new TimeSliceSub({
    type: 'Value[]',
    content: new VariableArr('Value', [
      new Value({num: 1, unit: 's'})
    ])
  }),
  time_start: new Value({num: 0, unit: 's'}),
  time_stop: new Value({num: 1, unit: 's'})
});
