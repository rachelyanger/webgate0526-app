import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D, BoxGeometry, Vector3 } from 'three';
import { Colors } from './color';
export class Wedge {
    
    narrower_xlength: number;
    size: number[];

    color:number;
    linewidth:number;
    flag:boolean;
    visible:boolean;
    entity:Object3D; 
    constructor(            
        narrower_xlength: number,
        size: number[],

        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.narrower_xlength = narrower_xlength;
          this.size = size;
                    
          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          /////////////
          let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
          let geometry = new BoxGeometry(this.size[0],this.size[1],this.size[2]);
          geometry.vertices[0] = new Vector3(this.narrower_xlength/2,this.size[1]/2,this.size[2]/2);
          geometry.vertices[1] = new Vector3(this.narrower_xlength/2,this.size[1]/2,-this.size[2]/2);
          let wedge = new Mesh(geometry,smat);
          let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
          let wireframe = new LineSegments( new EdgesGeometry(wedge.geometry), lmat);
          wireframe.computeLineDistances();
          if(this.size[0]!==0){
            if(this.flag)
            this.entity = wireframe;
            else this.entity  = wedge;
          }
          else this.entity = new Object3D();
        }
      
    }