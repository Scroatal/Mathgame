// Three.js Random Monster Generator
import * as THREE from 'three';

class MonsterGenerator {
  constructor() {
    // Configuration ranges for monster features
    this.config = {
      // Body properties
      bodyShapes: ['cube', 'sphere', 'cylinder', 'cone', 'torusKnot'],
      bodySize: { min: 1, max: 3 },
      bodyColors: [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff, 0xffff00, 0x00ffff, 0xffa500, 0x800080],
      
      // Limbs
      limbCount: { min: 2, max: 8 },
      limbLength: { min: 0.5, max: 2 },
      limbWidth: { min: 0.1, max: 0.5 },
      
      // Eyes
      eyeCount: { min: 1, max: 8 },
      eyeSize: { min: 0.1, max: 0.5 },
      eyeColors: [0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00],
      
      // Teeth/spikes
      spikeCount: { min: 0, max: 12 },
      spikeSize: { min: 0.1, max: 0.8 },
      
      // Textures
      textureTypes: ['smooth', 'rough', 'bumpy', 'scaly', 'furry'],
      
      // Animation
      animationTypes: ['bounce', 'wiggle', 'rotate', 'pulse', 'idle'],
      animationSpeed: { min: 0.5, max: 2 }
    };
  }

  // Generate a random number within a range
  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Random integer within a range
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Random item from an array
  randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Create geometry based on shape name
  createGeometry(shapeName, size) {
    switch(shapeName) {
      case 'cube':
        return new THREE.BoxGeometry(size, size, size);
      case 'sphere':
        return new THREE.SphereGeometry(size / 2, 32, 32);
      case 'cylinder':
        return new THREE.CylinderGeometry(size / 2, size / 2, size, 32);
      case 'cone':
        return new THREE.ConeGeometry(size / 2, size, 32);
      case 'torusKnot':
        return new THREE.TorusKnotGeometry(size / 3, size / 6, 100, 16);
      default:
        return new THREE.BoxGeometry(size, size, size);
    }
  }

  // Create a material with random properties
  createMaterial(color, textureType) {
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: textureType === 'rough' ? 0.9 : textureType === 'smooth' ? 0.1 : 0.5,
      metalness: textureType === 'scaly' ? 0.7 : 0.1,
    });
    
    // Add bumps or other texture effects
    if (textureType === 'bumpy' || textureType === 'scaly') {
      // In a real implementation, you would add bump or normal maps here
      material.bumpScale = 0.2;
    }
    
    return material;
  }

  // Generate a complete random monster
  generateMonster() {
    // Create a group to hold all monster parts
    const monster = new THREE.Group();
    
    // Monster generation configuration for this specific monster
    const monsterConfig = {
      bodyShape: this.randomItem(this.config.bodyShapes),
      bodySize: this.random(this.config.bodySize.min, this.config.bodySize.max),
      bodyColor: this.randomItem(this.config.bodyColors),
      textureType: this.randomItem(this.config.textureTypes),
      limbCount: this.randomInt(this.config.limbCount.min, this.config.limbCount.max),
      eyeCount: this.randomInt(this.config.eyeCount.min, this.config.eyeCount.max),
      spikeCount: this.randomInt(this.config.spikeCount.min, this.config.spikeCount.max),
      animationType: this.randomItem(this.config.animationTypes),
      animationSpeed: this.random(this.config.animationSpeed.min, this.config.animationSpeed.max)
    };
    
    // Create monster body
    const bodyGeometry = this.createGeometry(monsterConfig.bodyShape, monsterConfig.bodySize);
    const bodyMaterial = this.createMaterial(monsterConfig.bodyColor, monsterConfig.textureType);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    monster.add(body);
    
    // Add limbs
    for (let i = 0; i < monsterConfig.limbCount; i++) {
      const limbLength = this.random(this.config.limbLength.min, this.config.limbLength.max);
      const limbWidth = this.random(this.config.limbWidth.min, this.config.limbWidth.max);
      
      const limbGeometry = new THREE.CylinderGeometry(limbWidth, limbWidth, limbLength, 8);
      const limb = new THREE.Mesh(limbGeometry, bodyMaterial);
      
      // Position limb at a random point on the body sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      const radius = monsterConfig.bodySize / 2;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      limb.position.set(x, y, z);
      
      // Rotate limb to point outward
      limb.lookAt(x * 2, y * 2, z * 2);
      limb.rotateX(Math.PI / 2);
      
      // Move limb so its base is at the body surface
      limb.translateY(limbLength / 2);
      
      monster.add(limb);
    }
    
    // Add eyes
    for (let i = 0; i < monsterConfig.eyeCount; i++) {
      const eyeSize = this.random(this.config.eyeSize.min, this.config.eyeSize.max);
      const eyeGeometry = new THREE.SphereGeometry(eyeSize, 16, 16);
      const eyeMaterial = new THREE.MeshStandardMaterial({
        color: this.randomItem(this.config.eyeColors),
        emissive: this.randomItem(this.config.eyeColors),
        emissiveIntensity: 0.5
      });
      
      const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
      
      // Position eye on the "front" side of the monster
      const eyeTheta = this.random(-Math.PI/3, Math.PI/3); // Constraining to front half
      const eyePhi = this.random(Math.PI/4, 3*Math.PI/4); // Mostly top half
      
      const eyeRadius = monsterConfig.bodySize / 2 * 0.9;
      const eyeX = eyeRadius * Math.sin(eyePhi) * Math.cos(eyeTheta);
      const eyeY = eyeRadius * Math.sin(eyePhi) * Math.sin(eyeTheta);
      const eyeZ = eyeRadius * Math.cos(eyePhi);
      
      eye.position.set(eyeX, eyeY, eyeZ);
      
      // Make eye look outward
      eye.lookAt(eyeX * 2, eyeY * 2, eyeZ * 2);
      
      monster.add(eye);
      
      // Add pupil
      const pupilSize = eyeSize * 0.5;
      const pupilGeometry = new THREE.SphereGeometry(pupilSize, 16, 16);
      const pupilMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000
      });
      
      const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
      pupil.position.z = eyeSize * 0.6;
      eye.add(pupil);
    }
    
    // Add spikes/teeth
    for (let i = 0; i < monsterConfig.spikeCount; i++) {
      const spikeSize = this.random(this.config.spikeSize.min, this.config.spikeSize.max);
      const spikeGeometry = new THREE.ConeGeometry(spikeSize * 0.3, spikeSize, 8);
      const spikeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3
      });
      
      const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
      
      // Position spike randomly on the body
      const spikeTheta = Math.random() * Math.PI * 2;
      const spikePhi = Math.random() * Math.PI;
      
      const spikeRadius = monsterConfig.bodySize / 2;
      const spikeX = spikeRadius * Math.sin(spikePhi) * Math.cos(spikeTheta);
      const spikeY = spikeRadius * Math.sin(spikePhi) * Math.sin(spikeTheta);
      const spikeZ = spikeRadius * Math.cos(spikePhi);
      
      spike.position.set(spikeX, spikeY, spikeZ);
      
      // Rotate spike to point outward
      spike.lookAt(spikeX * 2, spikeY * 2, spikeZ * 2);
      spike.rotateX(Math.PI / 2);
      
      monster.add(spike);
    }
    
    // Store animation configuration on the monster object for later use
    monster.userData = {
      animationType: monsterConfig.animationType,
      animationSpeed: monsterConfig.animationSpeed,
      time: 0,
      originalPositions: {
        body: body.position.clone()
      }
    };
    
    return monster;
  }
  
  // Animate the monster based on its animation type
  animateMonster(monster, deltaTime) {
    monster.userData.time += deltaTime * monster.userData.animationSpeed;
    
    switch(monster.userData.animationType) {
      case 'bounce':
        monster.position.y = Math.sin(monster.userData.time * 2) * 0.2;
        break;
      case 'wiggle':
        monster.rotation.y = Math.sin(monster.userData.time) * 0.2;
        monster.rotation.x = Math.cos(monster.userData.time * 1.5) * 0.1;
        break;
      case 'rotate':
        monster.rotation.y += deltaTime * monster.userData.animationSpeed;
        break;
      case 'pulse':
        const scale = 1 + Math.sin(monster.userData.time * 3) * 0.05;
        monster.scale.set(scale, scale, scale);
        break;
      case 'idle':
        // Small random movements
        monster.rotation.y = Math.sin(monster.userData.time * 0.5) * 0.1;
        monster.position.y = Math.sin(monster.userData.time * 0.7) * 0.05;
        break;
    }
  }
}

// Usage example
function createMonsterScene() {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  
  // Create camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  
  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  // Create monster generator
  const generator = new MonsterGenerator();
  
  // Generate some random monsters
  const monsters = [];
  for (let i = 0; i < 5; i++) {
    const monster = generator.generateMonster();
    monster.position.x = (i - 2) * 4;
    monster.position.y = 0;
    scene.add(monster);
    monsters.push(monster);
  }
  
  // Animation loop
  const clock = new THREE.Clock();
  
  function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Animate each monster
    monsters.forEach(monster => {
      generator.animateMonster(monster, deltaTime);
    });
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Return info for external use
  return {
    scene,
    camera,
    renderer,
    generator,
    monsters
  };
}

// Export the generator for use in other modules
export { MonsterGenerator, createMonsterScene };