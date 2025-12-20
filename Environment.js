import * as THREE from 'three';

export class Environment {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.birds = [];
    this.floatingIslands = [];
    this.createSky();
    this.createCloudLayer();
    this.createLighting();
    this.createFloatingIslands();
    this.createBirds();
    this.createDistantMountains();
  }
  
  createSky() {
    // Beautiful gradient sky
    const skyGradient = new THREE.Color(0x87ceeb);
    this.scene.background = skyGradient;
    this.scene.fog = new THREE.Fog(0xa8d8ff, 80, 250);
  }
  
  createCloudLayer() {
    // Create thick, fluffy cloud layer below
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.95
    });
    
    // Create varied cloud formations
    for (let i = 0; i < 60; i++) {
      const cloudGroup = new THREE.Group();
      
      const puffCount = 3 + Math.floor(Math.random() * 4);
      for (let j = 0; j < puffCount; j++) {
        const size = 6 + Math.random() * 14;
        const geometry = new THREE.SphereGeometry(size, 10, 8);
        const cloud = new THREE.Mesh(geometry, cloudMaterial.clone());
        
        cloud.position.x = (Math.random() - 0.5) * 18;
        cloud.position.y = (Math.random() - 0.5) * 4;
        cloud.position.z = (Math.random() - 0.5) * 18;
        
        cloud.scale.set(
          1 + Math.random() * 0.5,
          0.4 + Math.random() * 0.3,
          1 + Math.random() * 0.5
        );
        cloudGroup.add(cloud);
      }
      
      cloudGroup.position.set(
        (Math.random() - 0.5) * 220,
        -12 - Math.random() * 15,
        (Math.random() - 0.5) * 500 - 100
      );
      
      cloudGroup.userData.baseZ = cloudGroup.position.z;
      cloudGroup.userData.speed = 0.2 + Math.random() * 0.15;
      this.clouds.push(cloudGroup);
      this.scene.add(cloudGroup);
    }
  }
  
  createFloatingIslands() {
    // Create magical floating islands in the distance
    for (let i = 0; i < 9; i++) {  // Reduced from 15 to 9 (40% reduction)
      const islandGroup = new THREE.Group();
      
      // Island base (inverted cone/mountain shape)
      const baseGeometry = new THREE.ConeGeometry(
        4 + Math.random() * 3,
        8 + Math.random() * 5,
        8
      );
      const baseMaterial = new THREE.MeshStandardMaterial({
        color: 0x8b7355,
        roughness: 0.9,
        metalness: 0.1
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      base.rotation.x = Math.PI;
      base.position.y = -3;
      islandGroup.add(base);
      
      // Island top (flatter surface)
      const topGeometry = new THREE.CylinderGeometry(
        5 + Math.random() * 3,
        4 + Math.random() * 2,
        2,
        8
      );
      const topMaterial = new THREE.MeshStandardMaterial({
        color: 0x228b22,
        roughness: 0.8,
        metalness: 0
      });
      const top = new THREE.Mesh(topGeometry, topMaterial);
      top.position.y = 0.5;
      islandGroup.add(top);
      
      // Add trees/structures
      const treeCount = 2 + Math.floor(Math.random() * 3);
      for (let j = 0; j < treeCount; j++) {
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.4, 3, 6);
        const trunkMaterial = new THREE.MeshStandardMaterial({
          color: 0x8b4513
        });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        
        const foliageGeometry = new THREE.SphereGeometry(1.5, 6, 6);
        const foliageMaterial = new THREE.MeshStandardMaterial({
          color: 0x228b22
        });
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = 2.5;
        
        const tree = new THREE.Group();
        tree.add(trunk);
        tree.add(foliage);
        tree.position.set(
          (Math.random() - 0.5) * 4,
          1.5,
          (Math.random() - 0.5) * 4
        );
        islandGroup.add(tree);
      }
      
      // Position islands around the world
      islandGroup.position.set(
        (Math.random() - 0.5) * 100 + (i % 2 === 0 ? -40 : 40),
        Math.random() * 20 + 5,
        -50 - Math.random() * 150
      );
      
      islandGroup.userData.baseZ = islandGroup.position.z;
      islandGroup.userData.bobSpeed = 0.5 + Math.random() * 0.5;
      islandGroup.userData.bobHeight = islandGroup.position.y;
      
      this.floatingIslands.push(islandGroup);
      this.scene.add(islandGroup);
    }
  }
  
  createBirds() {
    // Create simple flying birds
    for (let i = 0; i < 20; i++) {
      const birdGroup = new THREE.Group();
      
      // Simple bird shape with two wings
      const bodyGeometry = new THREE.SphereGeometry(0.3, 6, 6);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      birdGroup.add(body);
      
      const wingGeometry = new THREE.BoxGeometry(1.5, 0.1, 0.5);
      const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444
      });
      
      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing.position.x = -0.75;
      birdGroup.add(leftWing);
      
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      rightWing.position.x = 0.75;
      birdGroup.add(rightWing);
      
      birdGroup.userData.leftWing = leftWing;
      birdGroup.userData.rightWing = rightWing;
      
      // Position birds
      birdGroup.position.set(
        (Math.random() - 0.5) * 100,
        10 + Math.random() * 15,
        -30 - Math.random() * 100
      );
      
      birdGroup.userData.baseZ = birdGroup.position.z;
      birdGroup.userData.speed = 15 + Math.random() * 10;
      birdGroup.userData.flapSpeed = 5 + Math.random() * 3;
      birdGroup.userData.pathRadius = 5 + Math.random() * 10;
      
      this.birds.push(birdGroup);
      this.scene.add(birdGroup);
    }
  }
  
  createDistantMountains() {
    // Create distant mountain silhouettes
    for (let i = 0; i < 8; i++) {
      const mountainGeometry = new THREE.ConeGeometry(
        20 + Math.random() * 15,
        40 + Math.random() * 30,
        4
      );
      const mountainMaterial = new THREE.MeshStandardMaterial({
        color: 0x4a4a6a,
        transparent: true,
        opacity: 0.6
      });
      const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
      
      mountain.position.set(
        (Math.random() - 0.5) * 200,
        -5,
        -180 - Math.random() * 50
      );
      
      this.scene.add(mountain);
    }
  }
  
  createLighting() {
    // Bright ambient light for high-altitude feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);
    
    // Golden sunlight
    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 0.9);
    directionalLight.position.set(30, 60, 40);
    directionalLight.castShadow = false;
    this.scene.add(directionalLight);
    
    // Subtle blue backlight for atmosphere
    const backLight = new THREE.DirectionalLight(0x6495ed, 0.4);
    backLight.position.set(-15, 25, -40);
    this.scene.add(backLight);
    
    // Rim light for dramatic effect
    const rimLight = new THREE.DirectionalLight(0xffa500, 0.3);
    rimLight.position.set(0, 10, -50);
    this.scene.add(rimLight);
  }
  
  update(deltaTime, forwardSpeed) {
    const time = Date.now() * 0.001;
    
    // Move clouds with parallax
    this.clouds.forEach(cloud => {
      cloud.position.z += forwardSpeed * deltaTime * cloud.userData.speed;
      
      if (cloud.position.z > 100) {
        cloud.position.z = cloud.userData.baseZ;
      }
      
      // Gentle drift and rotation
      cloud.position.x += Math.sin(time * 0.1 + cloud.position.z * 0.01) * 0.02;
      cloud.rotation.y = time * 0.05;
    });
    
    // Animate floating islands
    this.floatingIslands.forEach(island => {
      island.position.z += forwardSpeed * deltaTime * 0.24;  // Reduced from 0.4 to 0.24 (40% slower)
      
      if (island.position.z > 50) {
        island.position.z = island.userData.baseZ;
      }
      
      // Gentle bobbing
      island.position.y = island.userData.bobHeight + 
        Math.sin(time * island.userData.bobSpeed) * 1.5;
      
      island.rotation.y = Math.sin(time * 0.2) * 0.1;
    });
    
    // Animate birds
    this.birds.forEach(bird => {
      bird.position.z += forwardSpeed * deltaTime * 0.6;
      
      if (bird.position.z > 50) {
        bird.position.z = bird.userData.baseZ;
      }
      
      // Circular flight path
      const pathAngle = time * 0.5;
      bird.position.x += Math.sin(pathAngle) * 0.1;
      bird.position.y += Math.cos(pathAngle * 1.3) * 0.05;
      
      // Wing flapping
      const flapAngle = Math.sin(time * bird.userData.flapSpeed) * 0.5;
      bird.userData.leftWing.rotation.z = flapAngle;
      bird.userData.rightWing.rotation.z = -flapAngle;
      
      // Face forward
      bird.rotation.y = Math.sin(pathAngle) * 0.3;
    });
  }
}
