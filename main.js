import * as THREE from 'three';
import { CONFIG } from './config.js';
import { Carpet } from './Carpet.js';
import { InputController } from './InputController.js';
import { Obstacle } from './Obstacle.js';
import { Door } from './Door.js';
import { Environment } from './Environment.js';

class Game {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(this.renderer.domElement);
    
    // Game state
    this.gameOver = false;
    this.distance = 0;
    this.lastTime = 0;
    
    // Game objects
    this.carpet = new Carpet();
    this.scene.add(this.carpet.group);
    
    this.inputController = new InputController(this.renderer);
    this.environment = new Environment(this.scene);
    
    this.obstacles = [];
    this.doors = [];
    this.nextObstacleTime = 0;
    this.nextImageObstacleTime = 0;
    this.nextDoorDistance = CONFIG.DOOR_SPAWN_DISTANCE;
    
    this.setupCamera();
    this.setupUI();
    
    window.addEventListener('resize', () => this.onWindowResize());
    
    this.animate();
  }
  
  setupCamera() {
    // Position camera behind and slightly above the carpet for POV
    this.camera.position.set(0, CONFIG.CAMERA_Y_OFFSET, CONFIG.CAMERA_Z_OFFSET);
    this.camera.rotation.x = CONFIG.CAMERA_TILT;
  }
  
  setupUI() {
    this.distanceElement = document.getElementById('distance');
    this.gameOverElement = document.getElementById('gameOver');
    this.finalDistanceElement = document.getElementById('finalDistance');
    this.gameOverButton = document.getElementById('gameOverButton');
    
    // Default behavior is to reload
    this.gameOverButton.onclick = () => location.reload();
  }
  
  spawnObstacle() {
    const types = ['pillar', 'ring', 'wall', 'rocks'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * CONFIG.BOUNDS_X * 2,
      Math.random() * CONFIG.BOUNDS_Y_TOP,
      CONFIG.OBSTACLE_SPAWN_DISTANCE
    );
    
    const obstacle = new Obstacle(type, position);
    this.obstacles.push(obstacle);
    this.scene.add(obstacle.group);
  }
  
  spawnImageObstacle() {
    // Pick a random image URL from the config
    const imageUrl = CONFIG.IMAGE_OBSTACLE_URLS[
      Math.floor(Math.random() * CONFIG.IMAGE_OBSTACLE_URLS.length)
    ];
    
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * CONFIG.BOUNDS_X * 2,
      CONFIG.BOUNDS_Y_BOTTOM + Math.random() * (CONFIG.BOUNDS_Y_TOP - CONFIG.BOUNDS_Y_BOTTOM),
      CONFIG.OBSTACLE_SPAWN_DISTANCE
    );
    
    const obstacle = new Obstacle('image', position, imageUrl);
    this.obstacles.push(obstacle);
    this.scene.add(obstacle.group);
  }
  
  spawnDoor() {
    const position = new THREE.Vector3(
      0,
      6,
      CONFIG.OBSTACLE_SPAWN_DISTANCE
    );
    
    const door = new Door(position);
    this.doors.push(door);
    this.scene.add(door.group);
  }
  
  update(deltaTime) {
    if (this.gameOver) return;
    
    // Update distance
    this.distance += CONFIG.FORWARD_SPEED * deltaTime;
    this.distanceElement.textContent = Math.floor(this.distance);
    
    // Update carpet position based on input
    const offset = this.inputController.getOffset();
    const carpetPos = this.carpet.getPosition();
    this.carpet.setTarget(carpetPos.x + offset.x, carpetPos.y + offset.y);
    this.carpet.update(deltaTime);
    
    // Update camera to follow carpet
    const newCarpetPos = this.carpet.getPosition();
    this.camera.position.x = newCarpetPos.x;
    this.camera.position.y = newCarpetPos.y + CONFIG.CAMERA_Y_OFFSET;
    
    // Update environment
    this.environment.update(deltaTime, CONFIG.FORWARD_SPEED);
    
    // Spawn obstacles
    this.nextObstacleTime -= deltaTime;
    if (this.nextObstacleTime <= 0) {
      this.spawnObstacle();
      this.nextObstacleTime = CONFIG.OBSTACLE_MIN_INTERVAL + 
        Math.random() * (CONFIG.OBSTACLE_MAX_INTERVAL - CONFIG.OBSTACLE_MIN_INTERVAL);
    }
    
    // Spawn image obstacles
    this.nextImageObstacleTime -= deltaTime;
    if (this.nextImageObstacleTime <= 0) {
      this.spawnImageObstacle();
      this.nextImageObstacleTime = CONFIG.IMAGE_OBSTACLE_MIN_INTERVAL + 
        Math.random() * (CONFIG.IMAGE_OBSTACLE_MAX_INTERVAL - CONFIG.IMAGE_OBSTACLE_MIN_INTERVAL);
    }
    
    // Spawn door when distance reached
    if (this.distance >= this.nextDoorDistance && this.doors.length === 0) {
      this.spawnDoor();
    }
    
    // Update obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];
      obstacle.update(deltaTime, CONFIG.FORWARD_SPEED);
      
      // Check collision
      if (obstacle.checkCollision(newCarpetPos)) {
        this.endGame();
      }
      
      // Remove off-screen obstacles
      if (obstacle.isOffScreen()) {
        this.scene.remove(obstacle.group);
        this.obstacles.splice(i, 1);
      }
    }
    
    // Update doors
    for (let i = this.doors.length - 1; i >= 0; i--) {
      const door = this.doors[i];
      door.update(deltaTime, CONFIG.FORWARD_SPEED);
      
      // Check if passed through door
      if (door.checkPassed(newCarpetPos)) {
        console.log('Passed through door!');
        // Show success screen
        this.showSuccessScreen();
      }
      
      // Remove off-screen doors
      if (door.isOffScreen()) {
        this.scene.remove(door.group);
        this.doors.splice(i, 1);
      }
    }
    
    // Check boundaries
    if (newCarpetPos.x < -CONFIG.BOUNDS_X || newCarpetPos.x > CONFIG.BOUNDS_X ||
        newCarpetPos.y < CONFIG.BOUNDS_Y_BOTTOM) {
      this.endGame();
    }
  }
  
  endGame() {
    if (this.gameOver) return;
    
    this.gameOver = true;
    this.finalDistanceElement.textContent = Math.floor(this.distance);
    this.gameOverElement.style.display = 'block';
  }
  
  showSuccessScreen() {
    if (this.gameOver) return;
    
    this.gameOver = true;
    this.finalDistanceElement.textContent = Math.floor(this.distance);
    
    // Change the title to show success
    const gameOverTitle = document.querySelector('#gameOver h1');
    gameOverTitle.textContent = 'Success!';
    gameOverTitle.style.color = '#00ff00';
    
    // Change button to redirect instead of reload
    this.gameOverButton.textContent = 'Continue';
    this.gameOverButton.onclick = () => {
      window.location.href = CONFIG.DOOR_SUCCESS_URL;
    };
    
    this.gameOverElement.style.display = 'block';
  }
  
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  animate(currentTime = 0) {
    requestAnimationFrame((time) => this.animate(time));
    
    const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
    this.lastTime = currentTime;
    
    if (deltaTime > 0) {
      this.update(deltaTime);
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}

// Start the game
new Game();
// Hide instructions after 5 seconds
setTimeout(() => {
  document.getElementById('instructions').style.display = 'none';
}, 5000);
