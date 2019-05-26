import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D, CylinderGeometry, Matrix4 } from 'three';
import { Colors } from './color';
export class Ellipticaltube {
    
    long: number;///X
    short: number;////Z
    height: number;////Y

    color:number;
    linewidth:number;
    flag:boolean;
    visible:boolean;
    entity:Object3D; 
    constructor(            
        long: number,
        short: number,
        height: number,

        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.long = long;
          this.short = short;
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
          let geometry = new CylinderGeometry(this.long,this.long,this.height,32,1).applyMatrix( new Matrix4().makeScale( 1.0, 1.0, this.short/this.long ));
          let ellipticaltube = new Mesh(geometry,smat);
          
          let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
          let wireframe = new LineSegments( new EdgesGeometry(ellipticaltube.geometry), lmat);
          wireframe.computeLineDistances();
          if(this.flag){
            
          this.entity = wireframe;
          }
          else this.entity = ellipticaltube;//最外面的圆柱实体
        }
      
    }