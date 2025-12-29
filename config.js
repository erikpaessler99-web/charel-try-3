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
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXrOG_yc5pb4MAa2n94_dSbJJOjHRdMGIp7Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI00smLNdanSFOZUv_Wfna4jEVaQCjCE7mlQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWILSUjZdywPXjM6ISzskV9pAJGGhP0R0QQA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbngxt9nbRIMF5M7Ya9caciZQfsjAfADd2pA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa7aiYMAft_eiYH90GnVbnUrBXosNbpPRxew&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKvJ0QEkwpbHbY19_t2yUYR8CZLN86adeFw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDhCVPpMtLlHP5Dq_YYP9TZhEuw1WMgSifIw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSF-e6yzgPhLtrG8X1Ale7gHUpst_smrLZRBA&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo4C_-DxAhGMJwAr-jZqJASDC_OO1Da3sBKQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb3mcANm08MofDLVJNI5wEjWslI7uya7kQJA&s'
  ],
  
  // Door
  DOOR_SPAWN_DISTANCE: 3500,
  DOOR_SUCCESS_URL: 'https://erikpaessler99-web.github.io/charel-try-4/',
  
  // Camera
  CAMERA_Y_OFFSET: 1.5,
  CAMERA_Z_OFFSET: 2,
  CAMERA_TILT: -0.1,
  
  // Collision
  COLLISION_RADIUS: 1.5
};



