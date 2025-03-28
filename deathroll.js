// Debugging Version with Visible Canvas Check
class DeathrollGame {
    constructor() {
        console.log("Initializing game...");
        
        // Make canvas visible for debugging
        const canvas = document.getElementById('scene');
        canvas.style.pointerEvents = 'auto'; // Temporarily allow events
        canvas.style.border = '2px solid red'; // Visual debug
        canvas.style.backgroundColor = '#f0f0f0'; // Fallback background
        
        // Initialize game
        this.initWithRetry();
    }

    initWithRetry(retryCount = 0) {
        try {
            console.log(`Initialization attempt ${retryCount + 1}`);
            
            // Verify libraries
            if (!this.checkLibraries()) throw new Error("Missing libraries");
            
            // Initialize WebGL
            this.initWebGL();
            
            // Initialize game state
            this.initGameState();
            
            // Set up scene
            this.initScene();
            
            // Start render loop
            this.startRenderLoop();
            
            // Bind events
            this.bindEvents();
            
            console.log("Game initialized successfully");
            
        } catch (error) {
            console.error("Initialization failed:", error);
            if (retryCount < 2) {
                setTimeout(() => this.initWithRetry(retryCount + 1), 1000);
            } else {
                this.showError(error.message);
            }
        }
    }

    checkLibraries() {
        console.log("Checking libraries...");
        return typeof THREE !== 'undefined' && 
               typeof CANNON !== 'undefined' && 
               typeof TWEEN !== 'undefined';
    }

    initWebGL() {
        console.log("Initializing WebGL...");
        const canvas = document.getElementById('scene');
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        
        console.log("WebGL initialized:", this.renderer);
    }

    initGameState() {
        console.log("Initializing game state...");
        this.currentNumber = 100;
        this.currentPlayer = 1;
        this.gameActive = true;
        this.diceBodies = [];
        this.diceMeshes = [];
    }

    initScene() {
        console.log("Initializing scene...");
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(0, 8, 15);
        this.camera.lookAt(0, 0, 0);
        
        this.world = new CANNON.World();
        this.world.gravity.set(0, -20, 0);
        
        // Create ground physics body
        this.createGround = () => {
            const groundShape = new CANNON.Plane();
            const groundBody = new CANNON.Body({
                mass: 0, // Static body
                shape: groundShape
            });
            groundBody.quaternion.setFromAxisAngle(
                new CANNON.Vec3(1, 0, 0),
                -Math.PI / 2
            );
            this.world.addBody(groundBody);
        };
        
        this.createGround();
        
        // Minimal lighting setup (placeholder since CANNON.js is physics only)
        this.addLighting = () => {
            console.log("Physics lighting setup would go here");
        };
        this.addLighting();
        
        // Minimal character physics setup
        this.createCharacters = () => {
            console.log("Physics character setup would go here");
            
            // Create simple physics bodies for characters
            const heroShape = new CANNON.Sphere(0.5);
            this.heroBody = new CANNON.Body({
                mass: 1,
                shape: heroShape,
                position: new CANNON.Vec3(-3, 1, 0)
            });
            this.world.addBody(this.heroBody);
            
            const monsterShape = new CANNON.Sphere(0.5);
            this.monsterBody = new CANNON.Body({
                mass: 1,
                shape: monsterShape,
                position: new CANNON.Vec3(3, 1, 0)
            });
            this.world.addBody(this.monsterBody);
        };
        
        this.createCharacters();
    }

    startRenderLoop() {
        console.log("Starting render loop...");
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Update physics
            this.world.step(1/60);
            
            // Update Three.js objects
            this.diceMeshes.forEach((mesh, i) => {
                mesh.position.copy(this.diceBodies[i].position);
                mesh.quaternion.copy(this.diceBodies[i].quaternion);
            });
            
            // Render scene
            this.renderer.render(this.scene, this.camera);
            
            // Update tweens
            TWEEN.update();
        };
        
        animate();
        console.log("Render loop started");
    }

    bindEvents() {
        console.log("Binding events...");
        const rollBtn = document.getElementById('roll-btn');
        const resetBtn = document.getElementById('reset-btn');
        
        rollBtn.addEventListener('click', () => {
            console.log("Roll button clicked");
            this.rollDie();
        });
        
        resetBtn.addEventListener('click', () => {
            console.log("Reset button clicked");
            this.resetGame();
        });
        
        console.log("Events bound:", {
            rollBtn: !!rollBtn,
            resetBtn: !!resetBtn
        });
    }

    rollDie() {
        // Create dice body if it doesn't exist
        if (!this.diceBody) {
            const diceShape = new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5));
            this.diceBody = new CANNON.Body({
                mass: 1,
                shape: diceShape,
                position: new CANNON.Vec3(0, 5, 0)
            });
            this.world.addBody(this.diceBody);
        }

        // Reset dice position and apply random forces
        this.diceBody.position.set(0, 5, 0);
        this.diceBody.velocity.setZero();
        this.diceBody.angularVelocity.setZero();
        
        // Apply random torque and force to make it roll
        this.diceBody.applyImpulse(
            new CANNON.Vec3(
                (Math.random() - 0.5) * 10,
                0,
                (Math.random() - 0.5) * 10
            ),
            new CANNON.Vec3(0, 0, 0)
        );
        
        this.diceBody.applyTorque(
            new CANNON.Vec3(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            )
        );
        
        console.log("Dice rolled!");
    }

    // ... rest of your existing game methods ...

    showError(message) {
        const errorEl = document.getElementById('webgl-error');
        errorEl.innerHTML = `
            <h2>Error</h2>
            <p>${message}</p>
            <p>Check console for details</p>
        `;
        errorEl.style.display = 'flex';
    }
}

// Start game
window.addEventListener('load', () => {
    console.log("Window loaded");
    new DeathrollGame();
});