import * as THREE from 'three';
import { CONFIG } from './config.js';

export class Carpet {
  constructor() {
    this.group = new THREE.Group();
    this.targetX = 0;
    this.targetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    
    this.createCarpet();
  }
  
  createCarpet() {
    // Main carpet body - ornate magical carpet
    const carpetGeometry = new THREE.BoxGeometry(3, 0.1, 4);
    const carpetMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b0000, // Deep red
      roughness: 0.8,
      metalness: 0.2
    });
    const carpetMesh = new THREE.Mesh(carpetGeometry, carpetMaterial);
    this.group.add(carpetMesh);
    
    // Golden trim on edges
    const trimGeometry = new THREE.BoxGeometry(3.2, 0.15, 0.2);
    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0xffa500,
      emissiveIntensity: 0.2
    });
    
    // Front trim
    const frontTrim = new THREE.Mesh(trimGeometry, trimMaterial);
    frontTrim.position.set(0, 0, -1.9);
    this.group.add(frontTrim);
    
    // Back trim
    const backTrim = new THREE.Mesh(trimGeometry, trimMaterial);
    backTrim.position.set(0, 0, 1.9);
    this.group.add(backTrim);
    
    // Side trims
    const sideTrimGeometry = new THREE.BoxGeometry(0.2, 0.15, 4);
    const leftTrim = new THREE.Mesh(sideTrimGeometry, trimMaterial);
    leftTrim.position.set(-1.6, 0, 0);
    this.group.add(leftTrim);
    
    const rightTrim = new THREE.Mesh(sideTrimGeometry, trimMaterial);
    rightTrim.position.set(1.6, 0, 0);
    this.group.add(rightTrim);
    
    // Decorative tassels on corners
    for (let x = -1.5; x <= 1.5; x += 3) {
      for (let z = -1.9; z <= 1.9; z += 3.8) {
        const tasselGeometry = new THREE.ConeGeometry(0.1, 0.4, 4);
        const tasselMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          roughness: 0.6,
          metalness: 0.5
        });
        const tassel = new THREE.Mesh(tasselGeometry, tasselMaterial);
        tassel.position.set(x, -0.3, z);
        this.group.add(tassel);
      }
    }
    
    // Center ornament
    const ornamentGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const ornamentMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x00ffff,
      emissiveIntensity: 0.5
    });
    const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterial);
    ornament.position.set(0, 0.2, 0);
    this.group.add(ornament);
  }
  
  setTarget(x, y) {
    this.targetX = THREE.MathUtils.clamp(x, -CONFIG.CARPET_MAX_OFFSET, CONFIG.CARPET_MAX_OFFSET);
    this.targetY = THREE.MathUtils.clamp(y, CONFIG.BOUNDS_Y_BOTTOM, CONFIG.BOUNDS_Y_TOP);
  }
  
  update(deltaTime) {
    // Smooth movement towards target position
    this.currentX = THREE.MathUtils.lerp(this.currentX, this.targetX, CONFIG.CARPET_MOVE_SPEED);
    this.currentY = THREE.MathUtils.lerp(this.currentY, this.targetY, CONFIG.CARPET_MOVE_SPEED);
    
    this.group.position.x = this.currentX;
    this.group.position.y = this.currentY;
    
    // Add slight banking/tilting when turning
    const tiltAmount = (this.targetX - this.currentX) * 0.05;
    this.group.rotation.z = -tiltAmount;
    
    // Gentle bobbing motion
    const bobAmount = Math.sin(Date.now() * 0.002) * 0.1;
    this.group.rotation.x = bobAmount * 0.2;
  }
  
  getPosition() {
    return {
      x: this.currentX,
      y: this.currentY
    };
  }
}
