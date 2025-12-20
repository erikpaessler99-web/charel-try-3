// Add this to Carpet.js constructor
this.particles = [];
this.particleGroup = new THREE.Group();
scene.add(this.particleGroup); // You'll need to pass scene to Carpet

// Add to Carpet.update()
const particle = new THREE.Mesh(
  new THREE.SphereGeometry(0.05),
  new THREE.MeshBasicMaterial({ color: 0x00ffff })
);
particle.position.copy(this.group.position);
particle.position.z += 2; // Behind carpet
this.particles.push({ mesh: particle, life: 1.0 });
this.particleGroup.add(particle);

// Fade and remove particles
this.particles.forEach((p, i) => {
  p.life -= deltaTime * 2;
  p.mesh.scale.setScalar(p.life);
  if (p.life <= 0) {
    this.particleGroup.remove(p.mesh);
    this.particles.splice(i, 1);
  }
});
