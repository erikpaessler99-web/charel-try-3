import * as THREE from 'three';

export class Door {
  constructor(position) {
    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.passed = false;
    this.createDoor();
  }
  
  createDoor() {
    // Ornate magical doorframe
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.3,
      metalness: 0.8,
      emissive: 0xffa500,
      emissiveIntensity: 0.3
    });
    
    // Left pillar
    const pillarGeometry = new THREE.BoxGeometry(1, 12, 1);
    const leftPillar = new THREE.Mesh(pillarGeometry, frameMaterial);
    leftPillar.position.set(-4, 6, 0);
    this.group.add(leftPillar);
    
    // Right pillar
    const rightPillar = new THREE.Mesh(pillarGeometry, frameMaterial);
    rightPillar.position.set(4, 6, 0);
    this.group.add(rightPillar);
    
    // Top arch
    const archGeometry = new THREE.BoxGeometry(9, 1, 1);
    const arch = new THREE.Mesh(archGeometry, frameMaterial);
    arch.position.set(0, 12, 0);
    this.group.add(arch);
    
    // Decorative orbs on top
    const orbGeometry = new THREE.SphereGeometry(0.6, 16, 16);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0x00ffff,
      emissiveIntensity: 0.8
    });
    
    const leftOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    leftOrb.position.set(-4, 12.5, 0);
    this.group.add(leftOrb);
    
    const rightOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    rightOrb.position.set(4, 12.5, 0);
    this.group.add(rightOrb);
    
    const topOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    topOrb.position.set(0, 13, 0);
    this.group.add(topOrb);
    
    // Portal/gateway effect
    const portalGeometry = new THREE.PlaneGeometry(7, 11);
    const portalMaterial = new THREE.MeshBasicMaterial({
      color: 0x4169e1,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.position.set(0, 6.5, 0);
    this.group.add(portal);
    
    // Swirling particles effect (using small spheres)
    for (let i = 0; i < 20; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.1, 4, 4);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.6
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      const angle = (i / 20) * Math.PI * 2;
      const radius = 3;
      particle.position.set(
        Math.cos(angle) * radius,
        6.5 + (Math.random() - 0.5) * 8,
        0
      );
      
      this.group.add(particle);
    }
  }
  
  update(deltaTime, forwardSpeed) {
    this.group.position.z += forwardSpeed * deltaTime;
    
    // Gentle swaying animation
    this.group.rotation.y = Math.sin(Date.now() * 0.001) * 0.05;
    
    // Pulsing glow
    this.group.children.forEach((child, index) => {
      if (child.material && child.material.emissive) {
        const pulse = Math.sin(Date.now() * 0.003 + index) * 0.3 + 0.5;
        child.material.emissiveIntensity = pulse;
      }
    });
  }
  
  checkPassed(carpetPos) {
    // Check if carpet has passed through the door
    if (!this.passed && this.group.position.z > 0 && this.group.position.z < 5) {
      const inBoundsX = Math.abs(this.group.position.x - carpetPos.x) < 4;
      const inBoundsY = Math.abs(this.group.position.y - carpetPos.y) < 6;
      
      if (inBoundsX && inBoundsY) {
        this.passed = true;
        return true;
      }
    }
    return false;
  }
  
  isOffScreen() {
    return this.group.position.z > 20;
  }
}
