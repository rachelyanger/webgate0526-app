import { Injectable } from '@angular/core';
import { Vec3,Value} from 'D:/angular/webgate/src/app/basic_class';
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor() { }

    vec3(vec:Vec3){
    let num:number[];
    num = vec.value.slice();
    switch(vec.unit){
        case 'cm':{
          return num;}
        case 'mm':{
          num[0]=num[0]/10;
          num[1]=num[1]/10;
          num[2]=num[2]/10;
          return num;
        }
        
    }
 }
 value(value:Value){
  let num:number;
  num = value.num;
  switch(value.unit){
      case 'cm': return num;
      case 'mm':{
        num=num/10;
        return num;
      }
      case 'rad': return num;
      case 'deg':{
        num = num*Math.PI/180;
        return num;
      }
      
  }
}
}
