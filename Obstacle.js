import * as THREE from 'three';

export class Obstacle {
  constructor(type, position, imageUrl = null) {
    this.type = type;
    this.group = new THREE.Group();
    this.group.position.copy(position);
    this.imageUrl = imageUrl;
    this.createObstacle();
  }
  
  createObstacle() {
    switch(this.type) {
      case 'pillar':
        this.createPillar();
        break;
      case 'ring':
        this.createRing();
        break;
      case 'wall':
        this.createWall();
        break;
      case 'rocks':
        this.createFloatingRocks();
        break;
      case 'image':
        this.createImageObstacle();
        break;
    }
  }
  
  createPillar() {
    // Ancient ornate pillar
    const height = 15 + Math.random() * 12;
    
    // Base
    const baseGeometry = new THREE.CylinderGeometry(2.5, 3, 2, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b7355,
      roughness: 0.8,
      metalness: 0.2
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -4;
    this.group.add(base);
    
    // Main pillar with segments
    const segments = 5;
    for (let i = 0; i < segments; i++) {
      const segmentHeight = height / segments;
      const geometry = new THREE.CylinderGeometry(1.8, 2, segmentHeight, 8);
      const material = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x8b7355 : 0xa0826d,
        roughness: 0.9,
        metalness: 0.1
      });
      const segment = new THREE.Mesh(geometry, material);
      segment.position.y = -3 + (i * segmentHeight) + segmentHeight / 2;
      this.group.add(segment);
    }
    
    // Ornate capital on top
    const capitalGeometry = new THREE.CylinderGeometry(2.5, 1.8, 2.5, 8);
    const capitalMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.4,
      metalness: 0.6,
      emissive: 0xffa500,
      emissiveIntensity: 0.2
    });
    const capital = new THREE.Mesh(capitalGeometry, capitalMaterial);
    capital.position.y = height - 4;
    this.group.add(capital);
    
    // Glowing orb on top
    const orbGeometry = new THREE.SphereGeometry(0.8, 12, 12);
    const orbMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x00ffff,
      emissiveIntensity: 0.6
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.y = height - 2.5;
    this.group.add(orb);
    this.glowOrb = orb;
    
    // Add decorative bands
    for (let i = 0; i < 3; i++) {
      const bandGeometry = new THREE.TorusGeometry(2.2, 0.15, 8, 16);
      const bandMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.4,
        metalness: 0.7
      });
      const band = new THREE.Mesh(bandGeometry, bandMaterial);
      band.position.y = -2 + (height / 3) * (i + 0.5);
      band.rotation.x = Math.PI / 2;
      this.group.add(band);
    }
  }
  
  createRing() {
    // Magical floating ring with elaborate design
    const outerGeometry = new THREE.TorusGeometry(4.5, 0.6, 12, 24);
    const material = new THREE.MeshStandardMaterial({
      color: 0x9400d3,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x9400d3,
      emissiveIntensity: 0.5
    });
    const ring = new THREE.Mesh(outerGeometry, material);
    ring.rotation.y = Math.PI / 2;
    this.group.add(ring);
    
    // Inner magical glow
    const innerGeometry = new THREE.TorusGeometry(4, 0.4, 10, 24);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.7
    });
    const innerRing = new THREE.Mesh(innerGeometry, glowMaterial);
    innerRing.rotation.y = Math.PI / 2;
    this.group.add(innerRing);
    this.innerGlow = innerRing;
    
    // Decorative nodes around the ring
    const nodeCount = 12;
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const nodeGeometry = new THREE.SphereGeometry(0.4, 8, 8);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffd700,
        roughness: 0.3,
        metalness: 0.8,
        emissive: 0xffa500,
        emissiveIntensity: 0.4
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.x = Math.cos(angle) * 4.5;
      node.position.y = Math.sin(angle) * 4.5;
      this.group.add(node);
    }
    
    // Orbiting particles
    this.particles = [];
    for (let i = 0; i < 20; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.12, 6, 6);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.userData.angle = (i / 20) * Math.PI * 2;
      particle.userData.speed = 1 + Math.random() * 0.5;
      particle.userData.radius = 3.5 + Math.random() * 1.5;
      this.particles.push(particle);
      this.group.add(particle);
    }
    
    this.isRing = true;
  }
  
  createWall() {
    // Ornate wall with gap
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b4513,
      roughness: 0.8,
      metalness: 0.2
    });
    
    const accentMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      roughness: 0.4,
      metalness: 0.7,
      emissive: 0xffa500,
      emissiveIntensity: 0.2
    });
    
    const gapSize = 7;
    const gapPosition = (Math.random() - 0.5) * 20;
    
    // Left wall section
    const leftWidth = 15 - gapSize / 2 + gapPosition;
    if (leftWidth > 2) {
      const leftGeometry = new THREE.BoxGeometry(leftWidth, 14, 2);
      const leftWall = new THREE.Mesh(leftGeometry, wallMaterial);
      leftWall.position.x = -15 + leftWidth / 2;
      leftWall.position.y = 6;
      this.group.add(leftWall);
      
      // Add decorative columns
      const columnGeometry = new THREE.BoxGeometry(0.8, 14, 0.8);
      const leftColumn = new THREE.Mesh(columnGeometry, accentMaterial);
      leftColumn.position.x = -15 + leftWidth;
      leftColumn.position.y = 6;
      leftColumn.position.z = 1.2;
      this.group.add(leftColumn);
    }
    
    // Right wall section
    const rightWidth = 15 - gapSize / 2 - gapPosition;
    if (rightWidth > 2) {
      const rightGeometry = new THREE.BoxGeometry(rightWidth, 14, 2);
      const rightWall = new THREE.Mesh(rightGeometry, wallMaterial);
      rightWall.position.x = 15 - rightWidth / 2;
      rightWall.position.y = 6;
      this.group.add(rightWall);
      
      const columnGeometry = new THREE.BoxGeometry(0.8, 14, 0.8);
      const rightColumn = new THREE.Mesh(columnGeometry, accentMaterial);
      rightColumn.position.x = 15 - rightWidth;
      rightColumn.position.y = 6;
      rightColumn.position.z = 1.2;
      this.group.add(rightColumn);
    }
    
    // Top archway section
    const topGeometry = new THREE.BoxGeometry(gapSize + 2, 6, 2);
    const topWall = new THREE.Mesh(topGeometry, wallMaterial);
    topWall.position.x = gapPosition;
    topWall.position.y = 16;
    this.group.add(topWall);
    
    // Decorative arch
    const archCurve = new THREE.TorusGeometry(gapSize / 2, 0.5, 8, 16, Math.PI);
    const arch = new THREE.Mesh(archCurve, accentMaterial);
    arch.position.x = gapPosition;
    arch.position.y = 13;
    arch.rotation.z = Math.PI;
    arch.rotation.y = Math.PI / 2;
    this.group.add(arch);
    
    // Glowing lanterns on sides
    const lanternGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 6);
    const lanternMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0xff6600,
      emissiveIntensity: 0.8
    });
    
    const leftLantern = new THREE.Mesh(lanternGeometry, lanternMaterial);
    leftLantern.position.x = gapPosition - gapSize / 2 - 1;
    leftLantern.position.y = 13;
    leftLantern.position.z = 1.5;
    this.group.add(leftLantern);
    
    const rightLantern = new THREE.Mesh(lanternGeometry, lanternMaterial);
    rightLantern.position.x = gapPosition + gapSize / 2 + 1;
    rightLantern.position.y = 13;
    rightLantern.position.z = 1.5;
    this.group.add(rightLantern);
    
    this.lanterns = [leftLantern, rightLantern];
  }
  
  createFloatingRocks() {
    // Cluster of magical floating rocks
    const rockCount = 6 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < rockCount; i++) {
      const size = 1.2 + Math.random() * 2.5;
      const geometry = new THREE.DodecahedronGeometry(size, 0);
      const material = new THREE.MeshStandardMaterial({
        color: 0x696969,
        roughness: 1.0,
        metalness: 0.1
      });
      const rock = new THREE.Mesh(geometry, material);
      
      rock.position.x = (Math.random() - 0.5) * 10;
      rock.position.y = (Math.random() - 0.5) * 10;
      rock.position.z = (Math.random() - 0.5) * 4;
      
      rock.rotation.x = Math.random() * Math.PI;
      rock.rotation.y = Math.random() * Math.PI;
      rock.rotation.z = Math.random() * Math.PI;
      
      rock.userData.rotationSpeed = {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
        z: (Math.random() - 0.5) * 0.5
      };
      
      this.group.add(rock);
      
      // Add glowing crystals to some rocks
      if (Math.random() > 0.5) {
        const crystalGeometry = new THREE.OctahedronGeometry(size * 0.3, 0);
        const crystalMaterial = new THREE.MeshStandardMaterial({
          color: 0x00ffff,
          roughness: 0.2,
          metalness: 0.8,
          emissive: 0x00ffff,
          emissiveIntensity: 0.6
        });
        const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
        crystal.position.y = size * 0.7;
        rock.add(crystal);
      }
    }
    
    // Add magical energy swirls
    this.energyParticles = [];
    for (let i = 0; i < 15; i++) {
      const particleGeometry = new THREE.SphereGeometry(0.15, 6, 6);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: 0x9400d3,
        transparent: true,
        opacity: 0.7
      });
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.userData.angle = (i / 15) * Math.PI * 2;
      particle.userData.radius = 5 + Math.random() * 3;
      particle.userData.speed = 1 + Math.random();
      particle.userData.height = (Math.random() - 0.5) * 8;
      this.energyParticles.push(particle);
      this.group.add(particle);
    }
  }
  
  createImageObstacle() {
    // Load image as texture and create a sprite
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous'; // Enable CORS
    
    // Random size between 3 and 6 units
    const size = 3 + Math.random() * 3;
    
    // Load texture with error handling
    const texture = textureLoader.load(
      this.imageUrl,
      () => console.log('Image loaded:', this.imageUrl),
      undefined,
      (error) => console.error('Error loading image:', this.imageUrl, error)
    );
    
    const spriteMaterial = new THREE.SpriteMaterial({
      map: texture,
      transparent: true
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, 1);
    
    this.group.add(sprite);
    this.sprite = sprite;
    
    // Add subtle glow effect
    const glowMaterial = new THREE.SpriteMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.2
    });
    const glow = new THREE.Sprite(glowMaterial);
    glow.scale.set(size * 1.2, size * 1.2, 1);
    this.group.add(glow);
    this.glow = glow;
  }
  
  update(deltaTime, forwardSpeed) {
    this.group.position.z += forwardSpeed * deltaTime;
    
    const time = Date.now() * 0.001;
    
    // Animate based on type
    if (this.isRing) {
      this.group.rotation.y += deltaTime * 0.5;
      
      // Pulsing glow
      if (this.innerGlow) {
        this.innerGlow.material.opacity = 0.5 + Math.sin(time * 2) * 0.3;
      }
      
      // Orbit particles
      if (this.particles) {
        this.particles.forEach(particle => {
          const angle = particle.userData.angle + time * particle.userData.speed;
          particle.position.x = Math.cos(angle) * particle.userData.radius;
          particle.position.y = Math.sin(angle) * particle.userData.radius;
          particle.material.opacity = 0.5 + Math.sin(time * 3 + particle.userData.angle) * 0.3;
        });
      }
    }
    
    // Animate glowing orb on pillars
    if (this.glowOrb) {
      this.glowOrb.material.emissiveIntensity = 0.4 + Math.sin(time * 2) * 0.3;
    }
    
    // Animate lanterns on walls
    if (this.lanterns) {
      this.lanterns.forEach((lantern, i) => {
        lantern.material.emissiveIntensity = 0.6 + Math.sin(time * 2 + i) * 0.3;
      });
    }
    
    // Animate floating rocks
    if (this.energyParticles) {
      this.energyParticles.forEach(particle => {
        const angle = particle.userData.angle + time * particle.userData.speed;
        particle.position.x = Math.cos(angle) * particle.userData.radius;
        particle.position.y = particle.userData.height + Math.sin(angle * 2) * 2;
        particle.position.z = Math.sin(angle) * particle.userData.radius * 0.5;
        particle.material.opacity = 0.5 + Math.sin(time * 3 + particle.userData.angle) * 0.3;
      });
      
      // Rotate rocks
      this.group.children.forEach(child => {
        if (child.userData.rotationSpeed) {
          child.rotation.x += child.userData.rotationSpeed.x * deltaTime;
          child.rotation.y += child.userData.rotationSpeed.y * deltaTime;
          child.rotation.z += child.userData.rotationSpeed.z * deltaTime;
        }
      });
    }
    
    // Animate image obstacles
    if (this.sprite) {
      this.sprite.position.y = Math.sin(time * 0.5) * 0.5;
      
      if (this.glow) {
        this.glow.material.opacity = 0.15 + Math.sin(time * 2) * 0.1;
        this.glow.position.y = this.sprite.position.y;
      }
    }
  }
  
  isOffScreen() {
    return this.group.position.z > 20;
  }
  
  checkCollision(carpetPos) {
    // Skip collision for rings (fly through them)
    if (this.isRing) return false;
    
    const distance = Math.sqrt(
      Math.pow(this.group.position.x - carpetPos.x, 2) +
      Math.pow(this.group.position.y - carpetPos.y, 2)
    );
    
    // Check if carpet is in collision zone
    if (Math.abs(this.group.position.z) < 3 && distance < 3.5) {
      return true;
    }
    
    return false;
  }
}
