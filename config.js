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
    'https://example.com/image1.png', // Replace with your image URLs
    'https://example.com/image2.png',
    'https://example.com/image3.png',
    'https://example.com/image4.png',
    'https://example.com/image5.png',
    'https://example.com/image6.png',
    'https://example.com/image7.png',
    'https://example.com/image8.png',
    'https://example.com/image9.png',
    'https://example.com/image10.png'
  ],
  
  // Door
  DOOR_SPAWN_DISTANCE: 4000,
  DOOR_SUCCESS_URL: 'https://example.com/success', // Replace with your success URL
  
  // Camera
  CAMERA_Y_OFFSET: 1.5,
  CAMERA_Z_OFFSET: 2,
  CAMERA_TILT: -0.1,
  
  // Collision
  COLLISION_RADIUS: 1.5
};
