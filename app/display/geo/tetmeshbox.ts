import { Mesh, MeshBasicMaterial, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D } from 'three';
import { Colors } from './color';
export class Tetmeshbox {
    
    path_to_ele_file: string;
    unit_of_length: string;
    path_to_attribute_map: string;

    color:number;
    linewidth:number;
    flag:boolean;
    visible:boolean;
    entity:Object3D; 
    constructor(            
        path_to_ele_file: string,
        unit_of_length: string,
        path_to_attribute_map: string,

        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.path_to_ele_file = path_to_ele_file;
          this.unit_of_length = unit_of_length;
          this.path_to_attribute_map = path_to_attribute_map;
                    
          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          ///////
        }
      
    }