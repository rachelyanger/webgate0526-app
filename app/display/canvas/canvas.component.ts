import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { WebGLRenderer, Scene, PerspectiveCamera,  AxesHelper, Object3D,PointLight} from 'three';
import * as OrbitControls from 'three-orbitcontrols'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }
  
  renderer = new WebGLRenderer({antialias:true});
  @ViewChild('Canvas')
  myCanvas: ElementRef<HTMLElement>;
  scene = new Scene();
  camera = new PerspectiveCamera(45, 1000 / 750, 0.1, 1000);
//坐标轴
  axes = new AxesHelper(60);
  system:Object3D;
  phantom:Object3D;
  pointLight = new PointLight(0xFFFFFF);
//控制轨道

controls = new OrbitControls(this.camera, this.renderer.domElement);
con(){
 this.controls.enableDamping = true;
 this.controls.dampingFactor = 0.25;
 this.controls.enableZoom = true; 
}


// ////////////
  init() {
    this.con();
    this.camera = this.camera;
    this.renderer.setSize(750, 500);
    this.renderer.setClearColor(0x000000);
    this.myCanvas.nativeElement.appendChild(this.renderer.domElement);
    this.scene.add(this.axes);
//这里改
    //this.system = ;
    this.scene.add(this.system);
    this.scene.add(this.phantom);
    this.pointLight.position.set(30,30,50);
    this.scene.add(this.pointLight);
/////
    this.camera.position.set(10,10,20);
    this.camera.lookAt(0,0,0);
    this.animate();
    //this.renderer.render(this.scene, this.camera);
  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.phantom.rotation.z += Math.PI/180;
    this.renderer.render(this.scene, this.camera);
  }
  ngOnInit() {
    this.init();
    
    //this.initcontrols();
    
  }

}
