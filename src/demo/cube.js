import * as THREE from 'three';

const geometry = new THREE.BoxGeometry(10, 3, 10);
const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    // transparent: true,
    opacity: 0.5
});
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.receiveShadow = true;

export default mesh;