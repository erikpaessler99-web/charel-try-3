// Environment.js - Updated for better visuals
import * as THREE from 'three';

export class Environment {
  constructor(scene) {
    this.scene = scene;
    this.clouds = [];
    this.createSky();
    this.createLighting();
    this.createStarfield(); // New: Adds depth to the background
  }
  
  createSky() {
    // Deep sunset gradient
    this.scene.background = new THREE.Color(0x1a0a2e); 
    this.scene.fog = new THREE.FogExp2(0x4a148c, 0.008); // Exponential fog for smoother transitions
  }

  createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 });
    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
      starVertices.push((Math.random() - 0.5) * 1000, (Math.random() - 0.5) * 1000, -Math.random() * 1000);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }
  
  createLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft ambient
    this.scene.add(ambientLight);
    
    const sunLight = new THREE.DirectionalLight(0xffaa00, 2); // Strong warm key light
    sunLight.position.set(50, 100, 50);
    this.scene.add(sunLight);

    const rimLight = new THREE.PointLight(0x00ffff, 1); // Cool rim light for highlights
    rimLight.position.set(-20, 10, -10);
    this.scene.add(rimLight);
  }

  update(deltaTime, forwardSpeed) {
    // Parallax logic remains but we can add subtle rotation to the starfield
  }
}
