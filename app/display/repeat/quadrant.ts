import { Object3D, Box3, Vector3 } from 'three';

export class Quadrant {
    constructor(){}
    repeat(line_number:number,orientation:number,copy_spacing: number,max_range: number,objold1:Object3D){
        let layer = new Object3D();
        for(let i=1;i<line_number+1;i++){
            let objnew = this.linerepeat(i,objold1,copy_spacing,max_range).clone();
            objnew.translateX(Math.sqrt(3)/2*copy_spacing*(i-1));
            layer.add(objnew);
        }
        layer.rotateOnAxis(new Vector3(0,0,1),orientation);//绕坐标轴旋转
        return layer;
    }
    
    ///生成每列
    linerepeat(n:number,objold1:Object3D,copy_spacing:number,max_range: number){
        let layerin = new Object3D();
        for(let i=0;i<n;i++){
            let objnew1 = objold1.clone();
            objnew1.position.set(0,(copy_spacing*i),0);
            //判断是否在范围内 
            let x1 = Math.sqrt(3)/2*copy_spacing*(n-1);
            let y1 = objnew1.position.y-(n-1)*copy_spacing/2;
            let distance = Math.sqrt((x1*x1)+(y1*y1));
            if(distance < max_range||distance == max_range){
                layerin.add(objnew1);
            } 
        }
        //y轴位置校正
        let box = new Box3();
        let center = box.getCenter(box.expandByObject(layerin).max);
        layerin.position.set(-center.x,-center.y,-center.z);
        return layerin;
      }

}
