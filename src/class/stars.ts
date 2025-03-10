import * as THREE from "three";

class Star extends THREE.Mesh {
  constructor() {
    const starGeo = new THREE.SphereGeometry(0.005, 12, 12);
    const starMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    super(starGeo, starMaterial);

    this.randomizePosition();
  }

  private randomizePosition() {
    this.position.x = (Math.random() - 0.5) * 30;
    this.position.y = (Math.random() - 0.5) * 30;
    this.position.z = (Math.random() - 0.5) * 30;
  }
}

function addStars(scene: THREE.Scene, count: number = 2000) {
  for (let i = 0; i < count; i++) {
    const star = new Star();
    scene.add(star);
  }
}

export { addStars };
