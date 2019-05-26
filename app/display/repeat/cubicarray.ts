import { Object3D, Box3 } from 'three';


export class Cubicarray {
    constructor() { }
    
    repeat(n:number[],x:number[],objold1:Object3D,b?:any,objold2?:Object3D):Object3D{
        let layerin = new Object3D();
        let layer = new Object3D();
        for(let i=0;i<n[0];i++){
          for(let j=0;j<n[1];j++){
            for(let k=0;k<n[2];k++){
              let objnew1 = objold1.clone();
              objnew1.translateX(x[0]*i);
              objnew1.translateY(x[1]*j);
              objnew1.translateZ(x[2]*k);
              layerin.add(objnew1);
            }
          }
        }
        //获取当前几何组合体中心并校正
        let box = new Box3();
        let center = box.getCenter(box.expandByObject(layerin).max);
        layerin.position.set(-center.x,-center.y,-center.z);

        layer.add(layerin);
        //下一层轮廓
        if(objold2){
          let objnew2 = objold2.clone();
          layer.add(objnew2);
          for(let i=0;i<b.translation.length;i++){
            layer.translateX(b.translation[i].value[0]);
            layer.translateY(b.translation[i].value[1]);
            layer.translateZ(b.translation[i].value[2]); 
          }
          for(let j=0;j<b.rotation.length;j++){
            switch(b.rotation[j].axis){
              case [1,0,0] :{
                layer.rotation.x = b.rotation[j].angle;
                return layer; 
              }
              case [0,1,0] :{
                layer.rotation.y = b.rotation[j].angle;
                return layer; 
              }
              case [0,0,1]:{
                layer.rotation.z = b.rotation[j].angle;
                return layer; 
              }
            }
          }

        }
        return layer;         
      }
}
