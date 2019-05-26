import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D, } from 'three';
import { Colors } from './color';
import STLLoader from 'three-stl-net-loader';
export class Tessellated {
    path_to_vertices_file: string;
    color:number;
    linewidth:number;
    flag:boolean;
    visible:boolean;
    entity:Object3D; 
    constructor(            
        path_to_vertices_file: string,
        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.path_to_vertices_file = path_to_vertices_file;
          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          //////
          let loader = new STLLoader();
          loader.setRequestHeader({ Authorization: 'Bearer token' });
          loader.setWithCredentials(true);
          loader.load( this.path_to_vertices_file, function (geometry) {
            //var material = new MeshBasicMaterial();
            let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
            let tessellated = new Mesh(geometry, smat);
            let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
            let wireframe = new LineSegments( new EdgesGeometry(geometry), lmat);
            wireframe.computeLineDistances();    
            if(this.flag)
            this.entity = wireframe;
            else this.entity = tessellated;  
          });

        }
      
    }