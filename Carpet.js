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
    
    // Create a canvas texture for intricate carpet pattern
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Deep red background
    ctx.fillStyle = '#8b0000';
    ctx.fillRect(0, 0, 512, 512);
    
    // Golden border
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 20;
    ctx.strokeRect(20, 20, 472, 472);
    
    // Inner decorative pattern
    ctx.strokeStyle = '#ff6347';
    ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        ctx.strokeRect(64 + i * 48, 64 + j * 48, 40, 40);
      }
    }
    
    // Central medallion
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(256, 256, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Star pattern in center
    ctx.fillStyle = '#00ffff';
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = 256 + Math.cos(angle) * 40;
      const y = 256 + Math.sin(angle) * 40;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    const carpetMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.7,
      metalness: 0.2
    });
    const carpetMesh = new THREE.Mesh(carpetGeometry, carpetMaterial);
    this.group.add(carpetMesh);
    
    // Golden trim on edges with glow
    const trimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0xffa500,
      emissiveIntensity: 0.4
    });
    
    const trimGeometry = new THREE.BoxGeometry(3.2, 0.15, 0.2);
    
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
        const tasselGeometry = new THREE.ConeGeometry(0.15, 0.5, 6);
        const tasselMaterial = new THREE.MeshStandardMaterial({
          color: 0xffd700,
          roughness: 0.5,
          metalness: 0.6
        });
        const tassel = new THREE.Mesh(tasselGeometry, tasselMaterial);
        tassel.position.set(x, -0.35, z);
        this.group.add(tassel);
      }
    }
    
    // Center glowing ornament
    const ornamentGeometry = new THREE.SphereGeometry(0.4, 16, 16);
    const ornamentMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8
    });
    const ornament = new THREE.Mesh(ornamentGeometry, ornamentMaterial);
    ornament.position.set(0, 0.25, 0);
    this.group.add(ornament);
    
    // Add particle glow effect around ornament
    const glowGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 0.25, 0);
    this.group.add(glow);
    this.glowMesh = glow;
    
    // Add magical sparkles floating around carpet
    this.sparkles = [];
    for (let i = 0; i < 12; i++) {
      const sparkleGeometry = new THREE.SphereGeometry(0.08, 6, 6);
      const sparkleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffd700,
        transparent: true,
        opacity: 0.8
      });
      const sparkle = new THREE.Mesh(sparkleGeometry, sparkleMaterial);
      
      const angle = (i / 12) * Math.PI * 2;
      sparkle.userData.angle = angle;
      sparkle.userData.radius = 2 + Math.random() * 0.5;
      sparkle.userData.height = Math.random() * 0.5 - 0.25;
      sparkle.userData.speed = 0.5 + Math.random() * 0.5;
      
      this.sparkles.push(sparkle);
      this.group.add(sparkle);
    }
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
    
    // Animate glow
    if (this.glowMesh) {
      const glowPulse = Math.sin(Date.now() * 0.003) * 0.2 + 0.3;
      this.glowMesh.material.opacity = glowPulse;
      this.glowMesh.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.1);
    }
    
    // Animate sparkles
    this.sparkles.forEach((sparkle, i) => {
      const time = Date.now() * 0.001 * sparkle.userData.speed;
      const angle = sparkle.userData.angle + time;
      const radius = sparkle.userData.radius;
      
      sparkle.position.x = Math.cos(angle) * radius;
      sparkle.position.y = sparkle.userData.height + Math.sin(time * 2) * 0.2;
      sparkle.position.z = Math.sin(angle) * radius;
      
      sparkle.material.opacity = 0.5 + Math.sin(time * 3 + i) * 0.3;
    });
  }
  
  getPosition() {
    return {
      x: this.currentX,
      y: this.currentY
    };
  }
}
