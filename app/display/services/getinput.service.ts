import { Injectable, } from '@angular/core';
import { Box, Volume, Tessellated, Hexagone, Wedge, Ellipsoid, EllipticalTube, TetMeshBox, Cylinder, Sphere, Cone, TRPD, Geometry, VoxelizedPhantom, System, LinearRepeater, RingRepeater, CubicArrayRepeater, QuadrantRepeater, SphereRepeater, GenericRepeater, PlacementTranslation, PlacementRotation } from '../input';
import { UnitService } from './unit.service';
import { dVolume, dCubicArrayRepeater,} from '../default';


@Injectable({
  providedIn: 'root'
})
export class GetinputService {
  constructor(private unit:UnitService) { }
  a = new Geometry();
  setinput(geo:any,placement:any,repeater:any){
    /////world
    this.a.world = new Volume();
    this.a.world = this.setVolume(geo.world,this.a.world);
    /////phantom(还有三个类)
    this.a.phantom = this.setphantom(geo.phantom.content,this.a.phantom);
    /////system（还有三个类）
    this.a.scanner = new System();
    this.a.scanner = this.setSystem(geo.scanner.content,this.a.scanner);
    ///处理放置和重复。
    this.setplace(placement);
    this.setrepeat(repeater);
    // //似乎不用
    // if(this.a.phantom.repeat[0] == undefined) {this.a.phantom.repeat = new dCubicArrayRepeater();}
    // if(this.a.scanner.base.repeat[0] == undefined){this.a.scanner.base.repeat = new dCubicArrayRepeater();}
    // if(this.a.scanner.level1.repeat[0] == undefined){this.a.scanner.level1.repeat = new dCubicArrayRepeater();}
    // if(this.a.scanner.level2.repeat[0] == undefined){this.a.scanner.level2.repeat = new dCubicArrayRepeater();}
    // if(this.a.scanner.level3.repeat[0] == undefined){this.a.scanner.level3.repeat = new dCubicArrayRepeater();}
    // for(let i=0;i<this.a.scanner.level4.length;i++){
    //   if(this.a.scanner.level4[i].repeat[0] == undefined){this.a.scanner.level4[i].repeat = new dCubicArrayRepeater();}
    // }
    // for(let i=0;i<this.a.scanner.level5.length;i++){
    //   if(this.a.scanner.level5[i].repeat[0] == undefined){this.a.scanner.level5[i].repeat = new dCubicArrayRepeater();}
    // }
  }

  ///////////////////////////////////////////////////////////////////
  switchRepeat(repeat:string){
    switch(Object.keys(repeat).length){
      case 3 :{
        if(Object.keys(repeat)[0]=='repeat_number'){
          return new CubicArrayRepeater();
        }
        else{
          return new GenericRepeater();
        }
      };
      case 4 :{
        return new LinearRepeater();
      };
      case 5 :{
        return new QuadrantRepeater();
      };
      case 6 :{
        return new SphereRepeater();
      };
      case 9 :{
        return new RingRepeater();
      };
    }
  }

  ///添加重复
  setrepeat(data:any){
    for(let i=0;i<5;i++){
      if(data[Object.keys(data)[i]].value!==[]){
        for(let j=0;j<data[Object.keys(data)[i]].value.length;j++){
          for(let k=0;k<data[Object.keys(data)[i]].value[j].target.value.length;k++){
            if(data[Object.keys(data)[i]].value[j].target.value[k].type=='string'){
              this.switch_name(data[Object.keys(data)[i]].value[j],data[Object.keys(data)[i]].value[j].target.value[k].content,'repeat',0);
            }
            else{
              this.switch_name(data[Object.keys(data)[i]].value[j].target.value[k].content,data[Object.keys(data)[i]].value[j].target.value[k].content.target.value[0].content,'repeat',0);
              this.switch_name(data[Object.keys(data)[i]].value[j],data[Object.keys(data)[i]].value[j].target.value[k].content.target.value[0].content,'repeat',1);
            }
          }
        }
      }
    }
  }
  ///添加放置类
  setplace(data:any){
    //位移
    if(data.placement_translation.value!==[]){
      for(let i=0;i<data.placement_translation.value.length;i++){
        for(let k=0;k<data.placement_translation.value[i].target.value.length;k++){
          if(data.placement_translation.value[i].target.value[k].type=='string'){
            this.switch_name(data.placement_translation.value[i],data.placement_translation.value[i].target.value[k].content,'translation',0);
          }
          else{
            this.switch_name(data.placement_translation.value[i].target.value[k].content,data.placement_translation.value[i].target.value[k].content.target.value[0].content,'translation',0);
            this.switch_name(data.placement_translation.value[i],data.placement_translation.value[i].target.value[k].content.target.value[0].content,'translation',1);
          }
        }
      }
    }
    //旋转
    if(data.placement_rotation.value!==[]){
      for(let i=0;i<data.placement_rotation.value.length;i++){
        for(let k=0;k<data.placement_rotation.value[i].target.value.length;k++){
          if(data.placement_rotation.value[i].target.value[k].type=='string'){
            this.switch_name(data.placement_rotation.value[i],data.placement_rotation.value[i].target.value[k].content,'rotation',0);
          }
          else{
            this.switch_name(data.placement_rotation.value[i].target.value[k].content,data.placement_rotation.value[i].target.value[k].content.target.value[0].content,'rotation',0);
            this.switch_name(data.placement_rotation.value[i],data.placement_rotation.value[i].target.value[k].content.target.value[0].content,'rotation',1);
          }
        }
      }
    }

  }
  ///在phantom和scanner里面搜索name匹配。
  switch_name(data:any,name:string,key:string,num:number){
    
    if(this.a.phantom.name==name){ //phantom
     if(num==2){
      if(key=='repeat'){this.a.phantom[key].push(null)}
      else if(key=='translation'){this.a.phantom[key].push(new PlacementTranslation());}
      else if(key=='rotation'){this.a.phantom[key].push(new PlacementRotation());}
    }
      if(this.a.phantom[key][num]==null){this.a.phantom[key][num] = this.switchRepeat(data);}
      this.a.phantom[key][num] = this.assign(data,this.a.phantom[key][num]);
    }
    else{  //system
      for(let j=0;j<4;j++){
        if(this.a.scanner[Object.keys(this.a.scanner)[j]].name==name){
          if(num==2){
             if(key=='repeat'){this.a.scanner[Object.keys(this.a.scanner)[j]][key].push(null)}
             else if(key=='translation'){this.a.scanner[Object.keys(this.a.scanner)[j]][key].push(new PlacementTranslation());}
             else if(key=='rotation'){this.a.scanner[Object.keys(this.a.scanner)[j]][key].push(new PlacementRotation());}
         }
          if(this.a.scanner[Object.keys(this.a.scanner)[j]][key][num]==null){this.a.scanner[Object.keys(this.a.scanner)[j]][key][num] = this.switchRepeat(data);}
          this.a.scanner[Object.keys(this.a.scanner)[j]][key][num] = this.assign(data,this.a.scanner[Object.keys(this.a.scanner)[j]][key][num]);
        }
      }
      
      for(let n4=0;n4<this.a.scanner.level4.length;n4++){
        if(this.a.scanner.level4[n4].name==name){
          if(num==2){
            if(key=='repeat'){this.a.scanner.level4[n4][key].push(null)}
            else if(key=='translation'){this.a.scanner.level4[n4][key].push(new PlacementTranslation());}
            else if(key=='rotation'){this.a.scanner.level4[n4][key].push(new PlacementRotation());}
        }
         if(this.a.scanner.level4[n4][key][num]==null){this.a.scanner.level4[n4][key][num] = this.switchRepeat(data);}
         this.a.scanner.level4[n4][key][num] = this.assign(data,this.a.scanner.level4[n4][key][num]);
        }
      }
      for(let n5=0;n5<this.a.scanner.level5.length;n5++){
        if(this.a.scanner.level5[n5].name==name){
          if(num==2){
            if(key=='repeat'){this.a.scanner.level5[n5][key].push(null)}
            else if(key=='translation'){this.a.scanner.level5[n5][key].push(new PlacementTranslation());}
            else if(key=='rotation'){this.a.scanner.level5[n5][key].push(new PlacementRotation());}
        }
         if(this.a.scanner.level5[n5][key][num]==null){this.a.scanner.level5[n5][key][num] = this.switchRepeat(data);}
         this.a.scanner.level5[n5][key][num] = this.assign(data,this.a.scanner.level5[n5][key][num]);
        }
      }
      
    }
   
  }
  ///处理仿体
  setphantom(pha:any,newpha:any){
    if(Object.keys(pha).length<=6){
      newpha = new Volume();
      newpha = this.setVolume(pha,newpha);
    }
    else{
      this.a.phantom = new VoxelizedPhantom();
      this.a.phantom = this.assign(pha,newpha);
    }
    return newpha; 
  }
  //处理系统
  setSystem(sys:any,newsys:any){
    newsys.base = this.setVolume(sys.base,newsys.base);
    if(Object.keys(sys).length==6){
      newsys.level1 = this.setVolume(sys[Object.keys(sys)[1]],newsys.level1);
      newsys.level2 = this.setVolume(sys[Object.keys(sys)[2]],newsys.level2);
      newsys.level3 = this.setVolume(sys[Object.keys(sys)[3]],newsys.level3);
      newsys.level4 = this.ass_volumes(sys[Object.keys(sys)[4]],newsys.level4);
      newsys.level5 = this.ass_volumes(sys[Object.keys(sys)[5]],newsys.level5);
    }
    else if(Object.keys(sys).length==4){
      newsys.level1 = this.setVolume(sys[Object.keys(sys)[1]],newsys.level1);
      newsys.level2 = new dVolume();
      newsys.level3 = new dVolume();
      newsys.level4 = this.ass_volumes(sys[Object.keys(sys)[2]],newsys.level4);
      newsys.level5 = this.ass_volumes(sys[Object.keys(sys)[3]],newsys.level5);
    }
    else{
      newsys.level1 = this.setVolume(sys[Object.keys(sys)[1]],newsys.level1);
      newsys.level2 = new dVolume();
      newsys.level3 = new dVolume();
      newsys.level4 = [new dVolume()];
      newsys.level5 = this.ass_volumes(sys[Object.keys(sys)[2]],newsys.level5);
    }
   return newsys;
  }
  //处理Volume数组
  ass_volumes(vol:any,newvol:any){
    if(Object.prototype.toString.call(vol)=='[object Array]'){
      newvol = new Array(vol.length);
      for(let i=0;i<vol.length;i++){
        newvol[i] = new Volume();
        newvol[i] = this.setVolume(vol[i],newvol[i]);
      }
      return newvol;
    }
    else {
      newvol = new Array(1);
      newvol[0] = new Volume();
      newvol[0] = this.setVolume(vol,newvol[0]);
      return newvol} 
  }
  //处理Volume
  setVolume(data:any,newdata:any){
    if(data.name == ''||Object.keys(data)[0]=='type'){
      newdata = new dVolume();
    }
    else{
      newdata.name = data.name;
      newdata.shape = this.switchShape(data.shape.content,newdata.shape);
      newdata.appearance = this.assign(data.appearance,newdata.appearance);
    }
    return newdata;

  }
  //处理不同shape
  switchShape(shape:any,newshape:any){
    //清空对象（重复使用或之前在构造器中的new）
    // for(var key in newshape){ 
    //   delete newshape[key];
    //   }
    switch(Object.keys(shape).length){
      case 1 :{
        if(Object.keys(shape)[0]=='size'){
          newshape = new Box();return this.assign(shape,newshape);  
        }
        else {
          newshape = new Tessellated();return this.assign(shape,newshape);  
        }
      };
      case 2 :{
        if(Object.keys(shape)[0]=='radius'){
          newshape = new Hexagone();return this.assign(shape,newshape);  
        }
        else {
          newshape = new Wedge();return this.assign(shape,newshape);    
        }
      };
      case 3 :{
        switch(Object.keys(shape)[0]){
          case 'size':{
            newshape = new Ellipsoid();return this.assign(shape,newshape);  
          };
          case 'long':{
            newshape = new EllipticalTube();return this.assign(shape,newshape);  
          };
          case 'path_to_ele_file':{
            newshape = new TetMeshBox();return this.assign(shape,newshape);  
          }
        }
      };
      case 5 :{
        newshape = new Cylinder();return this.assign(shape,newshape);  
      };
      case 6 :{
        newshape = new Sphere();return this.assign(shape,newshape);  
      };
      case 7 :{
        if(Object.keys(shape)[0]=='rmin1'){
          newshape = new Cone();return this.assign(shape,newshape);
        }
        else {
          newshape = new TRPD();return this.assign(shape,newshape);
        }
        };
      
    }

  }
  
  
  //遍历对象，修正单位并赋值
  assign(item:any,newitem:any){   //item 接受的表单数据 
    for(let i=0;i<Object.keys(newitem).length;i++){
      
      if(Object.prototype.toString.call(item[Object.keys(item)[i]])=='[object String]'||
         Object.prototype.toString.call(item[Object.keys(item)[i]])=='[object Boolean]'||
         Object.prototype.toString.call(item[Object.keys(item)[i]])=='[object Number]'){  //属性类型为非对象基本类型
        newitem[Object.keys(newitem)[i]] = item[Object.keys(item)[i]];
      }
      else if(Object.prototype.toString.call(item[Object.keys(item)[i]])=='[object Array]'){ //数组
        if(Object.prototype.toString.call(item[Object.keys(item)[i]][0])=='[object Number]'){//repeat_number
          newitem[Object.keys(newitem)[i]] = item[Object.keys(item)[i]];
        }
        else if(Object.prototype.toString.call(item[Object.keys(item)[i]][0])=='[object Object]'){//z_shift
          for(let n=0;n<item[Object.keys(item)[i]].length;n++){
            newitem[Object.keys(newitem)[i]][n] = this.unit.value(item[Object.keys(item)[i]][n]);
          }
        }
      }
      else if(Object.prototype.toString.call(item[Object.keys(item)[i]])=='[object Undefined]'||
        Object.prototype.toString.call(item[Object.keys(item)[i]])=='[object Null]'){
          newitem[Object.keys(newitem)[i]];///保留默认值不变
      }
      else if(Object.keys(item[Object.keys(item)[i]])[0]=='num'){   //属性为Value
            newitem[Object.keys(newitem)[i]] = this.unit.value(item[Object.keys(item)[i]]);
      }
      else if(Object.keys(item[Object.keys(item)[i]])[0]=='value'){//属性为Vec3
            newitem[Object.keys(newitem)[i]] = this.unit.vec3(item[Object.keys(item)[i]]);}//属性类型为Vec3（有单位的三维向量）

    } 
      


    
    return newitem;
    
  }






}
