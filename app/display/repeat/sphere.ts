import { Object3D } from 'three';

export class Sphere {
    constructor(){}
    repeat(radius: number,repeat_number_with_theta: number,repeat_number_with_phi: number,
        theta_angle: number,phi_angle: number,objold1:Object3D,b?:any,objold2?:Object3D){
        let layer = new Object3D();
        let layerin  = new Object3D();
        for(let i=0;i<repeat_number_with_phi;i++){
            let objnew1 = objold1.clone();
            objnew1.translateX(radius*Math.cos(phi_angle*i));
            objnew1.translateY(radius*Math.sin(phi_angle*i));
            objnew1.rotation.z = phi_angle*i;
            layerin.add(objnew1);
        }  
        layerin.rotation.z = -(repeat_number_with_phi-1)*phi_angle/2;

        for(let j=0;j<repeat_number_with_theta;j++){
            let objnew = layerin.clone();

            objnew.rotation.y = theta_angle*j;
            layer.add(objnew);
        }

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
