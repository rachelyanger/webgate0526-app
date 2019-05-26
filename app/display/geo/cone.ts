import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D, CylinderGeometry } from 'three';
import { Colors } from './color';
export class Cone {
    
    rmin1: number;
    rmax1: number;
    rmin2: number;
    rmax2: number;
    height: number;
    phi_start: number;
    delta_phi: number;

    color:number;
    linewidth:number;
    flag:boolean;
    visible:boolean;
    entity:Object3D; 
    constructor(            
        rmin1: number,
        rmax1: number,
        rmin2: number,
        rmax2: number,
        height: number,
        phi_start: number,
        delta_phi: number,

        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.rmin1 = rmin1;
          this.rmax1 = rmax1;
          this.rmin2 = rmin2;
          this.rmax2 = rmax2;
          this.height = height;
          this.phi_start = phi_start;
          this.delta_phi = delta_phi;

          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          ///////
          let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
          let cone_o = new Mesh(new CylinderGeometry(this.rmax1,this.rmax2,this.height,32,1,false,this.phi_start,this.delta_phi),smat);
          let cone_i = new Mesh(new CylinderGeometry(this.rmin1,this.rmin2,this.height,32,1,false,this.phi_start,this.delta_phi),smat);
          let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
          let wireframe_o = new LineSegments( new EdgesGeometry(cone_o.geometry), lmat);
          let wireframe_i = new LineSegments( new EdgesGeometry(cone_i.geometry), lmat);
          wireframe_o.computeLineDistances();
          wireframe_i.computeLineDistances();
          let wireframe = new Object3D();
          wireframe.add(wireframe_i);
          wireframe.add(wireframe_o);
          if(this.flag){
            
          this.entity = wireframe;
          }
          else this.entity = cone_o;//最外面的圆柱实体
        }
      
    }

