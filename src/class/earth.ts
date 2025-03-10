import * as THREE from "three";

class Earth extends THREE.Mesh {
  private earthGeo: THREE.IcosahedronGeometry;
  private loader: THREE.TextureLoader;

  constructor() {
    const earthGeo = new THREE.IcosahedronGeometry(1, 16);
    const loader = new THREE.TextureLoader();

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: loader.load("/8k_earth_daymap.jpg"),
    });

    super(earthGeo, earthMaterial);

    this.earthGeo = earthGeo;
    this.loader = loader;

    this.scale.setScalar(1.5);

    this.addNightDetails();
    this.addClouds();
    this.addAtmosphere();
  }

  private addClouds() {
    const cloudsMat = new THREE.MeshStandardMaterial({
      blending: THREE.AdditiveBlending,
      map: this.loader.load("/8k_earth_clouds.jpg"),
    });

    const clouds = new THREE.Mesh(this.earthGeo, cloudsMat);
    clouds.scale.setScalar(1.004);

    this.add(clouds);
  }

  private addNightDetails() {
    const nightDetailsMaterial = new THREE.MeshStandardMaterial({
      blending: THREE.AdditiveBlending,
      map: this.loader.load("/8k_earth_nightmap.jpg"),
    });

    const nightDetail = new THREE.Mesh(this.earthGeo, nightDetailsMaterial);
    nightDetail.scale.setScalar(1.003);

    this.add(nightDetail);
  }

  private addAtmosphere() {
    const atmosphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x0000f5,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const atmosphere = new THREE.Mesh(this.earthGeo, atmosphereMaterial);
    atmosphere.scale.setScalar(1.02);

    this.add(atmosphere);
  }

  public handleAnimation() {
    this.rotateY(-0.0006);
    this.children[1].rotateY(-0.001);
  }
}

export default Earth;
