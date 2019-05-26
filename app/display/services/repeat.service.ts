import { Injectable } from '@angular/core';
import { Object3D } from 'three';
import { Cubicarray } from '../repeat/cubicarray';
import { Generic } from '../repeat/generic';
import { Linear } from '../repeat/linear';
import { Quadrant } from '../repeat/quadrant';
import { Sphere } from '../repeat/sphere';
import { Ring } from '../repeat/ring';

@Injectable({
  providedIn: 'root'
})
export class RepeatService {

  constructor() { }
  createntity(a:any,objold1:Object3D,b?:any,objold2?:Object3D){
    let entity:Object3D;
    let n = a.repeat.length;
    let buffer=[new Object3D()];
    for(let i=0;i<n;i++){
      if(i==0){buffer[0]=objold1.clone();}
      
      if(i<n-1){buffer.push(this.switch_repeat(a.repeat[i],buffer[i]));}
      else{
        buffer.push(this.switch_repeat(a.repeat[i],buffer[i],b,objold2));
        entity = buffer[i+1];
      }
    }
 
    return entity;
  }
  switch_repeat(repeat:any,objold1:Object3D,b?:any,objold2?:Object3D){
    let entity :Object3D;
    switch(Object.keys(repeat).length){
      case 2 :{
        if(Object.keys(repeat)[0]=='repeat_number'){
          entity = new Cubicarray().repeat(repeat.repeat_number,repeat.repeat_vector,objold1,b,objold2);
          return entity;
        }
        else{
          entity = new Generic().repeat(repeat.placements_filename,repeat.relative_translation,objold1,b,objold2);
          return entity;
        }
      };
      case 3 :{
        entity = new Linear().repeat(repeat.repeat_number,repeat.repeat_vector,repeat.auto_center,objold1,b,objold2);
        return entity;
      };
      case 4 :{
        entity = new Quadrant().repeat(repeat.line_number,repeat.orientation,repeat.copy_spacing,repeat.max_range,objold1);
        return entity;
      };
      case 5 :{
        entity = new Sphere().repeat(repeat.radius,repeat.repeat_number_with_theta,repeat.repeat_number_with_phi,repeat.theta_angle,repeat.phi_angle,objold1,b,objold2);
        return entity;
      };
      case 8 :{
        entity = new Ring().repeat(repeat.repeat_number,repeat.point1,repeat.first_angle,repeat.angular_span,repeat.modulo_number,repeat.z_shift,repeat.auto_rotation,objold1,b,objold2);
        return entity;
      };
    }
  }
}

