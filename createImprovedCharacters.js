/**
 * Enhanced character models for Math RPG Game
 * This file extends the game.js file with improved 3D models
 */

// Add these methods to your MathRPGGame class

/**
 * Create an improved hero character
 * @param {number} color - Color of the hero
 * @returns {THREE.Group} Hero group
 */
MathRPGGame.prototype.createImprovedHero = function(color = 0x00ff00) {
    const group = new THREE.Group();
    
    // Materials
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: color,
        roughness: 0.7,
        metalness: 0.3
    });
    
    const clothMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x4444ff, // Blue clothing
        roughness: 0.8,
        metalness: 0.1
    });
    
    const faceMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xffcc99, // Skin tone
        roughness: 0.5,
        metalness: 0.1
    });
    
    // Head with better shape
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 24, 24),
        faceMaterial
    );
    head.position.y = 1.5;
    head.castShadow = true;
    group.add(head);
    
    // Hair
    const hair = new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown hair
            roughness: 1,
            metalness: 0
        })
    );
    hair.position.y = 1.6;
    hair.rotation.x = Math.PI;
    hair.castShadow = true;
    group.add(hair);
    
    // Eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    
    // Left eye
    const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        eyeMaterial
    );
    leftEye.position.set(-0.1, 1.55, 0.2);
    group.add(leftEye);
    
    const leftPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 8, 8),
        pupilMaterial
    );
    leftPupil.position.set(-0.1, 1.55, 0.24);
    group.add(leftPupil);
    
    // Right eye
    const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        eyeMaterial
    );
    rightEye.position.set(0.1, 1.55, 0.2);
    group.add(rightEye);
    
    const rightPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.025, 8, 8),
        pupilMaterial
    );
    rightPupil.position.set(0.1, 1.55, 0.24);
    group.add(rightPupil);
    
    // Mouth
    const mouth = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, 0.03, 0.03),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    mouth.position.set(0, 1.42, 0.24);
    group.add(mouth);
    
    // Body - torso
    const torso = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.5, 0.25),
        clothMaterial
    );
    torso.position.y = 1.15;
    torso.castShadow = true;
    group.add(torso);
    
    // Shoulder pads
    const leftShoulder = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        bodyMaterial
    );
    leftShoulder.position.set(-0.2, 1.3, 0);
    leftShoulder.scale.set(1, 0.8, 1);
    leftShoulder.castShadow = true;
    group.add(leftShoulder);
    
    const rightShoulder = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        bodyMaterial
    );
    rightShoulder.position.set(0.2, 1.3, 0);
    rightShoulder.scale.set(1, 0.8, 1);
    rightShoulder.castShadow = true;
    group.add(rightShoulder);
    
    // Arms
    const leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8),
        faceMaterial
    );
    leftArm.position.set(-0.25, 1.1, 0);
    leftArm.rotation.z = Math.PI / 8;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.4, 8),
        faceMaterial
    );
    rightArm.position.set(0.25, 1.1, 0);
    rightArm.rotation.z = -Math.PI / 8;
    rightArm.castShadow = true;
    group.add(rightArm);
    
    // Hands
    const leftHand = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        faceMaterial
    );
    leftHand.position.set(-0.32, 0.95, 0);
    leftHand.castShadow = true;
    group.add(leftHand);
    
    const rightHand = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        faceMaterial
    );
    rightHand.position.set(0.32, 0.95, 0);
    rightHand.castShadow = true;
    group.add(rightHand);
    
    // Sword in right hand
    const swordHandle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.15, 8),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown handle
            roughness: 0.8,
            metalness: 0.2
        })
    );
    swordHandle.position.set(0.4, 0.9, 0);
    swordHandle.rotation.z = Math.PI / 2;
    group.add(swordHandle);
    
    const swordGuard = new THREE.Mesh(
        new THREE.BoxGeometry(0.02, 0.12, 0.04),
        new THREE.MeshStandardMaterial({ 
            color: 0xFFD700, // Gold guard
            roughness: 0.2,
            metalness: 0.8
        })
    );
    swordGuard.position.set(0.48, 0.9, 0);
    swordGuard.rotation.z = Math.PI / 2;
    group.add(swordGuard);
    
    const swordBlade = new THREE.Mesh(
        new THREE.BoxGeometry(0.03, 0.4, 0.01),
        new THREE.MeshStandardMaterial({ 
            color: 0xC0C0C0, // Silver blade
            roughness: 0.2,
            metalness: 0.8
        })
    );
    swordBlade.position.set(0.65, 0.9, 0);
    swordBlade.rotation.z = Math.PI / 2;
    group.add(swordBlade);
    
    // Lower body
    const lowerBody = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.2, 0.25),
        clothMaterial
    );
    lowerBody.position.y = 0.85;
    lowerBody.castShadow = true;
    group.add(lowerBody);
    
    // Legs
    const leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.4, 0.15),
        new THREE.MeshStandardMaterial({ 
            color: 0x222222, // Dark pants
            roughness: 0.8,
            metalness: 0.1
        })
    );
    leftLeg.position.set(-0.1, 0.6, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.4, 0.15),
        new THREE.MeshStandardMaterial({ 
            color: 0x222222, // Dark pants
            roughness: 0.8,
            metalness: 0.1
        })
    );
    rightLeg.position.set(0.1, 0.6, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    // Feet
    const leftFoot = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.1, 0.2),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown boots
            roughness: 0.9,
            metalness: 0.1
        })
    );
    leftFoot.position.set(-0.1, 0.35, 0.02);
    leftFoot.castShadow = true;
    group.add(leftFoot);
    
    const rightFoot = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.1, 0.2),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown boots
            roughness: 0.9,
            metalness: 0.1
        })
    );
    rightFoot.position.set(0.1, 0.35, 0.02);
    rightFoot.castShadow = true;
    group.add(rightFoot);
    
    // Add built-in animation
    this.setupHeroAnimations(group);
    
    return group;
};

/**
 * Set up idle animations for the hero
 * @param {THREE.Group} heroGroup - The hero group to animate
 */
MathRPGGame.prototype.setupHeroAnimations = function(heroGroup) {
    // Store original positions for all body parts
    heroGroup.children.forEach(child => {
        // Save the original Y position for animation
        child.userData = {
            originalY: child.position.y
        };
    });
    
    // Gentle breathing animation
    const breathingAnimation = { y: 0 };
    new TWEEN.Tween(breathingAnimation)
        .to({ y: 0.03 }, 1500)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(() => {
            // Move torso and head slightly based on original positions
            heroGroup.children.forEach(child => {
                if (child.position.y > 1 && child.userData.originalY) {
                    child.position.y = child.userData.originalY + breathingAnimation.y;
                }
            });
        })
        .start();
    
    // Gentle swaying animation
    const swayAnimation = { rotation: 0 };
    new TWEEN.Tween(swayAnimation)
        .to({ rotation: 0.03 }, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(() => {
            heroGroup.rotation.y = swayAnimation.rotation;
        })
        .start();
};

/**
 * Create different types of monsters based on operation
 * @param {string} operation - Type of operation
 * @param {boolean} isBoss - Whether this is a boss monster
 * @returns {THREE.Group} Monster group
 */
MathRPGGame.prototype.createImprovedMonsterByOperation = function(operation, isBoss) {
    switch (operation) {
        case 'addition':
            return this.createAdditionMonster(isBoss);
        case 'subtraction':
            return this.createSubtractionMonster(isBoss);
        case 'multiplication':
            return this.createMultiplicationMonster(isBoss);
        case 'division':
            return this.createDivisionMonster(isBoss);
        default:
            return this.createAdditionMonster(isBoss);
    }
};

/**
 * Create an addition monster (red flame monster)
 * @param {boolean} isBoss - Whether this is a boss monster
 * @returns {THREE.Group} Monster group
 */
MathRPGGame.prototype.createAdditionMonster = function(isBoss) {
    const group = new THREE.Group();
    
    // Main body - fiery creature
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xff3300,
        roughness: 0.7,
        metalness: 0.3,
        emissive: 0xff0000,
        emissiveIntensity: 0.3
    });
    
    // Create main body as a jagged shape
    const mainBody = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        bodyMaterial
    );
    mainBody.position.y = 0.9;
    mainBody.scale.set(0.8, 1.2, 0.8);
    mainBody.castShadow = true;
    group.add(mainBody);
    
    // Flame spikes on top
    for (let i = 0; i < 8; i++) {
        const spike = new THREE.Mesh(
            new THREE.ConeGeometry(0.15, 0.4, 4),
            bodyMaterial
        );
        const angle = (i / 8) * Math.PI * 2;
        const radius = 0.3;
        spike.position.set(
            Math.sin(angle) * radius,
            1.5,
            Math.cos(angle) * radius
        );
        spike.rotation.x = Math.random() * 0.3;
        spike.rotation.z = Math.random() * 0.3;
        group.add(spike);
    }
    
    // Eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    
    // Create angry-looking eyes
    const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        eyeMaterial
    );
    leftEye.position.set(-0.2, 1.1, 0.3);
    leftEye.scale.set(1, 0.5, 1);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        eyeMaterial
    );
    rightEye.position.set(0.2, 1.1, 0.3);
    rightEye.scale.set(1, 0.5, 1);
    group.add(rightEye);
    
    // Pupils
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    
    const leftPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        pupilMaterial
    );
    leftPupil.position.set(-0.2, 1.1, 0.39);
    group.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        pupilMaterial
    );
    rightPupil.position.set(0.2, 1.1, 0.39);
    group.add(rightPupil);
    
    // Mouth
    const mouth = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.1, 0.1),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    mouth.position.set(0, 0.8, 0.4);
    group.add(mouth);
    
    // Arms
    const leftArm = new THREE.Mesh(
        new THREE.ConeGeometry(0.1, 0.5, 4),
        bodyMaterial
    );
    leftArm.position.set(-0.6, 1, 0);
    leftArm.rotation.z = -Math.PI / 4;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(
        new THREE.ConeGeometry(0.1, 0.5, 4),
        bodyMaterial
    );
    rightArm.position.set(0.6, 1, 0);
    rightArm.rotation.z = Math.PI / 4;
    rightArm.castShadow = true;
    group.add(rightArm);
    
    // Legs
    const leftLeg = new THREE.Mesh(
        new THREE.ConeGeometry(0.15, 0.6, 4),
        bodyMaterial
    );
    leftLeg.position.set(-0.3, 0.3, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(
        new THREE.ConeGeometry(0.15, 0.6, 4),
        bodyMaterial
    );
    rightLeg.position.set(0.3, 0.3, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    // Plus sign on chest to represent addition
    const plusVertical = new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.3, 0.05),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    plusVertical.position.set(0, 0.9, 0.4);
    group.add(plusVertical);
    
    const plusHorizontal = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.08, 0.05),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    plusHorizontal.position.set(0, 0.9, 0.4);
    group.add(plusHorizontal);
    
    // If it's a boss, make it larger and add crown
    if (isBoss) {
        group.scale.set(1.5, 1.5, 1.5);
        
        const crownMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold
            roughness: 0.3,
            metalness: 0.8
        });
        
        // Crown base
        const crownBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.4, 0.2, 8),
            crownMaterial
        );
        crownBase.position.y = 1.8;
        group.add(crownBase);
        
        // Crown spikes
        for (let i = 0; i < 5; i++) {
            const spike = new THREE.Mesh(
                new THREE.ConeGeometry(0.08, 0.3, 8),
                crownMaterial
            );
            const angle = (i / 5) * Math.PI * 2;
            const radius = 0.25;
            spike.position.set(
                Math.sin(angle) * radius,
                2,
                Math.cos(angle) * radius
            );
            group.add(spike);
        }
    }
    
    // Add flame animation
    this.setupFlameAnimation(group);
    
    return group;
};

/**
 * Create a subtraction monster (blue ice monster)
 * @param {boolean} isBoss - Whether this is a boss monster
 * @returns {THREE.Group} Monster group
 */
MathRPGGame.prototype.createSubtractionMonster = function(isBoss) {
    const group = new THREE.Group();
    
    // Main body - ice creature
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0088ff,
        roughness: 0.2,
        metalness: 0.8,
        opacity: 0.9,
        transparent: true
    });
    
    // Create main body as crystal-like shape
    const mainBody = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.5, 0),
        bodyMaterial
    );
    mainBody.position.y = 0.9;
    mainBody.scale.set(0.8, 1.2, 0.8);
    mainBody.castShadow = true;
    group.add(mainBody);
    
    // Crystal spikes
    for (let i = 0; i < 6; i++) {
        const spike = new THREE.Mesh(
            new THREE.ConeGeometry(0.1, 0.4, 4),
            bodyMaterial
        );
        const angle = (i / 6) * Math.PI * 2;
        const radius = 0.4;
        spike.position.set(
            Math.sin(angle) * radius,
            1.0,
            Math.cos(angle) * radius
        );
        spike.rotation.x = Math.random() * 0.5 + 0.5;
        spike.rotation.z = Math.random() * 0.5 + 0.5;
        group.add(spike);
    }
    
    // Icy head
    const head = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.3, 0),
        bodyMaterial
    );
    head.position.y = 1.4;
    head.castShadow = true;
    group.add(head);
    
    // Eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    
    const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        eyeMaterial
    );
    leftEye.position.set(-0.15, 1.45, 0.25);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        eyeMaterial
    );
    rightEye.position.set(0.15, 1.45, 0.25);
    group.add(rightEye);
    
    // Pupils
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    
    const leftPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        pupilMaterial
    );
    leftPupil.position.set(-0.15, 1.45, 0.33);
    group.add(leftPupil);
    
    const rightPupil = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        pupilMaterial
    );
    rightPupil.position.set(0.15, 1.45, 0.33);
    group.add(rightPupil);
    
    // Arms
    const leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.05, 0.4, 4),
        bodyMaterial
    );
    leftArm.position.set(-0.5, 1, 0);
    leftArm.rotation.z = -Math.PI / 4;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    const rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.05, 0.4, 4),
        bodyMaterial
    );
    rightArm.position.set(0.5, 1, 0);
    rightArm.rotation.z = Math.PI / 4;
    rightArm.castShadow = true;
    group.add(rightArm);
    
    // Legs
    const leftLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.05, 0.5, 4),
        bodyMaterial
    );
    leftLeg.position.set(-0.25, 0.35, 0);
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.05, 0.5, 4),
        bodyMaterial
    );
    rightLeg.position.set(0.25, 0.35, 0);
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    // Minus sign on chest to represent subtraction
    const minusHorizontal = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.08, 0.05),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    minusHorizontal.position.set(0, 0.9, 0.4);
    group.add(minusHorizontal);
    
    // If it's a boss, make it larger and add crown
    if (isBoss) {
        group.scale.set(1.5, 1.5, 1.5);
        
        const crownMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold
            roughness: 0.3,
            metalness: 0.8
        });
        
        // Crown base
        const crownBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.4, 0.2, 8),
            crownMaterial
        );
        crownBase.position.y = 1.7;
        group.add(crownBase);
        
        // Crown spikes
        for (let i = 0; i < 5; i++) {
            const spike = new THREE.Mesh(
                new THREE.ConeGeometry(0.08, 0.3, 8),
                crownMaterial
            );
            const angle = (i / 5) * Math.PI * 2;
            const radius = 0.25;
            spike.position.set(
                Math.sin(angle) * radius,
                1.9,
                Math.cos(angle) * radius
            );
            group.add(spike);
        }
    }
    
    // Add crystal animation - slight pulsing
    this.setupIceAnimation(group);
    
    return group;
};

/**
 * Create a multiplication monster (purple arcane monster)
 * @param {boolean} isBoss - Whether this is a boss monster
 * @returns {THREE.Group} Monster group
 */
MathRPGGame.prototype.createMultiplicationMonster = function(isBoss) {
    const group = new THREE.Group();
    
    // Main body - arcane creature
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x9900cc,
        roughness: 0.5,
        metalness: 0.3,
        emissive: 0x330066,
        emissiveIntensity: 0.2
    });
    
    // Hooded figure concept
    const mainBody = new THREE.Mesh(
        new THREE.ConeGeometry(0.5, 1.4, 8, 1, true),
        bodyMaterial
    );
    mainBody.position.y = 0.7;
    mainBody.castShadow = true;
    group.add(mainBody);
    
    // Inner robe
    const innerRobe = new THREE.Mesh(
        new THREE.ConeGeometry(0.45, 1.3, 8, 1, true),
        new THREE.MeshStandardMaterial({ 
            color: 0x660099,
            roughness: 0.8,
            metalness: 0.1,
            side: THREE.DoubleSide
        })
    );
    innerRobe.position.y = 0.7;
    group.add(innerRobe);
    
    // Mysterious face - dark void with glowing eyes
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    head.position.y = 1.5;
    head.castShadow = true;
    group.add(head);
    
    // Glowing eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });
    
    const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        eyeMaterial
    );
    leftEye.position.set(-0.08, 1.5, 0.2);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 8, 8),
        eyeMaterial
    );
    rightEye.position.set(0.08, 1.5, 0.2);
    group.add(rightEye);
    
    // Mysterious floating orbs around the monster
    for (let i = 0; i < 5; i++) {
        const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 8),
            new THREE.MeshBasicMaterial({ 
                color: 0xff00ff,
                opacity: 0.7,
                transparent: true
            })
        );
        
        const angle = (i / 5) * Math.PI * 2;
        const radius = 0.6;
        const yOffset = Math.sin(i * 0.8) * 0.3;
        
        orb.position.set(
            Math.sin(angle) * radius,
            1.0 + yOffset,
            Math.cos(angle) * radius
        );
        
        // Add to a separate group for animation
        group.add(orb);
        
        // Store original position for animation
        orb.userData = {
            originalY: orb.position.y,
            originalAngle: angle,
            animationOffset: i * 0.5,
            radius: radius
        };
    }
    
    // Multiplication symbol (×) on chest
    const multiplySymbol = new THREE.Group();
    
    const line1 = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.06, 0.05),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    line1.rotation.z = Math.PI / 4;
    multiplySymbol.add(line1);
    
    const line2 = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.06, 0.05),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    line2.rotation.z = -Math.PI / 4;
    multiplySymbol.add(line2);
    
    multiplySymbol.position.set(0, 0.9, 0.35);
    group.add(multiplySymbol);
    
    // Mysterious book or staff for a wizard-like monster
    const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.2, 0.25, 0.05),
        new THREE.MeshStandardMaterial({ 
            color: 0x333333,
            roughness: 0.9,
            metalness: 0.1
        })
    );
    book.position.set(0.3, 0.8, 0.2);
    book.rotation.z = -Math.PI / 6;
    book.rotation.x = Math.PI / 6;
    group.add(book);
    
    // Add magical symbols on the book
    const symbol1 = new THREE.Mesh(
        new THREE.CircleGeometry(0.03, 8),
        new THREE.MeshBasicMaterial({ color: 0xff00ff })
    );
    symbol1.position.set(0.3, 0.8, 0.23);
    symbol1.rotation.x = -Math.PI / 2;
    symbol1.rotation.z = -Math.PI / 6;
    group.add(symbol1);
    
    // If it's a boss, make it larger and add crown
    if (isBoss) {
        group.scale.set(1.5, 1.5, 1.5);
        
        const crownMaterial = new THREE.MeshStandardMaterial({
            color: 0xffd700, // Gold
            roughness: 0.3,
            metalness: 0.8
        });
        
        // Magical crown
        const crownBase = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.4, 0.2, 8),
            crownMaterial
        );
        crownBase.position.y = 1.8;
        group.add(crownBase);
        
        // Crown spikes with crystals
        for (let i = 0; i < 5; i++) {
            const spike = new THREE.Mesh(
                new THREE.ConeGeometry(0.08, 0.3, 4),
                crownMaterial
            );
            const angle = (i / 5) * Math.PI * 2;
            const radius = 0.25;
            spike.position.set(
                Math.sin(angle) * radius,
                2,
                Math.cos(angle) * radius
            );
            
            // Add crystal on top of each spike
            const crystal = new THREE.Mesh(
                new THREE.OctahedronGeometry(0.06, 0),
                new THREE.MeshBasicMaterial({ color: 0xff00ff })
            );
            crystal.position.y = 0.2;
            spike.add(crystal);
            
            group.add(spike);
        }
    }
    
    // Add arcane animation - floating and revolving orbs
    this.setupArcaneAnimation(group);
    
    return group;
};

/**
 * Create a division monster (green nature monster)
 * @param {boolean} isBoss - Whether this is a boss monster
 * @returns {THREE.Group} Monster group
 */
MathRPGGame.prototype.createDivisionMonster = function(isBoss) {
    const group = new THREE.Group();
    
    // Main body - nature creature
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00cc00,
        roughness: 0.9,
        metalness: 0.1
    });
    
    // Tree trunk body
    const mainBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.3, 0.4, 1.2, 8),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown wood
            roughness: 0.9,
            metalness: 0.1
        })
    );
    mainBody.position.y = 0.6;
    mainBody.castShadow = true;
    group.add(mainBody);
    
    // Leafy top as head
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 16, 16),
        bodyMaterial
    );
    head.position.y = 1.4;
    head.scale.set(1, 0.8, 1);
    head.castShadow = true;
    group.add(head);
    
    // Branch arms
    const leftArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.05, 0.5, 8),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown wood
            roughness: 0.9,
            metalness: 0.1
        })
    );
    leftArm.position.set(-0.4, 1, 0);
    leftArm.rotation.z = Math.PI / 6;
    leftArm.castShadow = true;
    group.add(leftArm);
    
    // Add leaves to the left arm
    const leftLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        bodyMaterial
    );
    leftLeaves.position.set(-0.6, 1.1, 0);
    leftLeaves.scale.set(1, 0.7, 0.7);
    group.add(leftLeaves);
    
    const rightArm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.05, 0.5, 8),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown wood
            roughness: 0.9,
            metalness: 0.1
        })
    );
    rightArm.position.set(0.4, 1, 0);
    rightArm.rotation.z = -Math.PI / 6;
    rightArm.castShadow = true;
    group.add(rightArm);
    
    // Add leaves to the right arm
    const rightLeaves = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        bodyMaterial
    );
    rightLeaves.position.set(0.6, 1.1, 0);
    rightLeaves.scale.set(1, 0.7, 0.7);
    group.add(rightLeaves);
    
    // Root-like legs
    const leftLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.05, 0.4, 8),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown wood
            roughness: 0.9,
            metalness: 0.1
        })
    );
    leftLeg.position.set(-0.2, 0.2, 0);
    leftLeg.rotation.z = Math.PI / 12;
    leftLeg.castShadow = true;
    group.add(leftLeg);
    
    const rightLeg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.05, 0.4, 8),
        new THREE.MeshStandardMaterial({ 
            color: 0x8B4513, // Brown wood
            roughness: 0.9,
            metalness: 0.1
        })
    );
    rightLeg.position.set(0.2, 0.2, 0);
    rightLeg.rotation.z = -Math.PI / 12;
    rightLeg.castShadow = true;
    group.add(rightLeg);
    
    // Eyes
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff99 });
    
    const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        eyeMaterial
    );
    leftEye.position.set(-0.15, 1.5, 0.4);
    group.add(leftEye);
    
    const rightEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 8, 8),
        eyeMaterial
    );
    rightEye.position.set(0.15, 1.5, 0.4);
    group.add(rightEye);
    
    // Division symbol (÷) on chest
    const divisionSymbol = new THREE.Group();
    
    // Line
    const line = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.05, 0.05),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    divisionSymbol.add(line);
    
    // Top dot
    const topDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    topDot.position.y = 0.1;
    divisionSymbol.add(topDot);
    
    // Bottom dot
    const bottomDot = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    bottomDot.position.y = -0.1;
    divisionSymbol.add(bottomDot);
    
    divisionSymbol.position.set(0, 0.9, 0.35);
    group.add(divisionSymbol);
    
    // Add some small flowers around the base
    for (let i = 0; i < 4; i++) {
        const flowerStem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.02, 0.2, 8),
            new THREE.MeshStandardMaterial({ 
                color: 0x00aa00,
                roughness: 0.9,
                metalness: 0.1
            })
        );
        
        const angle = (i / 4) * Math.PI * 2;
        const radius = 0.5;
        
        flowerStem.position.set(
            Math.sin(angle) * radius,
            0.1,
            Math.cos(angle) * radius
        );
        
        group.add(flowerStem);
        
        // Flower
        const flowerColors = [0xff0000, 0xffff00, 0xff99ff, 0xffffff];
        const flower = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 8),
            new THREE.MeshStandardMaterial({ 
                color: flowerColors[i],
                roughness: 0.8,
                metalness: 0.2
            })
        );
        flower.position.set(
            Math.sin(angle) * radius,
            0.2,
            Math.cos(angle) * radius
        );
        group.add(flower);
    }
    
    // If it's a boss, make it larger and add crown
    if (isBoss) {
        group.scale.set(1.5, 1.5, 1.5);
        
        // Create a crown from leaves and flowers
        for (let i = 0; i < 8; i++) {
            const leaf = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 8, 8),
                new THREE.MeshStandardMaterial({ 
                    color: 0x00ff00,
                    roughness: 0.9,
                    metalness: 0.1
                })
            );
            
            const angle = (i / 8) * Math.PI * 2;
            const radius = 0.35;
            
            leaf.position.set(
                Math.sin(angle) * radius,
                1.8,
                Math.cos(angle) * radius
            );
            leaf.scale.set(1, 0.5, 0.8);
            
            // Rotate leaf to point outward
            leaf.rotation.y = -angle;
            group.add(leaf);
            
            // Add a flower to every other leaf
            if (i % 2 === 0) {
                const flowerColors = [0xff0000, 0xffff00, 0xff99ff, 0xffffff];
                const flower = new THREE.Mesh(
                    new THREE.SphereGeometry(0.06, 8, 8),
                    new THREE.MeshStandardMaterial({ 
                        color: flowerColors[i % 4],
                        roughness: 0.8,
                        metalness: 0.2
                    })
                );
                flower.position.set(
                    Math.sin(angle) * (radius + 0.1),
                    1.8,
                    Math.cos(angle) * (radius + 0.1)
                );
                group.add(flower);
            }
        }
    }
    
    // Add nature animation - gentle swaying and occasional butterfly
    this.setupNatureAnimation(group);
    
    return group;
};

/**
 * Set up flame animation for addition monster
 * @param {THREE.Group} monsterGroup - The monster group to animate
 */
MathRPGGame.prototype.setupFlameAnimation = function(monsterGroup) {
    // Pulsing animation for the fire
    const pulseAnimation = { scale: 1.0 };
    new TWEEN.Tween(pulseAnimation)
        .to({ scale: 1.1 }, 500)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(() => {
            // Apply scaling to flame parts (spikes and arms)
            monsterGroup.children.forEach(child => {
                if (child.geometry && 
                    child.geometry.type === 'ConeGeometry') {
                    child.scale.x = pulseAnimation.scale;
                    child.scale.z = pulseAnimation.scale;
                }
            });
        })
        .start();
    
    // Emissive intensity animation
    const glowAnimation = { intensity: 0.3 };
    new TWEEN.Tween(glowAnimation)
        .to({ intensity: 0.6 }, 1000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(() => {
            // Apply to body material
            monsterGroup.children.forEach(child => {
                if (child.material && 
                    child.material.emissive && 
                    child.material.emissive.r > 0) {
                    child.material.emissiveIntensity = glowAnimation.intensity;
                }
            });
        })
        .start();
};

/**
 * Set up ice animation for subtraction monster
 * @param {THREE.Group} monsterGroup - The monster group to animate
 */
MathRPGGame.prototype.setupIceAnimation = function(monsterGroup) {
    // Subtle rotation of crystal parts
    const crystalAnimation = { rotation: 0 };
    new TWEEN.Tween(crystalAnimation)
        .to({ rotation: Math.PI * 2 }, 10000)
        .easing(TWEEN.Easing.Linear.None)
        .repeat(Infinity)
        .onUpdate(() => {
            // Rotate crystal spikes slightly
            monsterGroup.children.forEach(child => {
                if (child.geometry && 
                    child.geometry.type === 'ConeGeometry') {
                    child.rotation.y = crystalAnimation.rotation;
                }
            });
        })
        .start();
    
    // Subtle shimmer effect with opacity
    const shimmerAnimation = { opacity: 0.9 };
    new TWEEN.Tween(shimmerAnimation)
        .to({ opacity: 1.0 }, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(() => {
            // Apply to ice materials
            monsterGroup.children.forEach(child => {
                if (child.material && 
                    child.material.transparent) {
                    child.material.opacity = shimmerAnimation.opacity;
                }
            });
        })
        .start();
};

/**
 * Set up arcane animation for multiplication monster
 * @param {THREE.Group} monsterGroup - The monster group to animate
 */
MathRPGGame.prototype.setupArcaneAnimation = function(monsterGroup) {
    // Animate the floating orbs
    monsterGroup.children.forEach(child => {
        if (child.geometry && 
            child.geometry.type === 'SphereGeometry' && 
            child.userData && 
            child.userData.originalAngle !== undefined) {
            
            // Create a unique animation for each orb
            const orbAnimation = { 
                angle: child.userData.originalAngle,
                height: 0 
            };
            
            // Circular motion animation
            new TWEEN.Tween(orbAnimation)
                .to({ 
                    angle: child.userData.originalAngle + Math.PI * 2,
                    height: Math.PI * 2
                }, 5000 + (child.userData.animationOffset * 1000))
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .repeat(Infinity)
                .onUpdate(() => {
                    // Update position in a circular path + vertical oscillation
                    child.position.x = Math.sin(orbAnimation.angle) * child.userData.radius;
                    child.position.z = Math.cos(orbAnimation.angle) * child.userData.radius;
                    child.position.y = child.userData.originalY + Math.sin(orbAnimation.height) * 0.2;
                })
                .start();
        }
    });
    
    // Subtle book/staff animation
    monsterGroup.children.forEach(child => {
        if (child.geometry && 
            child.geometry.type === 'BoxGeometry' && 
            child.position.x > 0) { // target the book
            
            const bookAnimation = { 
                rotation: child.rotation.z,
                hover: 0
            };
            
            new TWEEN.Tween(bookAnimation)
                .to({ 
                    rotation: child.rotation.z - 0.1,
                    hover: Math.PI * 2
                }, 3000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .yoyo(true)
                .repeat(Infinity)
                .onUpdate(() => {
                    child.rotation.z = bookAnimation.rotation;
                    child.position.y = 0.8 + Math.sin(bookAnimation.hover) * 0.05;
                })
                .start();
        }
    });
};

/**
 * Set up nature animation for division monster
 * @param {THREE.Group} monsterGroup - The monster group to animate
 */
MathRPGGame.prototype.setupNatureAnimation = function(monsterGroup) {
    // Gentle swaying animation for the tree monster
    const swayAnimation = { angle: 0 };
    new TWEEN.Tween(swayAnimation)
        .to({ angle: 0.05 }, 2000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(() => {
            monsterGroup.rotation.z = swayAnimation.angle;
        })
        .start();
    
    // Animate leaves to give them a gentle breeze effect
    monsterGroup.children.forEach(child => {
        if (child.material && 
            child.material.color && 
            child.material.color.g > 0.5 && 
            child.material.color.r < 0.5 && // green objects
            child.geometry && 
            child.geometry.type === 'SphereGeometry') {
            
            const leafAnimation = { 
                scale: 1.0,
                rotOffset: Math.random() * Math.PI * 2 // Give each leaf a unique timing
            };
            
            new TWEEN.Tween(leafAnimation)
                .to({ scale: 1.1 }, 2000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .yoyo(true)
                .repeat(Infinity)
                .onUpdate(() => {
                    child.scale.x = leafAnimation.scale;
                    child.scale.z = leafAnimation.scale;
                })
                .start();
        }
    });
    
    // Occasionally spawn a butterfly that circles the monster and disappears
    setTimeout(() => {
        this.spawnButterfly(monsterGroup);
    }, 2000 + Math.random() * 3000);
};

/**
 * Spawn a butterfly that circles the nature monster
 * @param {THREE.Group} monsterGroup - The monster group
 */
MathRPGGame.prototype.spawnButterfly = function(monsterGroup) {
    // Create a butterfly from simple shapes
    const butterfly = new THREE.Group();
    
    // Wings
    const wingMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x88ff99,
        side: THREE.DoubleSide
    });
    
    const leftWing = new THREE.Mesh(
        new THREE.CircleGeometry(0.1, 8),
        wingMaterial
    );
    leftWing.position.x = -0.05;
    butterfly.add(leftWing);
    
    const rightWing = new THREE.Mesh(
        new THREE.CircleGeometry(0.1, 8),
        wingMaterial
    );
    rightWing.position.x = 0.05;
    butterfly.add(rightWing);
    
    // Body
    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.01, 0.01, 0.1, 8),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    body.rotation.x = Math.PI / 2;
    butterfly.add(body);
    
    // Set initial position
    const angle = Math.random() * Math.PI * 2;
    const radius = 1;
    butterfly.position.set(
        Math.sin(angle) * radius,
        1.5,
        Math.cos(angle) * radius
    );
    
    monsterGroup.add(butterfly);
    
    // Create animation for the butterfly
    const butterflyAnimation = { 
        angle: angle,
        height: 1.5,
        wingFlapAngle: 0
    };
    
    // Wing flapping animation
    new TWEEN.Tween(butterflyAnimation)
        .to({ wingFlapAngle: Math.PI * 20 }, 4000)
        .easing(TWEEN.Easing.Linear.None)
        .onUpdate(() => {
            leftWing.rotation.y = Math.sin(butterflyAnimation.wingFlapAngle) * 0.5;
            rightWing.rotation.y = -Math.sin(butterflyAnimation.wingFlapAngle) * 0.5;
        })
        .start();
    
    // Flight path animation
    new TWEEN.Tween(butterflyAnimation)
        .to({ 
            angle: angle + Math.PI * 4,
            height: 2.5
        }, 8000)
        .easing(TWEEN.Easing.Sinusoidal.InOut)
        .onUpdate(() => {
            butterfly.position.x = Math.sin(butterflyAnimation.angle) * radius;
            butterfly.position.z = Math.cos(butterflyAnimation.angle) * radius;
            butterfly.position.y = butterflyAnimation.height + Math.sin(butterflyAnimation.angle * 3) * 0.2;
            
            // Make butterfly face direction of travel
            butterfly.rotation.y = -butterflyAnimation.angle + Math.PI / 2;
        })
        .onComplete(() => {
            // Remove butterfly after animation completes
            monsterGroup.remove(butterfly);
            
            // Schedule next butterfly to appear
            setTimeout(() => {
                this.spawnButterfly(monsterGroup);
            }, 5000 + Math.random() * 5000);
        })
        .start();
};

/**
 * Update the createCharacters method to use the improved models
 */
MathRPGGame.prototype.createImprovedCharacters = function() {
    // Remove existing characters if they exist
    if (this.hero) {
        this.scene.remove(this.hero);
    }
    if (this.monster) {
        this.scene.remove(this.monster);
    }
    
    // Create hero with improved model
    this.hero = this.createImprovedHero(0x00ff00);
    this.hero.position.set(-3, 0, 0);
    this.scene.add(this.hero);
    
    // Create monster based on operation type with improved model
    this.monster = this.createImprovedMonsterByOperation(this.selectedOperation, this.isBossLevel());
    this.monster.position.set(3, 0, 0);
    this.scene.add(this.monster);
};

// Implementation guide:
// 1. Replace the existing this.createCharacters() call in the init() method with this.createImprovedCharacters()
// 2. Make sure to replace this.createMonsterByOperation with this.createImprovedMonsterByOperation in the startNewLevel() method
// 3. Add the TWEEN.update() call in the animate() method if not already present
