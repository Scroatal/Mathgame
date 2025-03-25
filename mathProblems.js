/**
 * Math Problems Generator
 *
 * Supports multiple operation types:
 * - Addition: Numbers based on level difficulty
 * - Subtraction: Numbers based on level difficulty, results non-negative
 * - Multiplication: Can focus on specific times tables
 * - Division: Can focus on specific division tables, results are whole numbers
 */

class MathProblemGenerator {
    constructor() {
        this.currentProblem = null;
        this.startTime = null;
        this.operationType = 'addition'; // Default operation
        this.specificTable = 0; // 0 means all tables, otherwise specific table (for multiplication/division)
        this.difficulty = 'easy'; // Default difficulty
    }

    /**
     * Set the operation type
     * @param {string} type - Operation type: 'addition', 'subtraction', 'multiplication', 'division'
     * @param {number} specificTable - Specific times table to use (0 for all tables)
     * @param {string} difficulty - Difficulty level: 'easy', 'medium', 'hard'
     */
    setOperationType(type, specificTable = 0, difficulty = 'easy') {
        this.operationType = type;
        this.specificTable = specificTable;
        this.difficulty = difficulty;
    }

    /**
     * Generate a math problem based on the current level and operation type
     * @param {number} level - Current game level
     * @returns {Object} Problem object with question, answer, and display text
     */
    generateProblem(level) {
        let num1, num2, answer, operator, displayText;

        switch (this.operationType) {
            case 'addition':
                return this.generateAdditionProblem(level);
            case 'subtraction':
                return this.generateSubtractionProblem(level);
            case 'multiplication':
                return this.generateMultiplicationProblem(level);
            case 'division':
                return this.generateDivisionProblem(level);
            default:
                return this.generateAdditionProblem(level);
        }
    }

    /**
     * Generate an addition problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateAdditionProblem(level) {
        // Adjust difficulty based on level and selected difficulty
        let max;
        switch (this.difficulty) {
            case 'easy':
                max = Math.min(5 + (level * 3), 20); // Cap at 20
                break;
            case 'medium':
                max = Math.min(10 + (level * 5), 50); // Cap at 50
                break;
            case 'hard':
                max = Math.min(20 + (level * 10), 100); // Cap at 100
                break;
            default:
                max = Math.min(5 + (level * 5), 50); // Default
        }
        
        const num1 = Math.floor(Math.random() * max) + 1;
        const num2 = Math.floor(Math.random() * max) + 1;
        const answer = num1 + num2;
        const operator = '+';
        const displayText = `${num1} ${operator} ${num2} = ?`;
        
        this.currentProblem = {
            num1,
            num2,
            operator,
            answer,
            displayText
        };

        this.startTime = Date.now();
        
        return this.currentProblem;
    }

    /**
     * Generate a subtraction problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateSubtractionProblem(level) {
        // Adjust difficulty based on level and selected difficulty
        let max;
        switch (this.difficulty) {
            case 'easy':
                max = Math.min(10 + (level * 2), 20); // Cap at 20
                break;
            case 'medium':
                max = Math.min(15 + (level * 5), 50); // Cap at 50
                break;
            case 'hard':
                max = Math.min(25 + (level * 10), 100); // Cap at 100
                break;
            default:
                max = Math.min(10 + (level * 5), 50); // Default
        }
        
        // Ensure result is non-negative by making first number >= second number
        const num1 = Math.floor(Math.random() * max) + 1;
        
        // For hard difficulty, sometimes allow larger second numbers to practice negative results
        let num2;
        if (this.difficulty === 'hard' && level > 3 && Math.random() < 0.3) {
            // Allow potentially negative results in hard mode
            num2 = Math.floor(Math.random() * max) + 1;
        } else {
            // Ensure non-negative results
            num2 = Math.floor(Math.random() * num1) + 1;
        }
        
        const answer = num1 - num2;
        const operator = '-';
        const displayText = `${num1} ${operator} ${num2} = ?`;
        
        this.currentProblem = {
            num1,
            num2,
            operator,
            answer,
            displayText
        };

        this.startTime = Date.now();
        
        return this.currentProblem;
    }

    /**
     * Generate a multiplication problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateMultiplicationProblem(level) {
        let num1, num2;
        let maxTable, maxMultiplier;
        
        // Adjust difficulty based on selected difficulty
        switch (this.difficulty) {
            case 'easy':
                maxTable = Math.min(level + 1, 5); // Cap at 5 times tables
                maxMultiplier = Math.min(5 + Math.floor(level/2), 10); // Cap at 10
                break;
            case 'medium':
                maxTable = Math.min(level + 2, 10); // Cap at 10 times tables
                maxMultiplier = Math.min(5 + level, 12); // Cap at 12
                break;
            case 'hard':
                maxTable = Math.min(level + 3, 12); // Cap at 12 times tables
                maxMultiplier = 12; // Always up to 12
                break;
            default:
                maxTable = Math.min(level + 2, 12);
                maxMultiplier = Math.min(5 + level, 12);
        }
        
        if (this.specificTable > 0) {
            // Use specific times table
            num1 = this.specificTable;
            num2 = Math.floor(Math.random() * maxMultiplier) + 1;
        } else {
            // Use random tables with difficulty based on level
            num1 = Math.floor(Math.random() * maxTable) + 1;
            num2 = Math.floor(Math.random() * maxMultiplier) + 1;
        }
        
        const answer = num1 * num2;
        const operator = '×';
        const displayText = `${num1} ${operator} ${num2} = ?`;
        
        this.currentProblem = {
            num1,
            num2,
            operator,
            answer,
            displayText
        };

        this.startTime = Date.now();
        
        return this.currentProblem;
    }

    /**
     * Generate a division problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateDivisionProblem(level) {
        let num1, num2, answer;
        let maxDivisor, maxMultiplier;
        
        // Adjust difficulty based on selected difficulty
        switch (this.difficulty) {
            case 'easy':
                maxDivisor = Math.min(level + 1, 5); // Cap at 5
                maxMultiplier = Math.min(3 + Math.floor(level/2), 10); // Cap at 10
                break;
            case 'medium':
                maxDivisor = Math.min(level + 2, 10); // Cap at 10
                maxMultiplier = Math.min(5 + level, 12); // Cap at 12
                break;
            case 'hard':
                maxDivisor = Math.min(level + 3, 12); // Cap at 12
                maxMultiplier = 12; // Always up to 12
                
                // In hard mode, sometimes include non-whole number results
                if (level > 5 && Math.random() < 0.2) {
                    // Create a division problem with a remainder
                    num2 = Math.floor(Math.random() * maxDivisor) + 2; // Divisor (avoid 1)
                    answer = Math.floor(Math.random() * maxMultiplier) + 1; // Quotient
                    const remainder = Math.floor(Math.random() * (num2 - 1)) + 1; // Remainder
                    num1 = (answer * num2) + remainder; // Dividend
                    
                    const operator = '÷';
                    const displayText = `${num1} ${operator} ${num2} = ?`;
                    
                    this.currentProblem = {
                        num1,
                        num2,
                        operator,
                        answer, // This will be the whole number part only
                        displayText,
                        hasRemainder: true,
                        remainder: remainder
                    };
                    
                    this.startTime = Date.now();
                    return this.currentProblem;
                }
                break;
            default:
                maxDivisor = Math.min(level + 2, 12);
                maxMultiplier = Math.min(5 + level, 12);
        }
        
        if (this.specificTable > 0) {
            // Use specific division table (ensure whole number results)
            num2 = this.specificTable; // The divisor
            // Generate a multiple of the divisor to ensure whole number result
            answer = Math.floor(Math.random() * maxMultiplier) + 1;
            num1 = answer * num2; // The dividend
        } else {
            // Random division problems with whole number results
            num2 = Math.floor(Math.random() * maxDivisor) + 1; // The divisor
            // Generate a multiple of the divisor to ensure whole number result
            answer = Math.floor(Math.random() * maxMultiplier) + 1;
            num1 = answer * num2; // The dividend
        }
        
        const operator = '÷';
        const displayText = `${num1} ${operator} ${num2} = ?`;
        
        this.currentProblem = {
            num1,
            num2,
            operator,
            answer,
            displayText,
            hasRemainder: false
        };

        this.startTime = Date.now();
        
        return this.currentProblem;
    }

    /**
     * Check if the provided answer is correct
     * @param {number} userAnswer - The user's answer
     * @returns {Object} Result with isCorrect flag and time taken
     */
    checkAnswer(userAnswer) {
        if (!this.currentProblem) {
            return { isCorrect: false, timeTaken: 0 };
        }

        const timeTaken = (Date.now() - this.startTime) / 1000; // in seconds
        const isCorrect = parseInt(userAnswer) === this.currentProblem.answer;

        return {
            isCorrect,
            timeTaken,
            correctAnswer: this.currentProblem.answer
        };
    }

    /**
     * Calculate damage based on answer correctness and time taken
     * @param {boolean} isCorrect - Whether the answer was correct
     * @param {number} timeTaken - Time taken to answer in seconds
     * @returns {number} Damage amount
     */
    calculateDamage(isCorrect, timeTaken) {
        if (!isCorrect) {
            return 0;
        }

        // Base damage is 10
        let damage = 10;

        // Bonus damage if answered within 5 seconds (+1 per second saved)
        if (timeTaken < 5) {
            damage += Math.floor(5 - timeTaken);
        }

        return damage;
    }

    /**
     * Get an encouraging message for correct answers
     * @returns {string} Encouraging message
     */
    getEncouragingMessage() {
        const messages = [
            "GREAT JOB!",
            "AWESOME!",
            "EXCELLENT!",
            "PERFECT!",
            "AMAZING!",
            "SUPER!",
            "FANTASTIC!",
            "BRILLIANT!",
            "INCREDIBLE!",
            "YOU'RE A MATH WIZARD!"
        ];
        
        return messages[Math.floor(Math.random() * messages.length)];
    }
}