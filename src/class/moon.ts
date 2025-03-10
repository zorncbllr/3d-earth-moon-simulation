import * as THREE from "three";

class Moon extends THREE.Mesh {
  constructor() {
    const loader = new THREE.TextureLoader();
    const moonGeo = new THREE.IcosahedronGeometry(0.3, 16);

    const moonMaterial = new THREE.MeshStandardMaterial({
      map: loader.load("/8k_moon.jpg"),
    });

    super(moonGeo, moonMaterial);

    this.position.setX(2.5);
  }

  public handleAnimation() {
    this.rotateY(0.01);
  }
}

export default Moon;
