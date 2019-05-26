import { Mesh, MeshBasicMaterial, SphereGeometry, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D } from 'three';
import { Colors } from './color';
export class Sphere {
    rmin:number;
    rmax:number;
    phi_start: number;
    delta_phi: number;
    theta_start: number;
    delta_theta: number;

    color:number;
    linewidth:number;
    visible:boolean;
    flag :boolean;
    entity:Object3D;
    constructor(
        rmin:number,
        rmax:number,
        phi_start: number = 0,
        delta_phi: number = 2*Math.PI,
        theta_start: number = 0,
        delta_theta: number = 2*Math.PI,

        color:string = 'white',
        wireframe_flag:boolean=true,
        linewidth:number = 1,
        visible:boolean = true,

        
    ){
      
      this.rmin = rmin;
      this.rmax = rmax;
      this.phi_start = phi_start;
      this.delta_phi = delta_phi;
      this.theta_start = theta_start;
      this.delta_theta = delta_theta/2;

      this.linewidth = linewidth;
      this.visible = visible;
      this.flag = wireframe_flag;
      if(this.visible){
        this.color = new Colors().selectcolor(color);
      }
      else{this.color = 0x000000;}
      let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
      let sphere_o = new Mesh(new SphereGeometry(this.rmax,20,20,this.phi_start,this.delta_phi,this.theta_start,this.delta_theta),smat);
      let sphere_i = new Mesh(new SphereGeometry(this.rmin,20,20,this.phi_start,this.delta_phi,this.theta_start,this.delta_theta),smat);
      let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
      let wireframe_o = new LineSegments( new EdgesGeometry(sphere_o.geometry), lmat);
      let wireframe_i = new LineSegments( new EdgesGeometry(sphere_i.geometry), lmat);
      wireframe_o.computeLineDistances();
      wireframe_i.computeLineDistances();
      let wireframe = new Object3D();
      if(this.rmin){wireframe.add(wireframe_i);}
      wireframe.add(wireframe_o);
      if(this.flag)
      this.entity = wireframe;
      else this.entity = sphere_o;

    }
}