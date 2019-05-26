import { Mesh, MeshBasicMaterial, BoxGeometry, LineDashedMaterial ,LineSegments, EdgesGeometry, Object3D } from 'three';
import { Colors } from './color';
export class Cube {
    
    size:number[];//大小
    color:number;//颜色
    linewidth:number;//线宽
    flag:boolean;//是否显示线框
    visible:boolean;//是否显示
    entity:Object3D; //输出
    constructor(             
        size:number[],
        color:string = 'white',
        wireframe_flag:boolean = true,
        linewidth:number = 1,
        visible:boolean = true,
        ){
          this.size = size;
          this.linewidth = linewidth;
          this.flag = wireframe_flag;
          this.visible = visible;
          if(this.visible){
            this.color = new Colors().selectcolor(color);
          }
          else{this.color = 0x000000;}
          let smat = new MeshBasicMaterial({color:this.color,polygonOffset: true,polygonOffsetFactor: 1,polygonOffsetUnits: 1});
          let cube = new Mesh(new BoxGeometry(this.size[0],this.size[1],this.size[2]),smat);
          let lmat = new LineDashedMaterial({color:this.color,linewidth: this.linewidth,scale:2,gapSize:1.5,});
          let wireframe = new LineSegments( new EdgesGeometry(cube.geometry), lmat);
          wireframe.computeLineDistances();
          if(this.size[0]!==0){
            if(this.flag)
            this.entity = wireframe;
            else this.entity  = cube;
          }
          else this.entity = new Object3D();
          
          
      
    }




}
