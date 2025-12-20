import { CONFIG } from './config.js';

export class InputController {
  constructor(renderer) {
    this.canvas = renderer.domElement;
    this.isDragging = false;
    this.startX = 0;
    this.startY = 0;
    this.currentOffsetX = 0;
    this.currentOffsetY = 0;
    
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => this.onPointerDown(e.clientX, e.clientY));
    this.canvas.addEventListener('mousemove', (e) => this.onPointerMove(e.clientX, e.clientY));
    this.canvas.addEventListener('mouseup', () => this.onPointerUp());
    this.canvas.addEventListener('mouseleave', () => this.onPointerUp());
    
    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.onPointerDown(touch.clientX, touch.clientY);
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.onPointerMove(touch.clientX, touch.clientY);
    });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.onPointerUp();
    });
  }
  
  onPointerDown(x, y) {
    this.isDragging = true;
    this.startX = x;
    this.startY = y;
  }
  
  onPointerMove(x, y) {
    if (!this.isDragging) return;
    
    const deltaX = x - this.startX;
    const deltaY = y - this.startY;
    
    // Convert screen space to world space
    // Horizontal drag moves carpet left/right
    this.currentOffsetX = (deltaX / window.innerWidth) * CONFIG.CARPET_MAX_OFFSET * 2;
    
    // Vertical drag moves carpet up/down (inverted for intuitive control)
    this.currentOffsetY = -(deltaY / window.innerHeight) * CONFIG.BOUNDS_Y_TOP * 2;
  }
  
  onPointerUp() {
    this.isDragging = false;
    this.currentOffsetX = 0;
    this.currentOffsetY = 0;
  }
  
  getOffset() {
    return {
      x: this.currentOffsetX,
      y: this.currentOffsetY
    };
  }
}
