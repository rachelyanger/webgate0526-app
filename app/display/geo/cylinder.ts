import {  Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry , CylinderGeometry,Object3D, CircleGeometry} from 'three';
import { Colors } from './color';

export class Cylinder {
    rmin:number;
    rmax:number;
    height:number;
    color:number;//颜色
    linewidth:number;//线宽
    flag:boolean;//是否显示线框
    visible:boolean;//是否显示
    phi_start: number;
    delta_phi: number;
    entity:Object3D;
    constructor(
        rmin:number,
        rmax:number,
        height:number,
        phi_start: number,
        delta_phi: number,

        color:string = 'white',
        wireframe_flag:boolean=true,
        linewidth:number = 1,
        visible:boolean = true,

        
    ){
      
      this.rmin = rmin;
      this.rmax = rmax;
      this.height = height;
      this.phi_start = phi_start;
      this.delta_phi = delta_phi;

      this.linewidth = linewidth;
      this.visible = visible;
      this.flag = wireframe_flag;
      if(this.visible){
        this.color = new Colors().selectcolor(color);
      }
      else{this.color = 0x000000;}
      let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
      let cylinder_o = new Mesh(new CylinderGeometry(this.rmax,this.rmax,this.height,32,1,false,this.phi_start,this.delta_phi),smat);
      let cylinder_i = new Mesh(new CylinderGeometry(this.rmin,this.rmin,this.height,32,1,false,this.phi_start,this.delta_phi),smat);
      let circle_o = new Mesh(new CircleGeometry(this.rmax,32),smat);
      let circle_i = new Mesh(new CircleGeometry(this.rmin,32),smat);
      let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
      let wireframe_o = new LineSegments( new EdgesGeometry(circle_o.geometry), lmat);
      let wireframe_i = new LineSegments( new EdgesGeometry(circle_i.geometry), lmat);
      wireframe_o.computeLineDistances();
      wireframe_i.computeLineDistances();
      wireframe_i.rotation.x = Math.PI/2;wireframe_i.position.setY(this.height/2);
      wireframe_o.rotation.x = Math.PI/2;wireframe_o.position.setY(this.height/2);
      let wireframe_i2 = wireframe_i.clone();wireframe_i2.rotation.x = Math.PI/2;wireframe_i2.position.setY(-this.height/2);
      let wireframe_o2 = wireframe_o.clone();wireframe_o2.rotation.x = Math.PI/2;wireframe_o2.position.setY(-this.height/2);
      let wireframe = new Object3D();
      wireframe.add(wireframe_i);
      wireframe.add(wireframe_o);
      wireframe.add(wireframe_i2);
      wireframe.add(wireframe_o2);
      if(this.flag){
        
      this.entity = wireframe;
      }
      else this.entity = cylinder_o;//最外面的圆柱实体

    }
   

}
