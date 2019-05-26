import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D, SphereGeometry, Matrix4, } from 'three';
import { Colors } from './color';
export class Ellipsoid {
    
    size: number[];
    z_bottom_cut: number;
    z_top_cut: number;

    color:number;
    linewidth:number;
    flag:boolean;
    visible:boolean;
    entity:Object3D; 
    constructor(            
        size:number[],
        z_bottom_cut: number,//////这两个参数还没有搞
        z_top_cut: number,/////////

        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.size = size;
          this.z_bottom_cut = z_bottom_cut;
          this.z_top_cut = z_top_cut;

          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          ///////
          let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
          let geometry = new SphereGeometry(this.size[0],500,500).applyMatrix( new Matrix4().makeScale( 1.0, this.size[1]/this.size[0], this.size[2]/this.size[0] ) )

          for(let i=0;i<geometry.vertices.length;i++){
            if(geometry.vertices[i].z>this.z_top_cut){
              geometry.vertices[i].z=this.z_top_cut;
            }
            else if(geometry.vertices[i].z<this.z_bottom_cut){
              geometry.vertices[i].z=this.z_bottom_cut;
            }
          }
          let ellipsoid = new Mesh(geometry,smat);
          
          let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
          let wireframe = new LineSegments( new EdgesGeometry(ellipsoid.geometry), lmat);

          wireframe.computeLineDistances();

          if(this.flag)
          this.entity = wireframe;
          else this.entity = ellipsoid;
        }
      
    }
