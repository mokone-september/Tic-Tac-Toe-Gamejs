class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.initializeGame();
    }

    initializeGame() {
        this.cells = document.querySelectorAll('.cell');
        this.playerTurnElement = document.getElementById('playerTurn');
        this.messageElement = document.getElementById('message');
        this.scoreXElement = document.getElementById('scoreX');
        this.scoreOElement = document.getElementById('scoreO');
        
        this.addEventListeners();
        this.updateDisplay();
    }

    addEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });

        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('resetScoreBtn').addEventListener('click', () => this.resetScore());
    }

    handleCellClick(e) {
        const index = parseInt(e.target.dataset.index);
        
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }

        this.makeMove(index);
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWinner()) {
            this.handleWin();
        } else if (this.isBoardFull()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScores();
        
        this.messageElement.textContent = `Player ${this.currentPlayer} wins!`;
        this.messageElement.classList.remove('error');
        
        // Highlight winning cells
        this.highlightWinningCells();
    }

    highlightWinningCells() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        const winningPattern = winPatterns.find(pattern => {
            const [a, b, c] = pattern;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });

        if (winningPattern) {
            winningPattern.forEach(index => {
                this.cells[index].classList.add('winner');
            });
        }
    }

    handleDraw() {
        this.gameActive = false;
        this.messageElement.textContent = "It's a draw!";
        this.messageElement.classList.remove('error');
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.updateDisplay();
    }

    updateDisplay() {
        this.playerTurnElement.textContent = `Player ${this.currentPlayer}'s Turn`;
    }

    updateScores() {
        this.scoreXElement.textContent = this.scores.X;
        this.scoreOElement.textContent = this.scores.O;
    }

    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winner');
        });
        
        this.messageElement.textContent = '';
        this.updateDisplay();
    }

    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScores();
        this.resetGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});