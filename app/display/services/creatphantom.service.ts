import { Injectable } from '@angular/core';
import { GetinputService } from './getinput.service';
import { Object3D } from 'three';
import { GeometryService } from './geometry.service';
import { RepeatService } from './repeat.service';

@Injectable({
  providedIn: 'root'
})
export class CreatphantomService {

  constructor(private getinputService:GetinputService,
    private geometryService:GeometryService,
    private repeatService:RepeatService) { }
  a = this.getinputService.a;

  
  init(){
   let entity = new Object3D();
   if(Object.keys(this.a.phantom).length<10){
     entity = this.volume_phantom();
   }
   else entity = this.voxelizedphantom();
   return entity;
  }
  volume_phantom(){
    let entity:Object3D;
    let phantom = this.geometryService.createntity(this.a.phantom);
    if(Object.prototype.toString.call(this.a.phantom.repeat[0])=='[object Null]'){
      entity = phantom;
    }
    else{entity = this.repeatService.createntity(this.a.phantom,phantom);}
    console.log(entity);
    entity.translateX(this.a.phantom.translation[0].value[0]);
    entity.translateY(this.a.phantom.translation[0].value[1]);
    entity.translateZ(this.a.phantom.translation[0].value[2]); 
    console.log(entity);
    switch(this.a.phantom.rotation[0].axis){
      case [1,0,0] :{
        entity.rotation.x = this.a.phantom.rotation[0].angle;
        return entity; 
      }
      case [0,1,0] :{
        entity.rotation.y = this.a.phantom.rotation[0].angle;
        return entity; 
      }
      case [0,0,1]:{
        entity.rotation.z = this.a.phantom.rotation[0].angle;
        console.log(entity);
        return entity;
      }
    }
    if((Object.keys(this.a.phantom.shape).length)==5){
      entity.rotation.x = Math.PI/2;
    }
    return entity;
  }
  voxelizedphantom(){
    let entity;
    return entity;
  }
}
