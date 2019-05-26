import { Injectable } from '@angular/core';
import { GetinputService } from './getinput.service';
import { Object3D } from 'three';
import { Cube } from '../geo/cube';
import { GeometryService } from './geometry.service';
import { RepeatService } from './repeat.service';


@Injectable({
  providedIn: 'root'
})
export class CreatsystemService {
  constructor(
    private getinputService:GetinputService,
    private geometryService:GeometryService,
    private repeatService:RepeatService,
    ){}
  //输入
  a = this.getinputService.a;
  //层
  layer1 = new Object3D();//最后一层
  layer2 = new Object3D();
  layer3 = new Object3D();
  layer4 = new Object3D();
  layer5 = new Object3D();
  entity = new Object3D();
  //几何体
  world:Object3D;
  profile: Object3D;
  geo1: Object3D;
  geo2: Object3D;
  geo3: Object3D;
  geo4: Object3D;
  geo5: Object3D;


  init(){
      this.world = new Cube(this.a.world.shape.size,this.a.world.appearance.color,this.a.world.appearance.force_wireframe,this.a.world.appearance.line_width,this.a.world.appearance.visible).entity;
      this.entity.add(this.world);

      this.profile = this.geometryService.createntity(this.a.scanner.base);
      if((Object.keys(this.a.scanner.base.shape).length)==5){
        this.profile.rotation.x = Math.PI/2;
      }
      //实例化几何体
      this.geo1 = this.geometryService.createntity(this.a.scanner.level1);
      this.geo2 = this.geometryService.createntity(this.a.scanner.level2);
      this.geo3 = this.geometryService.createntity(this.a.scanner.level3);
      //this.geo4 = this.geometryService.createntity(this.a.scanner.level4);
      //this.geo5 = this.geometryService.createntity(this.a.scanner.level5);
      //这里还需要改改。translation还只是一个
      let n4 = this.a.scanner.level4.length;
      if(n4==1){
        this.geo4 = this.geometryService.createntity(this.a.scanner.level4[0]);
      }
      else{
        for(let i=0;i<n4;i++){
          let geo4_i = this.geometryService.createntity(this.a.scanner.level4[i]);
          geo4_i.position.set(this.a.scanner.level4[i].translation[0].value[0],this.a.scanner.level4[i].translation[0].value[1],this.a.scanner.level4[i].translation[0].value[2]);
          this.geo4.add(geo4_i);
        }
      }
      let n5 = this.a.scanner.level5.length;
      if(n5==1){
        this.geo5 = this.geometryService.createntity(this.a.scanner.level5[0]);
      }
      else{
        for(let i=0;i<n5;i++){
          let geo5_i = this.geometryService.createntity(this.a.scanner.level5[i]);
          geo5_i.position.set(this.a.scanner.level5[i].translation[0].value[0],this.a.scanner.level5[i].translation[0].value[1],this.a.scanner.level5[i].translation[0].value[2]);
          this.geo5.add(geo5_i);
        }
      }
      //实例化每层
      this.layer5 = this.repeatService.createntity(this.a.scanner.level5[0],this.geo5,this.a.scanner.level4[0],this.geo4);
      this.layer4 = this.repeatService.createntity(this.a.scanner.level4[0],this.layer5,this.a.scanner.level3,this.geo3);
      this.layer3 = this.repeatService.createntity(this.a.scanner.level3,this.layer4,this.a.scanner.level2,this.geo2);
      this.layer2 = this.repeatService.createntity(this.a.scanner.level2,this.layer3,this.a.scanner.level1,this.geo1);
      this.layer1 = this.repeatService.createntity(this.a.scanner.level1,this.layer2,this.a.scanner.base,this.profile);
      //最后的几何结构
      this.entity.add(this.layer1)

      
      return this.entity;
  }
}
