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
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xffa500,
      emissiveIntensity: 0.4
    });
    
    // Left pillar with ornate details
    const pillarGeometry = new THREE.BoxGeometry(1.2, 14, 1.2);
    const leftPillar = new THREE.Mesh(pillarGeometry, frameMaterial);
    leftPillar.position.set(-5, 7, 0);
    this.group.add(leftPillar);
    
    // Right pillar
    const rightPillar = new THREE.Mesh(pillarGeometry, frameMaterial);
    rightPillar.position.set(5, 7, 0);
    this.group.add(rightPillar);
    
    // Decorative caps on pillars
    const capGeometry = new THREE.CylinderGeometry(0.8, 1.2, 1, 6);
    const leftCap = new THREE.Mesh(capGeometry, frameMaterial);
    leftCap.position.set(-5, 14, 0);
    this.group.add(leftCap);
    
    const rightCap = new THREE.Mesh(capGeometry, frameMaterial);
    rightCap.position.set(5, 14, 0);
    this.group.add(rightCap);
    
    // Ornate arch on top
    const archCurve = new THREE.TorusGeometry(5.5, 0.8, 12, 24, Math.PI);
    const arch = new THREE.Mesh(archCurve, frameMaterial);
    arch.position.set(0, 14, 0);
    arch.rotation.y = Math.PI / 2;
    this.group.add(arch);
    
    // Keystone at top of arch
    const keystoneGeometry = new THREE.BoxGeometry(1.5, 2, 1.5);
    const keystone = new THREE.Mesh(keystoneGeometry, frameMaterial);
    keystone.position.set(0, 19.5, 0);
    keystone.rotation.z = Math.PI / 4;
    this.group.add(keystone);
    
    // Glowing orbs on pillars
    const orbGeometry = new THREE.SphereGeometry(0.7, 16, 16);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0x00ffff,
      emissiveIntensity: 0.9
    });
    
    const leftOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    leftOrb.position.set(-5, 14.5, 0);
    this.group.add(leftOrb);
    this.leftOrb = leftOrb;
    
    const rightOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    rightOrb.position.set(5, 14.5, 0);
    this.group.add(rightOrb);
    this.rightOrb = rightOrb;
    
    const topOrb = new THREE.Mesh(orbGeometry, orbMaterial);
    topOrb.position.set(0, 20, 0);
    this.group.add(topOrb);
    this.topOrb = topOrb;
    
    // Glowing halos around orbs
    this.orbs = [leftOrb, rightOrb, topOrb];
    this.orbs.forEach(orb => {
      const haloGeometry = new THREE.SphereGeometry(0.9, 16, 16);
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3
      });
      const halo = new THREE.Mesh(haloGeometry, haloMaterial);
      orb.add(halo);
    });
    
    // Portal effect - multi-layered
    const portalGeometry = new THREE.PlaneGeometry(9, 13);
    const portalMaterial = new THREE.MeshBasicMaterial({
      color: 0x4169e1,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide
    });
    const portal = new THREE.Mesh(portalGeometry, portalMaterial);
    portal.position.set(0, 7, 0);
    this.group.add(portal);
    this.portal = portal;
    
    // Inner portal layer
    const innerPortalGeometry = new THREE.PlaneGeometry(8, 12);
    const innerPortalMaterial = new THREE.MeshBasicMaterial({
      color: 0x00bfff,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const innerPortal = new THREE.Mesh(innerPortalGeometry, innerPortalMaterial);
    innerPortal.position.set(0, 7, 0.2);
    this.group.add(innerPortal);
    this.innerPortal = innerPortal;
    
    // Swirling magical particles
    this.particles = [];
    for (let i = 0; i < 40; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.15, 6, 6);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xffffff : 0x00ffff,
        transparent: true,
        opacity: 0.8
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      
      particle.userData.angle = (i / 40) * Math.PI * 2;
      particle.userData.radius = 3 + (i % 3);
      particle.userData.height = 7 + (Math.random() - 0.5) * 10;
      particle.userData.speed = 0.5 + Math.random() * 0.5;
      particle.userData.verticalSpeed = (Math.random() - 0.5) * 2;
      
      this.particles.push(particle);
      this.group.add(particle);
    }
    
    // Energy beams connecting orbs
    const beamMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.4
    });
    
    // Beam from left to right orb
    const horizontalBeamGeometry = new THREE.CylinderGeometry(0.1, 0.1, 10, 8);
    const horizontalBeam = new THREE.Mesh(horizontalBeamGeometry, beamMaterial);
    horizontalBeam.rotation.z = Math.PI / 2;
    horizontalBeam.position.set(0, 14.5, 0);
    this.group.add(horizontalBeam);
    this.horizontalBeam = horizontalBeam;
    
    // Decorative runes floating around
    this.runes = [];
    const runeTexts = ['◇', '◈', '◊', '❖', '✦', '✧'];
    for (let i = 0; i < 6; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#00ffff';
      ctx.font = '48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(runeTexts[i], 32, 32);
      
      const texture = new THREE.CanvasTexture(canvas);
      const runeMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.8
      });
      const rune = new THREE.Sprite(runeMaterial);
      rune.scale.set(0.8, 0.8, 1);
      
      rune.userData.angle = (i / 6) * Math.PI * 2;
      rune.userData.radius = 6;
      rune.userData.height = 7 + (i - 3) * 2;
      rune.userData.speed = 0.3;
      
      this.runes.push(rune);
      this.group.add(rune);
    }
  }
  
  update(deltaTime, forwardSpeed) {
    this.group.position.z += forwardSpeed * deltaTime;
    
    const time = Date.now() * 0.001;
    
    // Gentle swaying
    this.group.rotation.y = Math.sin(time * 0.5) * 0.05;
    
    // Pulsing glow on orbs
    this.orbs.forEach((orb, index) => {
      const pulse = Math.sin(time * 2 + index * 0.5) * 0.4 + 0.6;
      orb.material.emissiveIntensity = pulse;
      
      // Scale pulsing for halos
      if (orb.children[0]) {
        orb.children[0].scale.setScalar(1 + Math.sin(time * 2 + index * 0.5) * 0.2);
      }
    });
    
    // Pulsing portal layers
    if (this.portal) {
      this.portal.material.opacity = 0.3 + Math.sin(time * 1.5) * 0.15;
      this.portal.rotation.z = time * 0.2;
    }
    
    if (this.innerPortal) {
      this.innerPortal.material.opacity = 0.2 + Math.sin(time * 2) * 0.15;
      this.innerPortal.rotation.z = -time * 0.3;
    }
    
    // Animate swirling particles
    this.particles.forEach(particle => {
      const angle = particle.userData.angle + time * particle.userData.speed;
      particle.position.x = Math.cos(angle) * particle.userData.radius;
      particle.position.y = particle.userData.height + Math.sin(time + particle.userData.angle) * 0.5;
      particle.position.z = Math.sin(angle) * particle.userData.radius * 0.3;
      
      particle.material.opacity = 0.5 + Math.sin(time * 2 + particle.userData.angle) * 0.3;
    });
    
    // Pulse energy beam
    if (this.horizontalBeam) {
      this.horizontalBeam.material.opacity = 0.3 + Math.sin(time * 3) * 0.2;
    }
    
    // Rotate runes
    this.runes.forEach(rune => {
      const angle = rune.userData.angle + time * rune.userData.speed;
      rune.position.x = Math.cos(angle) * rune.userData.radius;
      rune.position.y = rune.userData.height;
      rune.position.z = Math.sin(angle) * rune.userData.radius * 0.2;
      rune.material.rotation = time + rune.userData.angle;
      rune.material.opacity = 0.6 + Math.sin(time * 2 + rune.userData.angle) * 0.3;
    });
  }
  
  checkPassed(carpetPos) {
    // Check if carpet has passed through the door
    if (!this.passed && this.group.position.z > 0 && this.group.position.z < 5) {
      const inBoundsX = Math.abs(this.group.position.x - carpetPos.x) < 5;
      const inBoundsY = Math.abs(this.group.position.y - carpetPos.y) < 7;
      
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
