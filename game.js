/**
 * Game.js - Main game logic and Three.js setup
 */

class MathRPGGame {
    constructor() {
        // Game state
        this.level = 1;
        this.heroHealth = 50;
        this.heroMaxHealth = 50;
        this.monsterHealth = 0;
        this.monsterMaxHealth = 0;
        this.isGameOver = false;
        this.isGameStarted = false;
        this.selectedOperation = 'addition';
        this.selectedTable = 0;
        this.difficulty = 'easy'; // Default difficulty
        this.timeRemaining = 120; // 2 minutes in seconds
        this.timerInterval = null;
        this.questionTimerInterval = null;
        this.questionTimeRemaining = 10; // 10 seconds per question
        this.correctAnswers = 0; // Track correct answers
        this.isMuted = false; // Added mute state
        
        // Three.js components
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.hero = null;
        this.monster = null;
        this.ground = null;
        
        // Math problem generator
        this.problemGenerator = new MathProblemGenerator();
        
        // Initialize the menu
        this.setupMenuEventListeners();
        this.setupMuteButton(); // Added call to setup mute button listener
    }
    
    /**
     * Set up event listeners for the start menu
     */
    setupMenuEventListeners() {
        // Operation selection buttons
        document.getElementById('addition-btn').addEventListener('click', () => {
            this.selectedOperation = 'addition';
            this.startGame();
        });
        
        document.getElementById('subtraction-btn').addEventListener('click', () => {
            this.selectedOperation = 'subtraction';
            this.startGame();
        });
        
        document.getElementById('multiplication-btn').addEventListener('click', () => {
            this.selectedOperation = 'multiplication';
            this.showSubmenu('multiplication-submenu');
        });
        
        document.getElementById('division-btn').addEventListener('click', () => {
            this.selectedOperation = 'division';
            this.showSubmenu('division-submenu');
        });
        
        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            this.hideSubmenus();
        });
        
        // Difficulty selection buttons
        const difficultyButtons = document.querySelectorAll('.difficulty-btn');
        difficultyButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove selected class from all buttons
                difficultyButtons.forEach(btn => btn.classList.remove('selected'));
                
                // Add selected class to clicked button
                button.classList.add('selected');
                
                // Set difficulty
                this.difficulty = button.id.replace('-btn', '');
                console.log('Difficulty set to:', this.difficulty);
            });
        });
        
        // Times table buttons
        const timesTableButtons = document.querySelectorAll('.times-table-btn');
        console.log('Found times table buttons:', timesTableButtons.length);
        timesTableButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Times table button clicked:', button.getAttribute('data-table'));
                this.selectedTable = parseInt(button.getAttribute('data-table'));
                this.startGame();
            });
        });
        
        // Division table buttons
        const divisionTableButtons = document.querySelectorAll('.division-table-btn');
        console.log('Found division table buttons:', divisionTableButtons.length);
        divisionTableButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Division table button clicked:', button.getAttribute('data-table'));
                this.selectedTable = parseInt(button.getAttribute('data-table'));
                this.startGame();
            });
        });
        
        // Menu button on game over screen
        document.getElementById('menu-btn').addEventListener('click', () => {
            this.returnToMainMenu();
        });
    }

    /**
     * Set up event listener for the mute button
     */
    setupMuteButton() {
        const muteButton = document.getElementById('mute-btn');
        muteButton.addEventListener('click', () => {
            this.isMuted = !this.isMuted;
            muteButton.textContent = this.isMuted ? '🔇' : '🔊';
            console.log('Mute state:', this.isMuted);
        });
    }
    
    /**
     * Show a specific submenu
     * @param {string} submenuId - ID of the submenu to show
     */
    showSubmenu(submenuId) {
        // Hide all submenus
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.add('hidden');
        });
        
        // Show the submenu container and the specific submenu
        document.getElementById('submenu-container').classList.remove('hidden');
        document.getElementById(submenuId).classList.remove('hidden');
    }
    
    /**
     * Hide all submenus
     */
    hideSubmenus() {
        document.getElementById('submenu-container').classList.add('hidden');
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.add('hidden');
        });
    }
    
    /**
     * Start the game with the selected operation and table
     */
    startGame() {
        console.log('Starting game with operation:', this.selectedOperation, 'and table:', this.selectedTable);
        
        // Hide the start menu and all submenus
        const startMenu = document.getElementById('start-menu');
        startMenu.classList.add('hidden');
        startMenu.style.display = 'none'; // Force hide with display: none
        
        // Hide all submenus
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.add('hidden');
        });
        document.getElementById('submenu-container').classList.add('hidden');
        
        console.log('Start menu hidden');
        
        // Show the game UI
        const sceneContainer = document.getElementById('scene-container');
        const uiOverlay = document.getElementById('ui-overlay');
        
        sceneContainer.classList.remove('hidden');
        sceneContainer.style.display = 'block'; // Force show with display: block
        
        uiOverlay.classList.remove('hidden');
        uiOverlay.style.display = 'flex'; // Force show with display: flex
        
        console.log('Game UI shown');
        
        // Set the operation type in the problem generator
        this.problemGenerator.setOperationType(this.selectedOperation, this.selectedTable, this.difficulty);
        console.log('Operation type set in problem generator with difficulty:', this.difficulty);
        
        // Reset game state
        this.timeRemaining = 120; // 2 minutes in seconds
        this.correctAnswers = 0;
        
        // Initialize the timer
        this.updateTimerDisplay();
        this.startTimer();
        
        // Initialize the game
        this.isGameStarted = true;
        console.log('Initializing game...');
        this.init();
    }
    
    /**
     * Start the timer
     */
    startTimer() {
        // Clear any existing timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // Start a new timer that updates every second
        this.timerInterval = setInterval(() => {
            // Decrement time remaining
            this.timeRemaining--;
            
            // Update the timer display
            this.updateTimerDisplay();
            
            // Check if time is up
            if (this.timeRemaining <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    /**
     * Update the timer display
     */
    updateTimerDisplay() {
        // Calculate minutes and seconds
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        
        // Format the time as MM:SS
        const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        // Update the timer display
        document.getElementById('timer').textContent = formattedTime;
        
        // Add warning class if time is running low (less than 30 seconds)
        if (this.timeRemaining <= 30) {
            document.getElementById('timer-display').classList.add('time-warning');
        } else {
            document.getElementById('timer-display').classList.remove('time-warning');
        }
    }
    
    /**
     * Handle time up
     */
    timeUp() {
        // Clear the timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // End the game
        this.isGameOver = true;
        
        // Update final level and score display
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('final-score').textContent = this.correctAnswers;
        
        // Show game over screen
        const gameOverScreen = document.getElementById('game-over');
        gameOverScreen.classList.remove('hidden');
        gameOverScreen.style.display = 'block'; // Force show with display: block
    }

    /**
     * Start the question timer
     */
    startQuestionTimer() {
        // Clear any existing timer
        this.stopQuestionTimer();
        
        // Reset time remaining
        this.questionTimeRemaining = 10;
        this.updateQuestionTimerDisplay();
        
        // Start new timer that updates every second
        this.questionTimerInterval = setInterval(() => {
            this.questionTimeRemaining--;
            this.updateQuestionTimerDisplay();
            
            // Check if time is up
            if (this.questionTimeRemaining <= 0) {
                this.questionTimeUp();
            }
        }, 1000);
    }
    
    /**
     * Stop the question timer
     */
    stopQuestionTimer() {
        if (this.questionTimerInterval) {
            clearInterval(this.questionTimerInterval);
            this.questionTimerInterval = null;
        }
    }
    
    /**
     * Update the question timer display
     */
    updateQuestionTimerDisplay() {
        // Update the timer display
        document.getElementById('question-timer').textContent = this.questionTimeRemaining;
        
        // Add warning class if time is running low (less than 5 seconds)
        if (this.questionTimeRemaining <= 5) {
            document.getElementById('question-timer-display').classList.add('time-warning');
        } else {
            document.getElementById('question-timer-display').classList.remove('time-warning');
        }
    }
    
    /**
     * Handle question timer running out
     */
    questionTimeUp() {
        this.stopQuestionTimer();
        
        // Deduct 2 health
        this.heroHealth = Math.max(0, this.heroHealth - 2);
        this.updateHealthBars();
        
        // Play punch sound
        this.playHitSound();
        
        // Show message
        document.getElementById('message-display').textContent = "TOO SLOW! -2 HP";
        document.getElementById('message-display').classList.add('incorrect-answer');
        setTimeout(() => {
            document.getElementById('message-display').classList.remove('incorrect-answer');
        }, 500);
        
        // Generate new problem if game is still active
        if (!this.isGameOver && this.monsterHealth > 0) {
            const problem = this.problemGenerator.generateProblem(this.level);
            document.getElementById('problem-text').textContent = problem.displayText;
            this.startQuestionTimer();
        }
        
        // Check if hero is defeated
        if (this.heroHealth <= 0) {
            this.gameOver();
        }
    }
    
    /**
     * Return to the main menu
     */
    returnToMainMenu() {
        // Hide game elements
        const sceneContainer = document.getElementById('scene-container');
        const uiOverlay = document.getElementById('ui-overlay');
        const gameOver = document.getElementById('game-over');
        
        sceneContainer.classList.add('hidden');
        sceneContainer.style.display = 'none'; // Force hide with display: none
        
        uiOverlay.classList.add('hidden');
        uiOverlay.style.display = 'none'; // Force hide with display: none
        
        gameOver.classList.add('hidden');
        gameOver.style.display = 'none'; // Force hide with display: none
        
        // Show the start menu
        const startMenu = document.getElementById('start-menu');
        startMenu.classList.remove('hidden');
        startMenu.style.display = 'flex'; // Force show with display: flex
        
        this.hideSubmenus();
        
        // Reset game state
        this.isGameStarted = false;
        this.isGameOver = false;
        this.level = 1;
        this.heroHealth = this.heroMaxHealth;
        
        // Clear the timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // If Three.js is initialized, remove the renderer
        if (this.renderer) {
            const container = document.getElementById('scene-container');
            if (container.contains(this.renderer.domElement)) {
                container.removeChild(this.renderer.domElement);
            }
        }
    }
    
    /**
     * Initialize the game
     */
    init() {
        this.setupThreeJS();
        this.createScene();
        this.createImprovedCharacters();
        this.setupGameEventListeners();
        this.startNewLevel();
        this.animate();
    }
    
    /**
     * Set up Three.js renderer and scene
     */
    setupThreeJS() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB); // Sky blue background
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 2, 7);
        this.camera.lookAt(0, 1, 0);
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        
        // Add renderer to DOM
        const container = document.getElementById('scene-container');
        container.appendChild(this.renderer.domElement);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Add lighting
        this.addLighting();
    }
    
    /**
     * Add lighting to the scene
     */
    addLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Directional light (sun)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        
        // Adjust shadow camera
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        
        this.scene.add(directionalLight);
    }
    
    /**
     * Create the 3D scene elements
     */
    createScene() {
        // Create ground
        const groundGeometry = new THREE.PlaneGeometry(20, 10);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3a7e4f,  // Green grass
            roughness: 0.8,
            metalness: 0.2
        });
        this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
        this.ground.rotation.x = -Math.PI / 2; // Rotate to be horizontal
        this.ground.position.y = -0.5;
        this.ground.receiveShadow = true;
        this.scene.add(this.ground);
    }
    
    /**
     * Create hero and monster characters
     */
    createCharacters() {
        // Create hero (green stick figure)
        this.hero = this.createStickFigure(0x00ff00);
        this.hero.position.set(-3, 0, 0);
        this.scene.add(this.hero);
        
        // Create monster based on operation type
        this.monster = this.createMonsterByOperation(this.selectedOperation, this.isBossLevel());
        this.monster.position.set(3, 0, 0);
        this.scene.add(this.monster);
    }
    
    /**
     * Check if current level is a boss level (every 5 levels)
     * @returns {boolean} True if current level is a boss level
     */
    isBossLevel() {
        return this.level % 5 === 0 && this.level > 0;
    }
    
    /**
     * Create a monster based on the operation type
     * @param {string} operation - The operation type
     * @param {boolean} isBoss - Whether this is a boss monster
     * @returns {THREE.Group} Monster group
     */
    createMonsterByOperation(operation, isBoss) {
        let color;
        
        // Set color based on operation
        switch (operation) {
            case 'addition':
                color = 0xff0000; // Red
                break;
            case 'subtraction':
                color = 0x0000ff; // Blue
                break;
            case 'multiplication':
                color = 0x9900cc; // Purple
                break;
            case 'division':
                color = 0x00cc00; // Green
                break;
            default:
                color = 0xff0000; // Default red
        }
        
        // Create the monster
        let monster;
        if (isBoss) {
            // Boss monsters are larger and have a crown
            monster = this.createBossMonster(color);
        } else {
            // Regular monsters
            monster = this.createMonster(color);
        }
        
        return monster;
    }
    
    /**
     * Create a boss monster
     * @param {number} color - Color of the boss monster
     * @returns {THREE.Group} Boss monster group
     */
    createBossMonster(color) {
        // Create base monster
        const group = this.createMonster(color);
        
        // Make it larger
        group.scale.set(1.5, 1.5, 1.5);
        
        // Add a crown
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
        crownBase.position.y = 2.1;
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
                2.3,
                Math.cos(angle) * radius
            );
            group.add(spike);
        }
        
        return group;
    }
    
    /**
     * Create a stick figure character
     * @param {number} color - Color of the stick figure
     * @returns {THREE.Group} Stick figure group
     */
    createStickFigure(color) {
        const group = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            roughness: 0.7,
            metalness: 0.3
        });
        
        // Head
        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.25, 16, 16),
            material
        );
        head.position.y = 1.5;
        head.castShadow = true;
        group.add(head);
        
        // Body
        const body = new THREE.Mesh(
            new THREE.CylinderGeometry(0.1, 0.1, 0.8, 8),
            material
        );
        body.position.y = 1;
        body.castShadow = true;
        group.add(body);
        
        // Arms
        const leftArm = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8),
            material
        );
        leftArm.position.set(-0.3, 1.1, 0);
        leftArm.rotation.z = Math.PI / 4;
        leftArm.castShadow = true;
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.6, 8),
            material
        );
        rightArm.position.set(0.3, 1.1, 0);
        rightArm.rotation.z = -Math.PI / 4;
        rightArm.castShadow = true;
        group.add(rightArm);
        
        // Legs
        const leftLeg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.7, 8),
            material
        );
        leftLeg.position.set(-0.15, 0.5, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.7, 8),
            material
        );
        rightLeg.position.set(0.15, 0.5, 0);
        rightLeg.castShadow = true;
        group.add(rightLeg);
        
        return group;
    }
    
    /**
     * Create a monster character
     * @param {number} color - Color of the monster
     * @returns {THREE.Group} Monster group
     */
    createMonster(color) {
        const group = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({ 
            color: color,
            roughness: 0.9,
            metalness: 0.1
        });
        
        // Body
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 1.2, 0.5),
            material
        );
        body.position.y = 0.8;
        body.castShadow = true;
        group.add(body);
        
        // Head
        const head = new THREE.Mesh(
            new THREE.SphereGeometry(0.4, 16, 16),
            material
        );
        head.position.y = 1.7;
        head.scale.set(1, 0.8, 0.9);
        head.castShadow = true;
        group.add(head);
        
        // Eyes
        const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        
        const leftEye = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 8),
            eyeMaterial
        );
        leftEye.position.set(-0.15, 1.75, 0.3);
        group.add(leftEye);
        
        const rightEye = new THREE.Mesh(
            new THREE.SphereGeometry(0.08, 8, 8),
            eyeMaterial
        );
        rightEye.position.set(0.15, 1.75, 0.3);
        group.add(rightEye);
        
        // Pupils
        const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        
        const leftPupil = new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 8, 8),
            pupilMaterial
        );
        leftPupil.position.set(-0.15, 1.75, 0.38);
        group.add(leftPupil);
        
        const rightPupil = new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 8, 8),
            pupilMaterial
        );
        rightPupil.position.set(0.15, 1.75, 0.38);
        group.add(rightPupil);
        
        // Arms
        const leftArm = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.8, 0.2),
            material
        );
        leftArm.position.set(-0.5, 0.9, 0);
        leftArm.castShadow = true;
        group.add(leftArm);
        
        const rightArm = new THREE.Mesh(
            new THREE.BoxGeometry(0.2, 0.8, 0.2),
            material
        );
        rightArm.position.set(0.5, 0.9, 0);
        rightArm.castShadow = true;
        group.add(rightArm);
        
        // Legs
        const leftLeg = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 0.7, 0.25),
            material
        );
        leftLeg.position.set(-0.25, 0.35, 0);
        leftLeg.castShadow = true;
        group.add(leftLeg);
        
        const rightLeg = new THREE.Mesh(
            new THREE.BoxGeometry(0.25, 0.7, 0.25),
            material
        );
        rightLeg.position.set(0.25, 0.35, 0);
        rightLeg.castShadow = true;
        group.add(rightLeg);
        
        return group;
    }
    
    /**
     * Set up game event listeners
     */
    setupGameEventListeners() {
        // Submit button click
        document.getElementById('submit-btn').addEventListener('click', () => {
            this.submitAnswer();
        });
        
        // Enter key press in input field
        document.getElementById('answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.submitAnswer();
            }
        });
        
        // Restart button click
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartGame();
        });
    }
    
    /**
     * Start a new level
     */
    startNewLevel() {
        // Check if it's a boss level
        const isBoss = this.isBossLevel();
        
        // Start question timer
        this.startQuestionTimer();
        
        // Calculate monster health based on level (boss monsters have double health)
        this.monsterMaxHealth = 20 + (this.level * 10);
        if (isBoss) {
            this.monsterMaxHealth *= 2;
        }
        this.monsterHealth = this.monsterMaxHealth;
        
        // Update UI
        document.getElementById('level').textContent = this.level;
        if (isBoss) {
            document.getElementById('level').textContent += " (BOSS)";
        }
        this.updateHealthBars();
        
        // Generate new problem
        const problem = this.problemGenerator.generateProblem(this.level);
        document.getElementById('problem-text').textContent = problem.displayText;
        
        // Clear input field and focus
        const inputField = document.getElementById('answer-input');
        inputField.value = '';
        inputField.focus();
        
        // Clear message display
        document.getElementById('message-display').textContent = '';
        
        // Create a new monster based on the operation
        if (this.monster) {
            this.scene.remove(this.monster);
        }
        // Randomly select a monster type for each battle
        const monsterTypes = ['addition', 'subtraction', 'multiplication', 'division'];
        const randomMonsterType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
        this.monster = this.createImprovedMonsterByOperation(randomMonsterType, isBoss);
        this.monster.position.set(3, 0, 0);
        this.scene.add(this.monster);
        
        // Randomly spawn a power-up (20% chance, not on boss levels)
        if (!isBoss && Math.random() < 0.2) {
            this.spawnPowerUp();
        }
    }
    
    /**
     * Spawn a random power-up
     */
    spawnPowerUp() {
        // Types of power-ups: health potion, double damage, time freeze
        const powerUpTypes = ['health', 'damage', 'time'];
        const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        
        // Create power-up object
        this.powerUp = {
            type: type,
            active: true,
            object: this.createPowerUpObject(type)
        };
        
        // Add to scene
        this.scene.add(this.powerUp.object);
        
        // Display message about power-up
        document.getElementById('message-display').textContent = `A ${type} power-up has appeared!`;
        
        // Remove after 3 problems if not collected
        this.powerUpProblemsRemaining = 3;
    }
    
    /**
     * Create a 3D object for a power-up
     * @param {string} type - Type of power-up
     * @returns {THREE.Group} Power-up object
     */
    createPowerUpObject(type) {
        const group = new THREE.Group();
        
        // Different colors for different power-ups
        let color;
        switch (type) {
            case 'health':
                color = 0xff0000; // Red for health
                break;
            case 'damage':
                color = 0xffcc00; // Yellow for damage
                break;
            case 'time':
                color = 0x00ccff; // Blue for time
                break;
            default:
                color = 0xffffff;
        }
        
        // Create base
        const baseMaterial = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.3,
            metalness: 0.7
        });
        
        // Create a floating orb
        const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            baseMaterial
        );
        orb.position.set(0, 0.5, 0);
        group.add(orb);
        
        // Position the power-up
        group.position.set(0, 1, 0); // Floating above ground
        
        // Add animation
        this.animatePowerUp(group);
        
        return group;
    }
    
    /**
     * Animate a power-up object
     * @param {THREE.Group} powerUpObject - The power-up object to animate
     */
    animatePowerUp(powerUpObject) {
        // Make it float up and down
        const floatAnimation = { y: powerUpObject.position.y };
        new TWEEN.Tween(floatAnimation)
            .to({ y: powerUpObject.position.y + 0.3 }, 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .yoyo(true)
            .repeat(Infinity)
            .onUpdate(() => {
                powerUpObject.position.y = floatAnimation.y;
            })
            .start();
        
        // Make it rotate
        const rotateAnimation = { rotation: 0 };
        new TWEEN.Tween(rotateAnimation)
            .to({ rotation: Math.PI * 2 }, 3000)
            .easing(TWEEN.Easing.Linear.None)
            .repeat(Infinity)
            .onUpdate(() => {
                powerUpObject.rotation.y = rotateAnimation.rotation;
            })
            .start();
    }
    
    /**
     * Submit answer and process result
     */
    submitAnswer() {
        if (this.isGameOver) return;
        
        // Stop question timer
        this.stopQuestionTimer();
        
        const userAnswer = document.getElementById('answer-input').value.trim();
        
        // Validate input
        if (userAnswer === '' || isNaN(userAnswer)) {
            return;
        }
        
        // Check answer
        const result = this.problemGenerator.checkAnswer(userAnswer);
        console.log('Answer submitted:', userAnswer, 'Correct answer:', result.correctAnswer, 'Is correct:', result.isCorrect);
        
        // Track consecutive correct answers for special abilities
        if (!this.consecutiveCorrect) {
            this.consecutiveCorrect = 0;
        }
        
        if (result.isCorrect) {
            // Increment consecutive correct counter
            this.consecutiveCorrect++;
            
            // Increment correct answers counter
            this.correctAnswers++;
            
            // Calculate damage
            let damage = this.problemGenerator.calculateDamage(result.isCorrect, result.timeTaken);
            console.log('Base damage calculated:', damage, 'Time taken:', result.timeTaken);
            
            // Check for active power-ups
            let powerUpMessage = '';
            if (this.powerUp && this.powerUp.active) {
                if (this.powerUp.type === 'damage') {
                    // Double damage power-up
                    damage *= 2;
                    powerUpMessage = ' (DOUBLE DAMAGE!)';
                    this.collectPowerUp();
                }
            }
            
            // Check for special ability (after 3 consecutive correct answers)
            if (this.consecutiveCorrect >= 3) {
                // Special ability: Critical hit (triple damage)
                damage *= 3;
                powerUpMessage = ' (CRITICAL HIT!)';
                this.consecutiveCorrect = 0; // Reset counter after using special ability
                
                // Add special effect for critical hit
                this.animateCriticalHit();
            }
            
            // Apply damage to monster
            this.monsterHealth = Math.max(0, this.monsterHealth - damage);
            console.log('Monster health after damage:', this.monsterHealth);
            
            // Show encouraging message
            const message = this.problemGenerator.getEncouragingMessage() + powerUpMessage;
            console.log('Showing message:', message);
            document.getElementById('message-display').textContent = message;
            document.getElementById('message-display').classList.add('correct-answer');
            setTimeout(() => {
                document.getElementById('message-display').classList.remove('correct-answer');
            }, 500);
            
            // Animate hero attack (which will trigger hit sound and monster reaction on complete)
            this.animateHeroAttack();
            
            // Check if monster is defeated
            if (this.monsterHealth <= 0) {
                this.monsterDefeated();
            }
            
            // Check for power-up collection (if not already used for damage)
            if (this.powerUp && this.powerUp.active && this.powerUp.type !== 'damage') {
                // Check if hero is near the power-up
                if (this.isHeroNearPowerUp()) {
                    this.collectPowerUp();
                }
            }
        } else {
            // Reset consecutive correct counter
            this.consecutiveCorrect = 0;
            this.playErrorSound(); // Play error sound for wrong answer
            
            // Check for active power-ups that might help with wrong answers
            if (this.powerUp && this.powerUp.active && this.powerUp.type === 'health') {
                // Health potion prevents damage
                document.getElementById('message-display').textContent = `WRONG! The answer is ${result.correctAnswer} (HEALTH POTION USED!)`;
                this.collectPowerUp();
            } else {
                // Monster attacks hero
                this.heroHealth = Math.max(0, this.heroHealth - 5);
                
                // Show incorrect message
                document.getElementById('message-display').textContent = `WRONG! The answer is ${result.correctAnswer}`;
                
                // Flash hero damage
                document.getElementById('hero-health-bar').classList.add('damage-flash');
                setTimeout(() => {
                    document.getElementById('hero-health-bar').classList.remove('damage-flash');
                }, 900);
                
                // Check if hero is defeated
                if (this.heroHealth <= 0) {
                    this.gameOver();
                }
            }
        }
        
        // Update health bars
        this.updateHealthBars();
        
        // Generate new problem if game is still active
        if (!this.isGameOver && this.monsterHealth > 0) {
            const problem = this.problemGenerator.generateProblem(this.level);
            document.getElementById('problem-text').textContent = problem.displayText;
            
            // Decrement power-up counter if one exists
            if (this.powerUp && this.powerUp.active && this.powerUpProblemsRemaining > 0) {
                this.powerUpProblemsRemaining--;
                if (this.powerUpProblemsRemaining <= 0) {
                    // Remove power-up if it expires
                    this.removePowerUp();
                }
            }
        }
        
        // Clear input field and focus
        const inputField = document.getElementById('answer-input');
        inputField.value = '';
        inputField.focus();
    }
    
    /**
     * Check if the hero is near a power-up for collection
     * @returns {boolean} True if hero is near power-up
     */
    isHeroNearPowerUp() {
        if (!this.powerUp || !this.powerUp.active) return false;
        
        // Calculate distance between hero and power-up
        const heroPos = this.hero.position;
        const powerUpPos = this.powerUp.object.position;
        const distance = Math.sqrt(
            Math.pow(heroPos.x - powerUpPos.x, 2) +
            Math.pow(heroPos.z - powerUpPos.z, 2)
        );
        
        // Consider it collected if within 2 units
        return distance < 2;
    }
    
    /**
     * Collect a power-up and apply its effect
     */
    collectPowerUp() {
        if (!this.powerUp || !this.powerUp.active) return;
        
        // Apply power-up effect
        switch (this.powerUp.type) {
            case 'health':
                // Restore 20 health
                this.heroHealth = Math.min(this.heroMaxHealth, this.heroHealth + 20);
                document.getElementById('message-display').textContent = 'HEALTH POTION USED! +20 HP';
                break;
            case 'damage':
                // Double damage is applied in the submitAnswer method
                break;
            case 'time':
                // Add 30 seconds to the timer
                this.timeRemaining += 30;
                this.updateTimerDisplay();
                document.getElementById('message-display').textContent = 'TIME FREEZE ACTIVATED! +30 SECONDS';
                break;
        }
        
        // Remove the power-up
        this.removePowerUp();
    }
    
    /**
     * Remove a power-up from the scene
     */
    removePowerUp() {
        if (!this.powerUp) return;
        
        // Remove from scene
        if (this.powerUp.object) {
            this.scene.remove(this.powerUp.object);
        }
        
        // Mark as inactive
        this.powerUp.active = false;
        this.powerUp = null;
    }
    
    /**
     * Animate a critical hit effect
     */
    animateCriticalHit() {
        // Flash the screen
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
        overlay.style.zIndex = '100';
        overlay.style.pointerEvents = 'none';
        document.body.appendChild(overlay);
        
        // Remove after animation
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
        
        // Make the hero attack more dramatic
        const originalScale = this.hero.scale.x;
        this.hero.scale.set(originalScale * 1.5, originalScale * 1.5, originalScale * 1.5);
        setTimeout(() => {
            this.hero.scale.set(originalScale, originalScale, originalScale);
        }, 500);
    }
    
    /**
     * Update health bars in UI
     */
    updateHealthBars() {
        // Update hero health
        const heroHealthPercent = (this.heroHealth / this.heroMaxHealth) * 100;
        document.getElementById('hero-health-bar').style.width = `${heroHealthPercent}%`;
        document.getElementById('hero-health-text').textContent = `${this.heroHealth}/${this.heroMaxHealth}`;
        
        // Update monster health
        const monsterHealthPercent = (this.monsterHealth / this.monsterMaxHealth) * 100;
        document.getElementById('monster-health-bar').style.width = `${monsterHealthPercent}%`;
        document.getElementById('monster-health-text').textContent = `${this.monsterHealth}/${this.monsterMaxHealth}`;
    }
    
    /**
     * Handle monster defeated
     */
    monsterDefeated() {
        // Animate monster death
        this.animateMonsterDeath();
        
        // Increment level
        this.level++;
        
        // Start new level after delay
        setTimeout(() => {
            // Reset monster
            this.monster.visible = true;
            this.monster.scale.set(1, 1, 1);
            
            // Start new level
            this.startNewLevel();
        }, 1500);
    }
    
    /**
     * Handle game over
     */
    gameOver() {
        this.isGameOver = true;
        
        // Clear the timer
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        
        // Update final level and score display
        document.getElementById('final-level').textContent = this.level;
        document.getElementById('final-score').textContent = this.correctAnswers;
        
        // Show game over screen
        const gameOverScreen = document.getElementById('game-over');
        gameOverScreen.classList.remove('hidden');
        gameOverScreen.style.display = 'block'; // Force show with display: block
    }
    
    /**
     * Restart the game
     */
    restartGame() {
        // Reset game state
        this.level = 1;
        this.heroHealth = this.heroMaxHealth;
        this.isGameOver = false;
        this.timeRemaining = 120; // Reset timer to 2 minutes
        this.correctAnswers = 0; // Reset correct answers counter
        
        // Hide game over screen
        const gameOverScreen = document.getElementById('game-over');
        gameOverScreen.classList.add('hidden');
        gameOverScreen.style.display = 'none'; // Force hide with display: none
        
        // Reset and start the timer
        this.updateTimerDisplay();
        this.startTimer();
        
        // Start new level
        this.startNewLevel();
    }
    
    /**
     * Animate hero attack
     */
    animateHeroAttack() {
        console.log('Animating hero attack');
        const originalPosition = this.hero.position.x;
        const targetPosition = originalPosition + 2; // Move forward
        
        // Move forward
        const moveForward = { x: originalPosition };
        console.log('Starting forward tween from', originalPosition, 'to', targetPosition);
        
        try {
            const tweenForward = new TWEEN.Tween(moveForward)
                .to({ x: targetPosition }, 200)
                .easing(TWEEN.Easing.Quadratic.Out)
                .onUpdate(() => {
                    this.hero.position.x = moveForward.x;
                })
                .onComplete(() => {
                    console.log('Forward tween complete, starting backward tween');
                    // Play hit sound and trigger monster reaction when attack connects
                    this.playHitSound(); 
                    this.animateMonsterHit(); 
                    // Removed call to playRandomPainSound();
                    
                    // Move back
                    const moveBack = { x: targetPosition };
                    new TWEEN.Tween(moveBack)
                        .to({ x: originalPosition }, 200)
                        .easing(TWEEN.Easing.Quadratic.In)
                        .onUpdate(() => {
                            this.hero.position.x = moveBack.x;
                        })
                        .start();
                })
                .start();
        } catch (error) {
            console.error('Error in TWEEN animation:', error);
        }
    }
    
    /**
     * Animate monster death
     */
    animateMonsterDeath() {
        // Shrink and fade out
        const shrink = { scale: 1 };
        new TWEEN.Tween(shrink)
            .to({ scale: 0 }, 1000)
            .easing(TWEEN.Easing.Quadratic.In)
            .onUpdate(() => {
                this.monster.scale.set(shrink.scale, shrink.scale, shrink.scale);
            })
            .onComplete(() => {
                this.monster.visible = false;
            })
            .start();
    }

    /**
     * Animate monster getting hit (shrink effect)
     */
    animateMonsterHit() {
        if (!this.monster) return;

        const originalScale = this.monster.scale.x; // Assuming uniform scaling
        const hitScale = originalScale * 0.8; // Shrink to 80%

        const shrinkTween = new TWEEN.Tween(this.monster.scale)
            .to({ x: hitScale, y: hitScale, z: hitScale }, 100) // Quick shrink
            .easing(TWEEN.Easing.Quadratic.Out);

        const growTween = new TWEEN.Tween(this.monster.scale)
            .to({ x: originalScale, y: originalScale, z: originalScale }, 150) // Grow back
            .easing(TWEEN.Easing.Bounce.Out);

        shrinkTween.chain(growTween); // Grow back after shrinking
        shrinkTween.start();
    }

    /**
     * Play a random hit sound effect
     */
    playHitSound() {
        if (this.isMuted) return; // Don't play if muted

        const hitSoundIds = ['hit-sound-1', 'hit-sound-2', 'hit-sound-3'];
        const randomSoundId = hitSoundIds[Math.floor(Math.random() * hitSoundIds.length)];
        const hitSound = document.getElementById(randomSoundId);

        if (hitSound) {
            hitSound.currentTime = 0; // Rewind to start if already playing
            hitSound.play().catch(error => console.error("Error playing hit sound:", error));
        } else {
            console.warn(`Hit sound element not found: ${randomSoundId}`);
        }
    }

    /**
     * Play the error sound effect
     */
    playErrorSound() {
        if (this.isMuted) return; // Don't play if muted

        const errorSound = document.getElementById('error-sound');
        if (errorSound) {
            errorSound.currentTime = 0; // Rewind to start
            errorSound.play().catch(error => console.error("Error playing error sound:", error));
        } else {
            console.warn(`Error sound element not found: error-sound`);
        }
    }
    
    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update tweens
        try {
            TWEEN.update();
        } catch (error) {
            console.error('Error updating TWEEN:', error);
        }
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}
