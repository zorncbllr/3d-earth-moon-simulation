import * as THREE from "three";

class Moon extends THREE.Mesh {
  constructor() {
    const loader = new THREE.TextureLoader();
    const moonGeo = new THREE.IcosahedronGeometry(0.2, 16);

    const moonMaterial = new THREE.MeshStandardMaterial({
      map: loader.load("/8k_moon.jpg"),
    });

    super(moonGeo, moonMaterial);
  }

  private angle = 0;
  private distance = 3;

  public handleAnimation() {
    this.rotateY(0.07);

    this.angle += 0.01;
    this.position.x = this.distance * Math.cos(this.angle);
    this.position.z = this.distance * Math.sin(this.angle);
  }
}

export default Moon;
