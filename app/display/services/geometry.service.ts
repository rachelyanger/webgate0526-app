import { Injectable } from '@angular/core';
import { Object3D } from 'three';
import { Cube } from '../geo/cube';
import { Cylinder } from '../geo/cylinder';
import { Cone } from '../geo/cone';
import { Sphere } from '../geo/sphere';
import { Tessellated } from '../geo/tessellated';
import { Hexagone } from '../geo/hexagone';
import { Ellipsoid } from '../geo/ellipsoid';
import { Ellipticaltube } from '../geo/ellipticaltube';
import { Tetmeshbox } from '../geo/tetmeshbox';
import { TRPD } from '../geo/trpd';
import { Wedge } from '../geo/wedge';

@Injectable({
  providedIn: 'root'
})
export class GeometryService {
 
  constructor() {}

  entity:Object3D

 createntity(a:any){

    switch(Object.keys(a.shape).length){
      case 1 :{
        if(Object.keys(a.shape)[0]=='size'){
          this.entity = new Cube(a.shape.size,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
          return this.entity;
        }
        else {this.entity = new Tessellated(a.shape.path_to_ele_file,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
              return this.entity;     
          }
        };
      case 2 :{
        if(Object.keys(a.shape)[0]=='radius'){
          this.entity = new Hexagone(a.shape.radius,a.shape.height,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
          return this.entity;
        }
        else {this.entity = new Wedge(a.shape.narrower_xlength,a.shape.size,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
              return this.entity;
           }
        };
      case 3 :{
        switch(Object.keys(a.shape)[0]){
          case 'size':{
            this.entity = new Ellipsoid(a.shape.size,a.shape.z_bottom_cut,a.shape.z_top_cut,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
            return this.entity;
          };
          case 'long':{
            this.entity = new Ellipticaltube(a.shape.long,a.shape.short,a.shape.height,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
            return this.entity;
          };
          case 'path_to_ele_file':{
            this.entity = new Tetmeshbox(a.shape.path_to_ele_file, a.shape.unit_of_length, a.shape.path_to_attribute_map,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
            return this.entity;
          }
        }
      };
      case 5 :{
        this.entity = new Cylinder(a.shape.rmin, a.shape.rmax,a.shape.height,a.shape.phi_start,a.shape.delta_phi,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
        return this.entity; 
      };
      case 6 :{
        this.entity = new Sphere(a.shape.rmin, a.shape.rmax, a.shape.phi_start,a.shape.delta_phi,a.shape.theta_start,a.shape.delta_theta,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
        return this.entity;
      };
      case 7 :{
        if(Object.keys(a.shape)[0]=='rmin1'){
          this.entity = new Cone(a.shape.rmin1,a.shape.rmax1,a.shape.rmin2,a.shape.rmax2,a.shape.height,a.shape.phi_start, a.shape.delta_phi,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
          return this.entity;
        }
        else {this.entity = new TRPD(a.shape.x1,a.shape.y1,a.shape.x2,a.shape.y2,a.shape.z,a.shape.box_size,a.shape.box_pos,a.appearance.color,a.appearance.force_wireframe,a.appearance.line_width,a.appearance.visible).entity;
              return this.entity;
           }
        };
      
    }
    
    

  }






}
