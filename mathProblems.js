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
        this.problemHistory = []; // Store recent problems
        this.maxHistorySize = 20; // Keep track of the last 20 problems
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
        let problem;
        let attempts = 0;
        const maxAttempts = 10; // Prevent infinite loops

        do {
            switch (this.operationType) {
                case 'addition':
                    problem = this.generateAdditionProblemInternal(level);
                    break;
                case 'subtraction':
                    problem = this.generateSubtractionProblemInternal(level);
                    break;
                case 'multiplication':
                    problem = this.generateMultiplicationProblemInternal(level);
                    break;
                case 'division':
                    problem = this.generateDivisionProblemInternal(level);
                    break;
                default:
                    problem = this.generateAdditionProblemInternal(level);
            }
            attempts++;
        } while (this.isProblemInHistory(problem) && attempts < maxAttempts);

        // Add the unique problem to history
        this.addProblemToHistory(problem);

        this.currentProblem = problem;
        this.startTime = Date.now();
        return this.currentProblem;
    }

    /**
     * Checks if a problem (or its commutative equivalent) is in the recent history.
     * @param {Object} problem - The problem object { num1, num2, operator }
     * @returns {boolean} True if the problem is in history, false otherwise.
     */
    isProblemInHistory(problem) {
        return this.problemHistory.some(histProblem => {
            // Check for direct match
            if (histProblem.num1 === problem.num1 && histProblem.num2 === problem.num2 && histProblem.operator === problem.operator) {
                return true;
            }
            // Check for commutative match (addition and multiplication)
            if ((problem.operator === '+' || problem.operator === '×') &&
                histProblem.num1 === problem.num2 && histProblem.num2 === problem.num1 && histProblem.operator === problem.operator) {
                return true;
            }
            return false;
        });
    }

    /**
     * Adds a problem to the history, managing the history size.
     * @param {Object} problem - The problem object to add.
     */
    addProblemToHistory(problem) {
        // Add the new problem representation (num1, num2, operator)
        this.problemHistory.push({
            num1: problem.num1,
            num2: problem.num2,
            operator: problem.operator
        });

        // If history exceeds max size, remove the oldest entry
        if (this.problemHistory.length > this.maxHistorySize) {
            this.problemHistory.shift(); // Removes the first element
        }
    }

    // Renamed original generation methods to Internal to be called by the main generateProblem

    /**
     * Generate an addition problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateAdditionProblemInternal(level) {
        // Adjust difficulty based on level and selected difficulty
        let max;
        switch (this.difficulty) {
            case 'easy':
                max = Math.min(3 + Math.floor(level/2), 5); // Cap at 5 for 4-year-olds
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
        
        return this.currentProblem; // Return the generated problem object directly
    }

    /**
     * Generate a subtraction problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateSubtractionProblemInternal(level) {
        // Adjust difficulty based on level and selected difficulty
        let max;
        switch (this.difficulty) {
            case 'easy':
                max = Math.min(3 + Math.floor(level/2), 5); // Cap at 5 for 4-year-olds
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
        
        return this.currentProblem; // Return the generated problem object directly
    }

    /**
     * Generate a multiplication problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateMultiplicationProblemInternal(level) {
        let num1, num2;
        let maxTable, maxMultiplier;
        
        // Adjust difficulty based on selected difficulty
        switch (this.difficulty) {
            case 'easy':
                maxTable = 2; // Only use 1x and 2x tables for 4-year-olds
                maxMultiplier = Math.min(2 + Math.floor(level/2), 5); // Cap at 5
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
        
        return this.currentProblem; // Return the generated problem object directly
    }

    /**
     * Generate a division problem
     * @param {number} level - Current game level
     * @returns {Object} Problem object
     */
    generateDivisionProblemInternal(level) {
        let num1, num2, answer;
        let maxDivisor, maxMultiplier;
        
        // Adjust difficulty based on selected difficulty
        switch (this.difficulty) {
            case 'easy':
                maxDivisor = 2; // Only use 1 and 2 as divisors for 4-year-olds
                maxMultiplier = Math.min(2 + Math.floor(level/2), 3); // Cap at 3
                break;
            case 'medium':
                maxDivisor = Math.min(level + 2, 10); // Cap at 10
                maxMultiplier = Math.min(5 + level, 12); // Cap at 12
                break;
            case 'hard':
                maxDivisor = Math.min(level + 3, 12); // Cap at 12
                maxMultiplier = 12; // Always up to 12
                // Removed block that generated remainders for hard mode
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
        
        return this.currentProblem; // Return the generated problem object directly
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
