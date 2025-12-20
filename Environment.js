import * as THREE from 'three';

export class Environment {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.createSky();
    this.createCloudLayer();
    this.createLighting();
  }
  
  createSky() {
    // Gradient sky with fog
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 50, 200);
  }
  
  createCloudLayer() {
    // Create a thick layer of clouds below the carpet
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      metalness: 0,
      transparent: true,
      opacity: 0.9
    });
    
    // Large cloud base
    for (let i = 0; i < 50; i++) {
      const cloudGroup = new THREE.Group();
      
      // Multiple puffs per cloud
      const puffCount = 3 + Math.floor(Math.random() * 3);
      for (let j = 0; j < puffCount; j++) {
        const size = 8 + Math.random() * 12;
        const geometry = new THREE.SphereGeometry(size, 8, 6);
        const cloud = new THREE.Mesh(geometry, cloudMaterial);
        
        cloud.position.x = (Math.random() - 0.5) * 15;
        cloud.position.y = (Math.random() - 0.5) * 3;
        cloud.position.z = (Math.random() - 0.5) * 15;
        
        cloud.scale.y = 0.5 + Math.random() * 0.3;
        cloudGroup.add(cloud);
      }
      
      // Position clouds below and around
      cloudGroup.position.set(
        (Math.random() - 0.5) * 200,
        -15 - Math.random() * 10,
        (Math.random() - 0.5) * 400 - 100
      );
      
      cloudGroup.userData.baseZ = cloudGroup.position.z;
      this.clouds.push(cloudGroup);
      this.scene.add(cloudGroup);
    }
  }
  
  createLighting() {
    // Bright ambient light for high-altitude feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
    
    // Directional sunlight
    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 0.8);
    directionalLight.position.set(20, 50, 30);
    directionalLight.castShadow = false;
    this.scene.add(directionalLight);
    
    // Subtle backlight for depth
    const backLight = new THREE.DirectionalLight(0x4169e1, 0.3);
    backLight.position.set(-10, 20, -30);
    this.scene.add(backLight);
  }
  
  update(deltaTime, forwardSpeed) {
    // Move clouds backward to create parallax effect
    this.clouds.forEach(cloud => {
      cloud.position.z += forwardSpeed * deltaTime * 0.3; // Slower than obstacles
      
      // Reset clouds that pass by
      if (cloud.position.z > 100) {
        cloud.position.z = cloud.userData.baseZ;
      }
      
      // Gentle drift
      cloud.position.x += Math.sin(Date.now() * 0.0001 + cloud.position.z) * 0.01;
    });
  }
}
