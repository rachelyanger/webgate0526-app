import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D, BoxGeometry, Vector3 } from 'three';
import { Colors } from './color';
// import * as THREE from 'three';
// const ThreeBSP = require('/home/rachel/angular/mythree/node_modules/three-js-csg/index.js')(THREE);  
export class TRPD {
    
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    z: number;
    box_size: number[];
    box_pos: number[];

    color:number;
    linewidth:number;
    flag:boolean; 
    visible:boolean;
    entity:Object3D; 
    constructor(            
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        z: number,
        box_size: number[],
        box_pos: number[],
        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.x1 = x1;
          this.x2 = x2;
          this.y1 = y1;
          this.y2 = y2;
          this.z = z;
          this.box_pos = box_pos;
          this.box_size = box_size;
                    
          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          ///////
          let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
          let geometry = new BoxGeometry(1,1,1);
          geometry.vertices = [new Vector3(this.x1/2,this.y2/2,this.z/2),
                               new Vector3(this.x1/2,this.y2/2,-this.z/2),
                               new Vector3(this.x2/2,-this.y2/2,this.z/2),
                               new Vector3(this.x2/2,-this.y2/2,-this.z/2),
                               new Vector3(-this.x1/2,this.y1/2,-this.z/2),
                               new Vector3(-this.x1/2,this.y1/2,this.z/2),
                               new Vector3(-this.x2/2,-this.y1/2,-this.z/2),
                               new Vector3(-this.x2/2,-this.y1/2,this.z/2)];

          let trapezoidal = new Mesh(geometry,smat);
          let box = new Mesh(new BoxGeometry(this.box_size[0],this.box_size[1],this.box_size[2]),smat);
          box.position.set(this.box_pos[0],this.box_pos[1],this.box_pos[2]);
          // ////////////相减
          // let inBSP = new ThreeBSP(box);
          // let outBSP = new ThreeBSP(trapezoidal);
          // let sub = outBSP.subtract(inBSP);
          // let newMesh = sub.toMesh();  
          // newMesh.material = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
          // let trpd = newMesh.clone();
          // /////////////////
          let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
          let wireframe_o = new LineSegments( new EdgesGeometry(trapezoidal.geometry), lmat);
          let wireframe_i = new LineSegments( new EdgesGeometry(box.geometry), lmat);
          wireframe_i.position.set(this.box_pos[0],this.box_pos[1],this.box_pos[2]);
          wireframe_o.computeLineDistances();
          wireframe_i.computeLineDistances();
          let wireframe = new Object3D();
          wireframe.add(wireframe_i);wireframe.add(wireframe_o);

          if(this.flag)
            this.entity = wireframe;
          //else this.entity  = trpd;
          else this.entity  = trapezoidal;
        
        }
      
      }