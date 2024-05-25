import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import cube from "./demo/cube.js";
import ground from './demo/ground.js';
import cylinder from './demo/cylinder.js';


// 全局变量
let camera, scene, renderer, stats, gui = {};

function init() {
    // 场景
    scene = new THREE.Scene();

    // 添加物体
    scene.add(cube, ground);

    // 相机
    camera = new THREE.PerspectiveCamera(
        35, // 视野角度00
        window.innerWidth / window.innerHeight, // 长宽比
        0.1, // 近截面（near）
        300 // 远截面（far）
    );
    camera.position.set(50, 50, 50);
    // camera.lookAt(0, 0, 0);

    // 光源
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 5);
    spotLight.decay = 0.2;
    spotLight.angle = Math.PI / 3;
    spotLight.castShadow = true;
    spotLight.position.set(-0, 20, 0);
    spotLight.penumbra = 0.3;
    scene.add(spotLight);

    // const spotLight = new THREE.SpotLight(0xffffff, 5);
    // spotLight.decay = 0.2; // 默认值2
    // spotLight.angle = Math.PI / 3;
    // spotLight.position.set(-0, 20, 0);
    // spotLight.penumbra = 0.3;
    // scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    // 渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    // 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 渲染器打开阴影渲染
    renderer.shadowMap.enabled = true;

    document.body.appendChild(renderer.domElement);
    // window.addEventListener('resize', onWindowResize);
    window.onresize = onWindowResize;
    initHelper();
    initGUI();
}

function animate() {
    // 浏览器刷新的时候渲染器重新渲染
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
    stats.update();
}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
}

function initHelper() {
    const axesHelper = new THREE.AxesHelper(50);
    scene.add(axesHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', () => {
        renderer.render(scene, camera);
    });

    // const gridHelper = new THREE.GridHelper(1000, 100);
    // scene.add(gridHelper);

    //创建stats对象
    stats = new Stats();
    //stats.domElement:web页面上输出计算结果,一个div元素，
    document.body.appendChild(stats.domElement);
}

function initGUI() {
    gui = new GUI();
}

init();
animate();