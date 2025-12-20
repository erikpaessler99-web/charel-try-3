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
  IMAGE_OBSTACLE_MIN_INTERVAL: 0.8,  // Spawn every 0.8-1.5 seconds (VERY frequent)
  IMAGE_OBSTACLE_MAX_INTERVAL: 1.5,
  IMAGE_OBSTACLE_URLS: [
    'https://placekitten.com/200/200',
    'https://placekitten.com/200/202',
    'https://placekitten.com/200/203',
    'https://placekitten.com/200/204',
    'https://placekitten.com/200/205',
    'https://placekitten.com/200/206',
    'https://placekitten.com/200/207',
    'https://placekitten.com/200/208',
    'https://placekitten.com/200/209',
    'https://placekitten.com/200/210'
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
