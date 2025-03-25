/**
 * Main script file - initializes the game when the page loads
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create and initialize the game
    const game = new MathRPGGame();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Restart game with R key
        if (e.key === 'r' || e.key === 'R') {
            if (game.isGameOver) {
                game.restartGame();
            }
        }
        
        // Return to main menu with M key
        if (e.key === 'm' || e.key === 'M') {
            if (game.isGameStarted || game.isGameOver) {
                game.returnToMainMenu();
            }
        }
    });
    
    // Prevent scrolling when using arrow keys or space
    window.addEventListener('keydown', (e) => {
        if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
    });
    
    // Log game start
    console.log('Math RPG Battle Game initialized!');
    console.log('Choose an operation to practice:');
    console.log('- Addition: Numbers increase with level');
    console.log('- Subtraction: Numbers increase with level');
    console.log('- Multiplication: Practice specific times tables');
    console.log('- Division: Practice specific division tables');
});