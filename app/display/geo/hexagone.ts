import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D, CylinderGeometry } from 'three';
import { Colors } from './color';
export class Hexagone {
    
    radius: number;
    height: number;

    color:number;
    linewidth:number;
    flag:boolean;
    visible:boolean;
    entity:Object3D; 
    constructor(            
        radius: number,
        height: number,

        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.radius = radius;
          this.height = height;
          
          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          ///////
          let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
          let hexagone = new Mesh(new CylinderGeometry(this.radius,this.radius,this.height,6,1),smat);
          
          let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
          let wireframe = new LineSegments( new EdgesGeometry(hexagone.geometry), lmat);
          wireframe.computeLineDistances();
          if(this.flag){
            
          this.entity = wireframe;
          }
          else this.entity = hexagone;//最外面的圆柱实体

        }
      
    }