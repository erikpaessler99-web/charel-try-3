import * as THREE from 'three';

export class Obstacle {
  constructor(type, position) {
    this.type = type;
    this.group = new THREE.Group();
    this.group.position.copy(position);
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
    }
  }
  
  createPillar() {
    // Ancient stone pillar
    const height = 15 + Math.random() * 10;
    const geometry = new THREE.CylinderGeometry(1.5, 1.8, height, 8);
    const material = new THREE.MeshStandardMaterial({
      color: 0x8b7355,
      roughness: 0.9,
      metalness: 0.1
    });
    const pillar = new THREE.Mesh(geometry, material);
    pillar.position.y = height / 2 - 5;
    this.group.add(pillar);
    
    // Capital on top
    const capitalGeometry = new THREE.CylinderGeometry(2, 1.5, 2, 8);
    const capital = new THREE.Mesh(capitalGeometry, material);
    capital.position.y = height - 5;
    this.group.add(capital);
  }
  
  createRing() {
    // Magical floating ring - must fly through it
    const outerGeometry = new THREE.TorusGeometry(4, 0.5, 8, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x9400d3,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0x9400d3,
      emissiveIntensity: 0.5
    });
    const ring = new THREE.Mesh(outerGeometry, material);
    ring.rotation.y = Math.PI / 2;
    this.group.add(ring);
    
    // Inner glow
    const innerGeometry = new THREE.TorusGeometry(3.5, 0.3, 6, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.6
    });
    const innerRing = new THREE.Mesh(innerGeometry, glowMaterial);
    innerRing.rotation.y = Math.PI / 2;
    this.group.add(innerRing);
    
    this.isRing = true;
  }
  
  createWall() {
    // Wall with a gap - must fly through the gap
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x654321,
      roughness: 0.8,
      metalness: 0.2
    });
    
    const gapSize = 6;
    const gapPosition = (Math.random() - 0.5) * 20;
    
    // Left wall
    const leftWidth = 15 - gapSize / 2 + gapPosition;
    if (leftWidth > 2) {
      const leftGeometry = new THREE.BoxGeometry(leftWidth, 12, 2);
      const leftWall = new THREE.Mesh(leftGeometry, wallMaterial);
      leftWall.position.x = -15 + leftWidth / 2;
      leftWall.position.y = 5;
      this.group.add(leftWall);
    }
    
    // Right wall
    const rightWidth = 15 - gapSize / 2 - gapPosition;
    if (rightWidth > 2) {
      const rightGeometry = new THREE.BoxGeometry(rightWidth, 12, 2);
      const rightWall = new THREE.Mesh(rightGeometry, wallMaterial);
      rightWall.position.x = 15 - rightWidth / 2;
      rightWall.position.y = 5;
      this.group.add(rightWall);
    }
    
    // Top wall
    const topGeometry = new THREE.BoxGeometry(gapSize, 8, 2);
    const topWall = new THREE.Mesh(topGeometry, wallMaterial);
    topWall.position.x = gapPosition;
    topWall.position.y = 14;
    this.group.add(topWall);
  }
  
  createFloatingRocks() {
    // Cluster of floating rocks
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0x696969,
      roughness: 1.0,
      metalness: 0
    });
    
    for (let i = 0; i < 5; i++) {
      const size = 1 + Math.random() * 2;
      const geometry = new THREE.DodecahedronGeometry(size, 0);
      const rock = new THREE.Mesh(geometry, rockMaterial);
      
      rock.position.x = (Math.random() - 0.5) * 8;
      rock.position.y = (Math.random() - 0.5) * 8;
      rock.position.z = (Math.random() - 0.5) * 3;
      
      rock.rotation.x = Math.random() * Math.PI;
      rock.rotation.y = Math.random() * Math.PI;
      rock.rotation.z = Math.random() * Math.PI;
      
      this.group.add(rock);
    }
  }
  
  update(deltaTime, forwardSpeed) {
    this.group.position.z += forwardSpeed * deltaTime;
    
    // Gentle rotation for floating elements
    if (this.isRing) {
      this.group.rotation.y += deltaTime * 0.5;
    }
  }
  
  isOffScreen() {
    return this.group.position.z > 20;
  }
  
  checkCollision(carpetPos) {
    // Skip collision for rings (they're meant to fly through)
    if (this.isRing) return false;
    
    const distance = Math.sqrt(
      Math.pow(this.group.position.x - carpetPos.x, 2) +
      Math.pow(this.group.position.y - carpetPos.y, 2)
    );
    
    // Check if carpet is close enough in Z and within collision distance
    if (Math.abs(this.group.position.z) < 3 && distance < 3) {
      return true;
    }
    
    return false;
  }
}
