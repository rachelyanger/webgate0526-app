import { Component, OnInit,ViewChild,ElementRef, Input } from '@angular/core';
import { WebGLRenderer, Scene, PerspectiveCamera,  AxesHelper, Object3D } from 'three';
import * as OrbitControls from 'three-orbitcontrols';
import { CreatsystemService } from '../services/creatsystem.service';
import { GeometryService } from '../services/geometry.service';
import { GetinputService } from '../services/getinput.service';
import { CreatphantomService } from '../services/creatphantom.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  constructor(
    private getinputService:GetinputService,
    private creatsystemService:CreatsystemService,
    private creatphantomService:CreatphantomService
  ) { }

  @Input() mygeometry:any
  @Input() myplacement:any
  @Input() myrepeater:any

  renderer = new WebGLRenderer({antialias:true});
  @ViewChild('Canvas')
  myCanvas: ElementRef<HTMLElement>;
  scene;
  camera;
  perspectivecamera = new PerspectiveCamera(45, 1000 / 750, 0.1, 1000);
  axes = new AxesHelper(60);
  controls;
  system:Object3D;
  phantom:Object3D;

  ////
  a = this.getinputService.a;

//控制轨道
 con(){
  this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  this.controls.enableDamping = true;
  this.controls.dampingFactor = 0.25;
  this.controls.enableZoom = true;   
 }

//暂时不考虑的运动
  animate() {
    requestAnimationFrame(() => this.animate());
    //this.s.rotation.y += 0.08;
    this.renderer.render(this.scene, this.camera);
  }
  myinput(){
    this.getinputService.setinput(this.mygeometry,this.myplacement,this.myrepeater);//解析输入
  }
  //初始化 
  init() {
    this.myinput();
    this.scene = new Scene();
    this.camera = this.perspectivecamera;//还没有做按键切换相机
    this.renderer.setSize(750, 500);
    this.renderer.setClearColor(0x000000);
    this.myCanvas.nativeElement.appendChild(this.renderer.domElement);
    this.con();
    this.scene.add(this.axes);
/////////////
    this.system = this.creatsystemService.init();
    this.scene.add(this.system);
    this.phantom = this.creatphantomService.init();
    this.scene.add(this.phantom);
//////////
    this.camera.position.set(20,20,40);
    this.camera.lookAt(0,0,0);
    this.animate();
  }
  ngOnInit() {
    
  }
}
