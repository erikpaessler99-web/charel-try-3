// Game configuration and constants
export const CONFIG = {
  // Movement
  FORWARD_SPEED: 40,
  CARPET_MOVE_SPEED: 0.15,
  CARPET_MAX_OFFSET: 15,
  
  // Boundaries
  BOUNDS_X: 25,
  BOUNDS_Y_TOP: 20,
  BOUNDS_Y_BOTTOM: -5,
  
  // Obstacles
  OBSTACLE_SPAWN_DISTANCE: -150,
  OBSTACLE_DESPAWN_DISTANCE: 20,
  OBSTACLE_MIN_INTERVAL: 2.0,
  OBSTACLE_MAX_INTERVAL: 4.5,
  
  // Image Obstacles (new)
  IMAGE_OBSTACLE_MIN_INTERVAL: 3.0,
  IMAGE_OBSTACLE_MAX_INTERVAL: 6.0,
  IMAGE_OBSTACLE_URLS: [
    'https://picsum.photos/200/200?random=1',
    'https://picsum.photos/200/200?random=2',
    'https://picsum.photos/200/200?random=3',
    'https://picsum.photos/200/200?random=4',
    'https://picsum.photos/200/200?random=5',
    'https://picsum.photos/200/200?random=6',
    'https://picsum.photos/200/200?random=7',
    'https://picsum.photos/200/200?random=8',
    'https://picsum.photos/200/200?random=9',
    'https://picsum.photos/200/200?random=10'
  ],
  
  // Door
  DOOR_SPAWN_DISTANCE: 3500,
  DOOR_SUCCESS_URL: 'https://www.google.com/',
  
  // Camera
  CAMERA_Y_OFFSET: 1.5,
  CAMERA_Z_OFFSET: 2,
  CAMERA_TILT: -0.1,
  
  // Collision
  COLLISION_RADIUS: 1.5
};


