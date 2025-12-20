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
    'https://img.a.transfermarkt.technology/portrait/big/468539-1758188153.jpg?lm=1', // Replace with your image URLs
    'https://img.a.transfermarkt.technology/portrait/big/84993-1758189215.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/529895-1758189409.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/227110-1758188233.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/892160-1758187820.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/381967-1758189027.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/470038-1758189531.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/415194-1758189571.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/694507-1758188945.jpg?lm=1',
    'https://img.a.transfermarkt.technology/portrait/big/157635-1758188866.jpg?lm=1'
  ],
  
  // Door
  DOOR_SPAWN_DISTANCE: 4000,
  DOOR_SUCCESS_URL: 'https://www.google.com/', // Replace with your success URL
  
  // Camera
  CAMERA_Y_OFFSET: 1.5,
  CAMERA_Z_OFFSET: 2,
  CAMERA_TILT: -0.1,
  
  // Collision
  COLLISION_RADIUS: 1.5
};

